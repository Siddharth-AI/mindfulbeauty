import { errorResponse, successResponse } from "@/app/lib/utils/api-response"
import { checkUserExistsInBothTables } from "@/app/lib/database/queries/users"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, mobile_no } = body

    if (!email || !mobile_no) {
      return errorResponse("Email and mobile number are required", 400)
    }

    const result = await checkUserExistsInBothTables(email, mobile_no)
    return successResponse(result, "Existence check completed")
  } catch (error) {
    console.error("Check existence error:", error)
    return errorResponse(error instanceof Error ? error.message : "Check failed", 400)
  }
}
