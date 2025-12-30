const { Sequelize } = require("sequelize");
const config = require("./index");

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  host: config.db.host,
  port: config.db.port,
  dialect: "postgres",
  logging: false,
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

const connectDB = async () => {
  while (true) {
    try {
      await sequelize.authenticate();
      console.log("Order DB Connection Established.");
      if (config.app.env === "development") {
        await sequelize.sync({ alter: true });
      }
      return;
    } catch (error) {
      console.error("Order DB Failed. Retrying in 5s...", error.message);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

module.exports = { sequelize, connectDB };
