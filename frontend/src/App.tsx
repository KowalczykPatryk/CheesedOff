import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import AddRecipe from "./pages/AddRecipe";
import MyRecipes from "./pages/MyRecipes";
import AuthenticatedRoute from "./utils/AuthenticatedRoute";
import DripingCheese from "./backgrounds/DripingCheese";
import RecipeDetail from "./pages/RecipeDetail.jsx";
import EditRecipe from "./pages/EditRecipe.jsx";
import MyProfile from "./pages/MyProfile.jsx";

function App() {
  return (
    <>
        <DripingCheese />
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<AuthenticatedRoute><MyProfile /></AuthenticatedRoute>}></Route>
            <Route path="/recipes" element={<AuthenticatedRoute><Recipes /></AuthenticatedRoute>}></Route>
            <Route path="/recipes/:id" element={<AuthenticatedRoute><RecipeDetail /></AuthenticatedRoute>} />
            <Route path="/recipes/add" element={<AuthenticatedRoute><AddRecipe /></AuthenticatedRoute>}></Route>
            <Route path="/recipes/edit/:id" element={<AuthenticatedRoute><EditRecipe /></AuthenticatedRoute>} />
            <Route path="/recipes/my" element={<AuthenticatedRoute><MyRecipes /></AuthenticatedRoute>}></Route>
        </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
