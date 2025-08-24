import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      state.requests = state.requests.filter(
        (request) => request._id !== action.payload
      );
    },
  },
});

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
