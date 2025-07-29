import supabase from "@/app/lib/supabase/client";
import { NextResponse } from "next/server";

import { createEmployeeSchema } from "@/app/lib/validation/employee";

// POST: Create employee
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { error, value } = createEmployeeSchema.validate(body, {
      abortEarly: false,
    });

    if (error)
      return NextResponse.json(
        { errors: error.details.map((e) => e.message) },
        { status: 400 }
      );

    // Check if user already exists
    const { data: existingUser, error: existingError } = await supabase
      .from("employee")
      .select("id,email,mobile_no")
      .or(
        `email.eq.${value.email.toLowerCase()},mobile_no.eq.${value.mobile_no}`
      )
      .maybeSingle();

    if (existingError) {
      return NextResponse.json(
        { existingError: existingError.message },
        { status: 500 }
      );
    }

    if (existingUser) {
      const emailExists =
        existingUser.email?.toLowerCase() === value.email.toLowerCase();
      const mobile_no = existingUser.mobile_no === value.mobile_no;
      if (emailExists) {
        return NextResponse.json(
          { success: false, error: "Email is already registered." },
          { status: 400 }
        );
      } else if (mobile_no) {
        return NextResponse.json(
          { success: false, error: "Mobile number is already registered." },
          { status: 400 }
        );
      }
    }

    // Insert new employee
    const { data, error: supabaseError } = await supabase
      .from("employee")
      .insert({ ...value, isActive: true })
      .select();

    console.log(data, "create staff");
    if (supabaseError)
      return NextResponse.json(
        { supabaseError: supabaseError.message },
        { status: 500 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "Employee created successfully",
        employee: data?.[0],
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
