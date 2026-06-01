import express from 'express';
import { OrderRepository } from './repositories/OrderRepository.js';
import { OrderService } from './services/OrderService.js';
import { OrderController } from './controllers/OrderController.js';
import { createOrderRoutes } from './routes/orderRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createServer() {
  const app = express();

  app.use(express.json());

  const orderRepository = new OrderRepository();
  const orderService = new OrderService(orderRepository);
  const orderController = new OrderController(orderService);
  const orderRoutes = createOrderRoutes(orderController);

  app.use('/', orderRoutes);
  app.use(errorHandler);

  return app;
}
