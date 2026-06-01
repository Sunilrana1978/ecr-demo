export class TodoController {
  constructor(repository) {
    this.repository = repository;
  }

  getAllTodos(req, res) {
    const todos = this.repository.findAll();
    res.json(todos);
  }

  getTodoById(req, res) {
    const { id } = req.params;
    const todo = this.repository.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  }

  createTodo(req, res) {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const todo = this.repository.create(title, description || '');
    res.status(201).json(todo);
  }

  updateTodo(req, res) {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const todo = this.repository.update(id, title, description, completed);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  }

  deleteTodo(req, res) {
    const { id } = req.params;
    const deleted = this.repository.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).send();
  }
}
