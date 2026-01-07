const router = require("express").Router();
const verifyApiKey = require("../middleware/verifyApiKey");
const controller = require("../controllers/task.controller");

router.use(verifyApiKey);

router.get("/", controller.getAllTasks);
router.get("/:id", controller.getTask);
router.post("/", controller.createTask);
router.put("/:id", controller.updateTask);
router.patch("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);

module.exports = router;
