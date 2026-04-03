const router = require("express").Router();
const c = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Only admin can manage users

router.get("/", auth, role(["admin"]), c.getUsers);

router.patch("/:id/role", auth, role(["admin"]), c.updateRole);

router.patch("/:id/toggle", auth, role(["admin"]), c.toggleUserStatus);

module.exports = router;