import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Stack, Container, Paper, Snackbar, Alert } from "@mui/material";

function Register() 
{
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success"
    })

    function handleChange(e) 
    {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) 
    {
        e.preventDefault();

        const res = await fetch("/api/users/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) 
        {
            setNotification({...notification, open: true, message: Object.values(data).flat().join(" ") || "Registration failed", severity: "error"});
            return;
        }
        setNotification({...notification, open: true, message: data.message, severity: "success"});
        setForm({ username: "", email: "", password: "" });
        setTimeout(() => navigate("/login"), 1000);
    }

    return (
        <>
            <Button component={Link} to="/" variant="contained">Home</Button>

            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 3, mt: 20 }}>
                    <Stack spacing={2}>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={1}>
                                <TextField 
                                label="Username" 
                                name="username"
                                variant="outlined"
                                margin="normal"
                                value={form.username}
                                onChange={handleChange}
                                />

                                <TextField 
                                label="Email" 
                                name="email"
                                variant="outlined"
                                margin="normal"
                                value={form.email}
                                onChange={handleChange}
                                />

                                <TextField 
                                label="Password" 
                                name="password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                value={form.password}
                                onChange={handleChange}
                                />

                                <Button type="submit" variant="contained">Register</Button>

                                <p>Already have an account? <Link to="/login">Login</Link></p>
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
    );
}

export default Register;
