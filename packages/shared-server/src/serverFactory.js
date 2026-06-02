import express from 'express';
import { errorHandler, correlationIdMiddleware, requestLogger } from '@shared/middleware';

export function createExpressServer(config = {}) {
  const app = express();

  app.use(express.json());
  app.use(correlationIdMiddleware);
  app.use(requestLogger);

  if (config.routes && typeof config.routes === 'object') {
    Object.entries(config.routes).forEach(([path, router]) => {
      app.use(path, router);
    });
  }

  app.use(errorHandler);

  return app;
}
