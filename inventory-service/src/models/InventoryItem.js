export class InventoryItem {
  constructor(data) {
    if (typeof data === 'number') {
      // Legacy constructor support: InventoryItem(id, name, sku, quantity, price)
      this.id = data;
      this.name = arguments[1];
      this.sku = arguments[2];
      this.quantity = arguments[3];
      this.price = arguments[4];
      this.createdAt = new Date();
    } else {
      // New constructor: InventoryItem({ id, name, sku, quantity, price })
      this.id = data.id;
      this.name = data.name;
      this.sku = data.sku;
      this.quantity = data.quantity || 0;
      this.price = data.price || 0;
      this.createdAt = data.createdAt || new Date();
    }
  }
}

