const roles = require("../config/roles");

module.exports = (requiredPermissions) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    const permissions = roles[userRole];

    if (!permissions) {
      return res.status(403).json({ message: "Invalid role" });
    }

    const hasAccess = requiredPermissions.every(p =>
      permissions.includes(p)
    );

    if (!hasAccess) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};