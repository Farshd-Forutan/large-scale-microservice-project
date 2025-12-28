const orderRepository = require("./order.repository");
const { publishOrderCreated } = require("../../messaging/order.publisher");
const ApiError = require("../../utils/apiError");
const { ORDER_STATUS } = require("../../domain/order.constants");

class OrderService {
  async createOrder(data) {
    const { userEmail, userId, items, totalAmount } = data;

    
    const newOrder = await orderRepository.create({
      userId,
      items,
      totalAmount,
      status: ORDER_STATUS.PENDING,
    });

    
    await publishOrderCreated({
      orderId: newOrder.id,
      userId: newOrder.userId,
      userEmail: userEmail,
      totalAmount: newOrder.totalAmount,
      items: newOrder.items,
    });

    return newOrder;
  }

  async getOrder(id) {
    const order = await orderRepository.findById(id);
    if (!order) throw new ApiError(404, "Order not found");
    return order;
  }

  async getUserOrders(userId) {
    return await orderRepository.findByUserId(userId);
  }
}

module.exports = new OrderService();
