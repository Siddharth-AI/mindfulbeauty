/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateUserData } from '@/app/lib/types';
import { hashPassword, comparePassword } from '@/app/lib/auth/bcrypt';
import { generateAccessToken, generateRefreshToken } from '@/app/lib/auth/jwt';
import { findUserByEmail, findUserByMobile, createUser, updateUser, checkUserExists } from '@/app/lib/database/queries/users';
import { registerSchema, loginSchema, } from '@/app/lib/validation/schemas/auth';

export const registerUser = async (userData: CreateUserData) => {
  try {
    console.log('Registering user with data:', { ...userData, password: '***' });

    // Validate input
    const { error, value } = registerSchema.validate(userData);
    if (error) {
      throw new Error(error.details.map(d => d.message).join(', '));
    }

    // Check if user exists
    const { emailExists, mobileExists } = await checkUserExists(
      value.email,
      value.mobile_no
    );

    if (emailExists) {
      throw new Error('Email is already registered');
    }
    if (mobileExists) {
      throw new Error('Mobile number is already registered');
    }

    // Hash password
    const hashedPassword = await hashPassword(value.password);

    // Create user
    const newUser = await createUser({
      ...value,
      password: hashedPassword,
    });

    console.log('User created successfully:', { id: newUser.id, email: newUser.email });

    // Generate tokens
    const accessToken = generateAccessToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      is_active: newUser.is_active,
    });

    const refreshToken = generateRefreshToken(newUser.id);

    // Remove sensitive data
    const { password, access_token, otp, ...userSafe } = newUser;

    return {
      user: userSafe,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error('Registration service error:', error);
    throw error;
  }
};

export const loginUser = async (identifier: string, password: string) => {
  try {
    console.log(`${identifier} check identifier`);

    // Validate input
    const { error, value } = loginSchema.validate({ identifier, password });
    if (error) {
      throw new Error(error.details.map(d => d.message).join(', '));
    }

    // Determine if identifier is email or mobile
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

    console.log(`${password} check password`);

    // Find user by email or mobile
    let user;
    if (isEmail) {
      console.log(`${identifier} check email`);
      user = await findUserByEmail(identifier);
    } else {
      user = await findUserByMobile(identifier);
    }

    console.log('User found:', user ? { id: user.id, email: user.email, is_active: user.is_active } : 'null');

    if (!user || !user.is_active) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      is_active: user.is_active,
    });

    const refreshToken = generateRefreshToken(user.id);

    // Remove sensitive data
    const { password: _, access_token, otp, ...userSafe } = user;

    return {
      user: userSafe,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};



