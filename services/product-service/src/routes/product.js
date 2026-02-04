const express = require("express");
const Product = require("../models/product");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// ... (کدهای قبلی شما شامل CREATE, GET, SEARCH, UPDATE, DELETE)

/**
 * @route   PUT /api/products/reduce-stock
 * @desc    کاهش موجودی کالاها پس از ثبت سفارش (توسط سرویس سفارش)
 * @access  Protected
 */
router.put("/reduce-stock", authMiddleware, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: "ساختار آیتم‌ها نامعتبر است" });
    }

    // بررسی اینکه آیا تمام محصولات موجودی کافی دارند یا خیر (اختیاری اما توصیه شده)
    for (const item of items) {
      const product = await Product.findById(item.productid);
      if (!product) {
        return res.status(404).json({ error: `محصول با آی‌دی ${item.productid} یافت نشد` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `موجودی محصول "${product.name}" کافی نیست` });
      }
    }

    // عملیات کاهش موجودی برای تک تک آیتم‌ها
    const updatePromises = items.map((item) => {
      return Product.findByIdAndUpdate(
        item.productid,
        { $inc: { stock: -item.quantity } }, // مقدار درخواستی را از موجودی کم می‌کند
        { new: true }
      );
    });

    await Promise.all(updatePromises);

    res.json({ message: "موجودی محصولات با موفقیت بروزرسانی شد" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;