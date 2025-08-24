import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      return {
        feed: null,
      };
    },
    removeFeedUser: (state, action) => {
      state.feed = state.feed.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addFeed, removeFeed, removeFeedUser } = feedSlice.actions;
export default feedSlice.reducer;
