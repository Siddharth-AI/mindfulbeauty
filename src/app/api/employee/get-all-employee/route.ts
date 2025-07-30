import { errorResponse, successResponse } from '@/app/lib/utils/api-response';
import { getEmployees } from '@/app/services/employee.service';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching all employees');

    const employees = await getEmployees();

    return successResponse(
      { employees: employees, total: employees.length },
      'Employees fetched successfully'
    );
  } catch (error) {
    console.error('Get all employees error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Failed to fetch employees',
      500
    );
  }
}
