const express = require("express");
const mongoose = require("mongoose");
const analyticsRoutes = require("./routes/analytics.routes");

mongoose.connect("mongodb://127.0.0.1:27017/analytics");

const app = express();
app.use("/api", analyticsRoutes);

app.listen(3000, () => console.log("Server running"));
