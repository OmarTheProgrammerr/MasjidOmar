require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

// Cache the DB connection across serverless invocations
let cachedDb = null;

async function connectDB() {
  if (cachedDb) return cachedDb;
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedDb = client.db('masjidomar');
  return cachedDb;
}

// Auth routes first — they only need env vars, not the DB
app.use('/api/auth', require('./routes/auth'));

app.get('/api/health', (req, res) =>
  res.json({ status: 'ok', admin: !!process.env.ADMIN_USERNAME })
);

// DB middleware only for routes that need it
app.use(async (req, res, next) => {
  try {
    req.db = await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed' });
  }
});

app.use('/api/teams', require('./routes/teams'));
app.use('/api/matches', require('./routes/matches'));

// Export for Vercel — do NOT call app.listen()
module.exports = app;
