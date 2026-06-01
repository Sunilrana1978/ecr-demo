import { Router } from 'express';

export function createInventoryRoutes(controller) {
  const router = Router();

  router.get('/inventory', (req, res) => controller.getAllItems(req, res));
  router.get('/inventory/:id', (req, res) => controller.getItemById(req, res));
  router.post('/inventory', (req, res) => controller.createItem(req, res));
  router.put('/inventory/:id', (req, res) => controller.updateItem(req, res));
  router.post('/inventory/check', (req, res) => controller.checkInventory(req, res));
  router.post('/inventory/deduct', (req, res) => controller.deductStock(req, res));
  router.delete('/inventory/:id', (req, res) => controller.deleteItem(req, res));

  return router;
}
