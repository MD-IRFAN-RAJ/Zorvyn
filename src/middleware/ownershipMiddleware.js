const Record = require("../models/record");

module.exports = async (req, res, next) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record || record.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    next();
  } catch {
    res.status(500).json({ message: "Error checking ownership" });
  }
};