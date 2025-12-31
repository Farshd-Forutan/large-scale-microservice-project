const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../../.env"),
});

const mongoose = require("mongoose");
const User = require("../src/models/User");

(async () => {
  try {
    const MONGO_URI = process.env.USER_MONGO_URI;

    if (!MONGO_URI) {
      console.error("❌ USER_MONGO_URI is not defined in .env");
      process.exit(1);
    }

    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const adminEmail = "admin@test.com";

    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    await User.create({
      username: "admin",
      email: adminEmail,
      password: "123456",
      role: "admin",
    });

    console.log("✅ Admin user created successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding admin:", err.message);
    process.exit(1);
  }
})();
