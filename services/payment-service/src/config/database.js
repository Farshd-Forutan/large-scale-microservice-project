const { Sequelize } = require("sequelize");
const config = require("./index");

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: "postgres",
  logging: false,
});

const connectDB = async () => {
  while (true) {
    try {
      await sequelize.authenticate();
      console.log("Payment DB Connection Established.");
      if (config.app.env === "development") {
        await sequelize.sync({ alter: true });
      }
      return;
    } catch (error) {
      console.error("Payment DB Failed. Retrying in 5s...", error.message);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

module.exports = { sequelize, connectDB };
