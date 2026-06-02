import { NotFoundError } from '@shared/errors';

export class SupplierController {
  constructor(repository) {
    this.repository = repository;
  }

  async getAllSuppliers(req, res, next) {
    try {
      const suppliers = this.repository.findAll();
      res.json(suppliers);
    } catch (error) {
      next(error);
    }
  }

  async getSupplierById(req, res, next) {
    try {
      const { id } = req.params;
      const supplier = this.repository.findById(id);
      if (!supplier) throw new NotFoundError('Supplier', id);
      res.json(supplier);
    } catch (error) {
      next(error);
    }
  }

  async createSupplier(req, res, next) {
    try {
      const data = req.validatedBody;
      const supplier = this.repository.create(data);
      res.status(201).json(supplier);
    } catch (error) {
      next(error);
    }
  }

  async updateSupplier(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.validatedBody;
      const supplier = this.repository.update(id, data);
      if (!supplier) throw new NotFoundError('Supplier', id);
      res.json(supplier);
    } catch (error) {
      next(error);
    }
  }

  async deleteSupplier(req, res, next) {
    try {
      const { id } = req.params;
      const supplier = this.repository.findById(id);
      if (!supplier) throw new NotFoundError('Supplier', id);
      this.repository.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

