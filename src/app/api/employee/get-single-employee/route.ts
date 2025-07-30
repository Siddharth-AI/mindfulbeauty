import { errorResponse, notFoundResponse, successResponse } from '@/app/lib/utils/api-response';
import { getEmployeeById } from '@/app/services/employee.service';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return errorResponse('Employee ID is required', 400);
    }

    const employee = await getEmployeeById(id);

    if (!employee) {
      return notFoundResponse('Employee not found');
    }

    return successResponse(employee, 'Employee fetched successfully');
  } catch (error) {
    console.error('Get employee error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Failed to fetch employee',
      500
    );
  }
}
