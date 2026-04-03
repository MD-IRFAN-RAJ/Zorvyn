const express = require("express");
const app = express();

const limiter = require("./middleware/rateLimiter");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// Body parser
app.use(express.json());

// Rate limiting
app.use(limiter);

//Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/records", require("./routes/recordRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ❗ 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

// ❗ Global error handler
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;