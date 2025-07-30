/* eslint-disable @typescript-eslint/no-explicit-any */

import { supabase, supabaseAdmin } from '../supabase';
import { Employee, CreateEmployeeData, UpdateEmployeeData } from '../../types/employee';
export const updateEmployee = async (id: string, updateData: UpdateEmployeeData): Promise<Employee> => {
  try {
    // First check if employee exists
    const existingEmployee = await findEmployeeById(id);
    if (!existingEmployee) {
      throw new Error('Employee not found');
    }

    const { data, error } = await supabaseAdmin
      .from('employees')
      .update(updateData)
      .eq('id', id)
      .eq('is_active', true)
      .select(`
        id,
        name,
        location,
        email,
        mobile_no,
        role,
        is_active,
        created_at,
        updated_at
      `)
      .single();

    console.log('Supabase response - Data:', data);
    console.log('Supabase response - Error:', error);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned from update');
    }

    return data as Employee;
  } catch (error) {
    console.error('=== UPDATE EMPLOYEE ERROR ===');
    console.error('Error:', error);
    throw error;
  }
};

export const findEmployeeById = async (id: string): Promise<Employee | null> => {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select(`
        id,
        name,
        location,
        email,
        mobile_no,
        role,
        is_active,
        created_at,
        updated_at
      `)
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to find employee: ${error.message}`);
    }

    return data as Employee | null;
  } catch (error) {
    console.error('Error in findEmployeeById:', error);
    throw error;
  }
};

export const getAllActiveEmployees = async (): Promise<Employee[]> => {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select(`
        id,
        name,
        location,
        email,
        mobile_no,
        role,
        is_active,
        created_at,
        updated_at
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to fetch employees: ${error.message}`);
    }

    return (data as Employee[]) || [];
  } catch (error) {
    console.error('Error in getAllActiveEmployees:', error);
    throw error;
  }
};

export const createEmployee = async (employeeData: CreateEmployeeData): Promise<Employee> => {
  try {
    const { data, error } = await supabaseAdmin
      .from('employees')
      .insert({
        name: employeeData.name,
        location: employeeData.location,
        email: employeeData.email.toLowerCase(),
        mobile_no: employeeData.mobile_no,
        role: employeeData.role,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select(`
        id,
        name,
        location,
        email,
        mobile_no,
        role,
        is_active,
        created_at,
        updated_at
      `)
      .single();

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to create employee: ${error.message}`);
    }

    return data as Employee;
  } catch (error) {
    console.error('Error in createEmployee:', error);
    throw error;
  }
};

export const softDeleteEmployee = async (id: string): Promise<Employee> => {
  try {
    console.log(id, "delete data=========>>>>>>>>>>>>>>>>>")
    const { data, error } = await supabase
      .from('employees')
      .update({
        is_active: false
      })
      .eq('id', id)
      .select(`
        id,
        name,
        location,
        email,
        mobile_no,
        role,
        is_active,
        created_at,
        updated_at
      `)
      .single();

    console.log(data, "delete data=========>>>>>>>>>>>>>>>>>")

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to delete employee: ${error.message}`);
    }

    if (!data) {
      throw new Error('Employee not found');
    }

    return data as Employee;
  } catch (error) {
    console.error('Error in softDeleteEmployee:', error);
    throw error;
  }
};

export const checkEmployeeExists = async (
  email: string,
  mobile: string,
  excludeId?: string
): Promise<{ emailExists: boolean; mobileExists: boolean }> => {
  try {
    let query = supabase
      .from('employees')
      .select('id, email, mobile_no')
      .or(`email.eq.${email.toLowerCase()},mobile_no.eq.${mobile}`)
      .eq('is_active', true);

    // Exclude current employee ID when updating
    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to check employee existence: ${error.message}`);
    }

    const emailExists = data?.some(emp => emp.email === email.toLowerCase()) || false;
    const mobileExists = data?.some(emp => emp.mobile_no === mobile) || false;

    return { emailExists, mobileExists };
  } catch (error) {
    console.error('Error in checkEmployeeExists:', error);
    throw error;
  }
};

