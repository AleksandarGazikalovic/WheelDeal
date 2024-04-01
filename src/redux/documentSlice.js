import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async () => {
    const res = await axios.get(API_ENDPOINT + "/documents");
    return res.data;
  }
);

export const uploadDocuments = createAsyncThunk(
  "documents/uploadDocument",
  async (documents) => {
    const res = await axios.post(API_ENDPOINT + "/documents", documents, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
);

export const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    documents: [],
    driverLicense: {
      file: null,
      error: null,
      size: null,
      name: null,
    },
    vehicleRegistration: {
      file: null,
      error: null,
      size: null,
      name: null,
    },
    vehicleInsurance: {
      file: null,
      error: null,
      size: null,
      name: null,
    },
    idCard: {
      file: null,
      error: null,
      size: null,
      name: null,
    },
    pending: null,
    error: null,
  },
  reducers: {
    setDriverLicense: (state, action) => {
      state.driverLicense = action.payload;
    },
    setVehicleRegistration: (state, action) => {
      state.vehicleRegistration = action.payload;
    },
    setVehicleInsurance: (state, action) => {
      state.vehicleInsurance = action.payload;
    },
    setIDCard: (state, action) => {
      state.idCard = action.payload;
    },
  },
  extraReducers: {
    [fetchDocuments.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [fetchDocuments.fulfilled]: (state, action) => {
      state.pending = false;
      state.documents = action.payload;
    },
    [fetchDocuments.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
    [uploadDocuments.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [uploadDocuments.fulfilled]: (state, action) => {
      state.pending = null;
      state.documents = action.payload;
    },
    [uploadDocuments.rejected]: (state, action) => {
      state.pending = null;
      state.error = action.error.message;
    },
  },
});

export const {
  setDriverLicense,
  setVehicleRegistration,
  setVehicleInsurance,
  setIDCard,
} = documentsSlice.actions;

export default documentsSlice.reducer;
