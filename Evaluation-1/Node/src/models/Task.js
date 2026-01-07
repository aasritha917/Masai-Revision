const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["todo", "in-progress", "completed"] },
  priority: { type: String, enum: ["low", "medium", "high", "critical"] },
  dueDate: Date,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Task", taskSchema);
