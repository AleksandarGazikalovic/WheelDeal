import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    name: "EUR",
    rate: 1,
  },
  reducers: {
    setCurrency: (state, action) => {
      state.name = action.payload.name;
      state.rate = action.payload.rate;
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
