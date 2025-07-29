import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import supabase from '@/app/lib/supabase/client';
import { registerUserSchema } from '@/app/lib/validation/user';
export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log(process.env.JWT_SECRET)

    const { error, value } = registerUserSchema.validate(body, { abortEarly: false });

    if (error) {
      return NextResponse.json({ errors: error.details.map(e => e.message) }, { status: 400 });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id,email,mobile_no')
      .or(`email.eq.${value.email.toLowerCase()},mobile_no.eq.${value.mobile_no}`)
      .maybeSingle();

    if (existingUser) {
      const emailExists = existingUser.email?.toLowerCase() === value.email.toLowerCase();
      const mobile_no = existingUser.mobile_no === value.mobile_no;
      if (emailExists) {
        return NextResponse.json({ success: false, error: 'Email is already registered.' }, { status: 400 });
      } else if (mobile_no) {
        return NextResponse.json({ success: false, error: 'Mobile number is already registered.' }, { status: 400 });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(value.password, 10);

    const { data, error: supabaseError } = await supabase
      .from('users')
      .insert({
        name: value.name.trim(),
        email: value.email.trim().toLowerCase(),
        mobile_no: value.mobile_no || null,
        password: hashedPassword,
        address: value.address || null,
        city: value.city || null,
        profile_image: value.profile_image || null,
        otp: value.otp || null,
        is_active: true,
      })
      .select();

    console.log(data, "data=>>>>>>>>>")

    if (supabaseError) {
      return NextResponse.json({ error: supabaseError.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'User registration failed.' }, { status: 500 });
    }

    const newUser = data[0];
    delete newUser.password; // never expose hashed password

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: newUser,
    }, { status: 201 });

  } catch (err) {
    return NextResponse.json({ error: `Internal Server Error: ${err instanceof Error ? err.message : String(err)}` }, { status: 500 });
  }
}
