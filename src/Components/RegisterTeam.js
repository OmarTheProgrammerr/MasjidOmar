import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || '';

const sportOptions = [
  { value: 'basketball', label: 'Basketball', icon: <SportsBasketballIcon sx={{ color: '#E65100' }} />, color: '#E65100' },
  { value: 'volleyball', label: 'Volleyball', icon: <SportsVolleyballIcon sx={{ color: '#1565C0' }} />, color: '#1565C0' },
  { value: 'pingpong', label: 'Ping Pong', icon: <SportsTennisIcon sx={{ color: '#6A1B9A' }} />, color: '#6A1B9A' },
];

export default function RegisterTeam() {
  const [form, setForm] = useState({
    name: '',
    sport: '',
    captain: '',
    contact: '',
    playersRaw: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.sport || !form.captain) {
      setError('Team name, sport, and captain name are required.');
      return;
    }
    setLoading(true);
    const players = form.playersRaw
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);
    try {
      await axios.post(`${API}/api/teams`, {
        name: form.name,
        sport: form.sport,
        captain: form.captain,
        contact: form.contact,
        players,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F4F6F4',
          p: 3,
        }}
      >
        <Card sx={{ maxWidth: 480, width: '100%', textAlign: 'center' }}>
          <CardContent sx={{ p: 5 }}>
            <CheckCircleIcon sx={{ fontSize: 72, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" fontWeight={800} mb={1}>
              Team Submitted!
            </Typography>
            <Typography color="text.secondary" mb={3}>
              Your team <strong>"{form.name}"</strong> has been submitted for review. The admin
              will confirm your registration shortly. Check back on the Teams page once approved.
            </Typography>
            <Button variant="outlined" onClick={() => { setSubmitted(false); setForm({ name: '', sport: '', captain: '', contact: '', playersRaw: '' }); }}>
              Submit Another Team
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#F4F6F4', minHeight: 'calc(100vh - 64px)', pb: 8 }}>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #124A28, #1B6B3A)', py: 6, color: 'white', mb: 4 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <GroupsIcon sx={{ fontSize: 36 }} />
            <Typography variant="h4" fontWeight={800}>
              Register Your Team
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ opacity: 0.85 }}>
            Fill out the form below. Your registration will be reviewed and confirmed by the admin.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md">
        <Card>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Sport selector */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight={700} mb={1.5}>
                    Select Sport
                  </Typography>
                  <Grid container spacing={2}>
                    {sportOptions.map((s) => (
                      <Grid item xs={12} sm={4} key={s.value}>
                        <Box
                          onClick={() => setForm({ ...form, sport: s.value })}
                          sx={{
                            border: '2px solid',
                            borderColor: form.sport === s.value ? s.color : 'divider',
                            borderRadius: 3,
                            p: 2.5,
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: form.sport === s.value ? `${s.color}12` : '#fff',
                            transition: 'all 0.15s',
                            '&:hover': { borderColor: s.color },
                          }}
                        >
                          <Box sx={{ mb: 0.5 }}>{s.icon}</Box>
                          <Typography fontWeight={600} sx={{ color: form.sport === s.value ? s.color : 'text.primary' }}>
                            {s.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

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
                    label="Contact Info (phone or email)"
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    helperText="Optional — helps the admin reach you if needed"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Player Names (one per line)"
                    name="playersRaw"
                    value={form.playersRaw}
                    onChange={handleChange}
                    placeholder={'Player 1\nPlayer 2\nPlayer 3'}
                    helperText="List all players on your roster, one name per line"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Alert severity="info" sx={{ mb: 1 }}>
                    All participants must be <strong>15 years or older</strong>. By registering,
                    you agree to uphold Masjid Omar's standards of sportsmanship and Islamic conduct.
                  </Alert>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading || !form.sport}
                    sx={{ px: 5 }}
                  >
                    {loading ? <CircularProgress size={22} color="inherit" /> : 'Submit Team'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
