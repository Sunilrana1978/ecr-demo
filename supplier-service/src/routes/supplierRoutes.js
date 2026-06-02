import { Router } from 'express';
import { validate, supplierSchema, updateSupplierSchema } from '@shared/validation';

export function createSupplierRoutes(controller) {
  const router = Router();

  router.get('/suppliers', (req, res, next) => controller.getAllSuppliers(req, res, next));
  router.get('/suppliers/:id', (req, res, next) => controller.getSupplierById(req, res, next));
  router.post('/suppliers', validate(supplierSchema), (req, res, next) => controller.createSupplier(req, res, next));
  router.put('/suppliers/:id', validate(updateSupplierSchema), (req, res, next) => controller.updateSupplier(req, res, next));
  router.delete('/suppliers/:id', (req, res, next) => controller.deleteSupplier(req, res, next));

  return router;
}

