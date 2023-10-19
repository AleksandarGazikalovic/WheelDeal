import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createPost = createAsyncThunk("post/createPost", async (post) => {
  const res = await axios.post("/posts/", post, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
});

export const postSlice = createSlice({
  name: "post",
  initialState: {
    postInfo: {
      userId: "",
      img: "",
      price: "",
      brand: "",
      model: "",
      year: "",
      casco: "",
      from: "",
      to: "",
      location: "",
      profileImage: "",
    },
    pending: null,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [createPost.fulfilled]: (state, action) => {
      state.pending = false;
      state.userInfo = action.payload;
    },
    [createPost.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
  },
});

export default postSlice.reducer;
