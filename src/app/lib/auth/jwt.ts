import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import { AUTH_CONFIG } from './config';

export interface TokenPayload extends JwtPayload {
  id: string;
  email: string;
  name: string;
  role?: string;
  is_active: boolean;
  is_admin: boolean;
}

export const generateAccessToken = (payload: Omit<TokenPayload, 'iat' | 'exp'>): string => {
  const signOptions: SignOptions = {
    expiresIn: AUTH_CONFIG.JWT_EXPIRES_IN,
    issuer: 'mindfulbeauty',
    audience: 'mindfulbeauty-users',
  };

  return jwt.sign(payload, AUTH_CONFIG.JWT_SECRET, signOptions);
};

export const generateRefreshToken = (userId: string): string => {
  const signOptions: SignOptions = {
    expiresIn: AUTH_CONFIG.REFRESH_TOKEN_EXPIRES_IN,
    issuer: 'mindfulbeauty',
    audience: 'mindfulbeauty-users',
  };

  return jwt.sign({ id: userId, type: 'refresh' }, AUTH_CONFIG.JWT_SECRET, signOptions);
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, AUTH_CONFIG.JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch {
    return null;
  }
};
