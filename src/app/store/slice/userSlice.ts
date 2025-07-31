/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getTokenFromLocalStorage } from "./authSlice"
import type { User, UserStatusHistory } from "@/app/lib/types"

interface UsersState {
  users: User[]
  currentUser: User | null
  loading: boolean
  error: string | null
  page: number
  pageSize: number
  total: number
  statusHistory: UserStatusHistory[]
  statusLoading: boolean
  searchQuery: string
  filteredUsers: User[]
  historyLoading: boolean
  createLoading: boolean
  updateLoading: boolean
  deleteLoading: boolean
}

// Fetch all users
export const fetchUsers = createAsyncThunk<User[], void>("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const token = getTokenFromLocalStorage()
    const res = await fetch("/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
    const json = await res.json()
    if (!json.success) return rejectWithValue(json.error || "Fetch failed")
    return json.data
  } catch (error) {
    console.log("error in fetch users", error)
    return rejectWithValue("Network error")
  }
})

// Fetch single user
export const fetchSingleUser = createAsyncThunk<User, string>(
  "users/fetchSingle",
  async (userId, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage()
      const res = await fetch(`/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!json.success) return rejectWithValue(json.error || "Fetch failed")
      return json.data
    } catch (error) {

      console.log("error in fetchsingleusers", error)
      return rejectWithValue("Network error")
    }
  },
)

// Create user
export const createUser = createAsyncThunk<User, any>("users/create", async (userData, { rejectWithValue }) => {
  try {
    const token = getTokenFromLocalStorage()
    console.log(token, "create user check token=====>>>>>>>>>>>>")
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    const json = await res.json()
    console.log(json, "json data check")
    if (!json.success) return rejectWithValue(json.error || json.errors?.[0] || "Create failed")
    return json.data
  } catch (error) {

    console.log("error in create user", error)
    return rejectWithValue("Network error")
  }
})

// Update user
// Update user
export const updateUser = createAsyncThunk<User, { userId: string; userData: any }>(
  "users/update",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage()
      console.log("🔄 Redux: Updating user", { userId, userData, token: token ? "present" : "missing" })

      const res = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      console.log("🔄 Redux: Response status", res.status)
      const json = await res.json()
      console.log("🔄 Redux: Response data", json)

      if (!json.success) return rejectWithValue(json.error || json.errors?.[0] || "Update failed")
      return json.data
    } catch (error) {
      console.error("🔄 Redux: Network error", error)
      return rejectWithValue("Network error")
    }
  },
)

// Delete user
export const deleteUser = createAsyncThunk<string, string>("users/delete", async (userId, { rejectWithValue }) => {
  try {
    const token = getTokenFromLocalStorage()
    const res = await fetch(`/api/user/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    const json = await res.json()
    if (!json.success) return rejectWithValue(json.error || "Delete failed")
    return userId
  } catch (error) {

    console.log("error in delete user", error)
    return rejectWithValue("Network error")
  }
})

// Update user status - Fixed to match the API
export const updateUserStatus = createAsyncThunk<User, { userId: string; new_status: string; remark: string }>(
  "users/updateStatus",
  async ({ userId, new_status, remark }, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage()
      const res = await fetch(`/api/user/${userId}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_status, remark }),
      })
      const json = await res.json()
      if (!json.success) return rejectWithValue(json.error || "Status update failed")
      return json.data
    } catch (error) {

      console.log("error in update user", error)
      return rejectWithValue("Network error")
    }
  },
)

// Fetch user status history
export const fetchUserStatusHistory = createAsyncThunk<UserStatusHistory[], string>(
  "users/fetchStatusHistory",
  async (userId, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage()
      const res = await fetch(`/api/user/${userId}/status-history`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!json.success) return rejectWithValue(json.error || "Fetch failed")
      return json.data
    } catch (error) {

      console.log("error in fetchStatusHistory", error)
      return rejectWithValue("Network error")
    }
  },
)

// Fetch all user status history
export const fetchAllUserStatusHistory = createAsyncThunk<UserStatusHistory[], void>(
  "users/fetchAllStatusHistory",
  async (_, { rejectWithValue }) => {
    try {
      const token = getTokenFromLocalStorage()
      const res = await fetch("/api/user-status-history", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!json.success) return rejectWithValue(json.error || "Fetch failed")
      return json.data
    } catch (error) {

      console.log("error in fetchalluserStatusHistory", error)
      return rejectWithValue("Network error")
    }
  },
)

const initialState: UsersState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  total: 0,
  statusHistory: [],
  statusLoading: false,
  searchQuery: "",
  filteredUsers: [],
  historyLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload
    },
    clearError(state) {
      state.error = null
    },
    clearCurrentUser(state) {
      state.currentUser = null
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
      // Filter users based on search query
      if (action.payload.trim() === "") {
        state.filteredUsers = state.users
      } else {
        const query = action.payload.toLowerCase()
        state.filteredUsers = state.users.filter(
          (user) =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.mobile_no.includes(query),
        )
      }
    },
    clearStatusHistory(state) {
      state.statusHistory = []
    },
    resetUserState() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (s) => {
        s.loading = true
        s.error = null
      })
      .addCase(fetchUsers.fulfilled, (s, a) => {
        s.loading = false
        s.users = a.payload
        s.total = a.payload.length
        // Apply current search filter
        if (s.searchQuery.trim() === "") {
          s.filteredUsers = a.payload
        } else {
          const query = s.searchQuery.toLowerCase()
          s.filteredUsers = a.payload.filter(
            (user) =>
              user.name.toLowerCase().includes(query) ||
              user.email.toLowerCase().includes(query) ||
              user.mobile_no.includes(query),
          )
        }
      })
      .addCase(fetchUsers.rejected, (s, a) => {
        s.loading = false
        s.error = a.payload as string
      })
      // Fetch single user
      .addCase(fetchSingleUser.pending, (s) => {
        s.loading = true
      })
      .addCase(fetchSingleUser.fulfilled, (s, a) => {
        s.loading = false
        s.currentUser = a.payload
      })
      .addCase(fetchSingleUser.rejected, (s, a) => {
        s.loading = false
        s.error = a.payload as string
      })
      // Create user
      .addCase(createUser.pending, (s) => {
        s.createLoading = true
        s.error = null
      })
      .addCase(createUser.fulfilled, (s, a) => {
        s.createLoading = false
        s.users.unshift(a.payload) // Add to beginning
        s.total += 1
        // Update filtered users if needed
        if (s.searchQuery.trim() === "") {
          s.filteredUsers = s.users
        } else {
          const query = s.searchQuery.toLowerCase()
          if (
            a.payload.name.toLowerCase().includes(query) ||
            a.payload.email.toLowerCase().includes(query) ||
            a.payload.mobile_no.includes(query)
          ) {
            s.filteredUsers.unshift(a.payload)
          }
        }
      })
      .addCase(createUser.rejected, (s, a) => {
        s.createLoading = false
        s.error = a.payload as string
      })
      // Update user
      .addCase(updateUser.pending, (s) => {
        s.updateLoading = true
        s.error = null
      })
      .addCase(updateUser.fulfilled, (s, a) => {
        s.updateLoading = false
        const index = s.users.findIndex((u) => u.id === a.payload.id)
        if (index !== -1) {
          s.users[index] = a.payload
        }
        const filteredIndex = s.filteredUsers.findIndex((u) => u.id === a.payload.id)
        if (filteredIndex !== -1) {
          s.filteredUsers[filteredIndex] = a.payload
        }
        if (s.currentUser?.id === a.payload.id) {
          s.currentUser = a.payload
        }
      })
      .addCase(updateUser.rejected, (s, a) => {
        s.updateLoading = false
        s.error = a.payload as string
      })
      // Delete user
      .addCase(deleteUser.pending, (s) => {
        s.deleteLoading = true
        s.error = null
      })
      .addCase(deleteUser.fulfilled, (s, a) => {
        s.deleteLoading = false
        s.users = s.users.filter((u) => u.id !== a.payload)
        s.filteredUsers = s.filteredUsers.filter((u) => u.id !== a.payload)
        s.total -= 1
        if (s.currentUser?.id === a.payload) {
          s.currentUser = null
        }
      })
      .addCase(deleteUser.rejected, (s, a) => {
        s.deleteLoading = false
        s.error = a.payload as string
      })
      // Update status
      .addCase(updateUserStatus.pending, (s) => {
        s.statusLoading = true
        s.error = null
      })
      .addCase(updateUserStatus.fulfilled, (s, a) => {
        s.statusLoading = false
        const index = s.users.findIndex((u) => u.id === a.payload.id)
        if (index !== -1) {
          s.users[index] = a.payload
        }
        const filteredIndex = s.filteredUsers.findIndex((u) => u.id === a.payload.id)
        if (filteredIndex !== -1) {
          s.filteredUsers[filteredIndex] = a.payload
        }
        if (s.currentUser?.id === a.payload.id) {
          s.currentUser = a.payload
        }
      })
      .addCase(updateUserStatus.rejected, (s, a) => {
        s.statusLoading = false
        s.error = a.payload as string
      })
      // Fetch user status history
      .addCase(fetchUserStatusHistory.pending, (s) => {
        s.historyLoading = true
        s.error = null
      })
      .addCase(fetchUserStatusHistory.fulfilled, (s, a) => {
        s.historyLoading = false
        s.statusHistory = a.payload
      })
      .addCase(fetchUserStatusHistory.rejected, (s, a) => {
        s.historyLoading = false
        s.error = a.payload as string
      })
      // Fetch all user status history
      .addCase(fetchAllUserStatusHistory.pending, (s) => {
        s.loading = true
      })
      .addCase(fetchAllUserStatusHistory.fulfilled, (s, a) => {
        s.loading = false
        s.statusHistory = a.payload
      })
      .addCase(fetchAllUserStatusHistory.rejected, (s, a) => {
        s.loading = false
        s.error = a.payload as string
      })
  },
})

export const { setPage, clearError, clearCurrentUser, setSearchQuery, clearStatusHistory, resetUserState } =
  userSlice.actions
export default userSlice.reducer
