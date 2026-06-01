import axios from 'axios';

export class SupplierClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || process.env.SUPPLIER_SERVICE_URL || 'http://localhost:3004';
  }

  async getAllSuppliers() {
    try {
      const response = await axios.get(`${this.baseUrl}/suppliers`);
      return response.data;
    } catch (error) {
      console.error('Get suppliers failed:', error.message);
      return [];
    }
  }

  async getSupplierById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/suppliers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get supplier failed:', error.message);
      return null;
    }
  }
}
