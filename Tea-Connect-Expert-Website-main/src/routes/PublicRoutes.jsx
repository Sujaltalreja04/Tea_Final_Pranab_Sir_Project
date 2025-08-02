import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import About from '../pages/About';
import ViewEvents from '../pages/ViewEvents';
import UserLayout from '../pages/UserLayout';
import Services from '../pages/Services';
import ProductDetailPage from '../pages/ProductDetailPage';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/experts" element={<ViewEvents />} />
      <Route path="/expert/:expertId" element={<ProductDetailPage />} />
      <Route path="/contact" element={<UserLayout />} />
      <Route path="/services" element={<Services />} />
    </Routes>
  );
};

export default PublicRoutes;