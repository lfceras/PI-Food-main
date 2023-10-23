import styles from './cardUser.module.css'
import userImage from '../../../assets/users-sinfondo.png'
import { Link } from 'react-router-dom'

const CardUsers = () => {
  return (
    <div className={styles.principal_users}>
      <Link to={'/users'} style={{textDecoration: "none", color: "black"}}>
      <div className={styles.principal2_users}>
        <div className={styles.contenedor_image}>
          <img src={userImage} alt='Not found' loading='lazy' />
        </div>
      </div>
      <h1>Users</h1>
      </Link>
    </div>
  )
}

export default CardUsers
