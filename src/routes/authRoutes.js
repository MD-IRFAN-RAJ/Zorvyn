const router = require("express").Router();
const c = require("../controllers/authController");


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Registration successful
 */
router.post("/register", c.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", c.login);

module.exports = router;