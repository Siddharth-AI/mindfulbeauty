import { getUserFromRequest } from "@/app/lib/api/auth-middleware"
import { errorResponse, successResponse } from "@/app/lib/utils/api-response"
import { supabase } from "@/app/lib/database/supabase"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await getUserFromRequest(request, { required: true })

    // Get complete history for a registration request, including linked user history
    const { data, error } = await supabase
      .from("request_status_history")
      .select(`
        *,
        changed_by_user:changed_by(name, email),
        user:user_id(id, name, email, status)
      `)
      .eq("request_id", params.id)
      .order("created_at", { ascending: false })

    if (error) throw new Error(error.message)

    return successResponse(data, "Complete request history fetched successfully")
  } catch (error) {
    console.error("Fetch complete request history error:", error)
    return errorResponse(error instanceof Error ? error.message : "Failed to fetch complete history", 400)
  }
}
