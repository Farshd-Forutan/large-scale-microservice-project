const { getChannel } = require("./rabbitmq.connection");
const { QUEUES } = require("./queues");

const publishOrderCreated = async (orderData) => {
  try {
    const channel = getChannel();
    const queue = QUEUES.ORDER_CREATED;

    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(orderData)), {
      persistent: true,
    });

    console.log(`Event Sent to ${queue}: Order ID ${orderData.orderId}`);
  } catch (error) {
    console.error("Error publishing message:", error);
  }
};

module.exports = { publishOrderCreated };
