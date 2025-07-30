/* eslint-disable @typescript-eslint/no-unused-vars */
import { createEmployeeSchema, updateEmployeeSchema, deleteEmployeeSchema, getEmployeeSchema } from '@/app/lib/validation/schemas/employee';
import {
  getAllActiveEmployees,
  findEmployeeById,
  createEmployee,
  updateEmployee,
  softDeleteEmployee,
  checkEmployeeExists
} from '@/app/lib/database/queries/employees';
import { CreateEmployeeData, UpdateEmployeeData } from '@/app/lib/types';

export const getEmployees = async () => {
  return await getAllActiveEmployees();
};

export const getEmployeeById = async (id: string) => {
  // Validate input
  const { error } = getEmployeeSchema.validate({ id });
  if (error) {
    throw new Error(error.details.map(d => d.message).join(', '));
  }

  return await findEmployeeById(id);
};

export const addEmployee = async (employeeData: CreateEmployeeData) => {
  // Validate input
  const { error, value } = createEmployeeSchema.validate(employeeData);
  if (error) {
    throw new Error(error.details.map(d => d.message).join(', '));
  }

  // Check if employee exists
  const { emailExists, mobileExists } = await checkEmployeeExists(
    value.email,
    value.mobile_no
  );

  if (emailExists) {
    throw new Error('Email is already registered');
  }
  if (mobileExists) {
    throw new Error('Mobile number is already registered');
  }

  // Create employee
  return await createEmployee(value);
};

export const editEmployee = async (id: string, updateData: UpdateEmployeeData) => {
  try {
    // Validate input - combine id with updateData for validation
    const validationData = { id, ...updateData };
    console.log(validationData, "this is validation data")
    const { error, value } = updateEmployeeSchema.validate(validationData);

    if (error) {
      throw new Error(error.details.map(d => d.message).join(', '));
    }

    // Check if employee exists with new email/mobile (excluding current employee)
    if (value.email || value.mobile_no) {
      const { emailExists, mobileExists } = await checkEmployeeExists(
        value.email || '',
        value.mobile_no || '',
        id
      );

      if (value.email && emailExists) {
        throw new Error('Email is already registered by another employee');
      }
      if (value.mobile_no && mobileExists) {
        throw new Error('Mobile number is already registered by another employee');
      }
    }

    // Remove id from update data before passing to database function
    const { id: _, ...dataToUpdate } = value;
    // const { id, ...updateData } = value;
    console.log('=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Service: Updating employee:', id, 'with data:', dataToUpdate);

    return await updateEmployee(id, dataToUpdate);
  } catch (error) {
    console.error('Edit employee service error:', error);
    throw error;
  }
};

export const removeEmployee = async (id: string) => {
  // Validate input
  const { error } = deleteEmployeeSchema.validate({ id });
  if (error) {
    throw new Error(error.details.map(d => d.message).join(', '));
  }

  return await softDeleteEmployee(id);
};
