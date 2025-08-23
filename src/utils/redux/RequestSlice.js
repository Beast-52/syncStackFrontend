import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequest: (state, action) => {
      state.push(action.payload);
    },
    removeRequest: (state, action) => {
      return state.filter((request) => request.id !== action.payload);
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
