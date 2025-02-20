import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OpexEdit from './opexEdit/OpexEdit'
import OpexView from './opexView/OpexView'
import CapexEdit from './capexEdit/CapexEdit'
import CapexView from './capexView/CapexView'
import { closeModal } from '@src/redux/slices/modalSlice'

import styles from './ModalManager.module.css'
import Logout from '../logout/Logout'

function ModalManager() {
  const dispatch = useDispatch()
  const { isOpen, modalType, modalProp } = useSelector(
    (state) => state.expenseModal,
  )

  console.log('ModalManager modalProp:', modalProp)

  if (!isOpen) return null

  const handleClose = () => dispatch(closeModal())

  const renderModal = () => {
    switch (modalType) {
      case 'EDIT_OPEX':
        return <OpexEdit {...modalProp} onClose={handleClose} />
      case 'VIEW_OPEX':
        return <OpexView {...modalProp} onClose={handleClose} />
      case 'EDIT_CAPEX':
        return <CapexEdit {...modalProp} onClose={handleClose} />
      case 'VIEW_CAPEX':
        return <CapexView {...modalProp} onClose={handleClose} />
      case 'DELETE':
        return

      case 'LOGOUT':
        return <Logout />
      default:
        return null
    }
  }

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        {renderModal()}
      </div>
    </div>
  )
}

export default ModalManager
