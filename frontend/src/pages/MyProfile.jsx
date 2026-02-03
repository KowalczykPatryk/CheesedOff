import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, CircularProgress, Container, Snackbar, Alert, Input, Paper, Stack } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

function MyProfile() {

    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        profileImage: null,
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        setLoading(true);
        const res = await fetch(`/api/users/profile/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
            }
        });
        if (res.ok) {
            const data = await res.json();
            setProfile({...profile, username: data.username, email: data.email, profileImage: data.profile_image});
            if (data.profile_image) {
                setImagePreview(data.profile_image);
                setSelectedImage(null);
            }
            else {
                setImagePreview(null);
                setSelectedImage(null);
            }
            setNotification({...notification, open: true, message: "Profile fetched successfully", severity: "success"});
        }
        else {
            setNotification({...notification, open: true, message: "Failed to fetch profile", severity: "error"});
        }
        setLoading(false);
    }


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
            setProfile({...profile, profileImage: file});
        } else {
            setImagePreview(null);
        }
    };
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
            setProfile({...profile, profileImage: file});
        } else {
            setImagePreview(null);
        }
    };

    async function sendProfileImage() {
        if (!selectedImage) {
            setNotification({...notification, open: true, message: "No image selected", severity: "error"});
            return;
        }
        const formData = new FormData();
        formData.append("profile_image", selectedImage);
        const res = await fetch('/api/users/profile/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: formData
        });
        if (res.ok) {
            setNotification({...notification, open: true, message: "Profile image set successfully", severity: "success"});
        } else {
            setNotification({...notification, open: true, message: "Failed to set profile image", severity: "error"});
        }
    }

    return (
        <>
            <Container maxWidth="md">
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    sx={{position: 'fixed', top: 10, left: 10}}
                >
                    Home
                </Button>
                
                {loading ? <CircularProgress sx={{ position: 'fixed', top: '50%', left: '50%' }} /> : 
                    (profile &&
                        (
                        <Paper sx={{ p: 4, mt: 10 }}>
                            <Stack spacing={4}>
                                <Paper elevation={2} sx={{ p: 2, textAlign: 'center', minHeight: '200px' }}>
                                    {imagePreview ? (
                                        <div
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        >
                                            <img 
                                                src={imagePreview} 
                                                alt="Profile preview" 
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
                                <Button
                                variant="contained"
                                component="label"
                                startIcon={<PhotoCamera />}
                                >
                                    Upload Profile Image
                                    <Input
                                        type="file"
                                        inputProps={{ accept: "image/*" }}
                                        style={{ display: 'none' }}
                                        onChange={handleImageChange}
                                    />
                                </Button>
                                <Typography variant="h5" sx={{ textAlign: 'center' }}>{profile.username}</Typography>
                                <Typography variant="h5" sx={{ textAlign: 'center' }}>{profile.email}</Typography>
                                <Button variant="contained" onClick={sendProfileImage}>Save Profile Image</Button>
                            </Stack>
                        </Paper>
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

export default MyProfile;