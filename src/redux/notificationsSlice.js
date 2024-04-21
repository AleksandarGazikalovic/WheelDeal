import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    pending: null,
    error: false,
    createdNewVehicle: { status: "", message: "" },
    createdNewPost: { status: "", message: "" },
    deletedPost: { status: "", message: "" },
  },
  reducers: {
    setCreatedNewVehicle: (state, action) => {
      state.createdNewVehicle = action.payload;
    },
    setCreatedNewPost: (state, action) => {
      state.createdNewPost = action.payload;
    },
    setDeletedPost: (state, action) => {
      state.deletedPost = action.payload;
    },
  },
});

export const { setCreatedNewVehicle, setCreatedNewPost, setDeletedPost } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
