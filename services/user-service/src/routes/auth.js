const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// ================== SIGNUP ==================
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const allowedRoles = ["user", "admin"];

    const user = await User.create({
      username,
      email,
      password,
      role: allowedRoles.includes(role) ? role : "user",
    });

    res.status(201).json({
      message: "User registered successfully",
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================== LOGIN ==================
router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================== ME ==================
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  res.json(user);
});

module.exports = router;
