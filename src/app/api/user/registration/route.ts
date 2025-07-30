import { NextRequest } from 'next/server';
import { registerUser } from '@/app/services/auth.service';
import { successResponse, errorResponse } from '@/app/lib/utils/api-response';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Registration request body:', { ...body, password: '***' });

    if (!body.name || !body.email || !body.mobile_no || !body.password) {
      return errorResponse('All required fields must be provided', 400);
    }

    const result = await registerUser(body);

    const response = successResponse(
      {
        user: result.user,
        access_token: result.accessToken,
      },
      'User registered successfully',
      201
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
    console.error('User registration error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Registration failed',
      400
    );
  }
}
