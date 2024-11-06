import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  members: [],
  isLoading: true,
  error: null,
};

const MemberSlice = createSlice({
  name: "MemberSidebar",
  initialState,
  reducers: {
    addMembers: (state, action) => {
      state.members = [...state.members, ...action.payload]; // Add new members to the existing array
    },
    removeMembers: (state, action) => {
      state.members = state.members.filter(
        (member) => member.id !== action.payload.id
      );
    },
  },
});

export const { addMembers, removeMembers } = MemberSlice.actions;

export default MemberSlice.reducer;
