import React from 'react';
import { Routes, Route } from 'react-router-dom';

const RoleBasedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div className="p-8"><h1 className="text-2xl font-bold">Dashboard</h1></div>} />
      <Route path="/profile" element={<div className="p-8"><h1 className="text-2xl font-bold">Profile</h1></div>} />
      <Route path="/consultations" element={<div className="p-8"><h1 className="text-2xl font-bold">My Consultations</h1></div>} />
    </Routes>
  );
};

export default RoleBasedRoutes;