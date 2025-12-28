const amqp = require("amqplib");
const rabbitConfig = require("../config/rabbitmq");

let connection = null;
let channel = null;

const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect(rabbitConfig.url);
    channel = await connection.createChannel();
    console.log("RabbitMQ Connected successfully.");
    return channel;
  } catch (error) {
    console.error("RabbitMQ Connection Error:", error);
    process.exit(1);
  }
};

const getChannel = () => {
  if (!channel) throw new Error("RabbitMQ channel not initialized.");
  return channel;
};

module.exports = { connectRabbitMQ, getChannel };
