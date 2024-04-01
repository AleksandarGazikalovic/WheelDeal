import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "fliter",
  initialState: {
    fromDate: "",
    toDate: "",
    fromPrice: "",
    toPrice: "",
    location: "",
    brand: "",
    page: 1,
  },
  reducers: {
    setFilter: (state, action) => {
      state.fromDate = action.payload.fromDate;
      state.toDate = action.payload.toDate;
      state.fromPrice = action.payload.fromPrice;
      state.toPrice = action.payload.toPrice;
      state.location = action.payload.location;
      state.brand = action.payload.brand;
      state.page = action.payload.page;
    },
    clearFilter: (state) => {
      state.fromDate = "";
      state.toDate = "";
      state.fromPrice = "";
      state.toPrice = "";
      state.location = "";
      state.brand = "";
      state.page = 1;
    },
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
