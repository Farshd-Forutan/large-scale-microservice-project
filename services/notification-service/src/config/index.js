require("dotenv").config();

module.exports = {
  rabbitmq: {
    url: process.env.RABBITMQ_URL,
    exchanges: {
      order: "ORDER_EXCHANGE",
      payment: "PAYMENT_EXCHANGE",
    },
  },
  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM || '"Microservice Shop" <no-reply@shop.com>',
  },
};
