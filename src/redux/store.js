import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import filterReducer from "./filterSlice";
import postsReducer from "./postsSlice";
import postReducer from "./postSlice";
import currencyReducer from "./currencySlice";
import vehicleReducer from "./vehicleSlice";
import notificationsReducer from "./notificationsSlice";
import { api } from "../services/api";

export default configureStore({
  reducer: {
    user: userReducer,
    filter: filterReducer,
    posts: postsReducer,
    post: postReducer,
    currency: currencyReducer,
    [api.reducerPath]: api.reducer,
    vehicle: vehicleReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
