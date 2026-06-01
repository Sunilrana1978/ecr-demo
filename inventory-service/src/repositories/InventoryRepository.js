import { InventoryItem } from '../models/InventoryItem.js';

export class InventoryRepository {
  constructor() {
    this.items = new Map();
    this.nextId = 1;
    this.initializeSampleData();
  }

  initializeSampleData() {
    this.create('Laptop', 'LAPTOP-001', 10, 999.99);
    this.create('Mouse', 'MOUSE-001', 50, 29.99);
    this.create('Keyboard', 'KB-001', 30, 79.99);
  }

  findAll() {
    return Array.from(this.items.values());
  }

  findById(id) {
    return this.items.get(parseInt(id));
  }

  findBySku(sku) {
    return Array.from(this.items.values()).find(item => item.sku === sku);
  }

  create(name, sku, quantity, price) {
    const id = this.nextId++;
    const item = new InventoryItem(id, name, sku, quantity, price);
    this.items.set(id, item);
    return item;
  }

  update(id, quantity) {
    const item = this.items.get(parseInt(id));
    if (item) {
      item.quantity = quantity;
      return item;
    }
    return null;
  }

  deductStock(sku, quantity) {
    const item = this.findBySku(sku);
    if (!item) return null;
    if (item.quantity < quantity) return null;
    item.quantity -= quantity;
    return item;
  }

  delete(id) {
    return this.items.delete(parseInt(id));
  }
}
