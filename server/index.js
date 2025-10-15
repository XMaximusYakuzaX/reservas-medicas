const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_dev';

const fakeUser = {
  id: 1,
  email: 'demo@med.app',
  passwordHash: bcrypt.hashSync('123456', 10),
  name: 'Usuario Demo',
};

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email !== fakeUser.email || !bcrypt.compareSync(password, fakeUser.passwordHash)) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ sub: fakeUser.id, email: fakeUser.email }, JWT_SECRET, {
    expiresIn: '1h',
  });
  res.json({ token, user: { id: fakeUser.id, name: fakeUser.name, email: fakeUser.email } });
});

function authGuard(req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Token requerido' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

app.get('/profile', authGuard, (req, res) => {
  res.json({ id: fakeUser.id, email: fakeUser.email, name: fakeUser.name });
});

app.listen(4000, '0.0.0.0', () => console.log('Auth API en http://localhost:4000'));
