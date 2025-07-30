import { supabase, supabaseAdmin } from '../supabase';
import { RegistrationRequest, CreateRegistrationRequestData } from '../../types/registration-request';

export const createRegistrationRequest = async (payload: CreateRegistrationRequestData & { created_by?: string }) => {
  const { data, error } = await supabaseAdmin
    .from('registration_request')
    .insert({ ...payload, status: 'pending', created_at: new Date().toISOString() })
    .select(`
      id, name,email, type, mobile_no, location, status, remark, created_at, created_by
    `).single();
  if (error) throw new Error(error.message);
  return data as RegistrationRequest;
};

export const getRegistrationRequests = async () => {
  const { data, error } = await supabase
    .from('registration_request')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data as RegistrationRequest[];
};

export const getRegistrationRequestById = async (id: string) => {
  const { data, error } = await supabase
    .from('registration_request')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as RegistrationRequest | null;
};

export const updateRegistrationRequestStatus = async (
  id: string, new_status: string, remark: string
) => {
  const { data, error } = await supabaseAdmin
    .from('registration_request')
    .update({ status: new_status, remark, })
    .eq('id', id)
    .select('*')
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error('Request not found');
  return data as RegistrationRequest;
};
