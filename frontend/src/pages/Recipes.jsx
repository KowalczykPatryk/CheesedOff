import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Paper, Stack, TextField, TextareaAutosize, Tooltip, Input, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

function Recipes()
{
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {fetchRecipes();}, []);

    async function fetchRecipes()
    {
        setLoading(true);
        const res = await fetch("/api/recipes/", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }});
        if (res.ok)
        {
            const data = await res.json();
            setNotification({...notification, open: true, message: "Recipes fetched successfully", severity: "success"});
            setRecipes(data);
        }
        else
        {
            setNotification({...notification, open: true, message: "Failed to fetch recipes", severity: "error"});
        }
        setLoading(false);
    }

    return (
        <>
            <Button component={Link} to="/" variant="contained" sx={{position: 'fixed', top: 10, left: 10}}>Home</Button>
            <Button onClick={fetchRecipes} variant="contained" sx={{position: 'fixed', top: 10, right: 10}} disabled={loading}>
                Refresh Recipes
            </Button>
            {loading ? (
                <CircularProgress />
            ):(
                <>
                    {recipes.map(recipe => (
                        <div key={recipe.id}>
                            <Typography variant="h5">{recipe.title}</Typography>
                            <Typography variant="body1">{recipe.author}</Typography>
                        </div>
                    ))}
                </>
            )}
            <Snackbar
            open={notification.open}
            autoHideDuration={3000}
            onClose={() => setNotification({...notification, open: false})}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert 
                onClose={() => setNotification({...notification, open: false})} 
                severity={notification.severity} 
                variant="filled"
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    )
}
export default Recipes