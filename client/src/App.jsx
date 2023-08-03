import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import AboutUs from "./components/aboutUs/AboutUs";
import CreateRecipe from "./components/createRecipe/CreateRecipe";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/create" element={<CreateRecipe/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
