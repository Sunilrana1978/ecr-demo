import { createExpressServer } from '@shared/server';
import { TodoRepository } from './repositories/TodoRepository.js';
import { TodoController } from './controllers/TodoController.js';
import { createTodoRoutes } from './routes/todoRoutes.js';

export function createServer() {
  const todoRepository = new TodoRepository();
  const todoController = new TodoController(todoRepository);
  const todoRoutes = createTodoRoutes(todoController);

  return createExpressServer({
    routes: {
      '/api': todoRoutes
    }
  });
}

