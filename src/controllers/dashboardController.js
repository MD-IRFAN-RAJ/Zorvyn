const mongoose = require("mongoose");
const Record = require("../models/record");

// Helper function to create user match criteria
const getUserMatch = (userId) => ({
  userId: new mongoose.Types.ObjectId(userId),
  isDeleted: false
});

//  SUMMARY- Total Income, Total Expense, Net Balance
exports.getSummary = async (req, res) => {
  try {
    const data = await Record.aggregate([
      {
        $match: getUserMatch(req.user.id)
      },
      {
        $group: {
          _id: null,
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      }
    ]);

    const result = data[0] || { income: 0, expense: 0 };

    res.json({
      totalIncome: result.income,
      totalExpense: result.expense,
      netBalance: result.income - result.expense
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CATEGORY BREAKDOWN
exports.getCategoryBreakdown = async (req, res) => {
  try {
    const data = await Record.aggregate([
      { $match: getUserMatch(req.user.id) },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// MONTHLY TRENDS
exports.getMonthlyTrends = async (req, res) => {
  try {
    const data = await Record.aggregate([
      { $match: getUserMatch(req.user.id) },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// NET BALANCE = Total Income - Total Expense
exports.getNetBalance = async (req, res) => {
  try {
    const data = await Record.aggregate([
      { $match: getUserMatch(req.user.id) },
      {
        $group: {
          _id: null,
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      }
    ]);

    const result = data[0] || { income: 0, expense: 0 };

    res.json({
      totalIncome: result.income,
      totalExpense: result.expense,
      netBalance: result.income - result.expense
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};