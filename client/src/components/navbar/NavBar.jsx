import NavBarMobile from './NavBarMobile'
import Naveggacion from './Naveggacion'
import styles from './navbar.module.css'
import logo from '../../assets/cooking.png'
import SearchBar from '../searchbar/SearchBar'
import { Link, useParams } from 'react-router-dom'
import Logout from '../logout/Logout'
import { useAuthenticated } from '../../../hooks/useAuthenticated'

// eslint-disable-next-line react/prop-types
const NavBar = () => {
  const isAuthenticated = useAuthenticated()
  const { id } = useParams()

  const currentPath = window.location.pathname
  // console.log(currentPath);

  const shouldShowSearchBar = currentPath !== `/detalles/${id}`

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          {!isAuthenticated ? (
            <Link to={'/home'}>
              <img src={logo} alt='Not found' />
            </Link>
          ) : (
            ''
          )}
        </div>

        <div className={styles.links}>
          <Naveggacion />
          {!isAuthenticated ? (
            <NavBarMobile />
          ) : (
            <ul className={styles.link2}>
            <Link
              to={'/create'}
              style={{
                textDecoration: 'none',
                color: 'black',
                cursor: 'pointer'
              }}
            >
              <li>Crear Receta</li>
            </Link>

            <Link
              to={'/register'}
              style={{
                textDecoration: 'none',
                color: 'black',
                cursor: 'pointer'
              }}
            >
              <li>Crear Usuario</li>
            </Link>


            </ul>
          )}
        </div>
        {shouldShowSearchBar && (
          <div>
            <SearchBar />
          </div>
        )}

        {!isAuthenticated ? (
          <Link to='/login'>
            <button>Login</button>
          </Link>
        ) : (
          <Logout />
        )}
      </header>
    </div>
  )
}

export default NavBar
