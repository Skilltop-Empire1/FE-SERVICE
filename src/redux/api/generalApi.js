import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const generalApi = createApi({
  reducerPath: 'department',
  baseQuery: fetchBaseQuery({
     baseUrl: 'https://be-service-885t.onrender.com',
     prepareHeaders: (headers, { getState }) => {
      // Fallback to localStorage if token is not in Redux
      const token = getState()?.auth?.token || localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
     }),
  endpoints: (builder) => ({


    fetchResource: builder.query({
      query: (url) => url,
      method: 'GET',
    }),


    // fetchProfileImage: builder.query({
    //   query: ({ url, token }) => ({
    //     url,
    //     headers: {'Authorization': token ? `Bearer ${token}` : '',},
    //   }),
    // }),


    editResource: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: "PUT",
        body: data,
        // headers: { 'Content-Type': 'application/json' },
      }),
    }),



    // postProfileImage: builder.mutation({
    //   query: ({ url, data }) => {

    //     const user = localStorage.getItem("user");
    //     const token = user ? JSON.parse(user).token : null;

    //     return {
    //       url,
    //       method: 'POST',
    //       body: data,
    //       headers: {
    //         'Authorization': token ? `Bearer ${token}` : '',
    //         // 'Content-Type': 'multipart/form-data',
    //       },
    //     };
    //   },
    // }),
    
    postResource: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: "POST",
        body: data,
        // headers: { 'Content-Type': 'application/json' },
      }),
    }),


    deleteResource: builder.mutation({
      query: (url) => ({
        url,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchResourceQuery,
  useEditResourceMutation,
  usePostResourceMutation,
  useDeleteResourceMutation,
  usePostProfileImageMutation,
  useFetchProfileImageQuery
} = generalApi;

export default generalApi;
