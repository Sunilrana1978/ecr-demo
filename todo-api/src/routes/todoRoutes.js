import { Router } from 'express';
import { validate, todoSchema, updateTodoSchema } from '@shared/validation';

export function createTodoRoutes(controller) {
  const router = Router();

  router.get('/todos', (req, res, next) => controller.getAllTodos(req, res, next));
  router.get('/todos/:id', (req, res, next) => controller.getTodoById(req, res, next));
  router.post('/todos', validate(todoSchema), (req, res, next) => controller.createTodo(req, res, next));
  router.put('/todos/:id', validate(updateTodoSchema), (req, res, next) => controller.updateTodo(req, res, next));
  router.delete('/todos/:id', (req, res, next) => controller.deleteTodo(req, res, next));

  return router;
}

