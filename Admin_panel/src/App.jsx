import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import ExpertProfile from './pages/ExpertProfile';
import ExpertProfileEdit from './pages/ExpertProfileEdit';
import ExpertReview from './pages/ExpertReview';
import Booking from './pages/Booking';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Sidebar from './components/Sidebar';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg,9A6735 0%,rgba(56, 82, 56, 0.58) 100%);
`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
  const [notifications, setNotifications] = useState([]);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  const addNotification = (message) => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), message }
    ]);
  };
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter(n => n.id !== id));
  };

  return (
    <Router>
      <AppContainer>
        <Notifications notifications={notifications} onRemove={removeNotification} />
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <Dashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/users" 
            element={
              isAuthenticated ? (
                <Users addNotification={addNotification} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/experts" 
            element={
              isAuthenticated ? (
                <ExpertProfile addNotification={addNotification} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/expert/edit/:id" 
            element={
              isAuthenticated ? (
                <ExpertProfileEdit addNotification={addNotification} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/expert/review/:id" 
            element={
              isAuthenticated ? (
                <ExpertReview addNotification={addNotification} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/bookings" 
            element={
              isAuthenticated ? (
                <Booking addNotification={addNotification} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/settings" 
            element={
              isAuthenticated ? (
                <Settings addNotification={addNotification} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
          />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App; 