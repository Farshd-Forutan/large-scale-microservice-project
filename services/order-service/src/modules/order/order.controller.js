const orderService = require("./order.service");

class OrderController {
  createOrder = async (req, res, next) => {
    try {
      const userId = req.user ? req.user.id : req.body.userId;
      const { items, totalAmount } = req.body;

      const order = await orderService.createOrder({ userId, items, totalAmount });

      res.status(201).json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  };

  getOrder = async (req, res, next) => {
    try {
      const order = await orderService.getOrder(req.params.id);
      res.status(200).json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  };

  getMyOrders = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const orders = await orderService.getUserOrders(userId);
      res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new OrderController();
