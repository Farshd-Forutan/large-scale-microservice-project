const express = require("express");
const router = express.Router();
const orderController = require("./order.controller");
const protect = require("../../middlewares/auth.middleware");


router.use(protect);

router.post("/", orderController.createOrder);
router.get("/my-orders", orderController.getMyOrders);
router.get("/:id", orderController.getOrder);

module.exports = router;
