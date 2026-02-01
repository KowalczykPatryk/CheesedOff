import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Paper, Stack, TextField, TextareaAutosize, Tooltip, Input } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

function AddRecipe()
{
    const [form, setForm] = useState({
        recipeName: "",
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    function handleChange(e) 
    {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    function handleImageChange(e) {
        const file = e.target.files[0];
        setSelectedImage(file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    async function handleSubmit(e)
    {
        e.preventDefault();
    };

    return (
        <>
            <Button component={Link} to="/" variant="contained">Home</Button>
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Stack spacing={2}>
                        <h1>Add Recipe</h1>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <TextField 
                                label="Recipe Name" 
                                name="recipeName" fullWidth required 
                                value={form.recipeName}
                                onChange={handleChange}
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
                                        <div>
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
                                        <div style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center', 
                                            height: '200px',
                                            color: 'gray'
                                        }}>
                                            Image preview will appear here
                                        </div>
                                    )}
                                </Paper>
                                <Tooltip title="Enter the recipe in the markdown format" placement="top">
                                    <TextareaAutosize
                                    minRows={10}
                                    placeholder="Your recipe instructions..."
                                    style={{ width: "96%", padding: "15px", fontSize: "16px" }}
                                    />
                                </Tooltip>
                                <Button type="submit" variant="contained" color="primary">Submit</Button>
                            </Stack>
                        </form>
                    </Stack>
                </Paper>
            </Container>
        </>
    )
}

export default AddRecipe;