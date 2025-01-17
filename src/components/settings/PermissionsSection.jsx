import FilledButton from '@src/features/reusables/Buttons/FilledButton'
import { Check, PencilIcon } from 'lucide-react'
import React, { useState, useEffect } from 'react'

// Custom Toggle Switch Component
const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`relative inline-flex h-5 px-1 w-10 cursor-pointer items-center rounded-full transition-colors duration-300 ${
        isOn ? 'border border-blue-600 bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute left-0 h-4 w-4 transform rounded-full shadow transition-transform duration-300 bg-white ${
          isOn ? 'translate-x-[21px]' : 'translate-x-[2px]'
        }`}
      />
    </div>
  )
}

const initialPermissions = [
  {
    label: 'Dashboard',
    view: true,
    create: false,
    edit: false,
    approval: false,
  },
  {
    label: 'Employees',
    view: false,
    create: false,
    edit: false,
    approval: false,
  },
  {
    label: 'Service Tracking',
    view: false,
    create: false,
    edit: false,
    approval: false,
  },
  {
    label: 'Clients',
    view: false,
    create: false,
    edit: false,
    approval: false,
  },
  {
    label: 'Inventory',
    view: true,
    create: false,
    edit: false,
    approval: false,
  },
  {
    label: 'Finance',
    view: false,
    create: false,
    edit: false,
    approval: false,
  },
  {
    label: 'Report',
    view: false,
    create: false,
    edit: false,
    approval: false,
  },
  {
    label: 'Communication',
    view: false,
    create: false,
    edit: false,
    approval: false,
  },
]

const SelectPermission = ({ onPermissionsChange, loadedPermissions }) => {
  const [permissions, setPermissions] = useState(
    loadedPermissions || initialPermissions,
  )

  const handleToggleChange = (rowIndex, permissionType) => {
    const updatedPermissions = permissions.map((permission, index) => {
      if (index === rowIndex) {
        return {
          ...permission,
          [permissionType]: !permission[permissionType],
        }
      }
      return permission
    })
    setPermissions(updatedPermissions)
    onPermissionsChange(updatedPermissions)
  }

  useEffect(() => {
    if (loadedPermissions) {
      setPermissions(loadedPermissions)
    } else {
      setPermissions(initialPermissions)
    }
  }, [loadedPermissions])

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-4 py-1  text-xs font-medium text-gray-500 uppercase tracking-wider">
              View
            </th>
            <th className="px-4 py-1  text-xs font-medium text-gray-500 uppercase tracking-wider">
              Create
            </th>
            <th className="px-4 py-1  text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
            <th className="px-4 py-1  text-xs font-medium text-gray-500 uppercase tracking-wider">
              Approval
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {permissions.map((permission, rowIndex) => (
            <tr key={rowIndex}>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center justify-between">
                  <span>{permission.label}</span>
                  <span>
                    <Check size={10} />
                  </span>
                </div>
              </td>
              {['view', 'create', 'edit', 'approval'].map((type) => (
                <td key={type} className="px-4 py-2 text-center">
                  <ToggleSwitch
                    isOn={permission[type]}
                    handleToggle={() => handleToggleChange(rowIndex, type)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const PermissionsSection = ({ showUpdatePermissionButton = true }) => {
  const [permissions, setPermissions] = useState(initialPermissions)
  const [isLoadingMutation, setIsLoadingMutation] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const handlePermissionsChange = (newPermissions) => {
    setPermissions(newPermissions)
  }

  const handleUpdatePermission = () => {
    setIsLoadingMutation(true)
    setTimeout(() => {
      setIsLoadingMutation(false)
      setIsSuccess(true)
    }, 1000)
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex flex-col gap-4 rounded-lg px-4 py-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">Permissions</span>
          <PencilIcon size={18} />
        </div>
        <div className="flex flex-col gap-4">
          <SelectPermission
            loadedPermissions={permissions}
            onPermissionsChange={handlePermissionsChange}
          />
          <div className="text-center">
            {isSuccess && (
              <p className="text-green-400">
                Permissions Updated Successfully!
              </p>
            )}

            {isError && <p>Error Updating Permissions</p>}
          </div>
          {showUpdatePermissionButton && (
            <div className="my-4 w-full flex items-center justify-center">
              <FilledButton
                content={isLoadingMutation ? 'Updating' : 'Update Permission'}
                performAction={handleUpdatePermission}
                disabled={isLoadingMutation}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PermissionsSection
