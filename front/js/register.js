import { API_BASE } from "./config.js";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value
    };

    try {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const result = await res.json();
        if (res.ok) {
            alert("User created successfully. Please login.");
            window.location.href = "login.html";
        } else {
            alert(result.message || "Registration failed");
        }
    } catch (err) {
        console.error(err);
        alert("Error connecting to server");
    }
});
