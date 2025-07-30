// import { hashPassword, comparePassword } from '@/app/lib/test/auth/bcrypt';
// import { generateAccessToken, generateRefreshToken } from '@/app/lib/test/auth/jwt';
import { CreateEmployeeData } from '@/app/lib/types';
import { checkEmployeeExists, createEmployee } from '@/app/lib/database/queries/employees';
import { createEmployeeSchema } from '../lib/validation/schemas/employee';

export const registerEmployee = async (employeeData: CreateEmployeeData) => {
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

  // Create employee (no password for employees in this case)
  const newEmployee = await createEmployee(value);

  return {
    employee: newEmployee,
  };
};

// export const loginEmployee = async (identifier: string, password: string) => {
//   // For now, since employees don't have passwords in your current schema,
//   // you might want to modify this based on your requirements

//   // Find employee by email or mobile
//   const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
//   const employee = isEmail
//     ? await findEmployeeByEmail(identifier)
//     : await findEmployeeByMobile(identifier);

//   if (!employee || !employee.isActive) {
//     throw new Error('Invalid credentials or inactive employee');
//   }

//   // Generate tokens
//   const accessToken = generateAccessToken({
//     id: employee.id,
//     email: employee.email,
//     name: employee.name,
//     role: employee.role,
//     isActive: employee.isActive,
//   });

//   const refreshToken = generateRefreshToken(employee.id);

//   return {
//     employee,
//     accessToken,
//     refreshToken,
//   };
// };
