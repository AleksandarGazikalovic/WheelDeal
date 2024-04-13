import { api } from "../services/api";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const documentAdapter = createEntityAdapter({
  selectId: ({ _id }) => _id,
  sortComparer: (a, b) => a.type.localeCompare(b.type),
});

const initialState = documentAdapter.getInitialState();

export const documentsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    fetchDocuments: builder.query({
      query: (vehicleId) => ({
        url: `/documents/${vehicleId}`,
        method: "GET",
      }),
      transformResponse: (responseData) => {
        return documentAdapter.setAll(initialState, responseData);
      },
      providesTags: ["Document"],
    }),
    addDocument: builder.mutation({
      query: ({ formData }) => ({
        url: `/documents`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Document"],
    }),
  }),
});

export default documentsSlice;

export const { useFetchDocumentsQuery, useAddDocumentMutation } =
  documentsSlice;

const selectDocumentsResponse = createSelector(
  [(state) => state, (_, vehicleId) => vehicleId],
  (state, vehicleId) =>
    documentsSlice.endpoints.fetchDocuments.select(vehicleId)(state).data ??
    initialState
);

const { selectAll: selectAllDocuments } = documentAdapter.getSelectors(
  selectDocumentsResponse
);

const selectIdCardForVehicle = createSelector(
  [selectAllDocuments],
  (documents) => documents.find((doc) => doc.type === "idCard")
);
const selectVehicleLicenseForVehicle = createSelector(
  [selectAllDocuments],
  (documents) => documents.find((doc) => doc.type === "vehicleLicense")
);
const selectRegistrationExpiryForVehicle = createSelector(
  [selectAllDocuments],
  (documents) => documents.find((doc) => doc.type === "registrationExpiry")
);

const areAllDocumentsUploaded = createSelector(
  [selectAllDocuments],
  (documents) => {
    //check if there is idcard and vehiclelicense and registration expiry
    return documents.some((doc) => doc.type === "idCard") &&
      documents.some((doc) => doc.type === "vehicleLicense") &&
      documents.some((doc) => doc.type === "registrationExpiry")
      ? true
      : false;
  }
);

export const documentsSelectors = {
  selectAllDocuments,
  selectIdCardForVehicle,
  selectVehicleLicenseForVehicle,
  selectRegistrationExpiryForVehicle,
  areAllDocumentsUploaded,
};
