const Record = require("../models/record");

module.exports = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    // ✅ Admin can access everything
    if (req.user.role === "admin") {
      return next();
    }

    // ✅ Ownership check for non-admin
    if (record.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    next();

  } catch {
    res.status(500).json({ message: "Error checking ownership" });
  }
};