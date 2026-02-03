import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Typography, Card, CardHeader, CardMedia, CardContent, Avatar, CircularProgress, Container, Snackbar, Alert, Tooltip } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { marked } from "marked";

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        fetchRecipe();
    }, [id]);

    async function fetchRecipe() {
        setLoading(true);
        const res = await fetch(`/api/recipes/${id}/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        if (res.ok) {
            const data = await res.json();
            setRecipe(data);
            setNotification({...notification, open: true, message: "Recipe fetched successfully", severity: "success"});
        }
        else {
            setNotification({...notification, open: true, message: "Failed to fetch recipe", severity: "error"});
        }
        setLoading(false);
    }

    function renderMarkdownToHtml(markdownText) {
        return marked(markdownText);
    }

    return (
        <>
            <Container maxWidth="md">
                <Button
                    component={Link}
                    to="/recipes"
                    variant="contained"
                    sx={{position: 'fixed', top: 10, left: 10}}
                >
                    Back to Recipes
                </Button>
                
                {loading ? <CircularProgress sx={{ position: 'fixed', top: '50%', left: '50%' }} /> : 
                    (recipe &&
                        (
                        <Card sx={{ mt: 10 }}>
                            <CardHeader
                                avatar={
                                <Tooltip title={recipe.author} placement="left-start">
                                    <Avatar
                                        src={recipe.author_profile_image}
                                        alt={recipe.author}
                                    >
                                        {!recipe.author_profile_image && <PhotoCamera />}
                                    </Avatar>
                                </Tooltip>
                                }
                                title={recipe.title}
                                subheader={new Date(recipe.updated_at).toLocaleDateString()}
                            />
                            {recipe.image && (
                                <CardMedia
                                    component="img"
                                    image={recipe.image}
                                    alt={recipe.title}
                                    style={{ maxHeight: 400, objectFit: 'cover' }}
                                />
                            )}
                            <CardContent>
                                <Typography variant="body1" dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(recipe.instructions) }}>
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                                    Recipe created by {recipe.author}
                                </Typography>
                            </CardContent>
                        </Card>
                        )
                    )
                }
            </Container>
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
    );
}

export default RecipeDetail;