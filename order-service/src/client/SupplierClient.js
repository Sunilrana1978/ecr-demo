import { HttpClient } from '@shared/http-client';

export class SupplierClient extends HttpClient {
  constructor(baseUrl) {
    const url = baseUrl || process.env.SUPPLIER_SERVICE_URL || 'http://localhost:3004';
    super(url, 'SupplierService');
  }

  async getAllSuppliers() {
    return this.get('/api/suppliers');
  }

  async getSupplierById(id) {
    return this.get(`/api/suppliers/${id}`);
  }
}

