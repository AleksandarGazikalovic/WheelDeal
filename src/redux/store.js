import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import filterReducer from "./filterSlice";
import postsReducer from "./postsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    posts: postsReducer,
  },
});
