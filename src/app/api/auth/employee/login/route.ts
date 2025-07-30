// import { NextRequest } from 'next/server';
// import { loginEmployee } from '@/services/employee-auth.service';
// import { successResponse, errorResponse } from '@/lib/utils/api-response';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { identifier, password } = body;

//     const result = await loginEmployee(identifier, password);

//     const response = successResponse(
//       {
//         employee: result.employee,
//         access_token: result.accessToken,
//       },
//       'Employee login successful'
//     );

//     // Set HTTP-only cookie for refresh token
//     response.cookies.set('employee-refresh-token', result.refreshToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 30 * 24 * 60 * 60, // 30 days
//       path: '/',
//     });

//     return response;
//   } catch (error) {
//     console.error('Employee login error:', error);
//     return errorResponse(
//       error instanceof Error ? error.message : 'Employee login failed',
//       401
//     );
//   }
// }
