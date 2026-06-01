import { Router } from 'express';

export function createOrderRoutes(controller) {
  const router = Router();

  router.get('/orders', (req, res) => controller.getAllOrders(req, res));
  router.get('/orders/:id', (req, res) => controller.getOrderById(req, res));
  router.post('/orders', (req, res) => controller.createOrder(req, res));
  router.put('/orders/:id', (req, res) => controller.updateOrderStatus(req, res));
  router.delete('/orders/:id', (req, res) => controller.deleteOrder(req, res));

  return router;
}
