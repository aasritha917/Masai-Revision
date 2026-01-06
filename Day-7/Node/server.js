const express = require("express");
const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(new Error("Unauthorized"));
  }
  next();
};

const requestTimer = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`Request took ${duration}ms`);
  });

  next();
};

app.get(
  "/secure",
  logger,
  authenticate,
  requestTimer,
  (req, res) => {
    res.send("Secure Data Accessed");
  }
);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(401).json({ error: err.message });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
