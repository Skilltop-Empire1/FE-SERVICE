import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://be-service-885t.onrender.com",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token || localStorage.getItem('token')
      console.log('Token from state or localStorage:', token)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['opex', 'capex'], // Updated tagTypes
  endpoints: (builder) => ({
    getOpex: builder.query({
      query: () => ({
        url: 'finance/get?opex=true',
      }),
      providesTags: ['opex'], // Provides "opex" tag
    }),

    updateOpex: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/IMS/expenditure/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['opex'], // Invalidates "opex" tag
    }),

    deleteData: builder.mutation({
      query: (id) => ({
        url: `/api/IMS/expenditure/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['opex'], // Invalidates "opex" tag
    }),

    addOpex: builder.mutation({
      query: ({ data }) => ({
        url: '/finance/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['opex'], // Invalidates "opex" tag
    }),

    getCapex: builder.query({
      query: () => ({
        url: '/finance/get?capex=true',
      }),
      providesTags: ['capex'], // Provides "capex" tag
    }),

    updateCapex: builder.mutation({
      query: (account) => ({
        url: '/api/IMS/',
        method: 'PUT',
        body: JSON.stringify(account),
      }),
      invalidatesTags: ['capex'], // Invalidates "capex" tag
    }),

    addCapex: builder.mutation({
      query: ({ data }) => ({
        url: '/finance/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['capex'], // Invalidates "capex" tag
    }),
  }),
})

export const {
  useGetOpexQuery,
  useUpdateOpexMutation,
  useAddOpexMutation,
  useGetCapexQuery,
  useUpdateCapexMutation,
  useAddCapexMutation,
  useDeleteDataMutation,
} = accountApi

export default accountApi
