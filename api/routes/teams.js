const express = require('express');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware: verify admin JWT
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

// GET /api/teams — public, optional ?sport=basketball|volleyball
router.get('/', async (req, res) => {
  try {
    const { sport } = req.query;
    const filter = sport ? { sport } : {};
    const teams = await req.db.collection('teams').find(filter).sort({ createdAt: -1 }).toArray();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/teams/:id — get one team
router.get('/:id', async (req, res) => {
  try {
    const team = await req.db.collection('teams').findOne({ _id: new ObjectId(req.params.id) });
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/teams — admin only
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { name, sport, captain, players } = req.body;

    if (!name || !sport || !captain) {
      return res.status(400).json({ message: 'Name, sport, and captain are required' });
    }

    if (!['basketball', 'volleyball'].includes(sport)) {
      return res.status(400).json({ message: 'Sport must be basketball or volleyball' });
    }

    // Check for duplicate team name in same sport
    const existing = await req.db.collection('teams').findOne({ name, sport });
    if (existing) {
      return res.status(409).json({ message: `A ${sport} team named "${name}" already exists` });
    }

    const team = {
      name,
      sport,
      captain,
      players: Array.isArray(players) ? players : [],
      createdAt: new Date(),
    };

    const result = await req.db.collection('teams').insertOne(team);
    res.status(201).json({ ...team, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/teams/:id — admin only
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { name, sport, captain, players } = req.body;
    const update = {};
    if (name) update.name = name;
    if (sport) update.sport = sport;
    if (captain) update.captain = captain;
    if (players) update.players = players;

    const result = await req.db.collection('teams').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: update },
      { returnDocument: 'after' }
    );

    if (!result) return res.status(404).json({ message: 'Team not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/teams/:id — admin only
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const result = await req.db.collection('teams').deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Team not found' });
    res.json({ message: 'Team deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
