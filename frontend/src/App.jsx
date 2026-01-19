import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";
import MyRecipes from "./pages/MyRecipes";
import AuthenticatedRoute from "./utils/AuthenticatedRoute";
import DripingCheese from "./backgrounds/DripingCheese";

function App() {
  return (
    <>
        <DripingCheese />
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/recipes" element={<AuthenticatedRoute><Recipes /></AuthenticatedRoute>}></Route>
            <Route path="/recipes/add" element={<AuthenticatedRoute><AddRecipe /></AuthenticatedRoute>}></Route>
            <Route path="/recipes/my" element={<AuthenticatedRoute><MyRecipes /></AuthenticatedRoute>}></Route>
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
