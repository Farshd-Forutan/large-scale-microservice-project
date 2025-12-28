const Payment = require("./payment.model");

const createPayment = async (paymentData) => {
  return await Payment.create(paymentData);
};

const findByOrderId = async (orderId) => {
  return await Payment.findOne({ where: { orderId } });
};

module.exports = {
  createPayment,
  findByOrderId,
};
