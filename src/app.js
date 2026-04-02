const express = require("express");
const app = express();
const limiter = require("./middleware/rateLimiter");

app.use(express.json());
app.use(limiter);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/records", require("./routes/recordRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;