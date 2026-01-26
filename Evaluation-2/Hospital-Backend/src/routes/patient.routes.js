const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const c = require("../controllers/patient.controller");

router.use(auth, role(["patient"]));
router.post("/appointments", c.bookAppointment);
router.get("/appointments", c.myAppointments);
router.post("/tickets", c.raiseTicket);

module.exports = router;
