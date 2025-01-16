import { createSlice } from '@reduxjs/toolkit'

const toggleMenuSlice = createSlice({
  name: 'toggleMenu',
  initialState: { isOpen: false },
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen
    },
  },
})

export const { toggleMenu } = toggleMenuSlice.actions
export default toggleMenuSlice.reducer
