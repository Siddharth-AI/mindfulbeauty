import { getUserFromRequest } from '@/app/lib/api/auth-middleware';
import { withValidation } from '@/app/lib/api/withValidation';
import { errorResponse, successResponse } from '@/app/lib/utils/api-response';
import { userEditSchema } from '@/app/lib/validation/schemas/user';
import { editUser, getUserById, softDeleteUser } from '@/app/services/user.service';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }) {
  const user = await getUserFromRequest(request, { required: true });
  // Employee can access only self; admin can access any.
  if (!user.is_admin && user.id !== params.id) return errorResponse('Forbidden', 403);
  const dbUser = await getUserById(params.id);
  if (!dbUser) return errorResponse('User not found', 404);
  return successResponse(dbUser, 'User fetched');
}

export async function PUT(request: NextRequest, { params }) {
  const user = await getUserFromRequest(request, { required: true });
  if (!user.is_admin && user.id !== params.id) return errorResponse('Forbidden', 403);
  const valOrRes = await withValidation(request, userEditSchema);
  if (valOrRes instanceof Response) return valOrRes;
  try {
    const updated = await editUser(params.id, valOrRes, user.id);
    return successResponse(updated, 'User updated');
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : String(e), 400);
  }
}

export async function DELETE(request: NextRequest, { params }) {
  const user = await getUserFromRequest(request, { required: true });
  if (!user.is_admin) return errorResponse('Forbidden', 403);
  try {
    await softDeleteUser(params.id, user.id);
    return successResponse(null, 'User soft deleted');
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : String(e), 400);
  }
}
