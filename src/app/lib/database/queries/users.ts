/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase, supabaseAdmin } from "../supabase"
import type { User, CreateUserData, UpdateUserData, UserStatusHistory } from "../../types/user"

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("is_delete", false)
      .maybeSingle()

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Database query failed: ${error.message}`)
    }

    return data as User | null
  } catch (error) {
    console.error("Error in findUserByEmail:", error)
    throw error
  }
}

export const findUserByMobile = async (mobile: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("mobile_no", mobile)
      .eq("is_delete", false)
      .maybeSingle()

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Database query failed: ${error.message}`)
    }

    return data as User | null
  } catch (error) {
    console.error("Error in findUserByMobile:", error)
    throw error
  }
}

export const createUser = async (userData: CreateUserData): Promise<User> => {
  try {
    const { data, error } = await supabaseAdmin
      .from("user")
      .insert({
        name: userData.name,
        email: userData.email.toLowerCase(),
        mobile_no: userData.mobile_no,
        password: userData.password,
        address: userData.address || null,
        city: userData.city || null,
        profile_image: userData.profile_image || null,
        type: userData.type,
        status: userData.status || "pending",
        location: userData.location || null,
        is_active: true,
        is_delete: false,
        is_admin: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: userData.created_by || null,
      })
      .select("*")
      .single()

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to create user: ${error.message}`)
    }

    return data as User
  } catch (error) {
    console.error("Error in createUser:", error)
    throw error
  }
}

export const createUserFromRequest = async (requestData: any, createdBy?: string): Promise<User> => {
  try {
    // Generate a default password hash for approved users
    const defaultPassword = "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj0kPjKi.K5W" // "password123"

    const { data, error } = await supabaseAdmin
      .from("user")
      .insert({
        name: requestData.name,
        email: requestData.email.toLowerCase(),
        mobile_no: requestData.mobile_no || "",
        password: defaultPassword,
        type: requestData.type,
        location: requestData.location || null,
        status: "approved", // Auto-approved users start as approved
        is_active: true,
        is_delete: false,
        is_admin: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        created_by: createdBy || null,
      })
      .select("*")
      .single()

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to create user from request: ${error.message}`)
    }

    return data as User
  } catch (error) {
    console.error("Error in createUserFromRequest:", error)
    throw error
  }
}

export const approveRegistrationRequestAndCreateUser = async (
  requestId: string,
  approvedBy: string,
  remark = "Request approved and user created",
): Promise<User> => {
  try {
    // Call the PostgreSQL function to handle the entire approval process
    const { data, error } = await supabaseAdmin.rpc("approve_registration_request", {
      request_id_param: requestId,
      approved_by_param: approvedBy,
      remark_param: remark,
    })

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to approve request and create user: ${error.message}`)
    }

    // Fetch and return the created user
    const newUserId = data
    const { data: userData, error: userError } = await supabaseAdmin
      .from("user")
      .select("*")
      .eq("id", newUserId)
      .single()

    if (userError) {
      throw new Error(`Failed to fetch created user: ${userError.message}`)
    }

    return userData as User
  } catch (error) {
    console.error("Error in approveRegistrationRequestAndCreateUser:", error)
    throw error
  }
}

export const updateUser = async (id: string, updateData: UpdateUserData): Promise<User> => {
  try {
    const { data, error } = await supabaseAdmin
      .from("user")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single()

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to update user: ${error.message}`)
    }

    return data as User
  } catch (error) {
    console.error("Error in updateUser:", error)
    throw error
  }
}

export const checkUserExists = async (
  email: string,
  mobile: string,
  excludeId?: string,
): Promise<{ emailExists: boolean; mobileExists: boolean }> => {
  try {
    let query = supabase
      .from("user")
      .select("id, email, mobile_no")
      .eq("is_delete", false)
      .or(`email.eq.${email.toLowerCase()},mobile_no.eq.${mobile}`)

    if (excludeId) {
      query = query.neq("id", excludeId)
    }

    const { data, error } = await query

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to check user existence: ${error.message}`)
    }

    const emailExists = data?.some((user) => user.email === email.toLowerCase()) || false
    const mobileExists = data?.some((user) => user.mobile_no === mobile) || false

    return { emailExists, mobileExists }
  } catch (error) {
    console.error("Error in checkUserExists:", error)
    throw error
  }
}

// Check if user exists in both user table and registration_request table
export const checkUserExistsInBothTables = async (
  email: string,
  mobile: string,
): Promise<{ userExists: boolean; requestExists: boolean; message?: string }> => {
  try {
    // Check in user table
    const { data: userData, error: userError } = await supabase
      .from("user")
      .select("id, email, mobile_no, is_active")
      .eq("is_delete", false)
      .or(`email.eq.${email.toLowerCase()},mobile_no.eq.${mobile}`)

    if (userError) {
      throw new Error(`Failed to check user table: ${userError.message}`)
    }

    // Check in registration_request table
    const { data: requestData, error: requestError } = await supabase
      .from("registration_request")
      .select("id, email, mobile_no, status")
      .or(`email.eq.${email.toLowerCase()},mobile_no.eq.${mobile}`)

    if (requestError) {
      throw new Error(`Failed to check registration_request table: ${requestError.message}`)
    }

    const userExists = userData && userData.length > 0
    const requestExists = requestData && requestData.length > 0

    let message = ""
    if (userExists) {
      const user = userData[0]
      if (user.is_active) {
        message = "You are already registered and active. Please login instead."
      } else {
        message = "Your account exists but is inactive. Please contact support."
      }
    } else if (requestExists) {
      const request = requestData[0]
      message = `You already have a ${request.status} registration request. Please wait for approval.`
    }

    return { userExists: !!userExists, requestExists: !!requestExists, message }
  } catch (error) {
    console.error("Error in checkUserExistsInBothTables:", error)
    throw error
  }
}

export const getAllUsers = async (excludeAdmins = false): Promise<User[]> => {
  let query = supabase.from("user").select("*").eq("is_delete", false)
  if (excludeAdmins) query = query.eq("is_admin", false)
  const { data, error } = await query.order("created_at", { ascending: false })
  if (error) throw new Error(error.message)
  return data as User[]
}

export const findUserById = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase.from("user").select("*").eq("id", id).eq("is_delete", false).maybeSingle()
  if (error) throw new Error(error.message)
  return data as User | null
}

export const softDeleteUserRecord = async (id: string, updated_by?: string): Promise<User> => {
  const { data, error } = await supabaseAdmin
    .from("user")
    .update({
      is_delete: true,
      is_active: false,
      status: "inactive",
      updated_by,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single()
  if (error) throw new Error(error.message)
  return data as User
}

export const updateUserStatusInDB = async (
  id: string,
  status: "pending" | "approved" | "active" | "inactive" | "suspended",
  updated_by?: string,
): Promise<User> => {
  try {
    const { data, error } = await supabaseAdmin
      .from("user")
      .update({
        status,
        is_active: status === "approved" || status === "active",
        updated_by,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .single()

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to update user status: ${error.message}`)
    }

    return data as User
  } catch (error) {
    console.error("Error in updateUserStatusInDB:", error)
    throw error
  }
}

export const changeUserStatus = async (
  userId: string,
  newStatus: "pending" | "approved" | "active" | "inactive" | "suspended",
  changedBy: string,
  remark: string,
): Promise<User> => {
  try {
    // Call the PostgreSQL function to handle status change and logging
    const { error } = await supabaseAdmin.rpc("change_user_status", {
      user_id_param: userId,
      new_status_param: newStatus,
      changed_by_param: changedBy,
      remark_param: remark,
    })

    if (error) {
      console.error("Database error:", error)
      throw new Error(`Failed to change user status: ${error.message}`)
    }

    // Fetch and return the updated user
    const { data: userData, error: userError } = await supabaseAdmin.from("user").select("*").eq("id", userId).single()

    if (userError) {
      throw new Error(`Failed to fetch updated user: ${userError.message}`)
    }

    return userData as User
  } catch (error) {
    console.error("Error in changeUserStatus:", error)
    throw error
  }
}

// User Status History functions
export const logUserStatusHistory = async ({
  user_id,
  changed_by,
  old_status,
  new_status,
  remark,
}: {
  user_id: string
  changed_by: string
  old_status: string
  new_status: string
  remark: string
}): Promise<UserStatusHistory> => {
  const { data, error } = await supabaseAdmin
    .from("user_status_history")
    .insert({
      user_id,
      changed_by,
      old_status,
      new_status,
      remark,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select("*")
    .single()

  if (error) throw new Error(error.message)
  return data as UserStatusHistory
}

export const getUserStatusHistory = async (user_id: string, limit = 10): Promise<UserStatusHistory[]> => {
  const { data, error } = await supabase
    .from("user_status_history")
    .select(`
      *,
      changed_by_user:changed_by(name, email)
    `)
    .eq("user_id", user_id)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw new Error(error.message)
  return data as UserStatusHistory[]
}

export const getAllUserStatusHistory = async (): Promise<UserStatusHistory[]> => {
  const { data, error } = await supabase
    .from("user_status_history")
    .select(`
      *,
      user:user_id(name, email),
      changed_by_user:changed_by(name, email)
    `)
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data as UserStatusHistory[]
}
