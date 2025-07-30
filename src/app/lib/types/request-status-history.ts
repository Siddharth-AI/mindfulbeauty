export interface RequestStatusHistory {
  id: string;
  request_id: string;
  changed_by: string;
  old_status: string;
  new_status: string;
  remark?: string;
  created_at: string;
  updated_at?: string;
}
export interface LogUserStatusHistoryInput {
  user_id: string;
  changed_by: string;
  old_status: string;
  new_status: string;
  remark: string;
}
