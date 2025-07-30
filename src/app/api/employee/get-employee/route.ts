import { NextResponse } from 'next/server';
import supabase from '@/app/lib/supabase/client';

// GET:
export async function GET() {
  try {
    console.log('Fetching employees from Supabase...');
    
    const { data, error } = await supabase
      .from('employee')
      .select('*')
      .eq('isActive', true);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log('Employees fetched successfully:', data?.length || 0);
    // यहां हम यह मान रहे हैं कि आपके डेटाबेस में 'role' फील्ड है
    // अगर नहीं है, तो आपको इसे अपने डेटाबेस में जोड़ना होगा
    return NextResponse.json({ success: true, staff: data ?? [] }, { status: 200 });

  } catch (err) {
    console.error('Server error:', err);
    return NextResponse.json(
      { success: false, error: `Internal Server Error: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }
}