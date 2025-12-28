const express = require("express");
const orderRoutes = require("./modules/order/order.routes");
const ApiError = require("./utils/apiError");

const app = express();

app.use(express.json());

// Routes
app.use("/api/v1/orders", orderRoutes);

// 404 Error
app.all("*", (req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status || "error",
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

module.exports = app;
