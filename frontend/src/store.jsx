import { configureStore } from '@reduxjs/toolkit';
import MemberSidebarReducer from './features/MemberSidebarSlice/MemberSidebarSlice';
export const store = configureStore({
  reducer: {
    MemberSidebar: MemberSidebarReducer,
  },
});
