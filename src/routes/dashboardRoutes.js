const router = require("express").Router();
const c = require("../controllers/dashboardController");
const role = require("../middleware/roleMiddleware");
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
router.get("/", auth, role(["admin", "analyst"]), c.getSummary);
router.get("/categories", auth, role(["admin", "analyst"]), c.getCategoryBreakdown);
router.get("/trends", auth, role(["admin", "analyst"]), c.getMonthlyTrends);
router.get("/balance", auth, role(["admin", "analyst"]), c.getNetBalance);

module.exports = router;