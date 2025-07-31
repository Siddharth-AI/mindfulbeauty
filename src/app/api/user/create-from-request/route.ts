import { getUserFromRequest } from "@/app/lib/api/auth-middleware"
import { errorResponse, successResponse } from "@/app/lib/utils/api-response"
import { createUserFromRequest } from "@/app/lib/database/queries/users"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request, { required: true })
    if (!user?.is_admin) return errorResponse("Forbidden", 403)

    const body = await request.json()
    const { requestData } = body

    if (!requestData) {
      return errorResponse("Request data is required", 400)
    }

    const newUser = await createUserFromRequest(requestData, user.id)
    return successResponse(newUser, "User created from request successfully", 201)
  } catch (error) {
    console.error("Create user from request error:", error)
    return errorResponse(error instanceof Error ? error.message : "Failed to create user from request", 400)
  }
}
