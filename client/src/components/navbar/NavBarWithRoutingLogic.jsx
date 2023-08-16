import { useLocation, useParams } from "react-router-dom"
import NavBar from "./NavBar"


const NavBarWithRoutingLogic = () => {
  const {id} = useParams()
  const location = useLocation()
  const currentPath = location.pathname
  console.log(currentPath);

  const shouldShowSearchBar = currentPath !== `/detalles/${id}`

  return <NavBar shouldShowSearchBar = {shouldShowSearchBar}/> 
}

export default NavBarWithRoutingLogic