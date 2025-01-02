import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, userRole } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />
  }

  return children
}

export default ProtectedRoute
