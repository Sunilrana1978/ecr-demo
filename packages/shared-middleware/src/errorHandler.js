export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  const correlationId = req.correlationId || 'unknown';

  console.error({
    timestamp: new Date().toISOString(),
    correlationId,
    error: err.name,
    message,
    statusCode,
    stack: err.stack
  });

  res.status(statusCode).json({
    error: message,
    correlationId,
    ...(process.env.NODE_ENV === 'development' && { details: err.details })
  });
}
