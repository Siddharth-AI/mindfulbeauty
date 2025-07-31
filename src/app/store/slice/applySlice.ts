/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { RegistrationRequest } from "@/app/lib/types"

interface ApplyState {
  loading: boolean
  error: string | null
  success: boolean
  message: string | null
  currentRequest: RegistrationRequest | null
  checkingExistence: boolean
  existenceCheck: {
    userExists: boolean
    requestExists: boolean
    message?: string
  } | null
}

// Check if user already exists
export const checkUserExistence = createAsyncThunk<
  { userExists: boolean; requestExists: boolean; message?: string },
  { email: string; mobile_no: string },
  { rejectValue: string }
>("apply/checkExistence", async ({ email, mobile_no }, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/registration-request/check-existence", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mobile_no }),
    })
    const data = await res.json()
    if (!res.ok || !data.success) {
      return rejectWithValue(data.error || "Check failed")
    }
    return data.data
  } catch (error) {
    return rejectWithValue("Network error")
  }
})

// Submit registration request
export const submitRegistrationRequest = createAsyncThunk<
  RegistrationRequest,
  {
    name: string
    email: string
    type: "salon" | "freelancer"
    mobile_no: string
    location: string
    remark?: string
  },
  { rejectValue: string }
>("apply/submitRequest", async (requestData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/registration-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
    const data = await res.json()
    if (!res.ok || !data.success) {
      return rejectWithValue(data.error || data.errors?.[0] || "Registration failed")
    }
    return data.data
  } catch (error) {
    return rejectWithValue("Network error")
  }
})

const initialState: ApplyState = {
  loading: false,
  error: null,
  success: false,
  message: null,
  currentRequest: null,
  checkingExistence: false,
  existenceCheck: null,
}

const applySlice = createSlice({
  name: "apply",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null
    },
    clearSuccess(state) {
      state.success = false
      state.message = null
    },
    clearExistenceCheck(state) {
      state.existenceCheck = null
    },
    resetApplyState(state) {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      // Check user existence
      .addCase(checkUserExistence.pending, (state) => {
        state.checkingExistence = true
        state.error = null
        state.existenceCheck = null
      })
      .addCase(checkUserExistence.fulfilled, (state, action) => {
        state.checkingExistence = false
        state.existenceCheck = action.payload
      })
      .addCase(checkUserExistence.rejected, (state, action) => {
        state.checkingExistence = false
        state.error = action.payload || "Check failed"
      })
      // Submit registration request
      .addCase(submitRegistrationRequest.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(submitRegistrationRequest.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.message = "Registration request submitted successfully!"
        state.currentRequest = action.payload
      })
      .addCase(submitRegistrationRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Registration failed"
      })
  },
})

export const { clearError, clearSuccess, clearExistenceCheck, resetApplyState } = applySlice.actions
export default applySlice.reducer
