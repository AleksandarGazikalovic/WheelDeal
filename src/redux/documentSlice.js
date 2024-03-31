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

export const uploadDocument = createAsyncThunk(
  "documents/uploadDocument",
  async (document) => {
    const res = await axios.post(API_ENDPOINT + "/documents", document, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
);

export const documentsSlice = createSlice({
  name: "documents",
  initialState: {
    documents: [],
    idCard: {
      file: null,
      error: null,
      size: null,
      name: null,
      type: "idCard",
    },
    vehicleLicense: {
      file: null,
      error: null,
      size: null,
      name: null,
      type: "vehicleLicense",
    },
    registrationExpiry: {
      file: null,
      error: null,
      size: null,
      name: null,
      type: "registrationExpiry",
    },
    // vehicleInsurance: {
    //   file: null,
    //   error: null,
    //   size: null,
    //   name: null,
    // },
    pending: null,
    error: null,
  },
  reducers: {
    setIDCard: (state, action) => {
      state.idCard = action.payload;
    },
    setVehicleLicense: (state, action) => {
      state.vehicleLicense = action.payload;
    },
    setRegistrationExpiry: (state, action) => {
      state.registrationExpiry = action.payload;
    },
    // setVehicleInsurance: (state, action) => {
    //   state.vehicleInsurance = action.payload;
    // },
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
    [uploadDocument.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [uploadDocument.fulfilled]: (state, action) => {
      state.pending = null;
      state.documents = action.payload;
    },
    [uploadDocument.rejected]: (state, action) => {
      state.pending = null;
      state.error = action.error.message;
    },
  },
});

export const {
  setIDCard,
  setVehicleLicense,
  setRegistrationExpiry,
  // setVehicleInsurance,
} = documentsSlice.actions;

export default documentsSlice.reducer;
