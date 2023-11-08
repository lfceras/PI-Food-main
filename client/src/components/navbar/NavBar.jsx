import NavBarMobile from './NavBarMobile'
import Naveggacion from './Naveggacion'
import styles from './navbar.module.css'
import logo from '../../assets/cooking.png'
import SearchBar from '../searchbar/SearchBar'
import { Link, useParams } from 'react-router-dom'
import Logout from '../logout/Logout'

const NavBar = () => {
  const { id } = useParams()

  const currentPath = window.location.pathname

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

        <Link to='/' style={{textDecoration:"none"}}>
          <Logout/>
        </Link>
      </header>
    </div>
  )
}

export default NavBar
