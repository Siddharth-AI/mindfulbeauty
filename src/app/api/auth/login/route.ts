/* eslint-disable @typescript-eslint/no-explicit-any */
import { withValidation } from '@/app/lib/api/withValidation';
import { hashPassword } from '@/app/lib/auth/bcrypt';
import { errorResponse, successResponse } from '@/app/lib/utils/api-response';
import { loginSchema } from '@/app/lib/validation/schemas/auth';
import { loginUser } from '@/app/services/auth.service';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const validated = await withValidation(request, loginSchema);
  if (validated instanceof Response) return validated;

  try {
    const { identifier, password } = validated;
    const hashed = await hashPassword('Admin@123');
    console.log(hashed, "=>>>>>>>>>>>>>>>>>>");
    const result = await loginUser(identifier, password);
    // Set HTTP-only refresh-token cookie
    const res = successResponse(
      { user: result.user, access_token: result.accessToken },
      'Login successful'
    );
    res.cookies.set('refresh-token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    return res;
  } catch (e: any) {
    return errorResponse(e.message ?? 'Login failed', 401);
  }
}
