import NavBarMobile from './NavBarMobile'
import Naveggacion from './Naveggacion'
import styles from './navbar.module.css'
import logo from '../../assets/cooking.png'
import SearchBar from '../searchbar/SearchBar'
import { Link, useParams } from 'react-router-dom'
import Logout from '../logout/Logout'

// eslint-disable-next-line react/prop-types
const NavBar = () => {
  const { id } = useParams()

  const currentPath = window.location.pathname
  // console.log(currentPath);

  const shouldShowSearchBar = currentPath !== `/detalles/${id}`

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to={'/home'}>
            <img src={logo} alt='Not found' />
          </Link>
        </div>

        <div className={styles.links}>
          <Naveggacion />
          <NavBarMobile />
        </div>
        {shouldShowSearchBar && (
          <div>
            <SearchBar />
          </div>
        )}
        <Logout/>
      </header>
    </div>
  )
}

export default NavBar
