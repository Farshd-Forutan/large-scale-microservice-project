const { getChannel } = require("./rabbitmq.connection");
const emailService = require("../services/email.service");
const templates = require("../services/email.templates");
const config = require("../config");
const logger = require("../utils/logger");

const QUEUE_NAME = "NOTIFICATION_QUEUE";

const startConsumer = async () => {
  try {
    const channel = getChannel();

    // 1. تعریف Exchange ها (جهت اطمینان)
    await channel.assertExchange(config.rabbitmq.exchanges.order, "fanout", { durable: true });
    await channel.assertExchange(config.rabbitmq.exchanges.payment, "fanout", { durable: true });

    // 2. ساخت صف اختصاصی نوتیفیکیشن
    const q = await channel.assertQueue(QUEUE_NAME, { durable: true });

    // 3. اتصال (Bind) صف به Exchange ها
    // حالا هر پیامی که به این Exchangeها بیاید، یک کپی در این صف قرار می‌گیرد
    await channel.bindQueue(q.queue, config.rabbitmq.exchanges.order, "");
    await channel.bindQueue(q.queue, config.rabbitmq.exchanges.payment, "");

    console.log(`📨 Notification Service waiting for messages in ${QUEUE_NAME}...`);

    channel.consume(q.queue, async (msg) => {
      if (msg !== null) {
        
        const content = JSON.parse(msg.content.toString());

        logger.info(`🔔 New Event Received from Exchange`, {
          orderId: content.orderId,
          type: content.items ? "ORDER_CREATED" : "PAYMENT_SUCCESS",
        });

        // تشخیص نوع پیام و ارسال ایمیل
        // نکته: ما باید "type" یا ساختار پیام را چک کنیم تا بفهمیم کدام تمپلیت را استفاده کنیم

        // الف: اگر پیام Order Created باشد (فرض می‌کنیم فیلد items دارد)
        if (content.items && content.totalAmount) {
          const template = templates.formatOrderCreatedEmail(content);
          // نکته مهم: سرویس Order باید ایمیل کاربر را در content بفرستد
          await emailService.sendEmail(content.userEmail, template.subject, template.html);
        }

        // ب: اگر پیام Payment باشد (فرض می‌کنیم transactionId دارد)
        else if (content.transactionId && content.status === "SUCCESS") {
          const template = templates.formatPaymentSuccessEmail(content);
          // نکته: Payment Service باید ایمیل کاربر را هم پاس بدهد یا ما باید آن را داشته باشیم
          // برای سادگی فرض میکنیم Payment Service ایمیل را هم می‌فرستد
          await emailService.sendEmail(content.userEmail, template.subject, template.html);
        }

        channel.ack(msg);
      }
    });
  } catch (error) {
    logger.error(`❌ Failed to process notification for Order ${content.orderId}`, err);
  }
};

module.exports = { startConsumer };
