import { InventoryClient } from '../client/InventoryClient.js';
import { SupplierClient } from '../client/SupplierClient.js';

export class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
    this.inventoryClient = new InventoryClient();
    this.supplierClient = new SupplierClient();
  }

  async validateOrder(items) {
    for (const item of items) {
      const inventory = await this.inventoryClient.checkInventory(item.sku, item.quantity);
      if (!inventory.available) {
        return { valid: false, message: `Insufficient inventory for SKU: ${item.sku}` };
      }
    }
    return { valid: true };
  }

  async createOrder(customerId, items) {
    const validation = await this.validateOrder(items);
    if (!validation.valid) {
      return { success: false, message: validation.message };
    }

    let totalAmount = 0;
    for (const item of items) {
      totalAmount += item.quantity * item.price;
    }

    const order = this.orderRepository.create(customerId, items, totalAmount);

    for (const item of items) {
      await this.inventoryClient.deductStock(item.sku, item.quantity);
    }

    return { success: true, order };
  }

  async getOrderDetails(orderId) {
    const order = this.orderRepository.findById(orderId);
    if (!order) {
      return { success: false, message: 'Order not found' };
    }

    const suppliers = await this.supplierClient.getAllSuppliers();
    return { success: true, order, suppliers };
  }
}
