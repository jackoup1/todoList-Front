import { API_BASE } from "./config.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();

    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const result = await res.json();

        if (res.ok && result.token) {
            // Save JWT in localStorage
            localStorage.setItem("token", result.token);
            // Redirect to protected page
            window.location.href = "index.html";
        } else {
            alert(result.message || "Login failed");
        }
    } catch (err) {
        console.error(err);
        alert("Error connecting to server");
    }
});
