// server/metrics.js
import express from 'express';
import client from 'prom-client';

const router = express.Router();

// Registro global de métricas
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Métricas personalizadas
export const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Número total de peticiones HTTP',
  labelNames: ['method', 'route', 'status_code'],
});

export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duración de las solicitudes HTTP en milisegundos',
  labelNames: ['method', 'route'],
  buckets: [50, 100, 300, 500, 1000, 3000],
});

// Registrar métricas personalizadas
register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDuration);

// Endpoint /metrics (Prometheus format)
router.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

export default router;
export { register };
