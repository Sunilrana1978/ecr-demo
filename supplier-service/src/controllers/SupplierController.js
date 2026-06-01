export class SupplierController {
  constructor(repository) {
    this.repository = repository;
  }

  getAllSuppliers(req, res) {
    const suppliers = this.repository.findAll();
    res.json(suppliers);
  }

  getSupplierById(req, res) {
    const { id } = req.params;
    const supplier = this.repository.findById(id);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(supplier);
  }

  createSupplier(req, res) {
    const { name, email, phone, rating } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const supplier = this.repository.create(name, email, phone, rating || 4.0);
    res.status(201).json(supplier);
  }

  updateSupplier(req, res) {
    const { id } = req.params;
    const { name, email, phone, rating } = req.body;
    const supplier = this.repository.update(id, name, email, phone, rating);
    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(supplier);
  }

  deleteSupplier(req, res) {
    const { id } = req.params;
    const deleted = this.repository.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.status(204).send();
  }
}
