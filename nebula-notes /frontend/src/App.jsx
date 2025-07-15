import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/check', {
          credentials: 'include',
        });

        if (res.ok) {
          localStorage.setItem('isLoggedIn', 'true');
          setIsLoggedIn(true);
        } else {
          localStorage.setItem('isLoggedIn', 'false');
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        localStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  // New logout handler that calls backend and updates state
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        localStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <AuthPage onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
