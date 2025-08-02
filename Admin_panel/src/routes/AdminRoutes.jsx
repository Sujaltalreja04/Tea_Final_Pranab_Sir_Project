import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Users from '../pages/Users';
import ExpertProfile from '../pages/ExpertProfile';
import ExpertProfileEdit from '../pages/ExpertProfileEdit';
import ExpertReview from '../pages/ExpertReview';
import Booking from '../pages/Booking';

import Settings from '../pages/Settings';
import Notifications from '../pages/Notifications';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/users" element={<Users />} />
      <Route path="/experts" element={<ExpertProfile />} />
      <Route path="/expert/edit/:id" element={<ExpertProfileEdit />} />
      <Route path="/expert/review/:id" element={<ExpertReview />} />
      <Route path="/bookings" element={<Booking />} />

      <Route path="/settings" element={<Settings />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
};

export default AdminRoutes; 