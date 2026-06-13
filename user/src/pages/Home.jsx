import React from 'react';
import Hero from '../components/Hero';
import FeaturedNeighborhoods from '../components/FeaturedNeighborhoods';
import ScrollingTextSection from '../components/ScrollingTextSection';
import ContactSection from '../components/ContactSection';
import RealEstateServices from '../components/RealEstateServices';

const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      
      <FeaturedNeighborhoods />
      
      <ScrollingTextSection />

      <RealEstateServices />

      <ContactSection />
    </div>
  );
};

export default Home;
