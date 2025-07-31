/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getTokenFromLocalStorage } from "./authSlice"
import type { RegistrationRequest } from "@/app/lib/types"

interface ReqState {
  requests: RegistrationRequest[]
  currentRequest: RegistrationRequest | null
  loading: boolean
  error: string | null
  page: number
  pageSize: number
  total: number
  statusHistory: any[]
  statusLoading: boolean
  searchQuery: string
  filteredRequests: RegistrationRequest[]
  createLoading: boolean
  updateLoading: boolean
  deleteLoading: boolean
  historyLoading: boolean
}

// Create registration request
export const createRegistrationRequest = createAsyncThunk<RegistrationRequest, any>(
  "requests/create",
  async (requestData, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage()
      const res = await fetch("/api/registration-request", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
      const json = await res.json()
      if (!json.success) return rejectWithValue(json.error || json.errors?.[0] || "Create failed")
      return json.data
    } catch (error) {
      return rejectWithValue("Network error")
    }
  },
)

// Fetch all requests
export const fetchRequests = createAsyncThunk<RegistrationRequest[], void>(
  "requests/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage()
      const res = await fetch("/api/registration-request", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!json.success) return rejectWithValue(json.error || "Fetch failed")
      return json.data
    } catch (error) {
      return rejectWithValue("Network error")
    }
  },
)

// Fetch single request
export const fetchSingleRequest = createAsyncThunk<RegistrationRequest, string>(
  "requests/fetchSingle",
  async (requestId, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage()
      const res = await fetch(`/api/registration-request/${requestId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!json.success) return rejectWithValue(json.error || "Fetch failed")
      return json.data
    } catch (error) {
      return rejectWithValue("Network error")
    }
  },
)

// Update request status
export const updateRequestStatus = createAsyncThunk(
  "requests/updateStatus",
  async (
    { requestId, new_status, remark }: { requestId: string; new_status: string; remark: string },
    { rejectWithValue },
  ) => {
    try {
      const token = getTokenFromLocalStorage()
      const res = await fetch(`/api/registration-request/${requestId}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_status, remark }),
      })
      const json = await res.json()
      if (!json.success) return rejectWithValue(json.error || "Update failed")
      return json.data
    } catch (error) {
      return rejectWithValue("Network error")
    }
  },
)

// Delete request
export const deleteRequest = createAsyncThunk<string, string>(
  "requests/delete",
  async (requestId, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage()
      const res = await fetch(`/api/registration-request/${requestId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!json.success) return rejectWithValue(json.error || "Delete failed")
      return requestId
    } catch (error) {
      return rejectWithValue("Network error")
    }
  },
)

// Fetch status history
export const fetchStatusHistory = createAsyncThunk<any[], string>(
  "requests/fetchHistory",
  async (requestId, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage()
      const res = await fetch(`/api/request-status-history/${requestId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!json.success) return rejectWithValue(json.error || "Fetch failed")
      return json.data
    } catch (error) {

      console.log("error in fetchstatusHistory", error)
      return rejectWithValue("Network error")
    }
  },
)

// Fetch complete history
export const fetchCompleteHistory = createAsyncThunk<any[], string>(
  "requests/fetchCompleteHistory",
  async (requestId, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage()
      const res = await fetch(`/api/registration-request/${requestId}/complete-history`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!json.success) return rejectWithValue(json.error || "Fetch failed")
      return json.data
    } catch (error) {
      return rejectWithValue("Network error")
    }
  },
)

const initialState: ReqState = {
  requests: [],
  currentRequest: null,
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  total: 0,
  statusHistory: [],
  statusLoading: false,
  searchQuery: "",
  filteredRequests: [],
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  historyLoading: false,
}

const requestSlice = createSlice({
  name: "registrationRequest",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload
    },
    clearError(state) {
      state.error = null
    },
    clearCurrentRequest(state) {
      state.currentRequest = null
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
      // Filter requests based on search query
      if (action.payload.trim() === "") {
        state.filteredRequests = state.requests
      } else {
        const query = action.payload.toLowerCase()
        state.filteredRequests = state.requests.filter(
          (request) =>
            request.name.toLowerCase().includes(query) ||
            request.email.toLowerCase().includes(query) ||
            (request.mobile_no && request.mobile_no.includes(query)),
        )
      }
    },
    clearStatusHistory(state) {
      state.statusHistory = []
    },
    resetRequestState(state) {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      // Create request
      .addCase(createRegistrationRequest.pending, (s) => {
        s.createLoading = true
        s.error = null
      })
      .addCase(createRegistrationRequest.fulfilled, (s, a) => {
        s.createLoading = false
        s.requests.unshift(a.payload)
        s.total += 1
        // Update filtered requests
        if (s.searchQuery.trim() === "") {
          s.filteredRequests = s.requests
        } else {
          const query = s.searchQuery.toLowerCase()
          if (
            a.payload.name.toLowerCase().includes(query) ||
            a.payload.email.toLowerCase().includes(query) ||
            (a.payload.mobile_no && a.payload.mobile_no.includes(query))
          ) {
            s.filteredRequests.unshift(a.payload)
          }
        }
      })
      .addCase(createRegistrationRequest.rejected, (s, a) => {
        s.createLoading = false
        s.error = a.payload as string
      })
      // Fetch all requests
      .addCase(fetchRequests.pending, (s) => {
        s.loading = true
        s.error = null
      })
      .addCase(fetchRequests.fulfilled, (s, a) => {
        s.loading = false
        s.requests = a.payload
        s.total = a.payload.length
        // Apply current search filter
        if (s.searchQuery.trim() === "") {
          s.filteredRequests = a.payload
        } else {
          const query = s.searchQuery.toLowerCase()
          s.filteredRequests = a.payload.filter(
            (request) =>
              request.name.toLowerCase().includes(query) ||
              request.email.toLowerCase().includes(query) ||
              (request.mobile_no && request.mobile_no.includes(query)),
          )
        }
      })
      .addCase(fetchRequests.rejected, (s, a) => {
        s.loading = false
        s.error = a.payload as string
      })
      // Fetch single request
      .addCase(fetchSingleRequest.pending, (s) => {
        s.loading = true
      })
      .addCase(fetchSingleRequest.fulfilled, (s, a) => {
        s.loading = false
        s.currentRequest = a.payload
      })
      .addCase(fetchSingleRequest.rejected, (s, a) => {
        s.loading = false
        s.error = a.payload as string
      })
      // Update status
      .addCase(updateRequestStatus.pending, (s) => {
        s.statusLoading = true
        s.error = null
      })
      .addCase(updateRequestStatus.fulfilled, (s, a) => {
        s.statusLoading = false
        // Update the request in the list
        const index = s.requests.findIndex((r) => r.id === a.payload.id)
        if (index !== -1) {
          s.requests[index] = a.payload
        }
        const filteredIndex = s.filteredRequests.findIndex((r) => r.id === a.payload.id)
        if (filteredIndex !== -1) {
          s.filteredRequests[filteredIndex] = a.payload
        }
        if (s.currentRequest?.id === a.payload.id) {
          s.currentRequest = a.payload
        }
      })
      .addCase(updateRequestStatus.rejected, (s, a) => {
        s.statusLoading = false
        s.error = a.payload as string
      })
      // Delete request
      .addCase(deleteRequest.pending, (s) => {
        s.deleteLoading = true
      })
      .addCase(deleteRequest.fulfilled, (s, a) => {
        s.deleteLoading = false
        s.requests = s.requests.filter((r) => r.id !== a.payload)
        s.filteredRequests = s.filteredRequests.filter((r) => r.id !== a.payload)
        s.total -= 1
        if (s.currentRequest?.id === a.payload) {
          s.currentRequest = null
        }
      })
      .addCase(deleteRequest.rejected, (s, a) => {
        s.deleteLoading = false
        s.error = a.payload as string
      })
      // Fetch history
      .addCase(fetchStatusHistory.pending, (s) => {
        s.historyLoading = true
      })
      .addCase(fetchStatusHistory.fulfilled, (s, a) => {
        s.historyLoading = false
        s.statusHistory = a.payload
      })
      .addCase(fetchStatusHistory.rejected, (s, a) => {
        s.historyLoading = false
        s.error = a.payload as string
      })
      // Fetch complete history
      .addCase(fetchCompleteHistory.pending, (s) => {
        s.historyLoading = true
      })
      .addCase(fetchCompleteHistory.fulfilled, (s, a) => {
        s.historyLoading = false
        s.statusHistory = a.payload
      })
      .addCase(fetchCompleteHistory.rejected, (s, a) => {
        s.historyLoading = false
        s.error = a.payload as string
      })
  },
})

export const { setPage, clearError, clearCurrentRequest, setSearchQuery, clearStatusHistory, resetRequestState } =
  requestSlice.actions
export default requestSlice.reducer
