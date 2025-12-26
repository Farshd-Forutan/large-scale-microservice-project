const router = require("express").Router();
const { makePayment } = require("./payment.controller");
const protect = require("../../middlewares/auth.middleware");

router.use(protect);

router.post("/", makePayment);

module.exports = router;
