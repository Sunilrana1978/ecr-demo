import { BaseRepository } from '@shared/repositories';
import { InventoryItem } from '../models/InventoryItem.js';

export class InventoryRepository extends BaseRepository {
  constructor() {
    super(InventoryItem);
    this.initializeSampleData();
  }

  initializeSampleData() {
    this.create({ name: 'Laptop', sku: 'LAPTOP-001', quantity: 10, price: 999.99 });
    this.create({ name: 'Mouse', sku: 'MOUSE-001', quantity: 50, price: 29.99 });
    this.create({ name: 'Keyboard', sku: 'KB-001', quantity: 30, price: 79.99 });
  }

  findBySku(sku) {
    return Array.from(this.storage.values()).find(item => item.sku === sku);
  }

  deductStock(sku, quantity) {
    const item = this.findBySku(sku);
    if (!item) return null;
    if (item.quantity < quantity) return null;
    item.quantity -= quantity;
    return item;
  }
}

