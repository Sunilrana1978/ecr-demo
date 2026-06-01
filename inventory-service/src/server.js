import express from 'express';
import { InventoryRepository } from './repositories/InventoryRepository.js';
import { InventoryController } from './controllers/InventoryController.js';
import { createInventoryRoutes } from './routes/inventoryRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createServer() {
  const app = express();

  app.use(express.json());

  const inventoryRepository = new InventoryRepository();
  const inventoryController = new InventoryController(inventoryRepository);
  const inventoryRoutes = createInventoryRoutes(inventoryController);

  app.use('/', inventoryRoutes);
  app.use(errorHandler);

  return app;
}
