export class InventoryController {
  constructor(repository) {
    this.repository = repository;
  }

  getAllItems(req, res) {
    const items = this.repository.findAll();
    res.json(items);
  }

  getItemById(req, res) {
    const { id } = req.params;
    const item = this.repository.findById(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  }

  createItem(req, res) {
    const { name, sku, quantity, price } = req.body;
    if (!name || !sku || quantity === undefined || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const item = this.repository.create(name, sku, quantity, price);
    res.status(201).json(item);
  }

  updateItem(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;
    if (quantity === undefined) {
      return res.status(400).json({ error: 'Quantity is required' });
    }
    const item = this.repository.update(id, quantity);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  }

  checkInventory(req, res) {
    const { sku, quantity } = req.body;
    const item = this.repository.findBySku(sku);
    if (!item) {
      return res.status(404).json({ available: false, message: 'Item not found' });
    }
    const available = item.quantity >= quantity;
    res.json({ available, currentQuantity: item.quantity });
  }

  deductStock(req, res) {
    const { sku, quantity } = req.body;
    const result = this.repository.deductStock(sku, quantity);
    if (!result) {
      return res.status(400).json({ success: false, message: 'Insufficient stock or item not found' });
    }
    res.json({ success: true, item: result });
  }

  deleteItem(req, res) {
    const { id } = req.params;
    const deleted = this.repository.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(204).send();
  }
}
