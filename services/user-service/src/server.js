require("dotenv").config({
  path: require("path").resolve(__dirname, "../../../.env"),
});


const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();
app.use(express.json());

const PORT = process.env.USER_PORT || 4000;
const MONGO_URI = process.env.USER_MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ USER_MONGO_URI is not defined");
  process.exit(1);
}

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("User Service: MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/v1/auth", authRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    service: "user-service",
    status: "UP",
    timestamp: new Date().toISOString(),
  });
});

// Error handler
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
