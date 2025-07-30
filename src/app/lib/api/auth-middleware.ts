import { NextRequest } from 'next/server';
import { verifyToken } from '../auth/jwt';

export async function getUserFromRequest(request: NextRequest, opts: { required?: boolean } = {}) {
  const header = request.headers.get('authorization');
  if (!header) {
    if (opts.required) throw new Error('Missing authorization header');
    return null;
  }
  const match = header.match(/^Bearer (.+)$/);
  if (!match) {
    if (opts.required) throw new Error('Invalid auth header');
    return null;
  }
  return verifyToken(match[1]); // Throws if invalid/expired
}
