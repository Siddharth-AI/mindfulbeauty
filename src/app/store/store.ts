import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice'; // import your reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Standard types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;