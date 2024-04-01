import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../components";

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (user) => {
    let url = API_ENDPOINT + `/notification/${user._id}`;
    const res = await axios.get(url);
    return res.json();
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    pending: null,
    error: false,
  },
  reducers: {
    clearnotifications: (state) => {
      state.notifications = [];
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
  },
});

export const { clearnotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
