import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice';
import reqReducer from './slice/registrationRequestSlice';
import applyReducer from "./slice/applySlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    requests: reqReducer,
    apply: applyReducer,
  },
});

// Standard types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;