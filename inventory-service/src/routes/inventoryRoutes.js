import { Router } from 'express';
import { validate, inventorySchema, updateInventorySchema } from '@shared/validation';

export function createInventoryRoutes(controller) {
  const router = Router();

  router.get('/inventory', (req, res, next) => controller.getAllItems(req, res, next));
  router.get('/inventory/:id', (req, res, next) => controller.getItemById(req, res, next));
  router.post('/inventory', validate(inventorySchema), (req, res, next) => controller.createItem(req, res, next));
  router.put('/inventory/:id', validate(updateInventorySchema), (req, res, next) => controller.updateItem(req, res, next));
  router.post('/inventory/check', (req, res, next) => controller.checkInventory(req, res, next));
  router.post('/inventory/deduct', (req, res, next) => controller.deductStock(req, res, next));
  router.delete('/inventory/:id', (req, res, next) => controller.deleteItem(req, res, next));

  return router;
}

