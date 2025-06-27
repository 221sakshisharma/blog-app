import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.status)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default Protected
