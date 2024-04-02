import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../components";

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (user) => {
    let url = API_ENDPOINT + `/notification/${user._id}`;
    const res = await axios.get(url);
    return res.data;
  }
);

export const updateNotification = createAsyncThunk(
  "notification/updateNotification",
  async (notification) => {
    const res = await axios.put(
      API_ENDPOINT + `/notification/${notification._id}`,
      notification
    );
    return res.data;
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    pending: null,
    error: false,
    createdNewVehicle: { status: "", message: "" },
    createdNewPost: { status: "", message: "" },
  },
  reducers: {
    clearnotifications: (state) => {
      state.notifications = [];
    },
    setCreatedNewVehicle: (state, action) => {
      state.createdNewVehicle = action.payload;
    },
    setCreatedNewPost: (state, action) => {
      state.createdNewPost = action.payload;
    },
  },
  extraReducers: {
    [fetchNotifications.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload.allNotifications;
      state.pending = false;
    },
    [fetchNotifications.rejected]: (state, action) => {
      state.error = action.error.message;
      state.pending = false;
    },
    [updateNotification.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [updateNotification.fulfilled]: (state) => {
      state.pending = false;
    },
    [updateNotification.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
  },
});

export const { clearnotifications, setCreatedNewVehicle, setCreatedNewPost } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
