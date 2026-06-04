import React from 'react';
import PropertiesShowcase from '../components/PropertiesShowcase';
import { motion } from 'framer-motion';

const PropertiesPage = () => {
  return (
    <div className="pt-24 bg-white min-h-screen">
      <PropertiesShowcase />
    </div>
  );
};

export default PropertiesPage;