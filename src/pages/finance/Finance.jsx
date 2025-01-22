import { useState } from 'react'
import SelectOptions from '../../components/selectOptions/selectOptions'

import styles from './Finance.module.css'
import { Printer } from 'lucide-react'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const services = ['clericals', 'janitorials', 'mobility']

const year = new Date().getFullYear()

function Finance() {
  const [selectedMonthA, setSelectedMonthA] = useState(months[0] || '')
  const [selectedMonthB, setSelectedMonthB] = useState(months[0] || '')
  const [service, setService] = useState(services[0] || '')

  return (
    <>
      <div>
        <h2>Finance</h2>
      </div>
      <section className={styles.selectsSection}>
        <div className={styles.selectMonths}>
          <div className={styles.selectContainer}>
            <label role="header" className={styles.selectHeader}>
              Month A
            </label>
            <SelectOptions
              selectedOption={selectedMonthA}
              setSelectedOption={setSelectedMonthA}
              data={months}
            />
          </div>
          <p>To</p>
          <div className={styles.selectContainer}>
            <label role="header" className={styles.selectHeader}>
              Month B
            </label>
            <SelectOptions
              selectedOption={selectedMonthB}
              setSelectedOption={setSelectedMonthB}
              data={months}
            />
          </div>
        </div>
        <div>
          <p role="header" className={styles.duration}>
            from {selectedMonthA}, {year} to {selectedMonthB}, {year}
          </p>
        </div>
        <div className={styles.selectContainer}>
          <label className={styles.selectHeader}>Service Name</label>
          <SelectOptions
            selectedOption={service}
            setSelectedOption={setService}
            data={services}
          />
        </div>
      </section>
      <section className={styles.prices}>
        <div className={styles.priceContainer}>
          <div className={styles.priceContent}>
            <label htmlFor="">Price</label> <p>200,000</p>
          </div>
          <div className={styles.priceContent}>
            <label htmlFor="">Sum Total</label> <p>200,000</p>
          </div>
        </div>
      </section>
      <section className={styles.expenditureSummary}>
        <label htmlFor="">Expenditure Summary</label>
        <div className={styles.buttonGroup}>
          <button>OPEX</button>
          <button>CAPEX</button>
        </div>
      </section>
      <section className={styles.revenue}>
        <label htmlFor="">Revenue Breakdown</label>
      </section>
      <section className={styles.print}>
        <button>
          <Printer size={16} />
          <span>Print</span>
        </button>
      </section>
    </>
  )
}

export default Finance
