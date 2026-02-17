import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  IconButton,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API = process.env.REACT_APP_API_URL || '';

// ─── Add Team Form ───────────────────────────────────────────────────────────

function AddTeamForm({ onSuccess }) {
  const { getToken } = useAuth();
  const [form, setForm] = useState({ name: '', sport: 'basketball', captain: '', playersRaw: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.captain) {
      setError('Team name and captain are required.');
      return;
    }
    setLoading(true);
    const players = form.playersRaw
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);
    try {
      await axios.post(
        `${API}/api/teams`,
        { name: form.name, sport: form.sport, captain: form.captain, players },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setSuccess(`Team "${form.name}" added successfully!`);
      setForm({ name: '', sport: 'basketball', captain: '', playersRaw: '' });
      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add team.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={3}>
          Add New Team
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Team Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Sport</InputLabel>
                <Select name="sport" value={form.sport} onChange={handleChange} label="Sport">
                  <MenuItem value="basketball">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SportsBasketballIcon sx={{ color: '#E65100', fontSize: 20 }} />
                      Basketball
                    </Box>
                  </MenuItem>
                  <MenuItem value="volleyball">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SportsVolleyballIcon sx={{ color: '#1565C0', fontSize: 20 }} />
                      Volleyball
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Captain Name"
                name="captain"
                value={form.captain}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Players (one per line)"
                name="playersRaw"
                value={form.playersRaw}
                onChange={handleChange}
                placeholder="Player 1&#10;Player 2&#10;Player 3"
                helperText="Enter each player name on a new line"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <AddIcon />}
                disabled={loading}
              >
                Add Team
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Add Match Form ──────────────────────────────────────────────────────────

function AddMatchForm({ teams, onSuccess }) {
  const { getToken } = useAuth();
  const [form, setForm] = useState({
    sport: 'basketball',
    team1: '',
    team2: '',
    date: '',
    time: '',
    location: 'Main Court',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const sportTeams = teams.filter((t) => t.sport === form.sport);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.team1 || !form.team2) {
      setError('Both teams are required.');
      return;
    }
    if (form.team1 === form.team2) {
      setError('Team 1 and Team 2 must be different.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/api/matches`, form, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setSuccess('Match scheduled successfully!');
      setForm({ sport: 'basketball', team1: '', team2: '', date: '', time: '', location: 'Main Court' });
      onSuccess();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to schedule match.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={3}>
          Schedule New Match
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Sport</InputLabel>
                <Select name="sport" value={form.sport} onChange={handleChange} label="Sport">
                  <MenuItem value="basketball">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SportsBasketballIcon sx={{ color: '#E65100', fontSize: 20 }} />
                      Basketball
                    </Box>
                  </MenuItem>
                  <MenuItem value="volleyball">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SportsVolleyballIcon sx={{ color: '#1565C0', fontSize: 20 }} />
                      Volleyball
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Team 1</InputLabel>
                <Select name="team1" value={form.team1} onChange={handleChange} label="Team 1">
                  {sportTeams.map((t) => (
                    <MenuItem key={t._id} value={t.name}>{t.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Team 2</InputLabel>
                <Select name="team2" value={form.team2} onChange={handleChange} label="Team 2">
                  {sportTeams.map((t) => (
                    <MenuItem key={t._id} value={t.name}>{t.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <AddIcon />}
                disabled={loading}
              >
                Schedule Match
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Update Score Dialog ─────────────────────────────────────────────────────

function UpdateScoreDialog({ match, open, onClose, onUpdate }) {
  const { getToken } = useAuth();
  const [score, setScore] = useState({ team1: '', team2: '' });
  const [status, setStatus] = useState('ongoing');
  const [winner, setWinner] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match) {
      setScore({ team1: match.score?.team1 ?? '', team2: match.score?.team2 ?? '' });
      setStatus(match.status || 'ongoing');
      setWinner(match.winner || '');
    }
  }, [match]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(
        `${API}/api/matches/${match._id}`,
        {
          score: { team1: Number(score.team1), team2: Number(score.team2) },
          status,
          winner: status === 'completed' ? winner : null,
        },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      onUpdate();
      onClose();
    } catch {
      // silent fail — user can retry
    } finally {
      setLoading(false);
    }
  };

  if (!match) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle fontWeight={700}>Update Score</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {match.team1} vs {match.team2}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={match.team1}
              type="number"
              value={score.team1}
              onChange={(e) => setScore({ ...score, team1: e.target.value })}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={match.team2}
              type="number"
              value={score.team2}
              onChange={(e) => setScore({ ...score, team2: e.target.value })}
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Status">
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="ongoing">Live / Ongoing</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {status === 'completed' && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Winner</InputLabel>
                <Select value={winner} onChange={(e) => setWinner(e.target.value)} label="Winner">
                  <MenuItem value="">Draw / No winner</MenuItem>
                  <MenuItem value={match.team1}>{match.team1}</MenuItem>
                  <MenuItem value={match.team2}>{match.team2}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Main Admin Dashboard ────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { getToken } = useAuth();
  const [tab, setTab] = useState(0);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snack, setSnack] = useState('');
  const [editMatch, setEditMatch] = useState(null);
  const [scoreDialogOpen, setScoreDialogOpen] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [tRes, mRes] = await Promise.all([
        axios.get(`${API}/api/teams`),
        axios.get(`${API}/api/matches`),
      ]);
      setTeams(tRes.data);
      setMatches(mRes.data);
    } catch {
      // handled per-section
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const deleteTeam = async (id, name) => {
    if (!window.confirm(`Delete team "${name}"? This cannot be undone.`)) return;
    await axios.delete(`${API}/api/teams/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setSnack('Team deleted.');
    loadData();
  };

  const deleteMatch = async (id) => {
    if (!window.confirm('Delete this match?')) return;
    await axios.delete(`${API}/api/matches/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setSnack('Match deleted.');
    loadData();
  };

  const sportIcon = (sport) =>
    sport === 'basketball' ? (
      <SportsBasketballIcon sx={{ color: '#E65100', fontSize: 18 }} />
    ) : (
      <SportsVolleyballIcon sx={{ color: '#1565C0', fontSize: 18 }} />
    );

  return (
    <Box sx={{ backgroundColor: '#F4F6F4', minHeight: 'calc(100vh - 64px)', pb: 8 }}>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #124A28, #1B6B3A)', py: 5, color: 'white', mb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={800} mb={0.5}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.85 }}>
            Manage teams, matches, and scores for both sports
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Chip
              icon={<GroupsIcon sx={{ color: 'white !important' }} />}
              label={`${teams.length} Teams`}
              sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
            <Chip
              icon={<EmojiEventsIcon sx={{ color: 'white !important' }} />}
              label={`${matches.length} Matches`}
              sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{ mb: 3, backgroundColor: '#fff', borderRadius: 2, px: 1 }}
        >
          <Tab label="Add Team" />
          <Tab label="Manage Teams" />
          <Tab label="Schedule Match" />
          <Tab label="Manage Matches" />
        </Tabs>

        {loading ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {tab === 0 && <AddTeamForm onSuccess={loadData} />}

            {tab === 1 && (
              <Card>
                <CardContent sx={{ p: 0 }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#F4F6F4' }}>
                          <TableCell><strong>Team</strong></TableCell>
                          <TableCell><strong>Sport</strong></TableCell>
                          <TableCell><strong>Captain</strong></TableCell>
                          <TableCell><strong>Players</strong></TableCell>
                          <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teams.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                              No teams yet — add one from the "Add Team" tab.
                            </TableCell>
                          </TableRow>
                        ) : (
                          teams.map((team) => (
                            <TableRow key={team._id} hover>
                              <TableCell fontWeight={600}>{team.name}</TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  {sportIcon(team.sport)}
                                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                    {team.sport}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>{team.captain}</TableCell>
                              <TableCell>{team.players?.length || 0}</TableCell>
                              <TableCell align="right">
                                <IconButton
                                  color="error"
                                  size="small"
                                  onClick={() => deleteTeam(team._id, team.name)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}

            {tab === 2 && <AddMatchForm teams={teams} onSuccess={loadData} />}

            {tab === 3 && (
              <Card>
                <CardContent sx={{ p: 0 }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#F4F6F4' }}>
                          <TableCell><strong>Match</strong></TableCell>
                          <TableCell><strong>Sport</strong></TableCell>
                          <TableCell><strong>Date</strong></TableCell>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell><strong>Score</strong></TableCell>
                          <TableCell align="right"><strong>Actions</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {matches.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                              No matches yet — schedule one from the "Schedule Match" tab.
                            </TableCell>
                          </TableRow>
                        ) : (
                          matches.map((match) => (
                            <TableRow key={match._id} hover>
                              <TableCell>
                                <Typography variant="body2" fontWeight={600}>
                                  {match.team1} vs {match.team2}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  {sportIcon(match.sport)}
                                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                    {match.sport}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2">
                                  {new Date(match.date).toLocaleDateString()}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={match.status}
                                  size="small"
                                  color={
                                    match.status === 'completed'
                                      ? 'secondary'
                                      : match.status === 'ongoing'
                                      ? 'success'
                                      : 'default'
                                  }
                                  sx={{ textTransform: 'capitalize' }}
                                />
                              </TableCell>
                              <TableCell>
                                {match.score?.team1 !== null && match.score?.team1 !== undefined
                                  ? `${match.score.team1} – ${match.score.team2}`
                                  : '—'}
                              </TableCell>
                              <TableCell align="right">
                                <IconButton
                                  color="primary"
                                  size="small"
                                  onClick={() => { setEditMatch(match); setScoreDialogOpen(true); }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                  color="error"
                                  size="small"
                                  onClick={() => deleteMatch(match._id)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </Container>

      <UpdateScoreDialog
        match={editMatch}
        open={scoreDialogOpen}
        onClose={() => setScoreDialogOpen(false)}
        onUpdate={loadData}
      />

      <Snackbar
        open={!!snack}
        autoHideDuration={3000}
        onClose={() => setSnack('')}
        message={snack}
      />
    </Box>
  );
}
