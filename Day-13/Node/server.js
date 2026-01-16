const express = require("express");
const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use(errorHandler);

app.listen(3000, () => console.log("Auth server running"));
