import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<PropertyListing />} />
          <Route path="properties/:id" element={<PropertyDetails />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="requests" element={<BuyRequest />} />
          <Route path="visits" element={<ScheduleVisit />} />
          <Route path="chat" element={<Chat />} />
          <Route path="compare" element={<Compare />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
