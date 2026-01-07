const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  apiKey: { type: String, required: true }
});

module.exports = mongoose.model("ApiKey", apiKeySchema);
