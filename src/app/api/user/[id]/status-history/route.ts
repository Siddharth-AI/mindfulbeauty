import { getUserFromRequest } from "@/app/lib/api/auth-middleware"
import { errorResponse, successResponse } from "@/app/lib/utils/api-response"
import { getUserStatusHistory } from "@/app/lib/database/queries/users"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await getUserFromRequest(request, { required: true })
    const history = await getUserStatusHistory(params.id)
    return successResponse(history, "User status history fetched successfully")
  } catch (error) {
    console.error("Fetch user status history error:", error)
    return errorResponse(error instanceof Error ? error.message : "Failed to fetch status history", 400)
  }
}
