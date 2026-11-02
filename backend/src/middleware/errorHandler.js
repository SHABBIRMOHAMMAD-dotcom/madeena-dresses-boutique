import config from '../config/env.js';

/**
 * 404 Not Found handler for undefined routes.
 */
export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
}

/**
 * Global Centralized Exception & Error Handler.
 * Returns consistent, secure JSON responses with appropriate HTTP status codes:
 * 400 Bad Request, 404 Not Found, 500 Internal Server Error.
 */
export function globalErrorHandler(err, req, res, next) {
  console.error('[UNCAUGHT EXCEPTION]', err);

  const statusCode = err.statusCode || (err.status ? Number(err.status) : 500);
  const isProd = config.isProduction;

  // Handle JSON syntax parsing errors from bad request bodies
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON payload',
      message: 'The request body could not be parsed as valid JSON.'
    });
  }

  // Handle CORS errors
  if (err.message && err.message.includes('Not allowed by CORS')) {
    return res.status(403).json({
      success: false,
      error: 'CORS Forbidden',
      message: err.message
    });
  }

  return res.status(statusCode).json({
    success: false,
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred while processing your request.',
    ...(isProd ? {} : { stack: err.stack })
  });
}

export default {
  notFoundHandler,
  globalErrorHandler
};

