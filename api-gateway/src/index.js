require("dotenv").config();
const express = require("express");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payments");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "API Gateway is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
