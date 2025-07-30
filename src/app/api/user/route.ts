import { NextRequest } from 'next/server';
import { errorResponse, successResponse } from '@/app/lib/utils/api-response';
import { withValidation } from '@/app/lib/api/withValidation';
import { getUserFromRequest } from '@/app/lib/api/auth-middleware';
import { addUser, getUsers } from '@/app/services/user.service';
import { userCreateSchema } from '@/app/lib/validation/schemas/user';

export async function GET(request: NextRequest) {
  console.log('my--check')
  const user = await getUserFromRequest(request, { required: true });
  // If employee, exclude admin records.
  const users = await getUsers({ excludeAdmins: !user.is_admin });
  return successResponse(users, 'Users fetched');
}

export async function POST(request: NextRequest) {
  const user = await getUserFromRequest(request, { required: true });
  console.log(user, "get user for post")
  if (!user.is_admin) return errorResponse('Forbidden', 403);
  const valOrRes = await withValidation(request, userCreateSchema);
  if (valOrRes instanceof Response) return valOrRes;
  try {
    const added = await addUser(valOrRes, user.id);
    return successResponse(added, 'User created', 201);
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : String(e), 400);
  }
}
