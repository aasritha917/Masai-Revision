const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET_KEY = "mysecretkey";

const users = [];

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  res.json({ message: "Signup successful" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" } 
  );

  res.json({ token });
});

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token expired or invalid" });
    }

    req.user = decoded;
    next();
  });
}

app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
