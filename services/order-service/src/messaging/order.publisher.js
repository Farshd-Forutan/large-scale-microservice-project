// order-service/publisher.js
const { getChannel } = require("./rabbitmq.connection");
const { EXCHANGES } = require("./rabbitmq.constants");

const publishOrderCreated = async (orderData) => {
  try {
    const channel = getChannel();

    // ساخت اکسچنج اردر
    await channel.assertExchange(EXCHANGES.ORDER, "fanout", { durable: true });

    // ✅ Best Practice: Payload should be self-contained
    // ایمیل کاربر را حتما اینجا در پیلود قرار دهید
    const messagePayload = {
      eventType: "ORDER_CREATED",
      orderId: orderData.orderId,
      userEmail: orderData.userEmail, // حیاتی برای نوتیفیکیشن
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      createdAt: new Date(),
    };

    channel.publish(EXCHANGES.ORDER, "", Buffer.from(JSON.stringify(messagePayload)), {
      persistent: true,
    });

    console.log(`📢 Event Published: ORDER_CREATED for ID ${orderData.orderId}`);
  } catch (error) {
    console.error("Error publishing order message:", error);
  }
};

module.exports = { publishOrderCreated };
