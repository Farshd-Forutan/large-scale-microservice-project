const { connectRabbitMQ } = require("./messaging/rabbitmq.connection");
const { startConsumer } = require("./messaging/notification.consumer");
const logger = require("./utils/logger");

const start = async () => {
  try {
    logger.info("🚀 Notification Service is starting...");

    await connectRabbitMQ();
    await startConsumer();

    logger.info("✅ Notification Service is ready and listening for events.");
  } catch (error) {
    logger.error("💥 Critical error during Notification Service startup", error);
    process.exit(1);
  }
};

start();
