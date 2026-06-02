import { NotFoundError } from '@shared/errors';

export class TodoController {
  constructor(repository) {
    this.repository = repository;
  }

  async getAllTodos(req, res, next) {
    try {
      const todos = this.repository.findAll();
      res.json(todos);
    } catch (error) {
      next(error);
    }
  }

  async getTodoById(req, res, next) {
    try {
      const { id } = req.params;
      const todo = this.repository.findById(id);
      if (!todo) {
        throw new NotFoundError('Todo', id);
      }
      res.json(todo);
    } catch (error) {
      next(error);
    }
  }

  async createTodo(req, res, next) {
    try {
      const data = req.validatedBody;
      const todo = this.repository.create(data);
      res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  }

  async updateTodo(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.validatedBody;
      const todo = this.repository.update(id, data);
      if (!todo) {
        throw new NotFoundError('Todo', id);
      }
      res.json(todo);
    } catch (error) {
      next(error);
    }
  }

  async deleteTodo(req, res, next) {
    try {
      const { id } = req.params;
      const todo = this.repository.findById(id);
      if (!todo) {
        throw new NotFoundError('Todo', id);
      }
      this.repository.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

