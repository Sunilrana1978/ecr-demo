import { Order } from '../models/Order.js';

export class OrderRepository {
  constructor() {
    this.orders = new Map();
    this.nextId = 1;
  }

  findAll() {
    return Array.from(this.orders.values());
  }

  findById(id) {
    return this.orders.get(parseInt(id));
  }

  create(customerId, items, totalAmount) {
    const id = this.nextId++;
    const order = new Order(id, customerId, items, totalAmount, 'pending');
    this.orders.set(id, order);
    return order;
  }

  updateStatus(id, status) {
    const order = this.orders.get(parseInt(id));
    if (order) {
      order.status = status;
      return order;
    }
    return null;
  }

  delete(id) {
    return this.orders.delete(parseInt(id));
  }
}
