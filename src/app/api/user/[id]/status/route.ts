import { getUserFromRequest } from "@/app/lib/api/auth-middleware"
import { withValidation } from "@/app/lib/api/withValidation"
import { errorResponse, successResponse } from "@/app/lib/utils/api-response"
import { changeUserStatus } from "@/app/lib/database/queries/users"
import Joi from "joi"
import type { NextRequest } from "next/server"

const updateUserStatusSchema = Joi.object({
  new_status: Joi.string().valid("pending", "approved", "active", "inactive", "suspended").required(),
  remark: Joi.string().min(2).required(),
})

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromRequest(request, { required: true })
    const validOrRes = await withValidation(request, updateUserStatusSchema)
    if (validOrRes instanceof Response) return validOrRes

    const { new_status, remark } = validOrRes

    // Use the enhanced function that handles status change and logging
    const updatedUser = await changeUserStatus(params.id, new_status, user.id, remark)

    return successResponse(updatedUser, "User status updated successfully")
  } catch (error) {
    console.error("Update user status error:", error)
    return errorResponse(error instanceof Error ? error.message : "Status update failed", 400)
  }
}
