export class Order {
  constructor(data) {
    if (typeof data === 'number') {
      // Legacy constructor support: Order(id, customerId, items, totalAmount, status)
      this.id = data;
      this.customerId = arguments[1];
      this.items = arguments[2];
      this.totalAmount = arguments[3];
      this.status = arguments[4] || 'pending';
      this.createdAt = new Date();
    } else {
      // New constructor: Order({ id, customerId, items, totalAmount, status })
      this.id = data.id;
      this.customerId = data.customerId;
      this.items = data.items || [];
      this.totalAmount = data.totalAmount || 0;
      this.status = data.status || 'pending';
      this.createdAt = data.createdAt || new Date();
    }
  }
}

