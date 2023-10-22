import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserPosts = createAsyncThunk(
  "posts/userPosts",
  async (id) => {
    const res = await fetch(`posts/profile/${id}`);
    return res.json();
  }
);

export const userPostsSlice = createSlice({
  name: "userPosts",
  initialState: {
    userPosts: [],
    pending: null,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [fetchUserPosts.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchUserPosts.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.pending = false;
    },
    [fetchUserPosts.rejected]: (state, action) => {
      state.error = action.error.message;
      state.pending = false;
    },
  },
});

export default userPostsSlice.reducer;
