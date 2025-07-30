/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export const successResponse = <T>(
  data?: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> => {
  return NextResponse.json({
    success: true,
    message,
    data,
  }, { status });
};

export const errorResponse = (
  error: string,
  status: number = 400
): NextResponse<ApiResponse> => {
  return NextResponse.json({
    success: false,
    error,
  }, { status });
};

export const validationErrorResponse = (
  errors: string[],
  status: number = 400
): NextResponse<ApiResponse> => {
  return NextResponse.json({
    success: false,
    error: 'Validation failed',
    errors,
  }, { status });
};

export const unauthorizedResponse = (
  message: string = 'Unauthorized'
): NextResponse<ApiResponse> => {
  return NextResponse.json({
    success: false,
    error: message,
  }, { status: 401 });
};

export const forbiddenResponse = (
  message: string = 'Forbidden'
): NextResponse<ApiResponse> => {
  return NextResponse.json({
    success: false,
    error: message,
  }, { status: 403 });
};

export const notFoundResponse = (
  message: string = 'Resource not found'
): NextResponse<ApiResponse> => {
  return NextResponse.json({
    success: false,
    error: message,
  }, { status: 404 });
};

export const serverErrorResponse = (
  message: string = 'Internal server error'
): NextResponse<ApiResponse> => {
  return NextResponse.json({
    success: false,
    error: message,
  }, { status: 500 });
};
