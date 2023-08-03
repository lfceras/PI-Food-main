import styles from './navbar.module.css'
import {VscMenu} from 'react-icons/vsc'
import {GrClose} from 'react-icons/gr'
import { useEffect, useState } from 'react';
import NavBarLinks from './NavBarLinks';
import { useRef } from 'react';

const NavBarMobile = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null)

  const burgerIcon = (
    <VscMenu
      className={styles.burger}
      size="35px"
      style={{
        overflow: "visible",
        cursor: "pointer",
        color: "black"
      }}
      onClick={() => setOpen(!open)}
    />
  );

  const closeBurger = (
    <GrClose
      className={styles.burger}
      size="35px"
      style={{
        overflow: "visible",
        cursor: "pointer",
        color: "black"
      }}
      onClick={() => setOpen(!open)}
    />
  );

  const closeMobileMenu = () => setOpen(false);

  const handleClickOutside = (e)=>{
    if(containerRef.current && !containerRef.current.contains(e.target)){
      setOpen(false)
    }
  }

  useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside)
    return ()=>{
      document.removeEventListener('mousedown', handleClickOutside)
    }
  },[open])

  return (
    <div className={styles.mobile} ref={containerRef}>
      {open ? closeBurger : burgerIcon}
      {open && (
        <NavBarLinks isMobile={true} closeMobileMenu={closeMobileMenu}/>
      )}
    </div>
  )
}

export default NavBarMobile