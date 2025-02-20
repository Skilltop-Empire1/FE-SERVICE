import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  modalType: null,
  modalProp: {},
}

const modalSlice = createSlice({
  name: 'expenseModal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.modalType = action.payload.modalType
      state.modalProp = action.payload.modalProp || {}
    },
    closeModal: (state) => {
      state.isOpen = false
      state.modalType = null
      state.modalProp = {}
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
