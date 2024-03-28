import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    pending: null,
    error: false,
    createdNewVehicle: { status: "", message: "" },
    createdNewPost: { status: "", message: "" },
  },
  reducers: {
    setCreatedNewVehicle: (state, action) => {
      state.createdNewVehicle = action.payload;
    },
    setCreatedNewPost: (state, action) => {
      state.createdNewPost = action.payload;
    },
  },
});

export const { setCreatedNewVehicle, setCreatedNewPost } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
