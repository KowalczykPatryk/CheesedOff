import { useState } from "react";


function Login() 
{
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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

        setError("");
        setSuccess("");

        const res = await fetch("/api/users/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (!res.ok) 
        {
            setError(data.error || "Login failed");
            return;
        }
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setSuccess("You are logged in");
    }

    return (
        <div>
            <h1>Login</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <input
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                /><br />

                <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                /><br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;