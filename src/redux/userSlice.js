import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user) => {
    console.log(user);
    const res = await axios.post("/auth/register", user);
    return res.data;
  }
);

export const loginUser = createAsyncThunk("user/loginUser", async (user) => {
  console.log(user);
  const res = await axios.post("/auth/login", user);
  return res.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    pending: null,
    error: false,
  },
  reducers: {},
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
      state.userInfo = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
  },
});

export const { registerStart, registerSuccess, registerFailure } =
  userSlice.actions;
export default userSlice.reducer;
