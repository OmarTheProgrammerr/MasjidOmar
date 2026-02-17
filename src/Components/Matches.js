import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const statusConfig = {
  scheduled: { label: 'Scheduled', color: '#1565C0', bg: '#E3F2FD' },
  ongoing: { label: 'Live', color: '#2E7D32', bg: '#E8F5E9' },
  completed: { label: 'Completed', color: '#6A1B9A', bg: '#F3E5F5' },
};

const sportConfig = {
  basketball: { color: '#E65100', icon: <SportsBasketballIcon fontSize="small" /> },
  volleyball: { color: '#1565C0', icon: <SportsVolleyballIcon fontSize="small" /> },
};

function MatchCard({ match }) {
  const status = statusConfig[match.status] || statusConfig.scheduled;
  const sport = sportConfig[match.sport] || sportConfig.basketball;
  const matchDate = new Date(match.date);
  const dateStr = matchDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-3px)' } }}>
      <Box sx={{ height: 4, backgroundColor: sport.color }} />
      <CardContent sx={{ p: 3 }}>
        {/* Header row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: sport.color }}>
            {sport.icon}
            <Typography variant="caption" fontWeight={700} sx={{ color: sport.color, textTransform: 'uppercase' }}>
              {match.sport}
            </Typography>
          </Box>
          <Chip
            label={status.label}
            size="small"
            sx={{ backgroundColor: status.bg, color: status.color, fontWeight: 700 }}
          />
        </Box>

        {/* Teams & Score */}
        <Box sx={{ textAlign: 'center', my: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2 }}>
                {match.team1}
              </Typography>
              {match.status === 'completed' && match.winner === match.team1 && (
                <EmojiEventsIcon sx={{ color: '#C9A84C', fontSize: 18, mt: 0.5 }} />
              )}
            </Box>

            <Box sx={{ textAlign: 'center', px: 1 }}>
              {match.status !== 'scheduled' && match.score?.team1 !== null ? (
                <Typography variant="h4" fontWeight={800} color="primary">
                  {match.score.team1} – {match.score.team2}
                </Typography>
              ) : (
                <Typography variant="h5" color="text.disabled" fontWeight={700}>
                  VS
                </Typography>
              )}
            </Box>

            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2 }}>
                {match.team2}
              </Typography>
              {match.status === 'completed' && match.winner === match.team2 && (
                <EmojiEventsIcon sx={{ color: '#C9A84C', fontSize: 18, mt: 0.5 }} />
              )}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        {/* Match details */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{dateStr}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{match.time}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOnIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{match.location}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [sport, setSport] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const url = sport === 'all' ? `${API}/api/matches` : `${API}/api/matches?sport=${sport}`;
    axios
      .get(url)
      .then((res) => setMatches(res.data))
      .catch(() => setError('Failed to load matches. Make sure the server is running.'))
      .finally(() => setLoading(false));
  }, [sport]);

  const upcoming = matches.filter((m) => m.status === 'scheduled');
  const live = matches.filter((m) => m.status === 'ongoing');
  const completed = matches.filter((m) => m.status === 'completed');

  return (
    <Box sx={{ backgroundColor: '#F4F6F4', minHeight: 'calc(100vh - 64px)', pb: 8 }}>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #124A28, #1B6B3A)', py: 6, color: 'white', mb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={800} mb={1}>
            Match Schedule
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.85 }}>
            Results and upcoming fixtures for both sports
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Sport filter */}
        <Box sx={{ mb: 4 }}>
          <ToggleButtonGroup
            value={sport}
            exclusive
            onChange={(_, val) => val && setSport(val)}
            size="small"
          >
            <ToggleButton value="all">All Sports</ToggleButton>
            <ToggleButton value="basketball">
              <SportsBasketballIcon sx={{ mr: 0.5, fontSize: 18 }} /> Basketball
            </ToggleButton>
            <ToggleButton value="volleyball">
              <SportsVolleyballIcon sx={{ mr: 0.5, fontSize: 18 }} /> Volleyball
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {loading && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {!loading && !error && matches.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <CalendarTodayIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">No matches scheduled yet</Typography>
            <Typography variant="body2" color="text.secondary">Check back soon!</Typography>
          </Box>
        )}

        {live.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" fontWeight={700} mb={2} color="success.main">
              🔴 Live Now
            </Typography>
            <Grid container spacing={3}>
              {live.map((m) => <Grid item xs={12} md={6} key={m._id}><MatchCard match={m} /></Grid>)}
            </Grid>
          </Box>
        )}

        {upcoming.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="h5" fontWeight={700} mb={2} color="primary">
              Upcoming
            </Typography>
            <Grid container spacing={3}>
              {upcoming.map((m) => <Grid item xs={12} md={6} key={m._id}><MatchCard match={m} /></Grid>)}
            </Grid>
          </Box>
        )}

        {completed.length > 0 && (
          <Box>
            <Typography variant="h5" fontWeight={700} mb={2} color="text.secondary">
              Completed
            </Typography>
            <Grid container spacing={3}>
              {completed.map((m) => <Grid item xs={12} md={6} key={m._id}><MatchCard match={m} /></Grid>)}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}
