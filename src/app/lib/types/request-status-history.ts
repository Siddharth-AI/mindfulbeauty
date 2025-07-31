
export interface LogUserStatusHistoryInput {
  user_id: string;
  changed_by: string;
  old_status: string;
  new_status: string;
  remark: string;
}
