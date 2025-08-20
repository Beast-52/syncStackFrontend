import { createSlice } from "@reduxjs/toolkit";
import { use } from "react";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    logout: (state) => {
      return null;
    },
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;
