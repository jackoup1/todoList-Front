import { API_BASE } from "./config.js";

const todoListEl = document.getElementById("todoList");
const newTodoInput = document.getElementById("newTodo");
const addTodoForm = document.getElementById("addTodoForm");
const clearAllBtn = document.getElementById("clearAll");

async function fetchTodos() {
    try {
        const res = await fetch(`${API_BASE}/todoList`, { credentials: "include" });
        const data = await res.json();
        todoListEl.innerHTML = "";
        data.forEach(todo => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${todo.title}</span>
                            <button class="delete-btn" onclick="deleteTodo('${todo._id}')">Delete</button>`;
            todoListEl.appendChild(li);
        });
    } catch (err) {
        console.error(err);
        alert("Failed to load todos");
    }
}

window.deleteTodo = async function(id) {
    await fetch(`${API_BASE}/todoList/delete/${id}`, {
        method: "DELETE",
        credentials: "include"
    });
    fetchTodos();
};

async function addTodo(title) {
    await fetch(`${API_BASE}/todoList/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
        credentials: "include"
    });
    fetchTodos();
}

async function clearTodos() {
    await fetch(`${API_BASE}/todoList/clear`, {
        method: "DELETE",
        credentials: "include"
    });
    fetchTodos();
}

addTodoForm.addEventListener("submit", e => {
    e.preventDefault();
    addTodo(newTodoInput.value);
    newTodoInput.value = "";
});

clearAllBtn.addEventListener("click", clearTodos);

// Load todos initially
fetchTodos();
