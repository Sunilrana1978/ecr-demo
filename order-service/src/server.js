import { createExpressServer } from '@shared/server';
import { OrderRepository } from './repositories/OrderRepository.js';
import { OrderService } from './services/OrderService.js';
import { OrderController } from './controllers/OrderController.js';
import { createOrderRoutes } from './routes/orderRoutes.js';

export function createServer() {
  const orderRepository = new OrderRepository();
  const orderService = new OrderService(orderRepository);
  const orderController = new OrderController(orderService);
  const orderRoutes = createOrderRoutes(orderController);

  return createExpressServer({
    routes: {
      '/api': orderRoutes
    }
  });
}

