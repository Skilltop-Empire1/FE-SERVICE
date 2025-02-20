import React from 'react'
import styles from './CapexView.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '@src/redux/slices/modalSlice'

function CapexView({
  capexCategory,
  paymentMethod,
  assetDescription,
  vendorPayee,
  amount,
  note,
  dateOfExpenses,
  onClose,
  fileUrl,
  expectedLifeSpan,
}) {
  const dispatch = useDispatch()
  const { modalProp: item } = useSelector((state) => state.expenseModal)
  return (
    <section className={styles.container} aria-labelledby="capex-title">
      <header className={styles.heading}>
        <h2 id="capex-title">OPEX Record</h2>
        <p> Concise Information About This Expense Record</p>
      </header>

      <dl className={styles.table}>
        <div className={styles.column}>
          {' '}
          <div className={styles.row}>
            <dt className={styles.label}>Expense Category:</dt>
            <dd className={styles.value}>{capexCategory}</dd>
          </div>
          <div className={styles.row}>
            <dt className={styles.label}>Payment Method:</dt>
            <dd className={styles.value}>{paymentMethod}</dd>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <dt className={styles.label}>Expense Description:</dt>
            <dd className={styles.value}>{assetDescription}</dd>
          </div>
          <div className={styles.row}>
            <dt className={styles.label}>Vendor/Payee:</dt>
            <dd className={styles.value}>{vendorPayee}</dd>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <dt className={styles.label}>Amount:</dt>
            <dd className={styles.value}>{amount}</dd>
          </div>
          <div className={styles.row}>
            <dt className={styles.label}>Notes:</dt>
            <dd className={styles.value}>{note || 'N/A'}</dd>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
            <dt className={styles.label}>Date of Expense:</dt>
            <dd className={styles.value}>{dateOfExpenses}</dd>
          </div>
          <div className={styles.row}>
            <dt className={styles.label}>Receipt:</dt>
            <dd className={styles.value}>{fileUrl}</dd>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.row}>
            <dt className={styles.label}>Expected Lifespan:</dt>
            <dd className={styles.value}>{expectedLifeSpan}</dd>
          </div>
        </div>
      </dl>
      <div className={styles.buttonGroup}>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
        <button
          onClick={() =>
            dispatch(openModal({ modalType: 'EDIT_CAPEX', modalProp: item }))
          }
          className={styles.editButton}
        >
          Edit
        </button>
      </div>
    </section>
  )
}

export default CapexView
