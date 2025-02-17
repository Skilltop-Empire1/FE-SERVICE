import React from 'react'
import styles from './CapexView.module.css'

function CapexView({ modalProp, onClose }) {
  if (!modalProp) {
    console.error('Error: modalProp is undefined in CapexView')
    return null
  }

  console.log('clicked item:', modalProp)

  return (
    <section className={styles.container} aria-labelledby="capex-title">
      <header>
        <h2 id="capex-title" className={styles.heading}>
          Concise Information About This Expense Record
        </h2>
      </header>

      <dl className={styles.table}>
        <div className={styles.row}>
          <dt className={styles.label}>Expense Category:</dt>
          <dd className={styles.value}>{modalProp.capexCategory}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Payment Method:</dt>
          <dd className={styles.value}>{modalProp.paymentMethod}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Expense Description:</dt>
          <dd className={styles.value}>{modalProp.assetDescription}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Vendor/Payee (Optional):</dt>
          <dd className={styles.value}>{modalProp.vendor || 'N/A'}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Amount:</dt>
          <dd className={styles.value}>{modalProp.amount}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Notes:</dt>
          <dd className={styles.value}>{modalProp.note || 'N/A'}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Date of Expense:</dt>
          <dd className={styles.value}>{modalProp.date}</dd>
        </div>
      </dl>

      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
    </section>
  )
}

export default CapexView
