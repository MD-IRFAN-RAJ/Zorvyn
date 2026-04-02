const Record = require("../models/record");

exports.getSummary = async (req, res) => {
  const data = await Record.aggregate([
    { $match: { userId: require("mongoose").Types.ObjectId(req.user.id) } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.json(data);
};