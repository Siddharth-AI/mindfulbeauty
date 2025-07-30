import { supabase, supabaseAdmin } from '../supabase';
import { User, CreateUserData, UpdateUserData } from '../../types/user';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        id,
        name,
        email,
        mobile_no,
        password,
        address,
        city,
        profile_image,
        role,
        is_active,
        access_token,
        otp,
        created_at,
        updated_at
      `)
      .eq('email', email.toLowerCase())
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Database query failed: ${error.message}`);
    }

    return data as User | null;
  } catch (error) {
    console.error('Error in findUserByEmail:', error);
    throw error;
  }
};

export const findUserByMobile = async (mobile: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select(`
        id,
        name,
        email,
        mobile_no,
        password,
        address,
        city,
        profile_image,
        role,
        is_active,
        access_token,
        otp,
        created_at,
        updated_at
      `)
      .eq('mobile_no', mobile)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Database query failed: ${error.message}`);
    }

    return data as User | null;
  } catch (error) {
    console.error('Error in findUserByMobile:', error);
    throw error;
  }
};

export const createUser = async (userData: CreateUserData): Promise<User> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert({
        name: userData.name,
        email: userData.email.toLowerCase(),
        mobile_no: userData.mobile_no,
        password: userData.password,
        address: userData.address || null,
        city: userData.city || null,
        profile_image: userData.profile_image || null,
        role: userData.role || 'user',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select(`
        id,
        name,
        email,
        mobile_no,
        password,
        address,
        city,
        profile_image,
        role,
        is_active,
        access_token,
        otp,
        created_at,
        updated_at
      `)
      .single();

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return data as User;
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

export const updateUser = async (id: string, updateData: UpdateUserData): Promise<User> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({
        ...updateData
      })
      .eq('id', id)
      .select(`
        id,
        name,
        email,
        mobile_no,
        password,
        address,
        city,
        profile_image,
        role,
        is_active,
        access_token,
        otp,
        created_at,
        updated_at
      `)
      .single();

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to update user: ${error.message}`);
    }

    return data as User;
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
};

export const checkUserExists = async (
  email: string,
  mobile: string
): Promise<{ emailExists: boolean; mobileExists: boolean }> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('email, mobile_no')
      .or(`email.eq.${email.toLowerCase()},mobile_no.eq.${mobile}`)

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to check user existence: ${error.message}`);
    }

    const emailExists = data?.some(user => user.email === email.toLowerCase()) || false;
    const mobileExists = data?.some(user => user.mobile_no === mobile) || false;

    return { emailExists, mobileExists };
  } catch (error) {
    console.error('Error in checkUserExists:', error);
    throw error;
  }
};
