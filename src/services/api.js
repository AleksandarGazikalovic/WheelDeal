import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  baseUrl: process.env.REACT_APP_API_ENDPOINT,
});

export const api = createApi({
  reducerPath: "api",
  tagTypes: () => ["Document", "Post"],
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    return result;
  },
  keepUnusedDataFor: 1000,
  endpoints: () => ({}),
});
