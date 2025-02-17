import React from 'react'
import styles from './CapexView.module.css'

function CapexView({ item }) {
  return (
    <section className={styles.container} aria-labelledby="capex-title">
      <header>
        <h2 id="capex-title" className={styles.heading}>
          Concise Information About This Expense Record
        </h2>
      </header>

      {/* <dl className={styles.table}>
        <div className={styles.row}>
          <dt className={styles.label}>Expense Category:</dt>
          <dd className={styles.value}>{item.capexCategory}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Payment Method:</dt>
          <dd className={styles.value}>{item.paymentMethod}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Expense Description:</dt>
          <dd className={styles.value}>{item.assetDescription}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Vendor/Payee (Optional):</dt>
          <dd className={styles.value}>{item.vendor || 'N/A'}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Amount:</dt>
          <dd className={styles.value}>{item.price}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Notes:</dt>
          <dd className={styles.value}>{item.note || 'N/A'}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Date of Expense:</dt>
          <dd className={styles.value}>{item.dateOfExpenses}</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.label}>Receipt:</dt>
          <dd className={styles.value}>
            {item.receipt ? (
              <a href={item.receipt} target="_blank" rel="noopener noreferrer">
                View Receipt
              </a>
            ) : (
              'No Receipt Available'
            )}
          </dd>
        </div>
      </dl> */}
    </section>
  )
}

export default CapexView
