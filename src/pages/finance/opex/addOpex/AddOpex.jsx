import { useState, useReducer } from 'react'
import styles from './AddOpex.module.css'
import { useAddOpexMutation } from '@src/redux/api/accountApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

const initialState = {
  expenseCategory: '',
  paymentMethod: '',
  expenseDescription: '',
  vendorPayee: '',
  amount: '',
  note: '',
  dateOfExpense: '',
  fileUrl: null,
}

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'RESET':
      return { ...initialState }
    default:
      return state
  }
}

const AddOpex = () => {
  const [formData, dispatch] = useReducer(formReducer, initialState)
  const [addAnotherExpense, setAddAnotherExpense] = useState(false)
  const [addOpex, { isLoading, isError }] = useAddOpexMutation()
  const navigate = useNavigate()

  const expenseCategories = ['Salaries', 'Rent', 'Utilities', 'Others']

  const paymentMethods = ['Cash', 'Transfer', 'POS']

  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({ type: 'SET_FIELD', field: name, value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size exceeds the 5MB limit')
        return
      }
      dispatch({ type: 'SET_FIELD', field: 'fileUrl', value: file })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataToSubmit = { type: 'OPEX', ...formData }

    try {
      const result = await addOpex({ data: dataToSubmit }).unwrap()
      console.log('Form Data Submitted:', result)
      toast.success('OPEX added successfully')
      dispatch({ type: 'RESET' })

      if (!addAnotherExpense) {
        navigate('/app/finance/opex/')
      }
    } catch (error) {
      console.error('Error submitting OPEX:', error)
      toast.error(
        error?.data?.message ||
          error?.error ||
          'Error submitting, please try again',
      )
    }
  }

  const handleCancel = () => {
    if (
      window.confirm('Are you sure you want to cancel? Your data will be lost.')
    ) {
      navigate(-1)
    }
  }

  return (
    <>
      <header className={styles.formHeader}>Add OPEX</header>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formContainer}>
          <fieldset className={`${styles.formColumn}`}>
            <div className={styles.formRow}>
              <label htmlFor="expenseCategory">Expense Category:</label>
              <select
                name="expenseCategory"
                id="expenseCategory"
                value={formData.expenseCategory}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {expenseCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formRow}>
              <label htmlFor="paymentMethod">Payment Method:</label>
              <select
                name="paymentMethod"
                id="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="">Select Payment Method</option>
                {paymentMethods.map((method, index) => (
                  <option key={index} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset className={`${styles.formColumn}`}>
            <div className={styles.formRow}>
              <label htmlFor="expenseDescription">Expense Description:</label>
              <textarea
                name="expenseDescription"
                id="expenseDescription"
                value={formData.expenseDescription}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="vendorPayee">Vendor/Payee (Optional):</label>
              <input
                type="text"
                name="vendorPayee"
                id="vendorPayee"
                value={formData.vendorPayee}
                onChange={handleChange}
              />
            </div>
          </fieldset>

          <fieldset className={`${styles.formColumn}`}>
            <div className={styles.formRow}>
              <label htmlFor="amount">Amount (N):</label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="note">Notes:</label>
              <textarea
                name="note"
                id="note"
                value={formData.note}
                onChange={handleChange}
              />
            </div>
          </fieldset>

          <fieldset className={styles.actionGroup}>
            <div className={styles.addMoreCheckbox}>
              <input
                type="checkbox"
                id="addAnotherExpense"
                checked={addAnotherExpense}
                onChange={(e) => setAddAnotherExpense(e.target.checked)}
              />
              <label htmlFor="addAnotherExpense">Add another Expense</label>
            </div>
            <div className={styles.actionButtons}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </fieldset>
        </div>
      </form>
    </>
  )
}

export default AddOpex
