const Record = require("../models/record");

// CREATE
exports.createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({
        message: "amount, type and category are required"
      });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ message: "Invalid type" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be positive" });
    }

    const record = await Record.create({
      amount,
      type,
      category,
      date: date ? new Date(date) : new Date(),
      notes,
      userId: req.user.id
    });

    res.status(201).json(record);

  } catch (err) {
    res.status(500).json({ message: "Failed to create record" });
  }
};

// GET
exports.getRecords = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      type,
      category,
      startDate,
      endDate
    } = req.query;

    const query = {
      userId: req.user.id,
      isDeleted: false
    };

    if (type) query.type = type;
    if (category) query.category = category;

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const records = await Record.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      page: Number(page),
      count: records.length,
      data: records
    });

  } catch {
    res.status(500).json({ message: "Failed to fetch records" });
  }
};

// UPDATE
exports.updateRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    const record = await Record.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
        isDeleted: false
      },
      {
        ...(amount !== undefined && { amount }),
        ...(type && { type }),
        ...(category && { category }),
        ...(date && { date: new Date(date) }),
        ...(notes && { notes })
      },
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);

  } catch {
    res.status(500).json({ message: "Failed to update record" });
  }
};

// DELETE
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      { isDeleted: true },
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record deleted", record });

  } catch {
    res.status(500).json({ message: "Failed to delete record" });
  }
};