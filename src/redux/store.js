import { configureStore } from '@reduxjs/toolkit'
import toggleMenuReducer from './slices/toggleMenuSlice'
import authReducer from './slices/authSlice'
import searchReducer from './slices/searchSlice'
import expenseModalReducer from './slices/modalSlice'

import authApi from './api/authApi'
import accountApi from './api/accountApi'
import generalApi from './api/generalApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toggleMenu: toggleMenuReducer,
    search: searchReducer,
    expenseModal: expenseModalReducer,
    [authApi.reducerPath]: authApi.reducer,
    [generalApi.reducerPath]: generalApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(generalApi.middleware)
      .concat(accountApi.middleware),
})
