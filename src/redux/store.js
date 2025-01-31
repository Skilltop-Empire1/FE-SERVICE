import { configureStore } from '@reduxjs/toolkit'
import toggleMenuReducer from './slices/toggleMenuSlice'
import authApi from './api/authApi'
import generalApi from './api/generalApi'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toggleMenu: toggleMenuReducer,
    [authApi.reducerPath]: authApi.reducer,
    [generalApi.reducerPath]: generalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(generalApi.middleware),
})
