import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import Home from './components/home/Home'
import AboutUs from './components/aboutUs/AboutUs'
import CreateRecipe from './components/createRecipe/CreateRecipe'
import Login from './components/login/Login'
import Detalles from './components/detalles/Detalles'
import HomeAdmin from './components/admin/homeAdmin/HomeAdmin'
import UserTable from './components/admin/userTable/UserTable'
import Register from './components/register/Register'
import ProtectedRoute from './components/ProtectedRoute.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path='/detalles/:id' element={<Detalles />} />

      <Route path='/' element={<ProtectedRoute />}>
        <Route path='/adminhome' element={<HomeAdmin />} />
        <Route path='/users' element={<UserTable />} />
        <Route path='/create' element={<CreateRecipe />} />
        <Route path='/register' element={<Register />} />
      </Route>
    </>
  )
)

export default router
