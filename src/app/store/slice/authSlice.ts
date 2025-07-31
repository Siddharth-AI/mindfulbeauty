/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface User {
  id: string
  name: string
  email: string
  mobile_no: string
  address?: string | null
  city?: string | null
  profile_image?: string | null
  type: string
  is_active: boolean
  is_admin: boolean
  status: "active" | "inactive" | "pending"
  location?: string | null
  created_at: string
  updated_at: string
}

interface AuthState {
  user: User | null
  access_token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  access_token: typeof window !== "undefined" ? localStorage.getItem("access_token") : null,
  loading: false,
  error: null,
}

// Utility for extracting user/token from response
function extractAuthData(data: any): { user: User; access_token: string } {
  return {
    user: data.user,
    access_token: data.access_token,
  }
}

// Async thunk for login
export const login = createAsyncThunk<
  { user: User; access_token: string },
  { identifier: string; password: string },
  { rejectValue: string }
>("auth/login", async (values, thunkAPI) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    const data = await res.json()
    if (!res.ok || !data.success) {
      return thunkAPI.rejectWithValue(data.error || data.errors?.[0] || "Login failed")
    }
    const { user, access_token } = extractAuthData(data.data)
    // Save token immediately here so it's available instantly
    localStorage.setItem("access_token", access_token)
    return { user, access_token }
  } catch (err) {
    console.log(err, "error while login user")
    return thunkAPI.rejectWithValue("Server/network error")
  }
})

// Async thunk for logout
export const logout = createAsyncThunk<void, void, { rejectValue: string }>("auth/logout", async (_, thunkAPI) => {
  try {
    const token = getTokenFromLocalStorage()
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    if (!res.ok || !data.success) {
      return thunkAPI.rejectWithValue(data.error || "Logout failed")
    }
    // Clear localStorage
    localStorage.removeItem("access_token")
    return
  } catch (err) {
    console.log(err, "error while logout user")
    return thunkAPI.rejectWithValue("Server/network error")
  }
})

// Load user from token on app start
export const loadUserFromToken = createAsyncThunk<User | null, void, { rejectValue: string }>(
  "auth/loadUserFromToken",
  async (_, thunkAPI) => {
    try {
      const token = getTokenFromLocalStorage()
      if (!token) return null

      // Decode token to get user info (you might want to verify with backend)
      const payload = JSON.parse(atob(token.split(".")[1]))
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem("access_token")
        return null
      }

      // Return user data from token
      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        mobile_no: payload.mobile_no || "",
        type: payload.type || "user",
        is_active: payload.is_active,
        is_admin: payload.is_admin,
        status: payload.status || "active",
        created_at: "",
        updated_at: "",
      } as User
    } catch (err) {
      localStorage.removeItem("access_token")
      return thunkAPI.rejectWithValue("Invalid token")
    }
  },
)

// Utility to get token anywhere in app
export function getTokenFromLocalStorage() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("access_token")
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutFn(state) {
      state.user = null
      state.access_token = null
      state.error = null
      state.loading = false
      if (typeof window !== "undefined") localStorage.removeItem("access_token")
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.access_token = action.payload.access_token
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Login error"
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.user = null
        state.access_token = null
        state.error = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Logout error"
        // Still clear the state even if API call fails
        state.user = null
        state.access_token = null
        if (typeof window !== "undefined") localStorage.removeItem("access_token")
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload
        }
      })
  },
})

export const { logoutFn, setError, clearError } = authSlice.actions
export default authSlice.reducer
