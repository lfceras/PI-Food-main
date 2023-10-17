import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Footer from "./components/footer/Footer";
// import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import AboutUs from "./components/aboutUs/AboutUs";
import CreateRecipe from "./components/createRecipe/CreateRecipe";
import Detalles from "./components/detalles/Detalles";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import NotFound from "./components/notFound/NotFound";


function App() {
  return (
    <>
      {/* <NavBarWithRoutingLogic/> */}
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/create" element={<CreateRecipe/>} />
        <Route path="/detalles/:id" element={<Detalles/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {/* <Footer /> */}
      {/* 
      987654gl

      luiscsmodelogeo@gmail.com
      */}
    </>
  );
}

export default App;
