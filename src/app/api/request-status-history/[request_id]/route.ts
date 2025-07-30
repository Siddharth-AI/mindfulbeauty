import { getUserFromRequest } from '@/app/lib/api/auth-middleware';
import { getRequestStatusHistory } from '@/app/lib/database/queries/request-status-history';
import { errorResponse, successResponse } from '@/app/lib/utils/api-response';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }) {
  try {
    await getUserFromRequest(request, { required: true });
    const data = await getRequestStatusHistory(params.request_id);
    return successResponse(data, 'History fetched');
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : String(e), 403);
  }
}
