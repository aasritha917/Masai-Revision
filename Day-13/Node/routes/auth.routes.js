const express = require("express");
const { registerValidation } = require("../middlewares/validate");
const router = express.Router();

router.post("/register", registerValidation, (req, res) => {
  res.json({ success: true, message: "User registered" });
});

module.exports = router;
