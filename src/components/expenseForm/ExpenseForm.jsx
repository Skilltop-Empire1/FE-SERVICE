import { useState } from 'react'
import styles from './ExpenseForm.module.css'

export default function ExpenseForm({ fields, onSubmit }) {
  const [formData, setFormData] = useState({})
  const [receipt, setReceipt] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null
    setReceipt(file)

    if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formDataObj = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value)
    })
    if (receipt) {
      formDataObj.append('receipt', receipt)
    }
    onSubmit(formDataObj)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.flexContainer}>
        {fields.map((field) => (
          <div key={field.name} className={styles.inputGroup}>
            <label className={styles.label}>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        ))}
        {/* Image Upload */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Receipt</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
          {preview && (
            <img
              src={preview}
              alt="Receipt Preview"
              className={styles.previewImage}
            />
          )}
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  )
}
