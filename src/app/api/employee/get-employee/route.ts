import { NextResponse } from 'next/server';
import supabase from '@/app/lib/supabase/client';

// GET:
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('employee')
      .select('*')
      .eq('isActive', true);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, staff: data ?? [] }, { status: 200 });

  } catch (err) {
    return NextResponse.json(
      { error: `Internal Server Error: ${err instanceof Error ? err.message : err}` },
      { status: 500 }
    );
  }
}