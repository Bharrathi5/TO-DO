require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const key = process.env.SECRET_KEY;

const users = [];

app.use(cors());
app.use(express.json());

// Register route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });

  res.json({ message: "User registered successfully" });
});

// Login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);

  if (!user) return res.status(400).json({ error: "Invalid Username" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ error: "Invalid Password" });

  const token = jwt.sign({ username }, key, { expiresIn: "1h" });
  res.json({ token });
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
