import { HttpClient } from '@shared/http-client';

export class InventoryClient extends HttpClient {
  constructor(baseUrl) {
    const url = baseUrl || process.env.INVENTORY_SERVICE_URL || 'http://localhost:3003';
    super(url, 'InventoryService');
  }

  async checkInventory(sku, quantity) {
    return this.post('/api/inventory/check', { sku, quantity });
  }

  async deductStock(sku, quantity) {
    return this.post('/api/inventory/deduct', { sku, quantity });
  }
}

