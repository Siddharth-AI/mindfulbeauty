import {
  findUserByEmail,
  findUserByMobile,
  createUser,
  updateUser,
  checkUserExists,
  getAllUsers,
  findUserById,
  softDeleteUserRecord,
  updateUserStatusInDB,
} from '@/app/lib/database/queries/users';
import { hashPassword } from '@/app/lib/auth/bcrypt';
import { CreateUserData, UpdateUserData } from '@/app/lib/types/user';

export const getUsers = async ({ excludeAdmins = false } = {}) => {
  return await getAllUsers(excludeAdmins);
};

export const getUserById = async (id: string) => {
  return await findUserById(id);
};

export const addUser = async (userData: CreateUserData, created_by?: string) => {
  // Ensure password hashing!
  if (!userData.password) throw new Error('Password required');
  // Check for existance
  const { emailExists, mobileExists } = await checkUserExists(userData.email, userData.mobile_no);
  if (emailExists) throw new Error('Email is already registered');
  if (mobileExists) throw new Error('Mobile number is already registered');

  const hashed = await hashPassword(userData.password);
  return await createUser({ ...userData, password: hashed, created_by });
};

export const editUser = async (id: string, data: UpdateUserData, updated_by?: string) => {
  // Prevent email/mobile_no update clashing
  if (data.email || data.mobile_no) {
    const { emailExists, mobileExists } = await checkUserExists(
      data.email || '', data.mobile_no || '',
    );
    if (data.email && emailExists) throw new Error('Email already registered');
    if (data.mobile_no && mobileExists) throw new Error('Mobile number already registered');
  }
  return await updateUser(id, { ...data, updated_by });
};

export const softDeleteUser = async (id: string, updated_by?: string) => {
  return await softDeleteUserRecord(id, updated_by);
};

export const updateUserStatus = async (id: string, newStatus: 'active' | 'inactive', updated_by?: string) => {
  return await updateUserStatusInDB(id, newStatus === 'active', updated_by);
};
