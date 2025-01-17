import React, { useState, useEffect } from 'react'
import { PencilIcon } from 'lucide-react'
import PermissionsSection from './PermissionsSection'

const RolesPermissionsCard = ({
  showExport = true,
  onRoleChange,
  onPermissionsChange,
}) => {
  const [selectedRole, setSelectedRole] = useState(dummyRoles[0].label)
  const [permissions, setPermissions] = useState(dummyPermissions)

  // Handle role change
  const handleRoleChange = (label) => {
    setSelectedRole(label)
    if (onRoleChange) {
      onRoleChange(label) // Pass the selected role back to the parent
    }
  }

  // Handle permissions change
  const handlePermissionsChange = (updatedPermissions) => {
    setPermissions(updatedPermissions)
    if (onPermissionsChange) {
      onPermissionsChange(updatedPermissions) // Pass updated permissions back to the parent
    }
  }

  // Pass initial permissions to parent on mount
  useEffect(() => {
    if (onPermissionsChange) {
      onPermissionsChange(permissions)
    }
    if (onRoleChange) {
      onRoleChange(selectedRole)
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
      <div className="flex flex-col gap-4 bg-gray-100 rounded-lg px-8 py-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">Role</span>
          <PencilIcon size={18} />
        </div>
        <div className="flex flex-col gap-3">
          {dummyRoles.map(({ label }, index) => (
            <label
              key={index}
              htmlFor={label}
              className="text-md flex items-center gap-2"
            >
              <input
                type="checkbox"
                className="h-5 w-5 rounded-full bg-imsLightPurple border-transparent focus:ring-0"
                id={label}
                checked={selectedRole === label} // Check if this role is selected
                onChange={() => handleRoleChange(label)} // Update state on change
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <PermissionsSection
          permissions={permissions}
          onPermissionsChange={handlePermissionsChange}
          showUpdatePermissionButton={false}
        />
      </div>
    </div>
  )
}

export default RolesPermissionsCard

export const dummyRoles = [
  { label: 'Manager' },
  { label: 'Super Admin' },
  { label: 'Employee' },
  { label: 'Human Resource (HR)' },
  { label: 'Admin' },
  { label: 'Finance' },
]

const dummyPermissions = [
  { label: 'View', value: false },
  { label: 'Create', value: false },
  { label: 'Edit', value: false },
  { label: 'Delete', value: false },
]
