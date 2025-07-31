import { getUserFromRequest } from "@/app/lib/api/auth-middleware"
import { errorResponse, successResponse } from "@/app/lib/utils/api-response"
import { getAllUserStatusHistory } from "@/app/lib/database/queries/users"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request, { required: true })
    if (!user?.is_admin) return errorResponse("Forbidden", 403)

    const history = await getAllUserStatusHistory()
    return successResponse(history, "All user status history fetched successfully")
  } catch (error) {
    console.error("Fetch all user status history error:", error)
    return errorResponse(error instanceof Error ? error.message : "Failed to fetch status history", 400)
  }
}
