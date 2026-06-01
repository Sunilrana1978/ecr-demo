export class InventoryItem {
  constructor(id, name, sku, quantity, price) {
    this.id = id;
    this.name = name;
    this.sku = sku;
    this.quantity = quantity;
    this.price = price;
    this.createdAt = new Date();
  }
}
