import { errorResponse, successResponse } from '@/app/lib/utils/api-response';
import { registerEmployee } from '@/app/services/employee-auth.service';
import { NextRequest } from 'next/server';

// POST: Create new employee
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('API: Creating employee with body:', { ...body, password: body.password ? '***' : 'N/A' });

    if (!body.name || !body.location || !body.email || !body.mobile_no || !body.role) {
      return errorResponse('All required fields must be provided (name, location, email, mobile_no, role)', 400);
    }

    const employee = await registerEmployee(body);

    return successResponse(
      employee,
      'Employee created successfully',
      201
    );
  } catch (error) {
    console.error('API: Create employee error:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('already registered')) {
        return errorResponse(error.message, 409); // Conflict
      }
      if (error.message.includes('validation') || error.message.includes('required')) {
        return errorResponse(error.message, 400); // Bad Request
      }
    }

    return errorResponse(
      error instanceof Error ? error.message : 'Failed to create employee',
      500
    );
  }
}
