import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
// import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import AboutUs from "./components/aboutUs/AboutUs";
import CreateRecipe from "./components/createRecipe/CreateRecipe";
import Detalles from "./components/detalles/Detalles";


function App() {
  return (
    <>
      {/* <NavBarWithRoutingLogic/> */}
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/create" element={<CreateRecipe/>} />
        <Route path="/detalles/:id" element={<Detalles/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
