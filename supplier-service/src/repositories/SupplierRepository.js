import { BaseRepository } from '@shared/repositories';
import { Supplier } from '../models/Supplier.js';

export class SupplierRepository extends BaseRepository {
  constructor() {
    super(Supplier);
    this.initializeSampleData();
  }

  initializeSampleData() {
    this.create({ name: 'Tech Supplies Inc', email: 'info@techsupplies.com', phone: '+1-555-0001', rating: 4.5 });
    this.create({ name: 'Global Electronics', email: 'contact@globalelectronics.com', phone: '+1-555-0002', rating: 4.8 });
    this.create({ name: 'Premium Parts Co', email: 'support@premiumparts.com', phone: '+1-555-0003', rating: 4.2 });
  }
}

