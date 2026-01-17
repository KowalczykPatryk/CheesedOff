import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/recipes" element={<Recipes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
