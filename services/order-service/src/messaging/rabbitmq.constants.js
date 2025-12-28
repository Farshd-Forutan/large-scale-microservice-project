
module.exports = {
  EXCHANGES: {
    ORDER: "ORDER_EXCHANGE",
    PAYMENT: "PAYMENT_EXCHANGE",
  },
  QUEUES: {
    // صف اختصاصی سرویس اوردر برای دریافت آپدیت‌های پرداخت
    ORDER_PAYMENT_UPDATE: "ORDER_PAYMENT_UPDATE_QUEUE",
    // صف اختصاصی نوتیفیکیشن
    NOTIFICATION: "NOTIFICATION_QUEUE",
    // صف نامه‌های مرده (برای مدیریت خطا)
    DEAD_LETTER: "DEAD_LETTER_QUEUE",
  },
  ROUTING_KEYS: {
    ORDER_CREATED: "order.created",
    PAYMENT_COMPLETED: "payment.completed",
  },
};
