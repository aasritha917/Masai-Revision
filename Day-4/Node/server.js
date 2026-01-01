const express = require("express");
const app = express();

const rateLimitStore = {};

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const currentTime = Date.now();
  const windowTime = 60 * 1000; 
  const limit = 10;

  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = {
      count: 1,
      startTime: currentTime
    };
    return next();
  }

  const data = rateLimitStore[ip];

  if (currentTime - data.startTime > windowTime) {
 
    rateLimitStore[ip] = {
      count: 1,
      startTime: currentTime
    };
    return next();
  }

  if (data.count >= limit) {
    return res.status(429).json({
      message: "Too many requests. Try again after 1 minute."
    });
  }

  data.count++;
  next();
};

app.use(rateLimiter);

app.get("/", (req, res) => {
  res.send("API working fine");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
