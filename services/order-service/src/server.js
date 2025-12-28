const app = require("./app");
const config = require("./config");
const { connectDB } = require("./config/database");
const { connectRabbitMQ } = require("./messaging/rabbitmq.connection");
const { consumePaymentUpdates } = require("./messaging/order.consumer");

const start = async () => {
  // 1. Database
  await connectDB();

  // 2. Messaging
  await connectRabbitMQ();

  // 3. Start Consumer
  consumePaymentUpdates();

  // 4. Server
  app.listen(config.app.port, () => {
    console.log(`Order Service running on port ${config.app.port}`);
  });
};

start();
