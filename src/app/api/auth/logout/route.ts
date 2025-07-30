import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Just expire the cookie on client side; you could also track a token blacklist if desired
  const res = NextResponse.json({ success: true, message: 'Logout successful' });
  res.cookies.set('refresh-token', '', { path: '/', maxAge: 0 }); // Remove cookie
  return res;
}

// import { NextResponse } from 'next/server';

// export async function POST() {
//   const res = NextResponse.json({ success: true, message: 'Logged out successfully' });
//   res.cookies.set('refresh-token', '', { path: '/', maxAge: 0 });
//   return res;
// }
