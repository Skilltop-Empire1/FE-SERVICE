import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  modalType: null,
  modalProps: {}, // Changed from modalProp to modalProps
}

const modalSlice = createSlice({
  name: 'expenseModal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.modalType = action.payload.modalType
      state.modalProps = action.payload.modalProps || {} // Changed from modalProp
    },
    closeModal: (state) => {
      state.isOpen = false
      state.modalType = null
      state.modalProps = {}
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
