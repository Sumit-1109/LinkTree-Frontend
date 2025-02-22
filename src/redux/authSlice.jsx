import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    logout: (state) => {
      state.userId = null;
    },
  },
});

export const { setUserId, logout } = authSlice.actions;
export default authSlice.reducer;