/**
 * Structured HTTP request logger middleware.
 * Logs method, URL, status code, response time, and timestamp.
 */
export function requestLogger(req, res, next) {
  const start = process.hrtime();
  const timestamp = new Date().toISOString();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const durationMs = (diff[0] * 1e3 + diff[1] * 1e-6).toFixed(2);
    const status = res.statusCode;

    // Color or status indicator
    const statusSign = status >= 500 ? '❌' : status >= 400 ? '⚠️' : '✅';

    console.log(
      `[${timestamp}] ${statusSign} ${req.method} ${req.originalUrl || req.url} ${status} - ${durationMs}ms`
    );
  });

  next();
}

export default requestLogger;

