const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.routes");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/products");

app.use("/products", productRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
