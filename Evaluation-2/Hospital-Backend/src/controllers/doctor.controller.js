const Appointment = require("../models/appointment.model");
const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");

exports.assignedAppointments = async (req, res) => {
  res.json(await Appointment.find({ doctorId: req.user.id }));
};

exports.updatePrescription = async (req, res) => {
  const appt = await Appointment.findById(req.params.id);
  appt.prescription = req.body.prescription;
  appt.status = "completed";
  await appt.save();

  await User.updateOne(
    { _id: appt.patientId },
    { $push: { medicalHistory: { appointmentId: appt._id, date: new Date() } } }
  );

  res.json(appt);
};

exports.resolveTicket = async (req, res) => {
  res.json(await Ticket.findByIdAndUpdate(req.params.id, {
    status: "resolved",
    closedAt: new Date()
  }));
};
