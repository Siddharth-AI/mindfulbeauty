export interface User {
  id: string
  name: string
  email: string
  mobile_no: string
  password: string
  address?: string | null
  city?: string | null
  profile_image?: string | null
  type: "salon" | "freelancer"
  is_active: boolean
  is_delete: boolean
  is_admin: boolean
  status: "pending" | "approved" | "active" | "inactive" | "suspended"
  otp?: string | null
  access_token?: string | null
  location?: string | null
  created_at: string
  updated_at?: string | null
  created_by?: string | null
  updated_by?: string | null
}

export interface CreateUserData {
  name: string
  email: string
  mobile_no: string
  password: string
  address?: string | null
  city?: string | null
  profile_image?: string | null
  type: "salon" | "freelancer"
  status?: "pending" | "approved" | "active" | "inactive" | "suspended"
  location?: string | null
  created_by?: string | null
}

export interface UpdateUserData {
  name?: string
  email?: string
  mobile_no?: string
  address?: string | null
  city?: string | null
  profile_image?: string | null
  access_token?: string | null
  is_active?: boolean
  status?: "pending" | "approved" | "active" | "inactive" | "suspended"
  location?: string | null
  updated_by?: string | null
}

export interface UserStatusHistory {
  id: string
  user_id: string
  changed_by: string
  old_status: string
  new_status: string
  remark?: string
  created_at: string
  updated_at?: string
}
