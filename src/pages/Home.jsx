import React from 'react';
import Hero from '../components/Hero';
import ScrollingTextSection from '../components/ScrollingTextSection';
import ContactSection from '../components/ContactSection';
import RealEstateServices from '../components/RealEstateServices';

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      
      <ScrollingTextSection />

      <RealEstateServices />

      <ContactSection />
    </div>
  );
};

export default Home;
