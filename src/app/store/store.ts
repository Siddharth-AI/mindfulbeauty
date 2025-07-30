import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // यहां कोई रिड्यूसर नहीं है
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;