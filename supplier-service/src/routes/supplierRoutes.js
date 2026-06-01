import { Router } from 'express';

export function createSupplierRoutes(controller) {
  const router = Router();

  router.get('/suppliers', (req, res) => controller.getAllSuppliers(req, res));
  router.get('/suppliers/:id', (req, res) => controller.getSupplierById(req, res));
  router.post('/suppliers', (req, res) => controller.createSupplier(req, res));
  router.put('/suppliers/:id', (req, res) => controller.updateSupplier(req, res));
  router.delete('/suppliers/:id', (req, res) => controller.deleteSupplier(req, res));

  return router;
}
