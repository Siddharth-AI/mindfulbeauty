export interface User {
  id: string;
  name: string;
  email: string;
  mobile_no: string;
  password: string;
  address?: string | null;
  city?: string | null;
  profile_image?: string | null;
  role: string;
  is_active: boolean;
  is_deleted?: boolean;
  access_token?: string | null;
  otp?: string | null;
  created_at: string;
  updated_at?: string | null;
}

export interface CreateUserData {
  name: string;
  email: string;
  mobile_no: string;
  password: string;
  address?: string | null;
  city?: string | null;
  profile_image?: string | null;
  role?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  mobile_no?: string;
  address?: string | null;
  city?: string | null;
  profile_image?: string | null;
  access_token?: string | null;
  is_active?: boolean;
  updated_at?: string;
}
