export class Order {
  constructor(id, customerId, items, totalAmount, status = 'pending') {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.totalAmount = totalAmount;
    this.status = status;
    this.createdAt = new Date();
  }
}
