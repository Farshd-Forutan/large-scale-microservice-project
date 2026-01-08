const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${ORDER_SERVICE_URL}/api/v1/orders`,
      req.body,
      { headers: { Authorization: req.headers.authorization } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

router.get("/my-orders", async (req, res) => {
  try {
    const response = await axios.get(
      `${ORDER_SERVICE_URL}/api/v1/orders/my-orders`,
      { headers: { Authorization: req.headers.authorization } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${ORDER_SERVICE_URL}/api/v1/orders/${req.params.id}`,
      { headers: { Authorization: req.headers.authorization } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

module.exports = router;
