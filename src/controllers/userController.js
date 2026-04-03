const User = require("../models/users");

// GET USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// UPDATE ROLE
exports.updateRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["viewer", "analyst", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch {
    res.status(500).json({ message: "Failed to update role" });
  }
};

// TOGGLE STATUS
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: "User status updated",
      user
    });

  } catch {
    res.status(500).json({ message: "Failed to update user status" });
  }
};