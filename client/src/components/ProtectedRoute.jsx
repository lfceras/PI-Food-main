import { useAuthenticated } from '../../hooks/useAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const { token } = useAuthenticated()
  if (!token) {
    return <Navigate to='/login' /> 
  }

  return <Outlet />
}

export default ProtectedRoute
