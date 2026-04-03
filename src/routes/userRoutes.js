const router = require("express").Router();
const c = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const validate = require("../middleware/validate");

const {
	userIdParamSchema,
	updateUserRoleSchema
} = require("../validators/userValidator");

// Only admin can manage users

router.get("/", auth, role(["admin"]), c.getUsers);

router.patch(
	"/:id/role",
	auth,
	role(["admin"]),
	validate({ params: userIdParamSchema, body: updateUserRoleSchema }),
	c.updateRole
);

router.patch(
	"/:id/toggle",
	auth,
	role(["admin"]),
	validate({ params: userIdParamSchema }),
	c.toggleUserStatus
);

module.exports = router;