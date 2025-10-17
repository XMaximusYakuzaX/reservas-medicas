/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helmet = require('helmet'); // ⬅️ seguridad base

const { metricsRouter } = require('./metrics');
const { metricsMiddleware } = require('./middleware/metricsMiddleware');

const app = express();

/* ===== Seguridad base ===== */
app.disable('x-powered-by'); // oculta stack

/** Helmet: CSP, frameguard, nosniff */
app.use(
  helmet({
    frameguard: { action: 'deny' },
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        frameAncestors: ["'none'"], // evita clickjacking
        formAction: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false, // evita fricciones en dev
  })
);

/** Permissions-Policy + no-cache (coincide con hallazgos ZAP informativos) */
app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.setHeader('Pragma', 'no-cache');
  next();
});

/** CORS restringido (dev: Expo) */
const ALLOWED_ORIGINS = (
  process.env.CORS_ORIGINS || 'http://localhost:19006,http://127.0.0.1:19006'
)
  .split(',')
  .map((s) => s.trim());

app.use(
  cors({
    origin(origin, cb) {
      // Postman / curl no envían Origin: permite en dev
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  })
);

app.use(express.json());

/* ===== Healthcheck ===== */
app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'Reservas Médicas API', version: '1.0.0' });
});

/* ===== Demo de autenticación ===== */
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev';

const fakeUser = {
  id: 1,
  email: 'demo@med.app',
  passwordHash: bcrypt.hashSync('123456', 10),
  name: 'Usuario Demo',
};

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (email !== fakeUser.email || !bcrypt.compareSync(password, fakeUser.passwordHash)) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ sub: fakeUser.id, email: fakeUser.email }, JWT_SECRET, {
    expiresIn: '1h',
  });
  return res.json({ token, user: { id: fakeUser.id, name: fakeUser.name, email: fakeUser.email } });
});

function authGuard(req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Token requerido' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

app.get('/profile', authGuard, (_req, res) => {
  res.json({ id: fakeUser.id, email: fakeUser.email, name: fakeUser.name });
});

/* ===== 404 y errores SIEMPRE en JSON ===== */
app.use((req, res) => {
  res.status(404).type('application/json').json({ error: 'Not found', path: req.originalUrl });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  const status = res.statusCode >= 400 ? res.statusCode : 500;
  res
    .status(status)
    .type('application/json')
    .json({ error: err.message || 'Internal error' });
});

/* ===== Start ===== */
const PORT = process.env.PORT || 4000;
const HOST = '0.0.0.0'; // ⬅️ clave para que Docker (k6) acceda desde host.docker.internal
app.listen(PORT, HOST, () => console.log(`Auth API en http://${HOST}:${PORT}`));
