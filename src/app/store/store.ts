import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice';
import reqReducer from './slice/registrationRequestSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    requests: reqReducer,
  },
});

// Standard types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;