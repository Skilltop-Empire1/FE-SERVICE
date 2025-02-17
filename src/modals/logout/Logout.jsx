import React from 'react'
import styles from './Logout.module.css' // Import the CSS module
import { dispatch } from 'd3'
import { useDispatch } from 'react-redux'
import { closeModal } from '@src/redux/slices/modalSlice'
import { logout } from '@src/redux/slices/authSlice'

function Logout() {
  const dispatch = useDispatch()
  return (
    <div className={styles.logoutModal}>
      <p className={styles.logoutMessage}>Are you sure you want to log out?</p>

      <div className={styles.logoutButtons}>
        <button
          onClick={() => dispatch(closeModal())}
          className={styles.cancelBtn}
        >
          Cancel
        </button>
        <button onClick={() => dispatch(logout())} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Logout
