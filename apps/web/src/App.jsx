import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import LoadingPage from './pages/LoadingPage';
import HomePage from './pages/HomePage';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PropertyListing from './pages/PropertyListing';
import PropertyDetails from './pages/PropertyDetails';
import Wishlist from './pages/Wishlist';
import Reviews from './pages/Reviews';
import BuyRequest from './pages/BuyRequest';
import ScheduleVisit from './pages/ScheduleVisit';
import Chat from './pages/Chat';
import Compare from './pages/Compare';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingPage key="loading" onComplete={() => setLoading(false)} />
        ) : (
          <Routes key="content">
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            
            {/* Authenticated User Routes */}
            <Route path="/user" element={<Layout />}>
              <Route index element={<Navigate to="/user/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="properties" element={<PropertyListing />} />
              <Route path="properties/:id" element={<PropertyDetails />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="requests" element={<BuyRequest />} />
              <Route path="visits" element={<ScheduleVisit />} />
              <Route path="chat" element={<Chat />} />
              <Route path="compare" element={<Compare />} />
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </AnimatePresence>
    </Router>
  );
}

export default App;
