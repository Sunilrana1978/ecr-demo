import { createExpressServer } from '@shared/server';
import { SupplierRepository } from './repositories/SupplierRepository.js';
import { SupplierController } from './controllers/SupplierController.js';
import { createSupplierRoutes } from './routes/supplierRoutes.js';

export function createServer() {
  const supplierRepository = new SupplierRepository();
  const supplierController = new SupplierController(supplierRepository);
  const supplierRoutes = createSupplierRoutes(supplierController);

  return createExpressServer({
    routes: {
      '/api': supplierRoutes
    }
  });
}

