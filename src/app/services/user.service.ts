/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createUser,
  updateUser,
  checkUserExists,
  getAllUsers,
  findUserById,
  softDeleteUserRecord,
  changeUserStatus,
} from "@/app/lib/database/queries/users"
import { hashPassword } from "@/app/lib/auth/bcrypt"
import type { CreateUserData, UpdateUserData } from "@/app/lib/types/user"
import {
  createRegistrationRequest,
  getRegistrationRequests,
  getRegistrationRequestById,
  updateRegistrationRequestStatus,
} from "../lib/database/queries/registration-requests"
import { addRequestStatusHistory } from "../lib/database/queries/request-status-history"
import { approveRegistrationRequestAndCreateUser } from "../lib/database/queries/users"
import supabase from "../lib/database/supabase"

export const handleCreateRequest = async (data: any, userId?: string) => {
  // Optionally attach created_by
  return await createRegistrationRequest({ ...data, created_by: userId })
}

export const handleGetRequests = async () => getRegistrationRequests()

export const handleGetRequestById = async (id: string) => getRegistrationRequestById(id)

export const handleStatusChange = async ({
  id,
  new_status,
  remark,
  userId,
}: { id: string; new_status: string; remark: string; userId: string }) => {
  // 1. Fetch old status
  const request = await getRegistrationRequestById(id)
  if (!request) throw new Error("Request not found")

  // 2. Handle approval differently - this will create user and delete request
  if (new_status === "approved") {
    try {
      // Use the enhanced function that handles everything in one transaction
      const createdUser = await approveRegistrationRequestAndCreateUser(id, userId, remark)

      console.log(`Registration request approved and user created: ${createdUser.id}`)

      // Return a mock request object since the original request is deleted
      return {
        ...request,
        status: "approved",
        remark: remark,
        user_created: createdUser.id, // Include created user ID for reference
      }
    } catch (error) {
      console.error("Failed to approve request and create user:", error)
      throw error
    }
  } else {
    // 3. For other status changes, update normally and write audit history
    const updatedRequest = await updateRegistrationRequestStatus(id, new_status, remark)

    await addRequestStatusHistory({
      request_id: id,
      changed_by: userId,
      old_status: request.status,
      new_status,
      remark: remark,
    })

    return updatedRequest
  }
}

export const findPendingRegistrationRequest = async (email: string, mobile_no?: string) => {
  let query = supabase
    .from("registration_request")
    .select("id, status")
    .eq("email", email)
    .or(`status.eq.pending,status.eq.follow-up`) // Only check for requests not final

  if (mobile_no) {
    query = query.or(`mobile_no.eq.${mobile_no}`)
  }

  const { data, error } = await query.limit(1)
  if (error) throw new Error(error.message)
  return data && data.length > 0 ? data[0] : null
}


export const getUsers = async ({ excludeAdmins = false } = {}) => {
  return await getAllUsers(excludeAdmins)
}

export const getUserById = async (id: string) => {
  return await findUserById(id)
}

export const addUser = async (userData: CreateUserData, created_by?: string) => {
  // Ensure password hashing!
  if (!userData.password) throw new Error("Password required")
  // Check for existence
  const { emailExists, mobileExists } = await checkUserExists(userData.email, userData.mobile_no)
  if (emailExists) throw new Error("Email is already registered")
  if (mobileExists) throw new Error("Mobile number is already registered")

  const hashed = await hashPassword(userData.password)
  return await createUser({ ...userData, password: hashed, created_by })
}

export const editUser = async (id: string, data: UpdateUserData, updated_by?: string) => {
  console.log("🔨 Service: editUser called with:", { id, data, updated_by })

  // Prevent email/mobile_no update clashing
  if (data.email || data.mobile_no) {
    console.log("🔨 Service: Checking for existing email/mobile")
    const { emailExists, mobileExists } = await checkUserExists(data.email || "", data.mobile_no || "", id)
    if (data.email && emailExists) {
      console.log("🔨 Service: Email already exists")
      throw new Error("Email already registered")
    }
    if (data.mobile_no && mobileExists) {
      console.log("🔨 Service: Mobile already exists")
      throw new Error("Mobile number already registered")
    }
  }

  console.log("🔨 Service: Calling updateUser in database")
  const result = await updateUser(id, { ...data, updated_by })
  console.log("🔨 Service: Database update result:", result)
  return result
}

export const softDeleteUser = async (id: string, updated_by?: string) => {
  return await softDeleteUserRecord(id, updated_by)
}

// Updated to use the enhanced function
export const updateUserStatus = async (
  id: string,
  newStatus: "pending" | "approved" | "active" | "inactive" | "suspended",
  remark: string,
  updated_by?: string,
) => {
  if (!updated_by) throw new Error("updated_by is required")
  return await changeUserStatus(id, newStatus, updated_by, remark)
}

// Add missing functions that might be referenced elsewhere
export const createUserFromRequest = async (requestData: any, createdBy?: string) => {
  const defaultPassword = "password123" // You should hash this
  const hashedPassword = await hashPassword(defaultPassword)

  return await createUser({
    name: requestData.name,
    email: requestData.email,
    mobile_no: requestData.mobile_no || "",
    password: hashedPassword,
    type: requestData.type,
    location: requestData.location,
    status: "approved",
    created_by: createdBy,
  })
}
