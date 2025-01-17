import React, { useState } from 'react'
import moment from 'moment'
import PermissionsSection from './PermissionsSection'
import EditUserModal from './EditUserModal'

const dummyData = [
  {
    userId: 1,
    username: 'Annette Black',
    email: 'johndoe@example.com',
    added_date: '2023-01-01',
    status: 'active',
    role: 'Manager',
    storeName: 'Main Store',
  },
  {
    userId: 2,
    username: 'Ben Samiel',
    email: 'janedoe@example.com',
    added_date: '2023-01-05',
    status: 'inactive',
    role: 'Assistant',
    storeName: 'Branch Store',
  },
]

const UserSettingsTable = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [editUserModal, showEditUserModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 1 // Adjust if implementing real pagination

  const handleUserSelect = (user) => {
    setUserInfo(user)
  }
  const launchEditUserModal = (user) => {
    setUserInfo(user)
    showEditUserModal(true)
  }
  const closeEditUserModal = () => {
    showEditUserModal(false)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const getStatusBadgeColor = (status) => {
    return status === 'active'
      ? 'bg-green-200 text-green-800'
      : 'bg-red-200 text-red-800'
  }

  const capitalizedWords = (words) => {
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {[
                'Select',
                'Username',
                'Email',
                'Added Date',
                'Status',
                'Role',
                'Department',
                'Action',
              ].map((header) => (
                <th
                  key={header}
                  className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dummyData.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="py-2 px-4 text-center text-sm text-gray-500"
                >
                  No user members found.
                </td>
              </tr>
            ) : (
              dummyData.map((user) => (
                <tr
                  key={user.userId}
                  className={`cursor-pointer ${userInfo?.userId === user.userId ? 'bg-blue-100' : ''}`}
                >
                  <td className="py-2 px-4 border-b text-sm">
                    <input
                      type="checkbox"
                      checked={userInfo?.userId === user.userId}
                      onChange={() => handleUserSelect(user)}
                    />
                  </td>
                  {[
                    'username',
                    'email',
                    'added_date',
                    'status',
                    'role',
                    'storeName',
                  ].map((key, index) => (
                    <td
                      key={index}
                      className="py-2 px-4 border-b text-sm"
                      onClick={() => handleUserSelect(user)}
                    >
                      {key === 'added_date' ? (
                        moment(user[key]).format('DD/MM/yyyy')
                      ) : key === 'status' ? (
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-sm ${getStatusBadgeColor(user.status)}`}
                        >
                          {capitalizedWords(user.status.split(' '))}
                        </span>
                      ) : (
                        user[key] || 'N/A'
                      )}
                    </td>
                  ))}
                  <td className="py-2 px-4 border-b text-sm">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        console.log('Edit user:', user)
                        launchEditUserModal(user)
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-3 py-1 text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {editUserModal && showEditUserModal && (
        <EditUserModal
          visible={showEditUserModal}
          userInfo={userInfo}
          onClose={closeEditUserModal}
          //   refetch={refetch}
        />
      )}
      <div>
        <PermissionsSection />
      </div>
    </div>
  )
}

export default UserSettingsTable
