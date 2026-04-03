const router = require("express").Router();
const c = require("../controllers/dashboardController");

const auth = require("../middleware/authMiddleware");


/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard data
 */
router.get("/", auth, c.getSummary);
router.get("/categories", auth, c.getCategoryBreakdown);
router.get("/trends", auth, c.getMonthlyTrends);
router.get("/balance", auth, c.getNetBalance);

module.exports = router;