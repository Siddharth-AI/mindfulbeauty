import { supabase, supabaseAdmin } from '../supabase';
import { User, CreateUserData, UpdateUserData } from '../../types/user';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('user')
      .select(`
        id,
        name,
        email,
        mobile_no,
        password,
        address,
        city,
        profile_image,
        type,
        is_active,
        is_admin,
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
      .from('user')
      .select(`
        id,
        name,
        email,
        mobile_no,
        password,
        address,
        city,
        profile_image,
        type,
        is_active,
        access_token,
        otp,
        is_admin,
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
      .from('user')
      .insert({
        name: userData.name,
        email: userData.email.toLowerCase(),
        mobile_no: userData.mobile_no,
        password: userData.password,
        address: userData.address || null,
        city: userData.city || null,
        profile_image: userData.profile_image || null,
        type: userData.type || 'user',
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
        type,
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
      .from('user')
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
        type,
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
      .from('user')
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

export const getAllUsers = async (excludeAdmins = false): Promise<User[]> => {
  let query = supabase.from('user').select('*').eq('is_delete', false);
  if (excludeAdmins) query = query.eq('is_admin', false);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data as User[];
};

export const findUserById = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase.from('user').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  return data as User | null;
};

export const softDeleteUserRecord = async (id: string, updated_by?: string): Promise<User> => {
  const { data, error } = await supabaseAdmin.from('user')
    .update({ is_delete: true, is_active: false, updated_by, updated_at: new Date().toISOString() })
    .eq('id', id).single();
  if (error) throw new Error(error.message);
  return data as User;
};

export const updateUserStatusInDB = async (id: string, isActive: boolean, updated_by?: string): Promise<User> => {
  const { data, error } = await supabaseAdmin.from('user')
    .update({ is_active: isActive, updated_by, updated_at: new Date().toISOString() })
    .eq('id', id).single();
  if (error) throw new Error(error.message);
  return data as User;
};
