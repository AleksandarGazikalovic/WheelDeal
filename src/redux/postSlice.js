import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT


export const createPost = createAsyncThunk("post/createPost", async (post) => {
  const res = await axios.post(API_ENDPOINT + "/posts/", post, {
    headers: { "Content-Type": "multipart/form-data" },
  })

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
      carModel: "",
      year: "",
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
      state.postInfo = action.payload;
    },
    [createPost.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
  },
});

export default postSlice.reducer;
