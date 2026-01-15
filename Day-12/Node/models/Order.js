const mongoose = require("mongoose");
module.exports = mongoose.model("Order",
  new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    amount: Number
  })
);
