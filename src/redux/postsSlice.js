import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (filter) => {
    let url = "posts/filter/all?";

    // Build the URL dynamically based on the presence of filter fields
    if (filter.fromDate) url += `startDate=${filter.fromDate}&`;
    if (filter.toDate) url += `endDate=${filter.toDate}&`;
    if (filter.fromPrice) url += `startPrice=${filter.fromPrice}&`;
    if (filter.toPrice) url += `endPrice=${filter.toPrice}&`;
    if (filter.location) url += `location=${filter.location}&`;
    if (filter.brand) url += `brand=${filter.brand}&`;

    // Add the page parameter, default to 1 if not provided
    url += `page=${filter.page || 1}`;

    const res = await fetch(url);
    return res.json();
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    pending: null,
    hasMore: true,
    error: false,
  },
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = state.posts.concat(action.payload.posts);
      state.hasMore = action.payload.hasMore;
      state.pending = false;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.error = action.error.message;
      state.pending = false;
    },
  },
});

export const { clearPosts } = postSlice.actions;

export default postSlice.reducer;
