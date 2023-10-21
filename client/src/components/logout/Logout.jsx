import { useNavigate } from "react-router-dom"

const Logout = () => {
  const navigate = useNavigate()
 
  const logOut = ()=>{
    localStorage.removeItem("token")
    navigate('/home')
  }

  return (
    <div>
      <button onClick={()=> logOut()}>
        Logout
      </button>
    </div>
  )
}

export default Logout