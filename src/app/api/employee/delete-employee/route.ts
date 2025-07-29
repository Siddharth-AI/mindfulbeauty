import { NextResponse } from 'next/server';
import supabase from '@/app/lib/supabase/client';

import {
  deleteEmployeeQuerySchema
} from '@/app/lib/validation/employee';


// DELETE: Soft-delete (via query param)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const { error } = deleteEmployeeQuerySchema.validate({ id });

    if (error)
      return NextResponse.json({ errors: error.details.map(e => e.message) }, { status: 400 });

    const { data, error: supabaseError } = await supabase
      .from('employee')
      .update({ isActive: false })
      .eq('id', id).select();

    if (supabaseError)
      return NextResponse.json({ error: supabaseError.message }, { status: 500 });

    return NextResponse.json({ success: true, message: 'Employee deactivated', data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

