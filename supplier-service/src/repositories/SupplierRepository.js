import { Supplier } from '../models/Supplier.js';

export class SupplierRepository {
  constructor() {
    this.suppliers = new Map();
    this.nextId = 1;
    this.initializeSampleData();
  }

  initializeSampleData() {
    this.create('Tech Supplies Inc', 'info@techsupplies.com', '+1-555-0001', 4.5);
    this.create('Global Electronics', 'contact@globalelectronics.com', '+1-555-0002', 4.8);
    this.create('Premium Parts Co', 'support@premiumparts.com', '+1-555-0003', 4.2);
  }

  findAll() {
    return Array.from(this.suppliers.values());
  }

  findById(id) {
    return this.suppliers.get(parseInt(id));
  }

  create(name, email, phone, rating) {
    const id = this.nextId++;
    const supplier = new Supplier(id, name, email, phone, rating);
    this.suppliers.set(id, supplier);
    return supplier;
  }

  update(id, name, email, phone, rating) {
    const supplier = this.suppliers.get(parseInt(id));
    if (supplier) {
      if (name) supplier.name = name;
      if (email) supplier.email = email;
      if (phone) supplier.phone = phone;
      if (rating !== undefined) supplier.rating = rating;
      return supplier;
    }
    return null;
  }

  delete(id) {
    return this.suppliers.delete(parseInt(id));
  }
}
