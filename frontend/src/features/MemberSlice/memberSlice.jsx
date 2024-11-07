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
      const existingMemberIds = state.members.map((member) => member.id);
      const uniqueNewMembers = action.payload.filter(
        (member) => !existingMemberIds.includes(member.id)
      );
      state.members = [...state.members, ...uniqueNewMembers];
    },
    removeMembers: (state, action) => {
      state.members = state.members.filter(
        (member) => member.id !== action.payload.id
      );
    },
    refreshMembers: (state, action) => {
      state.members = []; // Add new members to the existing array
    },
  },
});

export const { addMembers, removeMembers, refreshMembers } =
  MemberSlice.actions;

export default MemberSlice.reducer;
