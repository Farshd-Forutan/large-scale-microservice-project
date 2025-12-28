// notification-service/consumer.js
const { getChannel } = require("./rabbitmq.connection");
const { EXCHANGES, QUEUES } = require("./rabbitmq.constants");
const emailService = require("../services/email.service");
const templates = require("../services/email.templates");

const startNotificationConsumer = async () => {
  try {
    const channel = getChannel();

    // 1. اطمینان از وجود اکسچنج‌ها (Exchange Assertion)
    await channel.assertExchange(EXCHANGES.ORDER, "fanout", { durable: true });
    await channel.assertExchange(EXCHANGES.PAYMENT, "fanout", { durable: true });

    // 2. ساخت صف اختصاصی نوتیفیکیشن
    const q = await channel.assertQueue(QUEUES.NOTIFICATION, {
      durable: true,
      // اینجا هم می‌توانید DLQ اضافه کنید مشابه سرویس اردر
    });

    // 3. Binding: اتصال این صف به هر دو اکسچنج
    // حالا یک کپی از پیام‌های اردر و یک کپی از پیام‌های پرداخت به اینجا می‌آید
    await channel.bindQueue(q.queue, EXCHANGES.ORDER, "");
    await channel.bindQueue(q.queue, EXCHANGES.PAYMENT, "");

    console.log(`📨 Notification Service waiting...`);

    channel.consume(q.queue, async (msg) => {
      if (msg !== null) {
        try {
          const content = JSON.parse(msg.content.toString());

          // استفاده از فیلد eventType که در پابلیشرها اضافه کردیم
          const eventType = content.eventType;

          console.log(`🔔 Event Received: ${eventType}`);

          if (eventType === "ORDER_CREATED") {
            const template = templates.formatOrderCreatedEmail(content);
            // ایمیل از داخل پیلود خوانده می‌شود
            await emailService.sendEmail(content.userEmail, template.subject, template.html);
            console.log(`📧 Email sent for New Order to ${content.userEmail}`);
          } else if (eventType === "PAYMENT_COMPLETED") {
            if (content.status === "SUCCESS") {
              const template = templates.formatPaymentSuccessEmail(content);
              await emailService.sendEmail(content.userEmail, template.subject, template.html);
              console.log(`📧 Email sent for Payment Success to ${content.userEmail}`);
            }
          }

          channel.ack(msg);
        } catch (err) {
          console.error(`❌ Failed to send notification`, err);
          // در صورت خرابی سرویس ایمیل، می‌توان Nack کرد تا دوباره تلاش کند
          // channel.nack(msg, false, true); // Requeue = true
        }
      }
    });
  } catch (error) {
    console.error("Notification Consumer Error:", error);
  }
};

module.exports = { startNotificationConsumer };
