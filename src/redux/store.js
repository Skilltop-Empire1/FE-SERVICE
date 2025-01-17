import { configureStore } from '@reduxjs/toolkit'
import toggleMenuReducer from './slices/toggleMenuSlice'
import authApi from './api/authApi'

export const store = configureStore({
  reducer: {
    toggleMenu: toggleMenuReducer,
    [authApi.reducerPath]: authApi.reducerPath,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})
