import axios from 'axios';

export class InventoryClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || process.env.INVENTORY_SERVICE_URL || 'http://localhost:3003';
  }

  async checkInventory(sku, quantity) {
    try {
      const response = await axios.post(`${this.baseUrl}/inventory/check`, {
        sku,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Inventory check failed:', error.message);
      return { available: false };
    }
  }

  async deductStock(sku, quantity) {
    try {
      const response = await axios.post(`${this.baseUrl}/inventory/deduct`, {
        sku,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Stock deduction failed:', error.message);
      return { success: false };
    }
  }
}
