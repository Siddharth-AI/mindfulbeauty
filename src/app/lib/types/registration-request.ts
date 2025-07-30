export interface RegistrationRequest {
  id: string;
  name: string;
  email: string;
  type: 'salon' | 'freelancer';
  mobile_no?: string;
  location?: string;
  status: 'pending' | 'approved' | 'rejected' | 'follow-up';
  remark?: string;
  created_at: string;
  created_by?: string | null;
}

export interface CreateRegistrationRequestData {
  name: string;
  email: string;
  type: 'salon' | 'freelancer';
  mobile_no?: string;
  location?: string;
  remark?: string;
}
