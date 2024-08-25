import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINT } from "../components";

export const createVehicle = createAsyncThunk(
  "vehicles/createVehicle",
  async (vehicle, { getState }) => {
    vehicle.userId = getState().user.userInfo._id;
    const res = await axios.post(API_ENDPOINT + "/vehicles/", vehicle, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("res", res);
    return res.data;
  }
);

export const deleteVehicle = createAsyncThunk(
  "vehicles/deleteVehicle",
  async (vehicle, { getState }) => {
    try {
      const userId = vehicle.userId;
      console.log(vehicle);
      const res = await axios.delete(
        API_ENDPOINT + `/vehicles/${vehicle._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          data: { userId },
        }
      );

      return res.data;
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      throw error;
    }
  }
);

export const updateVehicle = createAsyncThunk(
  "vehicles/updateVehicle",
  async (vehicle) => {
    const res = await axios.put(
      API_ENDPOINT + `/vehicles/${vehicle._id}`,
      vehicle,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return res.data;
  }
);

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    vehicle: {
      id: "",
      userId: "",
      images: [],
      brand: "",
      carModel: "",
      year: "",
      mileage: "",
      transmission: "",
      fuel: "",
      drive: "",
      engine: "",
      documents: [],
    },
    pending: null,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [createVehicle.fulfilled]: (state, action) => {
      state.vehicle = action.payload;
      state.pending = false;
    },
    [createVehicle.pending]: (state) => {
      state.pending = true;
    },
    [createVehicle.rejected]: (state) => {
      state.error = true;
      state.pending = false;
    },
    [deleteVehicle.fulfilled]: (state, action) => {
      state.vehicle = action.payload;
      state.pending = false;
    },
    [deleteVehicle.pending]: (state) => {
      state.pending = true;
    },
    [deleteVehicle.rejected]: (state) => {
      state.error = true;
      state.pending = false;
    },
    [updateVehicle.fulfilled]: (state, action) => {
      state.vehicle = action.payload;
      state.pending = false;
    },
    [updateVehicle.pending]: (state) => {
      state.pending = true;
    },
    [updateVehicle.rejected]: (state) => {
      state.error = true;
      state.pending = false;
    },
  },
});

export default vehicleSlice.reducer;
