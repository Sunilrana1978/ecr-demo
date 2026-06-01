export class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  async getAllOrders(req, res) {
    const orders = this.orderService.orderRepository.findAll();
    res.json(orders);
  }

  async getOrderById(req, res) {
    const { id } = req.params;
    const result = await this.orderService.getOrderDetails(id);
    if (!result.success) {
      return res.status(404).json({ error: result.message });
    }
    res.json(result);
  }

  async createOrder(req, res) {
    const { customerId, items } = req.body;
    if (!customerId || !items || items.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const result = await this.orderService.createOrder(customerId, items);
    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }
    res.status(201).json(result.order);
  }

  async updateOrderStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }
    const order = this.orderService.orderRepository.updateStatus(id, status);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  }

  async deleteOrder(req, res) {
    const { id } = req.params;
    const deleted = this.orderService.orderRepository.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(204).send();
  }
}
