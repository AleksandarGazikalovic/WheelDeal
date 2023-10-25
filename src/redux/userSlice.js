import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user) => {
    const res = await axios.post("/auth/register", user);
    return res.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userInfo, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/login", userInfo);
      const { refreshToken, user, accessToken } = res.data;

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      return { user, accessToken };
    } catch (error) {
      // Handle the login error and set the error message in the Redux state
      return rejectWithValue(
        "Failed to log in! Please check your credentials."
      );
    }
  }
);

export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  const { profileImage, ...userWithoutProfileImage } = user;
  const res = await axios.put(`/users/${user._id}`, userWithoutProfileImage);

  return res.data;
});

export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async (user) => {
    const res = await axios.post(`/users/${user._id}/upload`, user, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
);

export const likePost = createAsyncThunk("post/like", async (post) => {
  const res = await axios.put(`/posts/${post.postId}/like`, post);
  return res.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      id: "",
      name: "",
      surname: "",
      email: "",
      password: "",
      likedPosts: [],
      myPosts: [],
      isVerified: false,
      IDCard: "",
      driverLicense: "",
      phone: "",
      address: "",
      profileImage: "",
    },
    accessToken: "",
    pending: null,
    error: false,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = "";
      localStorage.removeItem("refreshToken");
      state.userInfo = {};
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.userInfo = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
    [loginUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.userInfo = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    [loginUser.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
    [updateUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },
    [updateUser.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
    [updateProfileImage.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [updateProfileImage.fulfilled]: (state, action) => {
      state.pending = false;
      state.userInfo.profileImage = action.payload;
    },
    [updateProfileImage.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
    [likePost.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [likePost.fulfilled]: (state, action) => {
      state.pending = false;
      state.userInfo.likedPosts = action.payload;
    },
    [likePost.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
