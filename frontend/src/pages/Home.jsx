import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Box, Typography, TextField, Stack, Container, Paper, Snackbar, Alert, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Fab } from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DehazeIcon from '@mui/icons-material/Dehaze';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd';
import { isLoggedIn } from "../utils/auth";

function Home() 
{
    const navigate = useNavigate();

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const [sidebar, setSidebar] = useState({
        open: false,
    });

    function logout()
    {
        localStorage.removeItem("accessToken"); 
        localStorage.removeItem("refreshToken");
        setNotification({...notification, open: true, message: "Au Revoir", severity: "success"});
    }

    return (
        <>
            <Button onClick={() => setSidebar({open: true})} variant="contained"><DehazeIcon /></Button>
            <Drawer open={sidebar.open} onClose={() => setSidebar({open: false})}>
                <List>
                    {!isLoggedIn() ? (
                        <>
                            <ListItem key="register" disablePadding onClick={() => navigate("/register")}>
                                <ListItemButton>
                                <ListItemIcon>
                                    <AppRegistrationIcon />
                                </ListItemIcon>
                                <ListItemText primary="Register" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem key="login" disablePadding onClick={() => navigate("/login")}>
                                <ListItemButton>
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    ) : (
                        <>
                             <ListItem key="logout" disablePadding onClick={logout}>
                                <ListItemButton>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem key="myRecipes" disablePadding onClick={() => navigate("/recipes/my")}>
                                <ListItemButton>
                                <ListItemIcon>
                                    <PersonIcon />
                                </ListItemIcon>
                                <ListItemText primary="My Recipes" />
                                </ListItemButton>
                            </ListItem>
                        </>
                    )
                    }
                    <ListItem key="recipes" disablePadding onClick={() => navigate("/recipes")}>
                        <ListItemButton>
                        <ListItemIcon>
                            <LocalDiningIcon />
                        </ListItemIcon>
                        <ListItemText primary="Recipes" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>

            <Box
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}
                >
                <Stack spacing={3}>
                    <Typography variant="h2" fontWeight="bold"   sx={{
                        py: 2,
                        borderRadius: "20px",
                        color: "#44370a",
                        backgroundColor: "#FFD966",
                        boxShadow: 3,
                        backgroundImage: `
                        radial-gradient(circle 20px at 50% 20%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 15px at 30% 25%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 30px at 70% 15%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 30px at 50% 70%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 10px at 40% 10%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 10px at 10% 90%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 40px at 10% 18%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 20px at 15% 25%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 40px at 90% 95%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 12px at 80% 25%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 14px at 70% 90%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 37px at 30% 75%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 45px at 95% 5%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 45px at 0% 55%, #b68f26 50%, transparent 60%),
                        radial-gradient(circle 15px at 99% 50%, #b68f26 50%, transparent 60%)
                        `,
                    }}>
                        CheesedOff
                    </Typography>

                    <Typography variant="h7" color="text.secondary">
                        "The real question is should we trust people who don't like cheese?"
                    </Typography>

                    <Typography variant="h8" color="text.secondary">
                        Jim Gaffigan
                    </Typography>

                    <Typography variant="h6" color="text.primary">
                        Share and manage your favorite recipes
                    </Typography>

                    <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate("/recipes")}
                    >
                        Browse Recipes
                    </Button>
                    </Stack>
                </Stack>
            </Box>

            <Fab
            component={Link}
            to="/recipes/add"
            variant="extended" 
            size="medium" 
            color="primary"
            sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
            }}>
                <FormatListBulletedAddIcon sx={{ mr: 1 }} />
                Add New Recipe
            </Fab>

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

export default Home;