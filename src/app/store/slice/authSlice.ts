/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile_no: string;
  address?: string | null;
  city?: string | null;
  profile_image?: string | null;
  type: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  access_token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  access_token: typeof window !== 'undefined' ? localStorage.getItem('access_token') : null,
  loading: false,
  error: null,
};

// Utility for extracting user/token from response
function extractAuthData(data: any): { user: User; access_token: string } {
  return {
    user: data.user,
    access_token: data.access_token
  }
}

// Async thunk for login
export const login = createAsyncThunk<
  { user: User; access_token: string },
  { identifier: string; password: string },
  { rejectValue: string }
>(
  'auth/login',
  async (values, thunkAPI) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return thunkAPI.rejectWithValue(data.error || data.errors?.[0] || 'Login failed');
      }
      const { user, access_token } = extractAuthData(data.data);
      // Save token immediately here so it's available instantly
      localStorage.setItem('access_token', access_token);
      return { user, access_token };
    } catch (err) {
      console.log(err, "error while login user")
      return thunkAPI.rejectWithValue('Server/network error');
    }
  }
);

// Utility to get token anywhere in app  
export function getTokenFromLocalStorage() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem('access_token');
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.access_token = null;
      state.error = null;
      state.loading = false;
      if (typeof window !== 'undefined') localStorage.removeItem('access_token');
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true; state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login error';
      });
  }
});

export const { logout, setError } = authSlice.actions;
export default authSlice.reducer;
