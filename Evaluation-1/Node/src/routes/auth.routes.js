const router = require("express").Router();
const { generateKey } = require("../controllers/auth.controller");

router.post("/generate-key", generateKey);

module.exports = router;
