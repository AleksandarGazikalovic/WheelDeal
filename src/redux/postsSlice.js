import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (filter) => {
    console.log(filter);
    const res = await fetch(
      `posts/filter/all?startDate=${filter.fromDate}&endDate=${filter.toDate}&startPrice=${filter.fromPrice}&endPrice=${filter.toPrice}&location=${filter.location}&brand=${filter.brand}`
    );
    return res.json();
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    pending: null,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.pending = false;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.error = action.error.message;
      state.pending = false;
    },
  },
});

export default postSlice.reducer;
