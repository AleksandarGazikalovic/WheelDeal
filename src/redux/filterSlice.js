import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "fliter",
  initialState: {
    fromDate: undefined,
    toDate: undefined,
    fromPrice: undefined,
    toPrice: undefined,
    location: undefined,
    brand: undefined,
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
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
