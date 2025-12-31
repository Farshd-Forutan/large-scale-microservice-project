const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});


const express = require("express");
const mongoose = require("mongoose");

const productRoutes = require("./routes/product");

const app = express();
app.use(express.json());

// Routes
app.use("/api/v1/products", productRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Product Service running" });
});

const PORT = process.env.PRODUCT_PORT || 5001;
const MONGO_URI = process.env.PRODUCT_MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ PRODUCT_MONGO_URI is not defined");
  process.exit(1);
}

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Product Service: MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Product Service running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
