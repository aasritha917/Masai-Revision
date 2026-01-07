const ApiKey = require("../models/ApiKey");

module.exports = async (req, res, next) => {
  const { apiKey } = req.query;

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Valid API key required.",
      error: "Invalid or missing API key"
    });
  }

  const key = await ApiKey.findOne({ apiKey });

  if (!key) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Valid API key required.",
      error: "Invalid or missing API key"
    });
  }

  next();
};
