import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user) => {
    const res = await axios.post(API_ENDPOINT + "/auth/register", user);
    return res.data;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userInfo, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_ENDPOINT + "/auth/login", userInfo, {
        withCredentials: true,
      }); // probaj onemoguciti na produkciji
      const { user, accessToken } = res.data;

      return { user, accessToken };
    } catch (error) {
      // Handle the login error and set the error message in the Redux state
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (userInfo, { rejectWithValue }) => {
    try {
      console.log("Front - starting to log out");
      const res = await axios.post(API_ENDPOINT + "/auth/logout", userInfo, {
        withCredentials: true,
      }); // probaj onemoguciti na produkciji
      //console.log(res.status)
      return res.data;
    } catch (error) {
      // Handle the login error and set the error message in the Redux state
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  const { profileImage, ...userWithoutProfileImage } = user;
  const res = await axios.put(
    API_ENDPOINT + `/users/${user._id}`,
    userWithoutProfileImage
  );

  return res.data;
});

export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async (user) => {
    const res = await axios.post(
      API_ENDPOINT + `/users/${user._id}/upload`,
      user,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  }
);

export const likePost = createAsyncThunk("post/like", async (post) => {
  const res = await axios.put(
    API_ENDPOINT + `/posts/${post.postId}/like`,
    post
  );
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
      isAdmin: false,
      phoneNumber: "",
    },
    accessToken: "",
    pending: null,
    error: false,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = "";
      state.userInfo = {};
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setAccessToken: (state, action) => {
      console.log(action.payload);
      state.accessToken = action.payload;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.pending = false;
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

      console.log("Access token after login: " + action.payload.accessToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.accessToken}`; // set Bearer to user's current accessToken
      console.log("Bearer set in loginUser.fulfilled");
    },
    [loginUser.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
    [logoutUser.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.pending = false;
      state.userInfo = {};
      state.accessToken = "";
    },
    [logoutUser.rejected]: (state, action) => {
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

export const { logout, setUser, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
