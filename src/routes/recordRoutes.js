const router = require("express").Router();
const c = require("../controllers/recordController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a financial record
 *     tags: [Records]
 */
router.post("/", auth, role(["admin", "analyst"]), c.createRecord);

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all financial records
 *     tags: [Records]
 */
router.get("/", auth, role(["admin", "analyst", "viewer"]), c.getRecords);

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record
 *     tags: [Records]
 */
router.delete("/:id", auth, role(["admin"]), c.deleteRecord);

/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update a record
 *     tags: [Records]
 */
router.put("/:id", auth, role(["admin"]), c.updateRecord);

module.exports = router;