import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Teams from './Components/Teams';
import Matches from './Components/Matches';
import AdminDashboard from './Components/AdminDashboard';
import RegisterTeam from './Components/RegisterTeam';
import ProtectedRoute from './Components/ProtectedRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B6B3A',
      light: '#2D8653',
      dark: '#124A28',
      contrastText: '#fff',
    },
    secondary: {
      main: '#C9A84C',
      light: '#DFC070',
      dark: '#A07830',
      contrastText: '#fff',
    },
    background: {
      default: '#F4F6F4',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/register-team" element={<RegisterTeam />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Box
            component="footer"
            sx={{
              textAlign: 'center',
              py: 2.5,
              backgroundColor: '#124A28',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            <Typography variant="body2">
              Built and maintained by{' '}
              <Box
                component="a"
                href="https://www.linkedin.com/in/omar-fares02/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: '#C9A84C',
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Omar Fares
              </Box>
            </Typography>
          </Box>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
