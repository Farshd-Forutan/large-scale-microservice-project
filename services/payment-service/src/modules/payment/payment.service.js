const paymentRepository = require("./payment.repository");
const { publishPaymentCompleted } = require("../../messaging/payment.publisher");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const processPayment = async (data) => {
  const { userEmail, orderId, amount } = data;

  // 1. Simulation of Bank Gateway
  await delay(1500);

  // 2. Logic: 50% Success rate
  const isSuccess = Math.random() > 0.5;
  const status = isSuccess ? "SUCCESS" : "FAILED";
  const transactionId = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // 3. Save via Repository
  const paymentRecord = await paymentRepository.createPayment({
    orderId,
    amount,
    status,
    transactionId,
  });

  // 4. Publish Event if success
  if (isSuccess) {
    await publishPaymentCompleted({
      userEmail,
      orderId,
      status,
      transactionId,
      amount,
    });
  }

  return paymentRecord;
};

module.exports = { processPayment };
