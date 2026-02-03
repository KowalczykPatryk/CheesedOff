import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Paper, Stack, TextField, TextareaAutosize, Tooltip, Input, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

function EditRecipe()
{
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        image: null,
        instructions: "",
    });
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success"
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        loadCurrentRecipeData();
    }, []);

    function handleTitleChange(e) 
    {
        setForm({
            ...form,
            title: e.target.value,
        });
    };

    function handleImageChange(e) 
    {
        const file = e.target.files[0];
        setSelectedImage(file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setForm({...form, image: file});
        } else {
            setImagePreview(null);
        }
    };
    function handleTextChange(e)
    {
        setForm({
            ...form,
            instructions: e.target.value,
        });
    }
    function handleDrop(e) 
    {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setForm({...form, image: file});
        } else {
            setImagePreview(null);
        }
    };

    async function loadCurrentRecipeData()
    {
        const res = await fetch(`/api/recipes/${id}/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }});
        if (res.ok)
        {
            const data = await res.json();
            setForm({
                title: data.title,
                instructions: data.instructions,
            });
            setImagePreview(data.image);

            document.getElementById("title").value = data.title;
            document.getElementById("instructions").value = data.instructions;
        }
    }

    async function handleSubmit(e)
    {
        e.preventDefault();
        setLoading(true);
        
        const formData = new FormData();
        formData.append('title', form.title);
        formData.append('instructions', form.instructions);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }
        
        const res = await fetch(`/api/recipes/edit/${id}/`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: formData,
        });

        const data = await res.json();

        if (!res.ok) 
        {
            setNotification({...notification, open: true, message: Object.values(data).flat().join(" ") || "Editing recipe failed", severity: "error"});
            setLoading(false);
            return;
        }
        setNotification({...notification, open: true, message: data.message, severity: "success"});
        setForm({ title: "", image: null, instructions: "" });
        setTimeout(() => navigate("/recipes/my"), 500);
        setLoading(false);
    };

    return (
        <>
            {loading && <CircularProgress sx={{position: 'fixed', top: '50%', left: '50%'}}/>}
            <Button component={Link} to="/recipes/my" variant="contained" sx={{position: 'fixed', top: 10, left: 10}}>Back to My Recipes</Button>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Stack spacing={2}>
                        <Typography variant="h4">Add Recipe</Typography>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <TextField 
                                label="Recipe Title" 
                                id="title"
                                name="title" fullWidth required 
                                value={form.title}
                                onChange={handleTitleChange}
                                />
                                <Button
                                variant="contained"
                                component="label"
                                startIcon={<PhotoCamera />}
                                >
                                    Upload Image
                                    <Input
                                        type="file"
                                        inputProps={{ accept: "image/*" }}
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                    />
                                </Button>
                                <Paper elevation={2} sx={{ p: 2, textAlign: 'center', minHeight: '200px' }}>
                                    {imagePreview ? (
                                        <div
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        >
                                            <img 
                                                src={imagePreview} 
                                                alt="Recipe preview" 
                                                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '8px'}} 
                                            />
                                            <p style={{ marginTop: '10px', color: "gray" }}>
                                                {selectedImage?.name}
                                            </p>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: 'gray'}}
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        >
                                            After you select or drop an image, a preview will appear here
                                        </div>
                                    )}
                                </Paper>
                                <Tooltip title="Enter the recipe in the markdown format" placement="top">
                                    <TextareaAutosize
                                    id="instructions"
                                    minRows={10}
                                    placeholder="Your recipe instructions..."
                                    style={{ width: "96%", padding: "15px", fontSize: "16px" }}
                                    onChange={handleTextChange}
                                    />
                                </Tooltip>
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                            </Stack>
                        </form>
                    </Stack>
                </Paper>
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
    )
}

export default EditRecipe;