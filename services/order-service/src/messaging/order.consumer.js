const { getChannel } = require("./rabbitmq.connection");
const { QUEUES } = require("./queues");
const orderRepository = require("../modules/order/order.repository");
const { ORDER_STATUS } = require("../domain/order.constants");

const consumePaymentUpdates = async () => {
  try {
    const channel = getChannel();
    const queue = QUEUES.PAYMENT_COMPLETED;

    await channel.assertQueue(queue, { durable: true });
    console.log(`Waiting for messages in ${queue}...`);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const content = JSON.parse(msg.content.toString());
        console.log(`Received Payment Update for Order: ${content.orderId}`);

        const status = content.success ? ORDER_STATUS.CONFIRMED : ORDER_STATUS.CANCELLED;
        await orderRepository.updateStatus(content.orderId, status);

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Consumer Error:", error);
  }
};

module.exports = { consumePaymentUpdates };
