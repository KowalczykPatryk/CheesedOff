import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Snackbar, Alert, CircularProgress, Card, CardHeader, CardMedia, CardContent, Avatar, Tooltip, Rating } from "@mui/material";
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
    const stripMarkdown = (text) => {
        return text
            .replace(/#{1,6}\s?/g, '')
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\*(.*?)\*/g, '$1')
            .replace(/`(.*?)`/g, '$1')
            .replace(/```[\s\S]*?```/g, '')
            .replace(/\[([^\]]*)\]\([^\)]*\)/g, '$1')
            .replace(/!\[([^\]]*)\]\([^\)]*\)/g, '')
            .replace(/>\s/g, '')
            .replace(/^\s*[-*+]\s/gm, '')
            .replace(/^\s*\d+\.\s/gm, '') 
            .replace(/\n+/g, ' ')
            .trim();
    };

    return (
        <>
            <Button component={Link} to="/" variant="contained" sx={{position: 'fixed', top: 10, left: 10}}>Home</Button>
            <Button onClick={fetchRecipes} variant="contained" sx={{position: 'fixed', top: 10, right: 10}} disabled={loading}>
                Refresh Recipes
            </Button>
            {loading ? (
                <CircularProgress sx={{position: 'fixed', top: '50%', left: '50%'}}/>
            ):(
                <>
                    {recipes.map(recipe => (
                        <Card key={recipe.id} sx={{ maxWidth: 600, margin: '20px auto' }}>
                            <CardHeader
                                avatar={<Tooltip title={recipe.author} placement="left-start"><Avatar><PhotoCamera /></Avatar></Tooltip>}
                                title={recipe.title}
                                subheader={new Date(recipe.updated_at).toLocaleDateString()}
                            />
                            <CardMedia
                                component="img"
                                image={recipe.image}
                                alt={recipe.title}
                                style={{maxHeight: 400, objectFit: 'cover'}}
                            />
                            <CardContent>
                                <Typography variant="body2">
                                    {stripMarkdown(recipe.instructions).length > 200 ? stripMarkdown(recipe.instructions).substring(0,200) + "..." : stripMarkdown(recipe.instructions)}
                                </Typography>
                            </CardContent>
                            <Rating sx={{ ml: 2, mb: 2 }} defaultValue={2} size="medium" />
                        </Card>
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