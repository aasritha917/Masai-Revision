const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const c = require("../controllers/doctor.controller");

router.use(auth, role(["doctor"]));
router.get("/appointments", c.assignedAppointments);
router.patch("/appointments/:id", c.updatePrescription);
router.patch("/tickets/:id", c.resolveTicket);

module.exports = router;
