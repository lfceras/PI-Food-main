import Logout from '../../logout/Logout'
import CardRecipes from '../cardRecipes/CardRecipes'
import CardUsers from '../cardUsers/CardUsers'
import styles from './homeAdmin.module.css'

const HomeAdmin = () => {
  return (
    <div>
      <div className={styles.line}>
        <Logout />
      </div>
      <div className={styles.title}>
        <h1>Admin Pannel</h1>
      </div>

      <div className={styles.container1}>
        <div>
          <CardUsers />
        </div>

        <div>
          <CardRecipes />
        </div>
      </div>
    </div>
  )
}

export default HomeAdmin
