// payment-service/publisher.js
const { getChannel } = require("./rabbitmq.connection");
const { EXCHANGES, ROUTING_KEYS } = require("./rabbitmq.constants");

const publishPaymentCompleted = async (paymentData) => {
  try {
    const channel = getChannel();

    // 1. ساخت اکسچنج (نوع fanout یا topic)
    // Fanout: پیام را به همه صف‌های متصل می‌فرستد (ساده‌ترین حالت)
    await channel.assertExchange(EXCHANGES.PAYMENT, "fanout", { durable: true });

    const messagePayload = {
      eventType: "PAYMENT_COMPLETED", // برای تشخیص راحت‌تر در سمت مصرف‌کننده
      orderId: paymentData.orderId,
      status: "SUCCESS",
      transactionId: paymentData.transactionId,
      userEmail: paymentData.userEmail, // ✅ انتقال ایمیل برای نوتیفیکیشن
      amount: paymentData.amount,
    };

    const messageBuffer = Buffer.from(JSON.stringify(messagePayload));

    // 2. انتشار پیام به اکسچنج
    // در نوع fanout، routing key اهمیت زیادی ندارد اما خالی می‌گذاریم یا مقدار می‌دهیم
    channel.publish(EXCHANGES.PAYMENT, "", messageBuffer, { persistent: true });

    console.log(`📢 Event Published to Exchange: PAYMENT_COMPLETED for Order ${paymentData.orderId}`);
  } catch (error) {
    console.error("Failed to publish payment event:", error);
    // در سیستم‌های واقعی اینجا باید مکانیزم Retry داشته باشید
  }
};

module.exports = { publishPaymentCompleted };
