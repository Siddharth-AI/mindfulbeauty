export interface RegistrationRequest {
  id: string
  name: string
  email: string
  type: "salon" | "freelancer"
  mobile_no?: string
  location?: string
  status: "pending" | "approved" | "rejected" | "follow-up"
  remark?: string
  created_at: string
  created_by?: string | null
}

export interface CreateRegistrationRequestData {
  name: string
  email: string
  type: "salon" | "freelancer"
  mobile_no?: string
  location?: string
  remark?: string
}

export interface RequestStatusHistory {
  id: string
  request_id: string
  changed_by: string
  old_status: string
  new_status: string
  remark?: string
  user_id?: string | null // New field to link to created user
  created_at: string
  updated_at?: string
}
