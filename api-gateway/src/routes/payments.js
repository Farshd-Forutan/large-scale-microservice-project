const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL;

router.use(authMiddleware);

router.post("/", async (req, res) => {
  try {
    const response = await axios.post(
      `${PAYMENT_SERVICE_URL}/api/payments`,
      req.body,
      { headers: { Authorization: req.headers.authorization } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data);
  }
});

module.exports = router;
