const express = require('express');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const router = express.Router();

const VALID_SPORTS = ['basketball', 'volleyball', 'pingpong'];

function getAdminFromRequest(req) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

function requireAdmin(req, res, next) {
  const user = getAdminFromRequest(req);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });
  req.user = user;
  next();
}

// GET /api/teams — public: confirmed teams only. Admin can pass ?status=pending
router.get('/', async (req, res) => {
  try {
    const { sport, status } = req.query;
    const admin = getAdminFromRequest(req);
    const statusFilter = admin && status === 'pending' ? 'pending' : 'confirmed';
    const filter = { status: statusFilter };
    if (sport) filter.sport = sport;
    const teams = await req.db.collection('teams').find(filter).sort({ createdAt: -1 }).toArray();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/teams/:id
router.get('/:id', async (req, res) => {
  try {
    const team = await req.db.collection('teams').findOne({ _id: new ObjectId(req.params.id) });
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/teams — public can register (status: pending), admin submissions are auto-confirmed
router.post('/', async (req, res) => {
  try {
    const { name, sport, captain, players, contact } = req.body;
    if (!name || !sport || !captain) {
      return res.status(400).json({ message: 'Team name, sport, and captain are required' });
    }
    if (!VALID_SPORTS.includes(sport)) {
      return res.status(400).json({ message: 'Sport must be basketball, volleyball, or pingpong' });
    }

    const admin = getAdminFromRequest(req);
    const status = admin ? 'confirmed' : 'pending';

    const existing = await req.db.collection('teams').findOne({ name, sport });
    if (existing) {
      return res.status(409).json({ message: `A ${sport} team named "${name}" already exists` });
    }

    const team = {
      name,
      sport,
      captain,
      contact: contact || '',
      players: Array.isArray(players) ? players : [],
      status,
      createdAt: new Date(),
    };

    const result = await req.db.collection('teams').insertOne(team);
    res.status(201).json({ ...team, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PATCH /api/teams/:id/approve — admin only
router.patch('/:id/approve', requireAdmin, async (req, res) => {
  try {
    const result = await req.db.collection('teams').findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { status: 'confirmed' } },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ message: 'Team not found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/teams/:id — admin only
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { name, sport, captain, players, contact } = req.body;
    const update = {};
    if (name) update.name = name;
    if (sport) update.sport = sport;
    if (captain) update.captain = captain;
    if (players) update.players = players;
    if (contact !== undefined) update.contact = contact;
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
    const result = await req.db.collection('teams').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Team not found' });
    res.json({ message: 'Team deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
