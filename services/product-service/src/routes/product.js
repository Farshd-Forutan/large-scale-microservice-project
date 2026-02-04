const express = require("express");
const Product = require("../models/product");
const authMiddleware = require("../middleware/auth.middleware"); // برای بقیه مسیرها استفاده می‌شود

const router = express.Router();

// ... (سایر مسیرهای قبلی مثل GET, POST Admin و غیره)

/**
 * @route   PUT /api/products/reduce-stock
 * @desc    کاهش موجودی کالاها (بدون نیاز به توکن برای دسترسی سریع سرویس‌های داخلی)
 */
router.put("/reduce-stock", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Invalid items format" });
    }

    // انجام عملیات به‌روزرسانی برای هر آیتم
    const updatePromises = items.map((item) => {
      return Product.findByIdAndUpdate(
        item.productid, // استفاده از آی‌دی ارسال شده
        { $inc: { stock: -item.quantity } }, // کم کردن کوانتیتی از استوک
        { new: true }
      );
    });

    await Promise.all(updatePromises);

    res.json({ message: "Stock updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;