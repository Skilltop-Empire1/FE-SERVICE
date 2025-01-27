import { configureStore } from '@reduxjs/toolkit'
import toggleMenuReducer from './slices/toggleMenuSlice'
import authApi from './api/authApi'
import generalApi from './api/generalApi'

export const store = configureStore({
  reducer: {
    toggleMenu: toggleMenuReducer,
    [authApi.reducerPath]: authApi.reducerPath,
    [generalApi.reducerPath]: generalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generalApi.middleware),
})
