import { configureStore } from '@reduxjs/toolkit'
import toggleMenuReducer from './slices/toggleMenuSlice'

export const store = configureStore({
  reducer: {
    toggleMenu: toggleMenuReducer,
  },
})
