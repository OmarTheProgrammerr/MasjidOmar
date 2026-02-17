const express = require('express');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const router = express.Router();

function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// GET /api/matches — public, optional ?sport=basketball|volleyball
router.get('/', async (req, res) => {
  try {
    const { sport } = req.query;
    const filter = sport ? { sport } : {};
    const matches = await req.db
      .collection('matches')
      .find(filter)
      .sort({ date: 1 })
      .toArray();
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/matches — admin only
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { sport, team1, team2, date, time, location } = req.body;

    if (!sport || !team1 || !team2 || !date) {
      return res.status(400).json({ message: 'Sport, team1, team2, and date are required' });
    }

    if (!['basketball', 'volleyball'].includes(sport)) {
      return res.status(400).json({ message: 'Sport must be basketball or volleyball' });
    }

    const match = {
      sport,
      team1,
      team2,
      date: new Date(date),
      time: time || 'TBD',
      location: location || 'Main Court',
      score: { team1: null, team2: null },
      status: 'scheduled',
      winner: null,
      createdAt: new Date(),
    };

    const result = await req.db.collection('matches').insertOne(match);
    res.status(201).json({ ...match, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/matches/:id — admin only (update score/status)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { score, status, winner, date, time, location } = req.body;
    const update = {};
    if (score) update.score = score;
    if (status) update.status = status;
    if (winner !== undefined) update.winner = winner;
    if (date) update.date = new Date(date);
    if (time) update.time = time;
    if (location) update.location = location;

    const result = await req.db.collection('matches').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: update },
      { returnDocument: 'after' }
    );

    if (!result) return res.status(404).json({ message: 'Match not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/matches/:id — admin only
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const result = await req.db.collection('matches').deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Match not found' });
    res.json({ message: 'Match deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
