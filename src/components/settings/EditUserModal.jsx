import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import ModalWrapper from '../common/ModalWrapper'
import OutlinedButton from '@src/features/reusables/Buttons/OutlinedButton'
import FilledButton from '@src/features/reusables/Buttons/FilledButton'

// Initial form state
const initialState = {
  username: '',
  email: '',
  storeId: '',
  permissions: '',
  role: '',
  status: '',
}

// Schema for form validation
export const userSchema = z.object({
  username: z.string().min(1, 'User Username is required'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role selection is required'),
  status: z.string().min(1, 'Status selection is required'),
})

// Dummy data for stores
const dummyStores = [
  { storeId: '1', storeName: 'Electronics' },
  { storeId: '2', storeName: 'Clothing' },
  { storeId: '3', storeName: 'Groceries' },
]

const EditUserModal = ({ visible, onClose, userInfo }) => {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Handle input changes
  const handleChange = (field, value) => {
    setErrors({})
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
    setApiError(null)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    // Validate form data
    try {
      userSchema.parse(formData)
      // Simulate API call to update user
      console.log('Updated User:', formData)
      // Reset form and close modal on success
      setFormData(initialState)
      onClose()
    } catch (error) {
      // Handle validation errors
      if (error.errors) {
        const fieldErrors = {}
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message
        })
        setErrors(fieldErrors)
      } else {
        setApiError(['Error updating user.'])
      }
    }
  }

  useEffect(() => {
    setErrors({})
    if (userInfo) {
      setFormData((prev) => ({
        ...userInfo,
      }))
    }
  }, [visible, userInfo])

  if (!visible) return null

  return (
    <ModalWrapper onClose={onClose}>
      <form className="relative flex-grow" onSubmit={handleSubmit}>
        {/* Modal header */}
        <div className="flex flex-col items-center justify-center px-4">
          <h3 className="mt-4 text-center text-lg font-bold text-gray-900">
            Edit Employee
          </h3>
        </div>
        {/* Modal body */}
        <div className="space-y-4 p-6">
          <div className="flex flex-col space-y-4">
            {apiError &&
              apiError.map((error, index) => (
                <p key={index} className="text-red-700">
                  {error}
                </p>
              ))}

            <div>
              <label className="text-xs mb-1">Employee Username</label>
              <input
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="User Name"
                type="text"
                className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              />
              {errors?.username && (
                <p className="pt-1 text-xs text-red-500">{errors.username}</p>
              )}
            </div>
            <div>
              <label className="text-xs mb-1">Employee Email</label>
              <input
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="User Email"
                type="email"
                className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              />
              {errors?.email && (
                <p className="pt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Store select dropdown */}
            <div>
              <label className="text-xs mb-1">Department</label>
              <select
                value={formData.storeId}
                onChange={(e) => handleChange('storeId', e.target.value)}
                className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              >
                <option disabled value="">
                  Select Department
                </option>
                {dummyStores.map((store) => (
                  <option key={store.storeId} value={store.storeId}>
                    {store.storeName}
                  </option>
                ))}
              </select>
              {errors?.storeId && (
                <p className="pt-1 text-xs text-red-500">{errors.storeId}</p>
              )}
            </div>
            <div>
              <label className="text-xs mb-1">Staff Role</label>
              <select
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              >
                <option disabled value="">
                  Select Role
                </option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Sales Employee">Sales Employee</option>
                <option value="Admin">Admin</option>
                <option value="Finance">Finance</option>
              </select>
              {errors?.role && (
                <p className="pt-1 text-xs text-red-500">{errors.role}</p>
              )}
            </div>
            <div>
              <label className="text-xs mb-1">Staff Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              >
                <option disabled value="">
                  Select Status
                </option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors?.status && (
                <p className="pt-1 text-xs text-red-500">{errors.status}</p>
              )}
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="flex items-center space-x-3 border-gray-200 p-6 rtl:space-x-reverse w-[90%] mx-auto">
          <OutlinedButton content={'Close'} performAction={onClose} />
          <FilledButton
            content={loading ? 'Please wait...' : 'Save'}
            // performAction={onClose}
          />
          {/* <button
            disabled={loading}
            type="submit"
            className=" text-center flex-grow border rounded-sm font-semibold px-8 py-2.5 text-xs focus:ring-imsLightPurple focus:ring-offset-2 focus:ring-1"
          >
            {loading ? 'Please wait...' : 'Save'}
          </button> */}
        </div>
      </form>
    </ModalWrapper>
  )
}

export default EditUserModal
