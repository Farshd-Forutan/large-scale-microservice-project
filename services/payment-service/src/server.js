const app = require("./app");
const { connectDB } = require("./config/database");
const { connectRabbitMQ } = require("./messaging/rabbitmq.connection");
const config = require("./config");


const start = async () => {
    
  // 1. Database
  await connectDB();

  // 2. Messaging
  await connectRabbitMQ();

  app.listen(config.app.port, () => {
    console.log(`Payment Service running on port ${config.app.port}`);
  });
};

start();
