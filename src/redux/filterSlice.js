import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "fliter",
  initialState: {
    fromDate: "",
    toDate: "",
    fromPrice: "",
    toPrice: "",
    location: "",
    model: "",
  },
  reducers: {
    setFilter: (state, action) => {
      state.fromDate = action.payload.fromDate;
      state.toDate = action.payload.toDate;
      state.fromPrice = action.payload.fromPrice;
      state.toPrice = action.payload.toPrice;
      state.location = action.payload.location;
      state.model = action.payload.model;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
