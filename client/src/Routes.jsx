import {Route, Routes} from 'react-router-dom'
import Footer from './components/footer/Footer'
import NavBar from './components/navbar/NavBar'
import Home from './components/home/Home'
import AboutUs from './components/aboutUs/AboutUs'
import CreateRecipe from './components/createRecipe/CreateRecipe'

const RoutesFood = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/create' element={<CreateRecipe/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default RoutesFood
