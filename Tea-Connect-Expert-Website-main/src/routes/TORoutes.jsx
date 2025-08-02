import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutTO from '../pages/TO/LayoutTO';
import TOHome from '../pages/TO/TOHome';
import About from '../pages/TO/About';

const TORoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutTO />}>
        <Route index element={<TOHome />} />
        <Route path="about" element={<About />} />
        <Route path="events" element={<div className="p-8"><h1 className="text-2xl font-bold">Events Management</h1></div>} />
        <Route path="events/create" element={<div className="p-8"><h1 className="text-2xl font-bold">Create Event</h1></div>} />
        <Route path="clients" element={<div className="p-8"><h1 className="text-2xl font-bold">Client Management</h1></div>} />
        <Route path="reports" element={<div className="p-8"><h1 className="text-2xl font-bold">Reports</h1></div>} />
        <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings</h1></div>} />
      </Route>
    </Routes>
  );
};

export default TORoutes;