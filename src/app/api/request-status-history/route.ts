// src/app/api/request-status-history/route.ts
import { getUserFromRequest } from '@/app/lib/api/auth-middleware';
import { getAllRequestStatusHistory } from '@/app/lib/database/queries/request-status-history';
import { errorResponse, successResponse } from '@/app/lib/utils/api-response';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await getUserFromRequest(request, { required: true }); // secure the endpoint (admins/employees only)
    const data = await getAllRequestStatusHistory();
    return successResponse(data, 'All status history fetched');
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : String(e), 403);
  }
}
