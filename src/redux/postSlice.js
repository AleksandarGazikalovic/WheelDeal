import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../components";

export const createPost = createAsyncThunk("post/createPost", async (post) => {
  const res = await axios.post(API_ENDPOINT + "/posts/", post, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
});

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (post, { getState }) => {
    try {
      const userId = post.userId;

      const res = await axios.delete(API_ENDPOINT + `/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data: { userId },
      });

      return res.data;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }
);

export const updatePost = createAsyncThunk("post/updatePost", async (post) => {
  try {
    const res = await axios.put(API_ENDPOINT + `/posts/${post._id}`, post, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating post:", error);
  }
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
    [deletePost.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.pending = false;
      state.postInfo = action.payload;
    },
    [deletePost.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
    [updatePost.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.pending = false;
      state.postInfo = action.payload;
    },
    [updatePost.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
  },
});

export default postSlice.reducer;
