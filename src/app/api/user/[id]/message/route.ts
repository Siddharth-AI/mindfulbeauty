import { getUserFromRequest } from '@/app/lib/api/auth-middleware';
import { getUserStatusHistory } from '@/app/lib/database/queries/request-status-history';
import { errorResponse, successResponse } from '@/app/lib/utils/api-response';
import { NextRequest } from 'next/server';
// import { getUserStatusHistory } from '@/lib/database/queries/user-status-history';
// import { successResponse, errorResponse } from '@/lib/utils/api-response';
// import { getUserFromRequest } from '@/lib/api/auth-middleware';

export async function GET(request: NextRequest, { params }) {
  try {
    await getUserFromRequest(request, { required: true });
    const data = await getUserStatusHistory(params.id, 2); // LIMIT 2
    return successResponse(data, 'Last 2 status changes fetched');
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : String(e), 403);
  }
}
