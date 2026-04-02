const router = require("express").Router();
const c = require("../controllers/recordController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all financial records
 *     tags: [Records]
 *     responses:
 *       200:
 *         description: Successfully fetched records
 */

router.get("/", auth, role(["admin", "analyst", "viewer"]), c.getRecords);

module.exports = router;