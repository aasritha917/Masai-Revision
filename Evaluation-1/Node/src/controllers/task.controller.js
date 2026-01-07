const Task = require("../models/Task");

exports.getAllTasks = async (req, res) => {
  const { status, priority, sortBy } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const tasks = await Task.find(filter).sort(sortBy || "createdAt");

  res.json({ success: true, count: tasks.length, data: tasks });
};

exports.getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  res.json({ success: true, data: task });
};

exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ success: true, message: "Task created successfully", data: task });
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  res.json({ success: true, message: "Task updated successfully", data: task });
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  res.json({ success: true, message: "Task deleted successfully" });
};
