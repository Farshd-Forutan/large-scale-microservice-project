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
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connection Established.");

    if (config.app.env === "development") {
      await sequelize.sync({ alter: true });
    }
  } catch (error) {
    console.error("PostgreSQL Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
