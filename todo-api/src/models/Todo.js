export class Todo {
  constructor(data) {
    if (typeof data === 'number') {
      // Legacy constructor support: Todo(id, title, description, completed)
      this.id = data;
      this.title = arguments[1];
      this.description = arguments[2];
      this.completed = arguments[3] || false;
      this.createdAt = new Date();
    } else {
      // New constructor: Todo({ id, title, description, completed })
      this.id = data.id;
      this.title = data.title;
      this.description = data.description || null;
      this.completed = data.completed || false;
      this.createdAt = data.createdAt || new Date();
    }
  }
}

