const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const c = require("../controllers/admin.controller");

router.use(auth, role(["admin"]));
router.get("/users", c.getUsers);
router.get("/stats", c.stats);

module.exports = router;
