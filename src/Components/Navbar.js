import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Teams', path: '/teams' },
  { label: 'Matches', path: '/matches' },
];

export default function Navbar() {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const navContent = (
    <>
      {navLinks.map((link) => (
        <Button
          key={link.path}
          component={Link}
          to={link.path}
          onClick={() => setDrawerOpen(false)}
          sx={{
            color: 'white',
            fontWeight: isActive(link.path) ? 700 : 500,
            borderBottom: isActive(link.path) ? '2px solid #C9A84C' : '2px solid transparent',
            borderRadius: 0,
            px: 2,
            py: 1,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
          }}
        >
          {link.label}
        </Button>
      ))}
      {isAdmin && (
        <Button
          component={Link}
          to="/admin"
          onClick={() => setDrawerOpen(false)}
          startIcon={<AdminPanelSettingsIcon />}
          sx={{
            color: '#C9A84C',
            fontWeight: isActive('/admin') ? 700 : 500,
            borderBottom: isActive('/admin') ? '2px solid #C9A84C' : '2px solid transparent',
            borderRadius: 0,
            px: 2,
            py: 1,
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
          }}
        >
          Admin Panel
        </Button>
      )}
    </>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1B6B3A', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
      <Toolbar sx={{ gap: 1 }}>
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            flexGrow: isMobile ? 1 : 0,
            mr: isMobile ? 0 : 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SportsBasketballIcon sx={{ color: '#C9A84C', fontSize: 22 }} />
            <SportsVolleyballIcon sx={{ color: '#fff', fontSize: 20 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ color: 'white', fontWeight: 800, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}
          >
            Masjid Omar Sports
          </Typography>
        </Box>

        {/* Desktop nav */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {navContent}
          </Box>
        )}

        {/* Right side actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAdmin ? (
            <>
              {!isMobile && (
                <Chip
                  label="Admin"
                  size="small"
                  sx={{ backgroundColor: '#C9A84C', color: '#fff', fontWeight: 600 }}
                />
              )}
              <Button
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                variant="outlined"
                size="small"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' },
                }}
              >
                {isMobile ? '' : 'Logout'}
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              size="small"
              sx={{
                color: 'white',
                borderColor: 'rgba(255,255,255,0.5)',
                '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' },
              }}
            >
              Admin Login
            </Button>
          )}

          {/* Mobile menu */}
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'white' }}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220, pt: 2, backgroundColor: '#1B6B3A', height: '100%' }}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.path}
                button
                component={Link}
                to={link.path}
                onClick={() => setDrawerOpen(false)}
                sx={{ color: 'white' }}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
            {isAdmin && (
              <ListItem
                button
                component={Link}
                to="/admin"
                onClick={() => setDrawerOpen(false)}
                sx={{ color: '#C9A84C' }}
              >
                <ListItemText primary="Admin Panel" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
