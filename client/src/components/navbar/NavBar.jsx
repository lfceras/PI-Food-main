import NavBarMobile from './NavBarMobile'
import Naveggacion from './Naveggacion'
import styles from './navbar.module.css'
import logo from '../../assets/cooking.png'
import SearchBar from '../searchbar/SearchBar'

const NavBar = () => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Not found" />
        </div>

      <div className={styles.links}>
        <Naveggacion/>
        <NavBarMobile/>
      </div>

      <div >
        <SearchBar/>
      </div>

      </header>
    </div>
  )
}

export default NavBar