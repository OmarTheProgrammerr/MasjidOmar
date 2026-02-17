import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || '';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // On mount, verify stored token
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLoading(false);
      return;
    }
    axios
      .post(`${API}/api/auth/verify`, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data.valid) setIsAdmin(true);
        else localStorage.removeItem('adminToken');
      })
      .catch(() => localStorage.removeItem('adminToken'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (username, password) => {
    const res = await axios.post(`${API}/api/auth/login`, { username, password });
    localStorage.setItem('adminToken', res.data.token);
    setIsAdmin(true);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
  };

  const getToken = () => localStorage.getItem('adminToken');

  return (
    <AuthContext.Provider value={{ isAdmin, loading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
