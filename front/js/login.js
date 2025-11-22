import { API_BASE } from "./config.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
        username: form.username.value,
        password: form.password.value
    };

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });

        const result = await res.json();
        if (res.ok) {
            window.location.href = "index.html";
        } else {
            alert(result.message || "Login failed");
        }
    } catch (err) {
        console.error(err);
        alert("Error connecting to server");
    }
});
