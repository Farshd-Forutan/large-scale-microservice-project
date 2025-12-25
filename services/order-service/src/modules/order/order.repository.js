const Order = require("./order.model");

class OrderRepository {
  async create(orderData) {
    return await Order.create(orderData);
  }

  async findById(id) {
    return await Order.findByPk(id);
  }

  async findByUserId(userId) {
    return await Order.findAll({ where: { userId } });
  }

  async updateStatus(id, status) {
    const order = await Order.findByPk(id);
    if (order) {
      order.status = status;
      return await order.save();
    }
    return null;
  }
}

module.exports = new OrderRepository();
