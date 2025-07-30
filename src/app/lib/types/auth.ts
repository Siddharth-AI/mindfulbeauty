import { User } from "./user";

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  mobile_no: string;
  password: string;
  address?: string;
  city?: string;
  profile_image?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  access_token?: string;
  error?: string;
}

export interface JWTPayload {
  id: string;
  email: string;
  name: string;
  phone_no?: string;
  is_active: boolean;
  iat?: number;
  exp?: number;
}
