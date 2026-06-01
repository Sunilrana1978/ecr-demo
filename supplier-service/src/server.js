import express from 'express';
import { SupplierRepository } from './repositories/SupplierRepository.js';
import { SupplierController } from './controllers/SupplierController.js';
import { createSupplierRoutes } from './routes/supplierRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createServer() {
  const app = express();

  app.use(express.json());

  const supplierRepository = new SupplierRepository();
  const supplierController = new SupplierController(supplierRepository);
  const supplierRoutes = createSupplierRoutes(supplierController);

  app.use('/', supplierRoutes);
  app.use(errorHandler);

  return app;
}
