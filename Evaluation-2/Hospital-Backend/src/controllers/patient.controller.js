const Appointment = require("../models/appointment.model");
const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");

exports.bookAppointment = async (req, res) => {
  const exists = await Appointment.findOne({
    doctorId: req.body.doctorId,
    appointmentDate: req.body.appointmentDate
  });
  if (exists) return res.status(400).json({ message: "Slot unavailable" });
  const appt = await Appointment.create({ ...req.body, patientId: req.user.id });
  res.json(appt);
};

exports.myAppointments = async (req, res) => {
  res.json(await Appointment.find({ patientId: req.user.id }));
};

exports.raiseTicket = async (req, res) => {
  res.json(await Ticket.create({ ...req.body, patientId: req.user.id }));
};
