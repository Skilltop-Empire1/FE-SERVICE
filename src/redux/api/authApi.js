import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout as logoutAction, setCredentials } from '../slices/authSlice'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Fallback to localStorage if token is not in Redux
      const token = getState().auth.token || localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: '/api/IMS/user/signup',
        method: 'POST',
        body: userData,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/IMS/user/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {
        if (response && response.token) {
          return {
            token: response.token,
            id: response.id,
            role: response.role,
            email: response.email,
            username: response.username,
          }
        }
        throw new Error('Token missing in response')
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          localStorage.setItem('token', data.token)
          dispatch(setCredentials(data))
        } catch (err) {
          console.error('Login failed:', err)
        }
      },
    }),

    fetchUser: builder.query({
      query: () => 'user',
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/api/IMS/user/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          localStorage.removeItem('token')
          dispatch(logoutAction())
        } catch (err) {
          console.error('Logout failed:', err)
        }
      },
    }),
  }),
})

export const {
  useSignupMutation,
  useLoginMutation,
  useFetchUserQuery,
  useLogoutMutation,
} = authApi

export default authApi
