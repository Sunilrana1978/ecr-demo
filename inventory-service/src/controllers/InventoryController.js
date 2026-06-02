import { NotFoundError, ValidationError } from '@shared/errors';

export class InventoryController {
  constructor(repository) {
    this.repository = repository;
  }

  async getAllItems(req, res, next) {
    try {
      const items = this.repository.findAll();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getItemById(req, res, next) {
    try {
      const { id } = req.params;
      const item = this.repository.findById(id);
      if (!item) throw new NotFoundError('Inventory Item', id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async createItem(req, res, next) {
    try {
      const data = req.validatedBody;
      const item = this.repository.create(data);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.validatedBody;
      const item = this.repository.update(id, data);
      if (!item) throw new NotFoundError('Inventory Item', id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async checkInventory(req, res, next) {
    try {
      const { sku, quantity } = req.body;
      const item = this.repository.findBySku(sku);
      if (!item) throw new NotFoundError('Item with SKU', sku);
      const available = item.quantity >= quantity;
      res.json({ available, currentQuantity: item.quantity });
    } catch (error) {
      next(error);
    }
  }

  async deductStock(req, res, next) {
    try {
      const { sku, quantity } = req.body;
      const result = this.repository.deductStock(sku, quantity);
      if (!result) throw new ValidationError('Insufficient stock or item not found');
      res.json({ success: true, item: result });
    } catch (error) {
      next(error);
    }
  }

  async deleteItem(req, res, next) {
    try {
      const { id } = req.params;
      const item = this.repository.findById(id);
      if (!item) throw new NotFoundError('Inventory Item', id);
      this.repository.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

