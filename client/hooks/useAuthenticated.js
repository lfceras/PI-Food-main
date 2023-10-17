import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const useAuthenticated = ()=>{
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[navigate, token])
  return{
    token
  }
}

