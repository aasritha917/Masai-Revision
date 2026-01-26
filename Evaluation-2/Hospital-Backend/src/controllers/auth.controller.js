const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hash });
  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid" });
  res.json({ token: generateToken({ id: user._id, role: user.role }) });
};
