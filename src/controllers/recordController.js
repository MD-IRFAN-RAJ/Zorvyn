const Record = require("../models/record");

exports.getRecords = async (req, res) => {
  const { page = 1, limit = 10, type } = req.query;

  const query = { userId: req.user.id, isDeleted: false };
  if (type) query.type = type;

  const records = await Record.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json(records);
};