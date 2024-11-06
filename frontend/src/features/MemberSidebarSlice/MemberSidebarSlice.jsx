import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const MemberSidebarSlice = createSlice({
  name: 'MemberSidebar',
  initialState,
  reducers: {
    openSidebar: (state, action) => {
      state.isOpen = true;
    },
    closeSidebar: (state, action) => {
      state.isOpen = false;
    },
    
  },
});

export const { openSidebar, closeSidebar } = MemberSidebarSlice.actions;

export default MemberSidebarSlice.reducer;
