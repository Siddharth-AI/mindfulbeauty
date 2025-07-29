import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import supabase from '@/app/lib/supabase/client';
import { loginUserSchema } from '@/app/lib/validation/user';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// Simple helper to check if identifier is an email
function isEmail(identifier: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(identifier);
}

export async function POST(request: Request) {
  try {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    const body = await request.json();

    const { error, value } = loginUserSchema.validate(body, { abortEarly: false });
    if (error) {
      return NextResponse.json(
        { errors: error.details.map((e) => e.message) },
        { status: 400 }
      );
    }

    const { identifier, password } = value;

    // Build the query without limit(1) — maybeSingle handles that already
    const baseQuery = supabase.from('users').select('*');

    const queryBuilder = isEmail(identifier)
      ? baseQuery.eq('email', identifier.toLowerCase())
      : baseQuery.eq('mobile_no', identifier);

    const { data: user, error: fetchError } = await queryBuilder.maybeSingle();

    if (fetchError) {
      return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
    }

    if (!user || user.is_deleted || !user.is_active) {
      return NextResponse.json({ error: 'Invalid identifier or password' }, { status: 401 });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid identifier or password' }, { status: 401 });
    }


    const signOptions: SignOptions = {};

    if (JWT_EXPIRES_IN) {
      signOptions.expiresIn = JWT_EXPIRES_IN as unknown as SignOptions['expiresIn'];
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        phone_no: user.phone_no,
        name: user.name,
        is_active: user.is_active,
      },
      JWT_SECRET,
      signOptions
    );

    // Optionally save token to DB if required
    await supabase.from('users').update({ access_token: token }).eq('id', user.id);

    // Prepare payload without sensitive info
    const { password: _, access_token, otp, role, ...userSafe } = user;

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        access_token: token,
        user: userSafe,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
