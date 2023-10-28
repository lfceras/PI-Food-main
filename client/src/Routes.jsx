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
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin'
import UpdateUser from './components/admin/updateUser/UpdateUser'
import RecipeTable from './components/admin/recipeTable/RecipeTable'
import UpdateRecipe from './components/admin/updateRecipe/UpdateRecipe'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='/' element={<ProtectedRoute />}>
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/detalles/:id' element={<Detalles />} />
      </Route>

      <Route path='/' element={<ProtectedRouteAdmin />}>
        <Route path='/adminhome' element={<HomeAdmin />} />
        <Route path='/users' element={<UserTable />} />
        <Route path='/recipes' element={<RecipeTable/>} />
        <Route path='/updateuser/:id' element={<UpdateUser/>}/>
        <Route path='/updaterecipe/:id' element={<UpdateRecipe/>}/>
        <Route path='/create' element={<CreateRecipe />} />
      </Route>
    </>
  )
)

export default router
