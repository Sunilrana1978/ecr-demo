import { Todo } from '../models/Todo.js';

export class TodoRepository {
  constructor() {
    this.todos = new Map();
    this.nextId = 1;
  }

  findAll() {
    return Array.from(this.todos.values());
  }

  findById(id) {
    return this.todos.get(parseInt(id));
  }

  create(title, description) {
    const id = this.nextId++;
    const todo = new Todo(id, title, description);
    this.todos.set(id, todo);
    return todo;
  }

  update(id, title, description, completed) {
    const todo = this.todos.get(parseInt(id));
    if (todo) {
      if (title) todo.title = title;
      if (description) todo.description = description;
      if (completed !== undefined) todo.completed = completed;
      return todo;
    }
    return null;
  }

  delete(id) {
    return this.todos.delete(parseInt(id));
  }
}
