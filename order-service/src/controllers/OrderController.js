import { NotFoundError, ValidationError } from '@shared/errors';

export class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  async getAllOrders(req, res, next) {
    try {
      const orders = this.orderService.orderRepository.findAll();
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await this.orderService.getOrderDetails(id);
      if (!result.success) {
        throw new NotFoundError('Order', id);
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async createOrder(req, res, next) {
    try {
      const data = req.validatedBody;
      const result = await this.orderService.createOrder(data.customerId, data.items);
      if (!result.success) {
        throw new ValidationError(result.message);
      }
      res.status(201).json(result.order);
    } catch (error) {
      next(error);
    }
  }

  async updateOrderStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        throw new ValidationError('Status is required');
      }

      const order = this.orderService.orderRepository.updateStatus(id, status);
      if (!order) {
        throw new NotFoundError('Order', id);
      }
      res.json(order);
    } catch (error) {
      next(error);
    }
  }

  async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;
      const order = this.orderService.orderRepository.findById(id);
      if (!order) {
        throw new NotFoundError('Order', id);
      }
      this.orderService.orderRepository.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

