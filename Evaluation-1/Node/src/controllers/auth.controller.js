const ApiKey = require("../models/ApiKey");
const generateApiKey = require("../utils/generateApiKey");
const validator = require("validator");

exports.generateKey = async (req, res) => {
  const { email } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  const exists = await ApiKey.findOne({ email });
  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Email already registered. Use existing API key."
    });
  }

  const apiKey = generateApiKey();
  const record = await ApiKey.create({ email, apiKey });

  res.status(201).json({
    success: true,
    message: "API key generated successfully",
    data: record
  });
};
