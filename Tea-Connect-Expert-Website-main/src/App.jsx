import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import TORoutes from './routes/TORoutes';
import RoleBasedRoutes from './routes/RoleBasedRoutes';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Routes location={location}>
            <Route path="/*" element={<PublicRoutes />} />
            <Route path="/to/*" element={<TORoutes />} />
            <Route path="/dashboard/*" element={<RoleBasedRoutes />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;