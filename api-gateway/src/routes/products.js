const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

// GET all products
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${PRODUCT_SERVICE_URL}/api/v1/products`);
    res.json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: "Product service error" });
  }
});

// GET product by id
router.get("/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `${PRODUCT_SERVICE_URL}/api/v1/products/${req.params.id}`
    );
    res.json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: "Product service error" });
  }
});

// CREATE product (admin)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const response = await axios.post(
      `${PRODUCT_SERVICE_URL}/api/v1/products`,
      req.body,
      {
        headers: { Authorization: req.headers.authorization },
      }
    );
    res.json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: "Product service error" });
  }
});

// UPDATE product
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const response = await axios.put(
      `${PRODUCT_SERVICE_URL}/api/v1/products/${req.params.id}`,
      req.body,
      {
        headers: { Authorization: req.headers.authorization },
      }
    );
    res.json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: "Product service error" });
  }
});

// DELETE product
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const response = await axios.delete(
      `${PRODUCT_SERVICE_URL}/api/v1/products/${req.params.id}`,
      {
        headers: { Authorization: req.headers.authorization },
      }
    );
    res.json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: "Product service error" });
  }
});

module.exports = router;
