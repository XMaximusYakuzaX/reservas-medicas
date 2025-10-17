// server/middleware/metricsMiddleware.js
import { httpRequestCounter, httpRequestDuration } from '../metrics.js';

export function metricsMiddleware(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });

    httpRequestDuration.observe(
      { method: req.method, route: req.route ? req.route.path : req.path },
      duration
    );
  });

  next();
}
