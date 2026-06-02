import { BaseRepository } from '@shared/repositories';
import { Order } from '../models/Order.js';

export class OrderRepository extends BaseRepository {
  constructor() {
    super(Order);
  }

  updateStatus(id, status) {
    const order = this.storage.get(parseInt(id));
    if (order) {
      order.status = status;
      return order;
    }
    return null;
  }
}

