const User = require("../models/users");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hash });

  res.json({ token: generateToken(user) });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({ token: generateToken(user) });
};