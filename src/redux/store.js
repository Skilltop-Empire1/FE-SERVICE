import { configureStore } from '@reduxjs/toolkit'
import toggleMenuReducer from './slices/toggleMenuSlice'
import generalApi from './api/generalApi'

export const store = configureStore({
  reducer: {
    toggleMenu: toggleMenuReducer,
    [generalApi.reducerPath]: generalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(
    generalApi.middleware
  ),
})
