const User = require("../models/users");

// ✅ Get all users (admin)
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// ✅ Update role
exports.updateRole = async (req, res) => {
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  );

  res.json(user);
};

// ✅ Activate / Deactivate user
exports.toggleUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);

  user.isActive = !user.isActive;
  await user.save();

  res.json({ message: "User status updated", user });
};