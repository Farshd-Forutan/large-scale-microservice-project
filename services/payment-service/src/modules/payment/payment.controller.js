const paymentService = require("./payment.service");

const makePayment = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({ success: false, message: "OrderId and Amount are required" });
    }

    const result = await paymentService.processPayment({ orderId, amount });

    if (result.status === "FAILED") {
      return res.status(400).json({
        success: false,
        message: "Payment Failed",
        data: result,
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment Successful",
      data: result,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { makePayment };
