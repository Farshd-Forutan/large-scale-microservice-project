const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./modules/payment/payment.routes");
const ApiError = require("./utils/apiError");

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/v1/payments", paymentRoutes);

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
