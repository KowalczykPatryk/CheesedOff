import { useState } from "react";

function Register() 
{
    const [form, setForm] = useState({
        username: "",
        email: "",
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
            setError(data.error || "Registration failed");
            return;
        }

        setSuccess("Account created successfully");
    }

    return (
        <div>
            <h1>Register</h1>

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
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                /><br />

                <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                /><br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
