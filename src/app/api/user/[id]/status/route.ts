import { getUserFromRequest } from '@/app/lib/api/auth-middleware';
import { withValidation } from '@/app/lib/api/withValidation';
import { logUserStatusHistory } from '@/app/lib/database/queries/request-status-history';
import { errorResponse, successResponse } from '@/app/lib/utils/api-response';
import { patchUserStatusSchema } from '@/app/lib/validation/schemas/user';
import { getUserById, updateUserStatus } from '@/app/services/user.service';
import { NextRequest } from 'next/server';

export async function PATCH(request: NextRequest, { params }) {
  const user = await getUserFromRequest(request, { required: true });
  const valOrRes = await withValidation(request, patchUserStatusSchema);
  if (valOrRes instanceof Response) return valOrRes;
  try {
    const { new_status, remark } = valOrRes;
    const oldUser = await getUserById(params.id);
    if (!oldUser) return errorResponse('User not found', 404);

    await updateUserStatus(params.id, new_status, user.id);
    await logUserStatusHistory({
      user_id: params.id,
      changed_by: user.id,
      old_status: oldUser.is_active ? 'active' : 'inactive',
      new_status,
      remark,
    });
    return successResponse(null, 'Status updated and logged');
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : String(e), 400);
  }
}
