const mongoose = require("mongoose");

const medicalSchema = new mongoose.Schema({
  appointmentId: mongoose.Schema.Types.ObjectId,
  diagnosis: String,
  notes: String,
  date: Date
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ["patient", "doctor", "admin"] },
  specialization: String,
  medicalHistory: [medicalSchema],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
