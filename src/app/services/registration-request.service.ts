/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createRegistrationRequest,
  getRegistrationRequests,
  getRegistrationRequestById,
  updateRegistrationRequestStatus
} from '../lib/database/queries/registration-requests';
import { addRequestStatusHistory } from '../lib/database/queries/request-status-history';
import supabase from '../lib/database/supabase';

export const handleCreateRequest = async (data: any, userId?: string) => {
  // Optionally attach created_by
  return await createRegistrationRequest({ ...data, created_by: userId });
};

export const handleGetRequests = async () => getRegistrationRequests();

export const handleGetRequestById = async (id: string) => getRegistrationRequestById(id);

export const handleStatusChange = async ({
  id,
  new_status,
  remark,
  userId,
}: { id: string; new_status: string; remark: string; userId: string }) => {
  // 1. Fetch old status
  const request = await getRegistrationRequestById(id);
  if (!request) throw new Error('Request not found');

  // 2. Update status
  const updatedRequest = await updateRegistrationRequestStatus(id, new_status, remark);

  // 3. Write audit history
  await addRequestStatusHistory({
    request_id: id,
    changed_by: userId,
    old_status: request.status,
    new_status,
    remark: remark,
  });

  return updatedRequest;
};

export const findPendingRegistrationRequest = async (email: string, mobile_no?: string) => {
  let query = supabase
    .from('registration_request')
    .select('id, status')
    .eq('email', email)
    .or(`status.eq.pending,status.eq.follow-up`); // Only check for requests not final

  if (mobile_no) {
    query = query.or(`mobile_no.eq.${mobile_no}`);
  }

  const { data, error } = await query.limit(1);
  if (error) throw new Error(error.message);
  return data && data.length > 0 ? data[0] : null;
};
