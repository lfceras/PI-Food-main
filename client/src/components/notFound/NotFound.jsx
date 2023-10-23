import NavBar from '../navbar/NavBar'
import styles from './notFound.module.css'

const NotFound = () => {
  return (
    <div>
      <NavBar />
      <div className={styles.not_found}>
        <h1>404 Not Found</h1>
      </div>
    </div>
  )
}

export default NotFound
