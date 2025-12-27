const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const USER = {
  username: "admin",
  password: "1234"
};

app.post("/login", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const base64 = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64, "base64").toString();
  const [username, password] = decoded.split(":");

  if (username === USER.username && password === USER.password) {
    res.cookie("auth", "true", { httpOnly: true });
    return res.json({ message: "Login successful" });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

function authMiddleware(req, res, next) {
  if (req.cookies.auth === "true") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to Dashboard" });
});

app.get("/", (req, res) => {
  res.send("Public Home Page");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
