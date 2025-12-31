const express = require("express");
const axios = require("axios");

const router = express.Router();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

// signup
router.post("/signup", async (req, res) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}/api/v1/auth/signup`,
      req.body
    );
    res.json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: "User service error" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}/api/v1/auth/login`,
      req.body
    );
    res.json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json(err.response?.data || { error: "User service error" });
  }
});

module.exports = router;
