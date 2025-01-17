import React, { useState } from 'react'
import { z } from 'zod'
import RolesPermissionsCard from '../settings/RolePermissionCard'
import FilledButton from '@src/features/reusables/Buttons/FilledButton'

// Define Zod schema for form validation
const staffInviteSchema = z.object({
  username: z.string().min(1, 'Employee Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.string().min(1, 'Role is required'),
  permissions: z.array(
    z.object({
      label: z.string(),
      view: z.boolean(),
      create: z.boolean(),
      edit: z.boolean(),
      approval: z.boolean(),
    }),
  ),
})

// Dummy data for simulation
const dummyRoles = [
  { label: 'Manager' },
  { label: 'Super Admin' },
  { label: 'Employee' },
  { label: 'Sales Employee' },
  { label: 'Admin' },
  { label: 'Finance' },
]

const dummyPermissions = [
  { label: 'View', value: false },
  { label: 'Create', value: false },
  { label: 'Edit', value: false },
  { label: 'Delete', value: false },
]

const EmployeeInviteForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [role, setRole] = useState(dummyRoles[0].label) // Default to the first role
  const [permissions, setPermissions] = useState(dummyPermissions) // Use dummy permissions
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({}) // Reset errors before validation

    // Validate form data with Zod
    const validationResult = staffInviteSchema.safeParse({
      email,
      password,
      username,
      role, // Include role in validation
      permissions,
    })

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format()
      setErrors(fieldErrors)
      return
    }

    // Simulate submission
    setLoading(true)
    setTimeout(() => {
      console.log('Form Submitted:', {
        email,
        password,
        username,
        role,
        permissions,
      })
      setLoading(false)
      alert('Invite sent successfully!')

      // Reset form
      setEmail('')
      setPassword('')
      setUsername('')
      setRole(dummyRoles[0].label)
      setPermissions(dummyPermissions)
    }, 1000)
  }

  return (
    <div className="bg-white shadow-lg rounded-lg md:p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee Username
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-imsDarkPurple focus:border-imsring-imsDarkPurple sm:text-sm bg-transparent"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors?.username && (
              <p className="text-red-600 text-sm mt-1">
                {errors.username._errors}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-imsDarkPurple focus:border-imsring-imsDarkPurple sm:text-sm bg-transparent"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors?.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email._errors}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Password
            </label>
            <input
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-imsDarkPurple focus:border-imsring-imsDarkPurple sm:text-sm bg-transparent"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors?.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password._errors}
              </p>
            )}
          </div>
        </div>

        {/* Roles & Permissions */}
        <div className="mt-14">
          <RolesPermissionsCard
            showExport={false}
            onRoleChange={(role) => setRole(role)}
            onPermissionsChange={(permissions) => setPermissions(permissions)}
          />
          {errors?.role && (
            <p className="text-red-600 text-sm mt-1">{errors.role._errors}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center gap-4">
          <FilledButton
            content={loading ? 'Sending Invite...' : 'Send Invite'}
            performAction={handleSubmit}
          />
        </div>
      </form>
    </div>
  )
}

export default EmployeeInviteForm
