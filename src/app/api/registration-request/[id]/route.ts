import { getUserFromRequest } from '@/app/lib/api/auth-middleware';
import { errorResponse, successResponse } from '@/app/lib/utils/api-response';
import { handleGetRequestById } from '@/app/services/registration-request.service';
import { NextRequest } from 'next/server';


export async function GET(request: NextRequest, { params }) {
  try {
    await getUserFromRequest(request, { required: true });
    const req = await handleGetRequestById(params.id);
    if (!req) return errorResponse('Registration request not found', 404);
    return successResponse(req, 'Registration request fetched');
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : String(e), 403);
  }
}
