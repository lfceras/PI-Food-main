/* eslint-disable react/prop-types */
import styles from './navbar.module.css'
import { Link } from 'react-router-dom'

const NavBarLinks = (props) => {
  return (
    <div>
      <nav className={styles.navigation}>
        <ul className={styles.link}>
          <Link
            to={'/home'}
            style={{
              textDecoration: 'none',
              color: 'black',
              cursor: 'pointer'
            }}
            onClick={props.isMobile && props.closeMobileMenu}
          >
            <li>Home</li>
          </Link>

          <Link
            to={'/create'}
            style={{
              textDecoration: 'none',
              color: 'black',
              cursor: 'pointer'
            }}
            onClick={props.isMobile && props.closeMobileMenu}
          >
            <li>Crear Receta</li>
          </Link>

          <Link
            to={'/about'}
            style={{
              textDecoration: 'none',
              color: 'black',
              cursor: 'pointer'
            }}
            onClick={props.isMobile && props.closeMobileMenu}
          >
            <li>About us</li>
          </Link>
        </ul>
      </nav>
    </div>
  )
}

export default NavBarLinks
