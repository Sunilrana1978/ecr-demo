import { Router } from 'express';

export function createTodoRoutes(controller) {
  const router = Router();

  router.get('/todos', (req, res) => controller.getAllTodos(req, res));
  router.get('/todos/:id', (req, res) => controller.getTodoById(req, res));
  router.post('/todos', (req, res) => controller.createTodo(req, res));
  router.put('/todos/:id', (req, res) => controller.updateTodo(req, res));
  router.delete('/todos/:id', (req, res) => controller.deleteTodo(req, res));

  return router;
}
