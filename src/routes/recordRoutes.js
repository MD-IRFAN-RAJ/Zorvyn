const router = require("express").Router();
const c = require("../controllers/recordController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const ownership = require("../middleware/ownershipMiddleware");
const validate = require("../middleware/validate");

const {
  createRecordSchema,
  updateRecordSchema,
  recordIdParamSchema,
  getRecordsQuerySchema
} = require("../validators/recordValidator");

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Create a financial record
 *     tags: [Records]
 */
router.post(
  "/",
  auth,
  role(["admin"]),
  validate(createRecordSchema),
  c.createRecord
);

/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all financial records
 *     tags: [Records]
 */
router.get(
  "/",
  auth,
  role(["admin", "analyst", "viewer"]),
  validate({ query: getRecordsQuerySchema }),
  c.getRecords
);

/**
 * @swagger
 * /api/records/{id}:
 *   put:
 *     summary: Update a record
 *     tags: [Records]
 */
router.put(
  "/:id",
  auth,
  role(["admin"]),
  validate({ params: recordIdParamSchema }),
  ownership,
  validate({ body: updateRecordSchema }),
  c.updateRecord
);

/**
 * @swagger
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record
 *     tags: [Records]
 */
router.delete(
  "/:id",
  auth,
  role(["admin"]),
  validate({ params: recordIdParamSchema }),
  ownership,
  c.deleteRecord
);

module.exports = router;