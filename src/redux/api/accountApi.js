import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
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
        url: '/api/IMS/expenditure/list?opex=true',
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
      query: ({ type, data }) => ({
        url: '/api/IMS/expenditure/create',
        method: 'POST',
        body: { ...data, type },
      }),
      invalidatesTags: ['opex'], // Invalidates "opex" tag
    }),

    getCapex: builder.query({
      query: () => ({
        url: '/finance',
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
      query: ({ data, type }) => ({
        url: '/api/IMS/expenditure/create',
        method: 'POST',
        body: { ...data, type },
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
