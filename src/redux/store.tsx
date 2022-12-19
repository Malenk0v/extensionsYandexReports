import { configureStore } from '@reduxjs/toolkit';
import ReportSlice from './slice/report';

export const store = configureStore({
  reducer: {
    report: ReportSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
