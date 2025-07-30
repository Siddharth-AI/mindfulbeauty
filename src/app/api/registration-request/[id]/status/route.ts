import { getUserFromRequest } from '@/app/lib/api/auth-middleware';
import { withValidation } from '@/app/lib/api/withValidation';
import { errorResponse, successResponse } from '@/app/lib/utils/api-response';
import { updateRequestStatusSchema } from '@/app/lib/validation/schemas/registration-request';
import { handleStatusChange } from '@/app/services/registration-request.service';
import { NextRequest } from 'next/server';


export async function PATCH(request: NextRequest, { params }) {
  // Permission: only admin or employee (attach RBAC check as needed)
  const user = await getUserFromRequest(request, { required: true });
  const validOrRes = await withValidation(request, updateRequestStatusSchema);
  if (validOrRes instanceof Response) return validOrRes;
  console.log(user, "for patch=>>>>>>>>>")

  try {
    const updated = await handleStatusChange({
      id: params.id,
      new_status: validOrRes.new_status,
      remark: validOrRes.remark,
      userId: user.id,
    });
    return successResponse(updated, 'Status updated and logged');
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : String(e), 400);
  }
}
