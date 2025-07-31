import { getUserFromRequest } from '@/app/lib/api/auth-middleware';
import { withValidation } from '@/app/lib/api/withValidation';
import { errorResponse, successResponse } from '@/app/lib/utils/api-response';
import { createRegistrationRequestSchema } from '@/app/lib/validation/schemas/registration-request';
import { findPendingRegistrationRequest, handleCreateRequest, handleGetRequests } from '@/app/services/registration-request.service';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {

  const validOrErr = await withValidation(request, createRegistrationRequestSchema);
  const duplicate = await findPendingRegistrationRequest(
    validOrErr.email,
    validOrErr.mobile_no || ''
  );
  if (duplicate) {
    return errorResponse('Already requested with this email or mobile number', 409);
  }
  if (validOrErr instanceof Response) return validOrErr;
  try {
    const user = await getUserFromRequest(request);

    const result = await handleCreateRequest(validOrErr, user?.id);
    return successResponse(result, 'Registration request submitted', 201);
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : String(e), 400);
  }
}

export async function GET(request: NextRequest) {
  try {
    await getUserFromRequest(request, { required: true }); // only allow logged-in
    const data = await handleGetRequests();
    return successResponse(data, 'Registration requests fetched');
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : String(e), 403);
  }
}
