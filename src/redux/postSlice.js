import { api } from "../services/api";
import { createSelector } from "@reduxjs/toolkit";

export const postSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // fetchPosts: builder.query({
    //   query: () => ({
    //     url: `/posts/`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Post"],
    // }),
    getPost: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: ({ userId, vehicleId, price, from, to, location }) => ({
        url: `/posts`,
        method: "POST",
        body: {
          userId,
          vehicleId,
          price,
          from,
          to,
          location,
        },
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: ({ userId, vehicleId, price, from, to, location, _id }) => ({
        url: `/posts/${_id}`,
        method: "PUT",
        body: {
          userId,
          vehicleId,
          price,
          from,
          to,
          location,
        },
      }),
      headers: {
        "Content-Type": "multipart/form-data",
      },
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: ({ userId, _id }) => ({
        url: `/posts/${_id}`,
        method: "DELETE",
        body: {
          userId,
        },
      }),
      invalidatesTags: ["Post"],
    }),
    getPostByVehicleId: builder.query({
      query: (vehicleId) => ({
        url: `/posts/vehicle/${vehicleId}`,
        method: "GET",
      }),
    }),
  }),
});

export default postSlice;

export const {
  useGetPostMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostByVehicleIdQuery,
} = postSlice;
