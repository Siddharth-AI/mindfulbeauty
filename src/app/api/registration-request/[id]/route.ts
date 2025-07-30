import { getUserFromRequest } from "@/app/lib/api/auth-middleware"
import { errorResponse, successResponse } from "@/app/lib/utils/api-response"
import { handleGetRequestById } from "@/app/services/registration-request.service"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("Fetching request with ID:", params.id)

    await getUserFromRequest(request, { required: true })
    const req = await handleGetRequestById(params.id)

    console.log("Found request:", req)

    if (!req) {
      console.log("Request not found for ID:", params.id)
      return errorResponse("Registration request not found", 404)
    }

    return successResponse(req, "Registration request fetched")
  } catch (e) {
    console.error("Error fetching request:", e)
    return errorResponse(e instanceof Error ? e.message : String(e), 403)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromRequest(request, { required: true })
    if (!user.is_admin) return errorResponse("Forbidden", 403)

    // Add delete logic here
    // For now, just return success
    return successResponse(null, "Registration request deleted")
  } catch (e) {
    console.error("Error deleting request:", e)
    return errorResponse(e instanceof Error ? e.message : String(e), 400)
  }
}
