import { errorResponse, notFoundResponse, successResponse } from '@/app/lib/utils/api-response';
import { removeEmployee } from '@/app/services/employee.service';
import { NextRequest } from 'next/server';
// import { removeEmployee } from '@/app/test/services/employee.service';
// import { successResponse, errorResponse, notFoundResponse } from '@/app/lib/test/utils/api-response';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return errorResponse('Employee ID is required', 400);
    }

    console.log('Deleting employee with ID:', id);

    const employee = await removeEmployee(id);

    return successResponse(employee, 'Employee deactivated successfully');
  } catch (error) {
    console.error('Delete employee error:', error);

    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return notFoundResponse('Employee not found');
      }
    }

    return errorResponse(
      error instanceof Error ? error.message : 'Failed to deactivate employee',
      400
    );
  }
}
