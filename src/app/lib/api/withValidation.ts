import { NextRequest, NextResponse } from 'next/server';
import { Schema } from 'joi';

export async function withValidation(req: NextRequest, schema: Schema) {
  const data = await req.json();
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    return NextResponse.json({
      errors: error.details.map((e) => e.message)
    }, { status: 400 });
  }
  return value;
}
