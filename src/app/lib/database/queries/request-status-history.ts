import { LogUserStatusHistoryInput } from '../../types/request-status-history';
import { supabaseAdmin, supabase } from '../supabase';

export const addRequestStatusHistory = async (payload: {
  request_id: string;
  changed_by: string;
  old_status: string;
  new_status: string;
  remark: string;
}) => {
  const { data, error } = await supabaseAdmin
    .from('request_status_history')
    .insert({
      ...payload,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select('*')
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const getRequestStatusHistory = async (request_id: string, limit = 10) => {
  const { data, error } = await supabaseAdmin
    .from('request_status_history')
    .select('*')
    .eq('request_id', request_id)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return data;
};

export const getUserStatusHistory = async (user_id: string, limit = 2) => {
  const { data, error } = await supabase
    .from('request_status_history')
    .select('*')
    .eq('request_id', user_id) // adjust if your table tracks user or request_id!
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data;
};



export const logUserStatusHistory = async ({
  user_id,
  changed_by,
  old_status,
  new_status,
  remark,
}: LogUserStatusHistoryInput) => {
  const { data, error } = await supabaseAdmin
    .from('user_status_history')
    .insert({
      user_id,
      changed_by,
      old_status,
      new_status,
      remark,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const getAllRequestStatusHistory = async () => {
  const { data, error } = await supabaseAdmin
    .from('request_status_history')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};