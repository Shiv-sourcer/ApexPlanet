// server/server.js
const express = require("express");
const pool = require("../db/db");
const cors = require("cors");

const app = express();
app.use(cors());

const path = require("path");

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());

// GET all todos
app.get("/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  res.json(result.rows);
});

// POST new todo
app.post("/todos", async (req, res) => {
  const { task } = req.body;
  const result = await pool.query("INSERT INTO todos (task) VALUES ($1) RETURNING *", [task]);
  res.json(result.rows[0]);
});

// DELETE todo
app.delete("/todos/:id", async (req, res) => {

  const { id } = req.params;
  await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  res.sendStatus(204);
});

// UPDATE completed
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  await pool.query("UPDATE todos SET completed = $1 WHERE id = $2", [completed, id]);
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
