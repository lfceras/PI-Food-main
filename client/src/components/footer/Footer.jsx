import styles from './footer.module.css'
import {BsFacebook} from 'react-icons/bs'
import {BsInstagram} from 'react-icons/bs'
import {BsWhatsapp} from 'react-icons/bs'
import Filtros from '../filtros/Filtros'
import logo from '../../assets/cooking.png'
import {VscChromeClose, VscListFilter} from 'react-icons/vsc'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'


const Footer = () => {

  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  const burguerIcon = (
    <VscListFilter
    style={{
      overflow: "visible",
      cursor: "pointer",
    }}
    size="35px"
    onClick={()=> setOpen(!open)}
    />
  )

  const closeBurger = (
    <VscChromeClose
    style={{
      overflow: "visible",
      cursor: "pointer",
    }}
    size="35px"
    onClick={()=> setOpen(!open)}
    />
  )

  const handleClickOutside = (e)=>{
    if(containerRef.current && !containerRef.current.contains(e.target)){
      setOpen(false)
    }
  }

  useEffect(()=>{
    document.addEventListener("mousedown", handleClickOutside)
    return ()=>{
      document.removeEventListener("mousedown", handleClickOutside)
    }
  },[open])

  return (
    <div>
      <div className={styles.footer}>
        <div className={styles.filtros} ref={containerRef}>
          {open ? closeBurger : burguerIcon}
          {open && <Filtros/> }
        </div>
        <div className={styles.logo}>
          <img src={logo} alt="Not found" />
        </div>
        <div className={styles.redes}>
          <BsFacebook size={30}/>
          <BsInstagram size={30}/>
          <BsWhatsapp size={30}/>
        </div>
      </div>
    </div>
  )
}

export default Footer