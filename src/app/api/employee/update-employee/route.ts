import { NextRequest } from 'next/server';
import { editEmployee } from '@/app/services/employee.service';
import { successResponse, errorResponse, notFoundResponse } from '@/app/lib/utils/api-response';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Update employee request body:', body);

    if (!body.id) {
      return errorResponse('Employee ID is required', 400);
    }

    const employee = await editEmployee(body.id, body);

    return successResponse(employee, 'Employee updated successfully');
  } catch (error) {
    console.error('Update employee error:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return notFoundResponse('Employee not found');
      }
      if (error.message.includes('already registered')) {
        return errorResponse(error.message, 409); // Conflict
      }
    }

    return errorResponse(
      error instanceof Error ? error.message : 'Failed to update employee',
      400
    );
  }
}

// Alternative PUT method
export async function PUT(request: NextRequest) {
  return PATCH(request);
}
