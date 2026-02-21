import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { readDb, writeDb } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-super-secret';

app.use(cors());
app.use(express.json());

function createToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token invalid' });
  }
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email and password' });
  }

  const db = readDb();
  const existingUser = db.users.find((user) => user.email.toLowerCase() === email.toLowerCase());

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), name, email, password: hashedPassword };

  db.users.push(user);
  writeDb(db);

  return res.status(201).json({
    token: createToken(user),
    user: { id: user.id, name: user.name, email: user.email }
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const db = readDb();
  const user = db.users.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  return res.json({
    token: createToken(user),
    user: { id: user.id, name: user.name, email: user.email }
  });
});

app.get('/api/goals', authMiddleware, (req, res) => {
  const db = readDb();
  const goals = db.goals.filter((goal) => goal.userId === req.user.userId);
  res.json(goals);
});

app.post('/api/goals', authMiddleware, (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: 'Goal text is required' });
  }

  const db = readDb();
  const goal = {
    id: uuidv4(),
    text,
    userId: req.user.userId,
    createdAt: new Date().toISOString()
  };

  db.goals.push(goal);
  writeDb(db);

  return res.status(201).json(goal);
});

app.delete('/api/goals/:id', authMiddleware, (req, res) => {
  const db = readDb();
  const goal = db.goals.find((item) => item.id === req.params.id);

  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  if (goal.userId !== req.user.userId) {
    return res.status(403).json({ message: 'Not authorized to delete this goal' });
  }

  db.goals = db.goals.filter((item) => item.id !== req.params.id);
  writeDb(db);

  return res.json({ id: req.params.id });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
