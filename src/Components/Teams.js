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
  Avatar,
  Divider,
  TextField,
  InputAdornment,
} from '@mui/material';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import GroupsIcon from '@mui/icons-material/Groups';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || '';

const sportConfig = {
  basketball: { color: '#E65100', icon: <SportsBasketballIcon />, label: 'Basketball' },
  volleyball: { color: '#1565C0', icon: <SportsVolleyballIcon />, label: 'Volleyball' },
};

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [sport, setSport] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const url =
      sport === 'all' ? `${API}/api/teams` : `${API}/api/teams?sport=${sport}`;
    axios
      .get(url)
      .then((res) => setTeams(res.data))
      .catch(() => setError('Failed to load teams. Make sure the server is running.'))
      .finally(() => setLoading(false));
  }, [sport]);

  const filtered = teams.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.captain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ backgroundColor: '#F4F6F4', minHeight: 'calc(100vh - 64px)', pb: 8 }}>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #124A28, #1B6B3A)', py: 6, color: 'white', mb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={800} mb={1}>
            Teams
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.85 }}>
            All registered teams for the Masjid Omar Sports Tournament
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', alignItems: 'center' }}>
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

          <TextField
            size="small"
            placeholder="Search teams…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ backgroundColor: '#fff', borderRadius: 2, minWidth: 220 }}
          />
        </Box>

        {loading && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {!loading && !error && filtered.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <GroupsIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No teams found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {search ? 'Try a different search term.' : 'No teams have been registered yet.'}
            </Typography>
          </Box>
        )}

        <Grid container spacing={3}>
          {filtered.map((team) => {
            const config = sportConfig[team.sport] || sportConfig.basketball;
            return (
              <Grid item xs={12} sm={6} md={4} key={team._id}>
                <Card sx={{ height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                  <Box sx={{ height: 6, backgroundColor: config.color, borderRadius: '16px 16px 0 0' }} />
                  <CardContent sx={{ p: 3 }}>
                    {/* Team header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar sx={{ backgroundColor: config.color, width: 48, height: 48 }}>
                        {config.icon}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight={700} noWrap>
                          {team.name}
                        </Typography>
                        <Chip
                          label={config.label}
                          size="small"
                          sx={{ backgroundColor: `${config.color}15`, color: config.color, fontWeight: 600 }}
                        />
                      </Box>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Captain */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                      <StarIcon sx={{ fontSize: 18, color: '#C9A84C' }} />
                      <Typography variant="body2" color="text.secondary">Captain:</Typography>
                      <Typography variant="body2" fontWeight={600}>{team.captain}</Typography>
                    </Box>

                    {/* Players */}
                    {team.players && team.players.length > 0 && (
                      <>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <GroupsIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            Players ({team.players.length})
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {team.players.slice(0, 6).map((p, i) => (
                            <Chip key={i} label={p} size="small" variant="outlined" />
                          ))}
                          {team.players.length > 6 && (
                            <Chip label={`+${team.players.length - 6} more`} size="small" />
                          )}
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
