import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import filterReducer from "./filterSlice";
import postsReducer from "./postsSlice";
import postReducer from "./postSlice";
import currencyReducer from "./currencySlice";
import vehicleReducer from "./vehicleSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    posts: postsReducer,
    post: postReducer,
    currency: currencyReducer,
    vehicle: vehicleReducer,
  },
});
