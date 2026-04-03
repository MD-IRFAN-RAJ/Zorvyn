module.exports = (schemaConfig) => (req, res, next) => {
  const schemas = (schemaConfig && typeof schemaConfig.validate === "function")
    ? { body: schemaConfig }
    : (schemaConfig || {});

  const targets = ["params", "query", "body"];

  for (const target of targets) {
    const schema = schemas[target];

    if (!schema) continue;

    const { value, error } = schema.validate(req[target], {
      abortEarly: true,
      stripUnknown: true
    });

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    req[target] = value;
  }

  next();
};