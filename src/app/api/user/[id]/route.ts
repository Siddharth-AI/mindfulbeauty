import { getUserFromRequest } from "@/app/lib/api/auth-middleware"
// import { withValidation } from "@/app/lib/api/withValidation"
import { errorResponse, successResponse } from "@/app/lib/utils/api-response"
import { userEditSchema } from "@/app/lib/validation/schemas/user"
import { editUser, getUserById, softDeleteUser } from "@/app/services/user.service"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromRequest(request, { required: true })
    // Employee can access only self; admin can access any.
    if (!user?.is_admin && user?.id !== params.id) return;

    const dbUser = await getUserById(params.id)
    if (!dbUser) return errorResponse("User not found", 404)

    return successResponse(dbUser, "User fetched")
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : String(e), 403)
  }
}

// export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const user = await getUserFromRequest(request, { required: true })
//     console.log("user for put=>>>>>>>>>>>>>", user)
//     if (!user.is_admin && user.id !== params.id) return errorResponse("Forbidden", 403)

//     const valOrRes = await withValidation(request, userEditSchema)
//     console.log("=>>>>>>>>>>>>>>>>>>>>>>>>>>>>", valOrRes)
//     if (valOrRes instanceof Response) return valOrRes
//     const updated = await editUser(params.id, valOrRes, user.id)
//     return successResponse(updated, "User updated")
//   } catch (e) {
//     return errorResponse(e instanceof Error ? e.message : String(e), 400)
//   }
// }


export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("🔧 API: PUT /api/user/[id] called with ID:", params.id)

    const user = await getUserFromRequest(request, { required: true })
    console.log("🔧 API: Authenticated user:", { id: user?.id, is_admin: user?.is_admin })

    if (!user?.is_admin && user?.id !== params.id) {
      console.log("🔧 API: Forbidden - user not admin and not self")
      return errorResponse("You do not have the privilege to make this change", 403)
    }

    // Parse body first
    const body = await request.json()
    console.log("🔧 API: Request body:", body)

    // Validate the parsed body directly
    const { error, value } = userEditSchema.validate(body, { abortEarly: false })
    if (error) {
      console.log("🔧 API: Validation failed:", error.details)
      return errorResponse(error.details.map((e) => e.message).join(", "), 400)
    }

    console.log("🔧 API: Validation passed:", value)
    console.log("🔧 API: Calling editUser with:", { userId: params.id, data: value, updatedBy: user.id })

    const updated = await editUser(params.id, value, user.id)
    console.log("🔧 API: editUser result:", updated)

    return successResponse(updated, "User updated")
  } catch (e) {
    console.error("🔧 API: Error in PUT handler:", e)
    return errorResponse(e instanceof Error ? e.message : String(e), 400)
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromRequest(request, { required: true })
    if (!user?.is_admin) return errorResponse("You do not have the privilege to make this change", 403)

    await softDeleteUser(params.id, user?.id)
    return successResponse(null, "User soft deleted")
  } catch (e) {
    return errorResponse(e instanceof Error ? e.message : String(e), 400)
  }
}
