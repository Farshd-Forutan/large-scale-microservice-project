const { getChannel } = require("./rabbitmq.connection");
const { QUEUES } = require("./queues");

const QUEUE_NAME = QUEUES.PAYMENT_COMPLETED;

const publishPaymentCompleted = async (paymentData) => {
  try {
    const channel = getChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    const message = JSON.stringify(paymentData);
    channel.sendToQueue(QUEUE_NAME, Buffer.from(message), {
      persistent: true,
    });

    console.log(`📢 Event Published: PAYMENT_COMPLETED for Order ${paymentData.orderId}`);
  } catch (error) {
    console.error("Failed to publish payment event:", error);
  }
};

module.exports = { publishPaymentCompleted };
