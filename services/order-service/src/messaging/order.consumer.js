// order-service/consumer.js
const { getChannel } = require("./rabbitmq.connection");
const { EXCHANGES, QUEUES } = require("./rabbitmq.constants");
const orderRepository = require("../modules/order/order.repository");
const { ORDER_STATUS } = require("../domain/order.constants");

const consumePaymentUpdates = async () => {
  try {
    const channel = getChannel();

    // 1. تعریف DLQ (Dead Letter Exchange/Queue)
    // اگر پیامی پردازش نشد، به اینجا می‌رود تا بعدا بررسی شود
    const dlxName = "DLX_EXCHANGE";
    await channel.assertExchange(dlxName, "fanout", { durable: true });
    await channel.assertQueue(QUEUES.DEAD_LETTER, { durable: true });
    await channel.bindQueue(QUEUES.DEAD_LETTER, dlxName, "");

    // 2. تعریف صف اصلی با تنظیمات DLQ
    // اگر پیامی Nack شود یا Rejection بخورد، به DLX می‌رود
    await channel.assertQueue(QUEUES.ORDER_PAYMENT_UPDATE, {
      durable: true,
      arguments: {
        "x-dead-letter-exchange": dlxName, // اگر شکست خورد بفرست اینجا
      },
    });

    // 3. اتصال صف به اکسچنجِ پرداخت
    // ما فقط به آپدیت‌های پرداخت نیاز داریم
    await channel.assertExchange(EXCHANGES.PAYMENT, "fanout", { durable: true });
    await channel.bindQueue(QUEUES.ORDER_PAYMENT_UPDATE, EXCHANGES.PAYMENT, "");

    console.log(`🎧 Order Service listening on ${QUEUES.ORDER_PAYMENT_UPDATE}...`);

    channel.consume(QUEUES.ORDER_PAYMENT_UPDATE, async (msg) => {
      if (msg !== null) {
        try {
          const content = JSON.parse(msg.content.toString());
          console.log(`📨 Received Payment Update:`, content);

          const status = content.status === "SUCCESS" ? ORDER_STATUS.CONFIRMED : ORDER_STATUS.CANCELLED;

          await orderRepository.updateStatus(content.orderId, status);
          console.log(`✅ Order ${content.orderId} updated to ${status}`);

          channel.ack(msg); // تایید موفقیت
        } catch (err) {
          console.error("❌ Error processing message:", err);
          // اگر خطا قابل جبران نیست (مثل خطای دیتابیس)، پیام را به DLQ بفرست (Nack بدون requeue)
          channel.nack(msg, false, false);
        }
      }
    });
  } catch (error) {
    console.error("Consumer Error:", error);
  }
};

module.exports = { consumePaymentUpdates };
