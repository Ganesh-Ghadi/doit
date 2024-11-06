import { configureStore } from "@reduxjs/toolkit";
import MemberSidebarReducer from "./features/MemberSidebarSlice/MemberSidebarSlice";
import MemberReducer from "./features/MemberSlice/memberSlice";
export const store = configureStore({
  reducer: {
    MemberSidebar: MemberSidebarReducer,
    Member: MemberReducer,
  },
});
