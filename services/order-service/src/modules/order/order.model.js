const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");
const { ORDER_STATUS } = require("../../domain/order.constants");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    items: {
      type: DataTypes.JSONB, // ذخیره اقلام سفارش
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(ORDER_STATUS),
      defaultValue: ORDER_STATUS.PENDING,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

module.exports = Order;
