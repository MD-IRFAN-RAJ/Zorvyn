const Joi = require("joi");

exports.createRecordSchema = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().required(),
  date: Joi.date().optional(),
  notes: Joi.string().allow("").optional()
});

exports.updateRecordSchema = Joi.object({
  amount: Joi.number().positive(),
  type: Joi.string().valid("income", "expense"),
  category: Joi.string(),
  date: Joi.date(),
  notes: Joi.string().allow("")
});

exports.recordIdParamSchema = Joi.object({
  id: Joi.string().length(24).hex().required()
});

exports.getRecordsQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  type: Joi.string().valid("income", "expense"),
  category: Joi.string().trim(),
  startDate: Joi.date(),
  endDate: Joi.date().min(Joi.ref("startDate"))
});