import { useNavigate } from "react-router-dom"
import styles from './logout.module.css'
import {TbLogout} from 'react-icons/tb'

const Logout = () => {
  const navigate = useNavigate()
 
  const logOut = ()=>{
    localStorage.removeItem("token")
    navigate('/login')
  }

  return (
    <div>
      <button onClick={()=> logOut()} className={styles.buton}>
        Logout <TbLogout size={20} />
      </button>
    </div>
  )
}

export default Logout