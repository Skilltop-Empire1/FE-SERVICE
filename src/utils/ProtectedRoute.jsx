import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import useSessionTimeout from './useSessionTimeout'

function ProtectedRoute({ children }) {
  const token =
    useSelector((state) => state?.auth.token) || localStorage.getItem('token')
  useSessionTimeout(30 * 60 * 1000)

  if (!token) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
