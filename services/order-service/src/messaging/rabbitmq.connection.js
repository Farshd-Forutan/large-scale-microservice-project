const amqp = require("amqplib");
const rabbitConfig = require("../config/rabbitmq");

let channel = null;

const connectRabbitMQ = async () => {
  while (true) {
    try {
      const connection = await amqp.connect(rabbitConfig.url);
      channel = await connection.createChannel();
      console.log("✅ RabbitMQ Connected (Payment Service).");

      connection.on("close", () => {
        console.error("RabbitMQ closed. Reconnecting...");
        setTimeout(connectRabbitMQ, 5000);
      });
      return channel;
    } catch (error) {
      console.error("❌ RabbitMQ Failed. Retrying in 5s...");
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

const getChannel = () => {
  if (!channel) throw new Error("RabbitMQ channel not initialized.");
  return channel;
};

module.exports = { connectRabbitMQ, getChannel };
