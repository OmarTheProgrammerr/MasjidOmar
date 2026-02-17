import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GavelIcon from '@mui/icons-material/Gavel';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';

const basketballRules = [
  {
    title: 'Team Roster',
    icon: <GroupsIcon />,
    rules: [
      '5 players on the court per team at all times',
      'Roster may include up to 10 players total',
      'All players must be registered before the game',
      'Substitutions are allowed during dead-ball situations',
    ],
  },
  {
    title: 'Game Format',
    icon: <AccessTimeIcon />,
    rules: [
      'Two 20-minute halves with a 10-minute halftime',
      'Clock stops on fouls and out-of-bounds calls',
      'Overtime: 5-minute period if tied at the end',
      'Teams must be ready 10 minutes before tip-off',
    ],
  },
  {
    title: 'Scoring & Fouls',
    icon: <EmojiEventsIcon />,
    rules: [
      'Standard FIBA scoring: 2-point field goal, 3-pointer, 1-point free throw',
      '5 personal fouls results in disqualification from that game',
      '2 technical fouls results in immediate ejection',
      'Flagrant fouls result in automatic disqualification',
    ],
  },
  {
    title: 'Conduct & Attire',
    icon: <GavelIcon />,
    rules: [
      'Proper athletic wear required — no jeans, sandals, or boots',
      'Referee decisions are final and must be respected',
      'Trash talk, taunting, or aggressive behavior leads to ejection',
      'Phones are not permitted during active play',
      'Maintain Islamic adab at all times — we play with honor',
    ],
  },
];

const volleyballRules = [
  {
    title: 'Team Roster',
    icon: <GroupsIcon />,
    rules: [
      '6 players on the court per team at all times',
      'Roster may include up to 12 players total',
      'All players must be registered before the match',
      'Libero player may be designated for defensive play',
    ],
  },
  {
    title: 'Match Format',
    icon: <AccessTimeIcon />,
    rules: [
      'Best of 3 sets — first team to 25 points wins a set (win by 2)',
      'Third set (if needed) played to 15 points',
      'Rally point scoring: a point is scored on every rally',
      'Each team is allowed 2 timeouts of 30 seconds per set',
    ],
  },
  {
    title: 'Gameplay Rules',
    icon: <SportsMartialArtsIcon />,
    rules: [
      'A team may touch the ball up to 3 times before returning it',
      'Players must rotate clockwise after winning the serve',
      'The ball must be clearly hit — catching or carrying is not allowed',
      'Net contact by a player during play results in a point for the opponent',
    ],
  },
  {
    title: 'Conduct & Attire',
    icon: <GavelIcon />,
    rules: [
      'Proper court shoes required — no running shoes or sandals',
      'No jewelry during play for player safety',
      'Referee decisions are final',
      'Unsportsmanlike conduct results in a warning, then disqualification',
      'Maintain Islamic adab at all times — we play with honor',
    ],
  },
];

const highlights = [
  { icon: <SportsBasketballIcon sx={{ fontSize: 36 }} />, label: 'Basketball', color: '#E65100' },
  { icon: <SportsVolleyballIcon sx={{ fontSize: 36 }} />, label: 'Volleyball', color: '#1565C0' },
  { icon: <GroupsIcon sx={{ fontSize: 36 }} />, label: 'Team Play', color: '#2E7D32' },
  { icon: <EmojiEventsIcon sx={{ fontSize: 36 }} />, label: 'Tournament', color: '#6A1B9A' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('basketball');

  const rules = activeTab === 'basketball' ? basketballRules : volleyballRules;

  return (
    <Box>
      {/* ─── Hero ─── */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #124A28 0%, #1B6B3A 50%, #2D8653 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: 'absolute', top: -60, right: -60, width: 300, height: 300,
            borderRadius: '50%', backgroundColor: 'rgba(201,168,76,0.12)',
          }}
        />
        <Box
          sx={{
            position: 'absolute', bottom: -80, left: -80, width: 400, height: 400,
            borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)',
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <SportsBasketballIcon sx={{ fontSize: 48, color: '#C9A84C' }} />
            <SportsVolleyballIcon sx={{ fontSize: 48, color: 'white' }} />
          </Box>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Masjid Omar
            <br />
            <Box component="span" sx={{ color: '#C9A84C' }}>
              Sports Tournament
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.9, fontWeight: 400, maxWidth: 520, mx: 'auto' }}
          >
            Basketball &amp; Volleyball — compete with honor, play with heart.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/teams"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#C9A84C',
                color: '#fff',
                px: 4,
                '&:hover': { backgroundColor: '#a8883e' },
              }}
            >
              View Teams
            </Button>
            <Button
              component={Link}
              to="/matches"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255,255,255,0.7)',
                color: 'white',
                px: 4,
                '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              See Schedule
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ─── Sport Highlights ─── */}
      <Container maxWidth="lg" sx={{ mt: -4, mb: 6, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {highlights.map((h) => (
            <Grid item xs={6} sm={3} key={h.label}>
              <Card
                sx={{
                  textAlign: 'center',
                  py: 3,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <Box sx={{ color: h.color, mb: 1 }}>{h.icon}</Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {h.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ─── About Section ─── */}
      <Box sx={{ backgroundColor: '#fff', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={2}>
            About the Tournament
          </Typography>
          <Typography variant="h4" fontWeight={700} mt={1} mb={3}>
            Welcome to Masjid Omar Sports
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, mb: 3, fontSize: '1.05rem' }}>
            The Masjid Omar Sports Tournament brings our community together through friendly
            competition in both <strong>basketball</strong> and <strong>volleyball</strong>.
            Register your team, track live results, and follow the standings — all in one place.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9, fontSize: '1.05rem' }}>
            We built this platform to make participation seamless and to celebrate the spirit of
            teamwork and sportsmanship. Whether you're here to compete or just cheer on your
            brothers — you're part of the community. <strong>Let the games begin!</strong>
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Quick facts */}
          <Grid container spacing={3}>
            {[
              { label: 'Two Sports', desc: 'Basketball & Volleyball tournaments running in parallel' },
              { label: 'Open Registration', desc: 'Any community member can form and register a team' },
              { label: 'Fair Play', desc: 'Islamic values of respect and sportsmanship come first' },
            ].map((f) => (
              <Grid item xs={12} sm={4} key={f.label}>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <CheckCircleIcon color="primary" sx={{ mt: 0.3, flexShrink: 0 }} />
                  <Box>
                    <Typography fontWeight={700}>{f.label}</Typography>
                    <Typography variant="body2" color="text.secondary">{f.desc}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── Rules Section ─── */}
      <Box sx={{ backgroundColor: '#F4F6F4', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={2}>
            Official Rules
          </Typography>
          <Typography variant="h4" fontWeight={700} mt={1} mb={4}>
            Tournament Rules &amp; Requirements
          </Typography>

          {/* Sport Toggle */}
          <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
            <Button
              onClick={() => setActiveTab('basketball')}
              variant={activeTab === 'basketball' ? 'contained' : 'outlined'}
              startIcon={<SportsBasketballIcon />}
              sx={{ borderRadius: 8, px: 3 }}
            >
              Basketball
            </Button>
            <Button
              onClick={() => setActiveTab('volleyball')}
              variant={activeTab === 'volleyball' ? 'contained' : 'outlined'}
              startIcon={<SportsVolleyballIcon />}
              sx={{ borderRadius: 8, px: 3 }}
            >
              Volleyball
            </Button>
          </Box>

          <Box>
            {rules.map((section, i) => (
              <Accordion
                key={i}
                defaultExpanded={i === 0}
                sx={{
                  mb: 1.5,
                  borderRadius: '12px !important',
                  '&:before': { display: 'none' },
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: 3,
                    '& .MuiAccordionSummary-content': { display: 'flex', alignItems: 'center', gap: 1.5 },
                  }}
                >
                  <Box sx={{ color: 'primary.main' }}>{section.icon}</Box>
                  <Typography fontWeight={700} variant="h6" sx={{ fontSize: '1rem' }}>
                    {section.title}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: '#fff', pt: 0, pb: 2 }}>
                  <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    {section.rules.map((rule, j) => (
                      <Box
                        component="li"
                        key={j}
                        sx={{ mb: 0.75, color: 'text.secondary', lineHeight: 1.7 }}
                      >
                        <Typography variant="body2">{rule}</Typography>
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Box sx={{ mt: 4, p: 3, backgroundColor: '#1B6B3A', borderRadius: 3, color: 'white', textAlign: 'center' }}>
            <Typography variant="h6" fontWeight={700} mb={1}>
              Above all — respect, brotherhood, and Islamic character
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Any violation of Islamic adab or sportsmanship will result in immediate disqualification.
              We are here to build community, not rivalry.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
