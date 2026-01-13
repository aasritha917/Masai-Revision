const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  rating: Number,
  inStock: Boolean
});


productSchema.index({ name: "text" });
productSchema.index({ category: 1, price: 1 });

module.exports = mongoose.model("Product", productSchema);
