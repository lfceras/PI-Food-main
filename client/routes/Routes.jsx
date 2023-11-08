import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'
import Home from '../src/components/home/Home.jsx'
import AboutUs from '../src/components/aboutUs/AboutUs.jsx'
import CreateRecipe from '../src/components/createRecipe/CreateRecipe.jsx'
import Login from '../src/components/login/Login.jsx'
import Detalles from '../src/components/detalles/Detalles.jsx'
import HomeAdmin from '../src/components/admin/homeAdmin/HomeAdmin.jsx'
import UserTable from '../src/components/admin/userTable/UserTable.jsx'
import Register from '../src/components/register/Register.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import ProtectedRouteAdmin from './ProtectedRouteAdmin.jsx'
import UpdateUser from '../src/components/admin/updateUser/UpdateUser.jsx'
import RecipeTable from '../src/components/admin/recipeTable/RecipeTable.jsx'
import UpdateRecipe from '../src/components/admin/updateRecipe/UpdateRecipe.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login />} />
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
