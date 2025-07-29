import { NextResponse } from 'next/server';
import supabase from '@/app/lib/supabase/client';

import {
  updateEmployeeSchema,
} from '@/app/lib/validation/employee';


// PATCH: Update
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { error, value } = updateEmployeeSchema.validate(body, { abortEarly: false });

    if (error)
      return NextResponse.json({ errors: error.details.map(e => e.message) }, { status: 400 });

    const { id, ...updateData } = value;
    const { data, error: supabaseError } = await supabase
      .from('employee')
      .update(updateData)
      .eq('id', id).select();

    if (supabaseError)
      return NextResponse.json({ error: supabaseError.message }, { status: 500 });

    return NextResponse.json({ success: true, message: 'Employee updated', data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}


