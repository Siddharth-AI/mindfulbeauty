import bcrypt from 'bcryptjs';
import { AUTH_CONFIG } from './config';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, AUTH_CONFIG.BCRYPT_SALT_ROUNDS);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const isPasswordStrong = async (password: string): Promise<boolean> => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};
