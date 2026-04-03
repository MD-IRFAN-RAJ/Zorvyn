const Joi = require("joi");

exports.userIdParamSchema = Joi.object({
  id: Joi.string().length(24).hex().required()
});

exports.updateUserRoleSchema = Joi.object({
  role: Joi.string().valid("viewer", "analyst", "admin").required()
});
