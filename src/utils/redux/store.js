import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./FeedSlice";
import requestReducer from "./RequestSlice";
import connectionReducer from "./ConnectionSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    request: requestReducer,
    connection: connectionReducer,
  },
});

export default store;
