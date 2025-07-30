export interface Employee {
  id: string;
  name: string;
  location: string;
  email: string;
  mobile_no: string;
  role: 'salon' | 'freelancer';
  is_active: boolean;
  created_at: string;
  updated_at?: string | null;
}

export interface CreateEmployeeData {
  name: string;
  location: string;
  email: string;
  mobile_no: string;
  role: 'salon' | 'freelancer';
}

export interface UpdateEmployeeData {
  name?: string;
  location?: string;
  email?: string;
  mobile_no?: string;
  role?: 'salon' | 'freelancer';
}
