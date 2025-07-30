import { NextRequest } from 'next/server';
import { loginUser } from '@/app/services/auth.service';
import { successResponse, errorResponse } from '@/app/lib/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { identifier, password } = body;
    console.log(identifier, "check identi")
    console.log(password, "check password")

    const result = await loginUser(identifier, password);
    console.log(result, "check result")

    const response = successResponse(
      {
        user: result.user,
        access_token: result.accessToken,
      },
      'Login successful'
    );

    // Set HTTP-only cookie for refresh token
    response.cookies.set('refresh-token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('User login error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Login failed',
      401
    );
  }
}
