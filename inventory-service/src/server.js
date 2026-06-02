import { createExpressServer } from '@shared/server';
import { InventoryRepository } from './repositories/InventoryRepository.js';
import { InventoryController } from './controllers/InventoryController.js';
import { createInventoryRoutes } from './routes/inventoryRoutes.js';

export function createServer() {
  const inventoryRepository = new InventoryRepository();
  const inventoryController = new InventoryController(inventoryRepository);
  const inventoryRoutes = createInventoryRoutes(inventoryController);

  return createExpressServer({
    routes: {
      '/api': inventoryRoutes
    }
  });
}

