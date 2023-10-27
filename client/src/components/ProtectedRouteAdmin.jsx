import { useAuthenticated } from '../../hooks/useAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const ProtectedRouteAdmin = () => {
  const { token } = useAuthenticated()
  const decoded = jwt_decode(token)
  const roles = decoded.roles
  if (roles !== 'admin') {
    return <Navigate to='/home' />
  }
  return <Outlet />
}

export default ProtectedRouteAdmin
