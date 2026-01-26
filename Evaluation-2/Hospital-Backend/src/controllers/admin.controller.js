const User = require("../models/user.model");
const Appointment = require("../models/appointment.model");
const Ticket = require("../models/ticket.model");

exports.getUsers = async (req, res) => {
  res.json(await User.find());
};

exports.stats = async (req, res) => {
  const patients = await User.countDocuments({ role: "patient" });
  const doctors = await User.countDocuments({ role: "doctor" });
  const apptPerDoctor = await Appointment.aggregate([
    { $group: { _id: "$doctorId", count: { $sum: 1 } } }
  ]);
  const ticketPriority = await Ticket.aggregate([
    { $group: { _id: "$priority", count: { $sum: 1 } } }
  ]);

  res.json({ patients, doctors, apptPerDoctor, ticketPriority });
};
