import { Router } from 'express';
import { validate, orderSchema } from '@shared/validation';

export function createOrderRoutes(controller) {
  const router = Router();

  router.get('/orders', (req, res, next) => controller.getAllOrders(req, res, next));
  router.get('/orders/:id', (req, res, next) => controller.getOrderById(req, res, next));
  router.post('/orders', validate(orderSchema), (req, res, next) => controller.createOrder(req, res, next));
  router.put('/orders/:id', (req, res, next) => controller.updateOrderStatus(req, res, next));
  router.delete('/orders/:id', (req, res, next) => controller.deleteOrder(req, res, next));

  return router;
}

