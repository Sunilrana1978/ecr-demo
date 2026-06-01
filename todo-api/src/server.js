import express from 'express';
import { TodoRepository } from './repositories/TodoRepository.js';
import { TodoController } from './controllers/TodoController.js';
import { createTodoRoutes } from './routes/todoRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createServer() {
  const app = express();

  app.use(express.json());

  const todoRepository = new TodoRepository();
  const todoController = new TodoController(todoRepository);
  const todoRoutes = createTodoRoutes(todoController);

  app.use('/', todoRoutes);
  app.use(errorHandler);

  return app;
}
