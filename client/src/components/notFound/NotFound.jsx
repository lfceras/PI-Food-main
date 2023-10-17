import NavBar from '../navbar/NavBar'
import styles from './notFound.module.css'
import { useAuthenticated } from '../../../hooks/useAuthenticated'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const isAuthenticaded = useAuthenticated()
  const navigate = useNavigate()

  if (isAuthenticaded) {
    return (
      <div>
        <NavBar />
        <div className={styles.not_found}>
          <h1>404 Not Found</h1>
        </div>
      </div>
    )
  }else{
    navigate('/login')
  }
}

export default NotFound
