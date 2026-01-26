const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: { type: String, enum: ["low", "medium", "high"] },
  status: { type: String, enum: ["open", "in-progress", "resolved"] },
  patientId: mongoose.Schema.Types.ObjectId,
  assignedDoctorId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
  closedAt: Date
});

module.exports = mongoose.model("Ticket", ticketSchema);
