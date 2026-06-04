import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, MapPin, Maximize2, IndianRupee, Layers } from 'lucide-react';
import { featuredProperties } from '../data/indianRealEstate';

const PropertiesShowcase = () => {
  const location = useLocation();
  const searchState = location.state;

  const categories = ['All', 'Residential', 'Commercial', 'Rent', 'Plots', 'Industrial'];
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    // If we came from a search with a specific type, set that category
    if (searchState?.type) {
      if (searchState.type === 'Building') {
        setActiveCategory('All'); // Changed to 'All' to show everything by default when searching 'Building'
      } else if (searchState.type === 'Plot') {
        setActiveCategory('Plots');
      } else if (searchState.type === 'Villa') {
        setActiveCategory('Residential');
      }
    }
  }, [searchState]);

  const filteredProperties = featuredProperties.filter(property => {
    // If no search state and category is 'All', show everything
    if (!searchState && activeCategory === 'All') return true;

    const matchesCategory = activeCategory === 'All' || property.category === activeCategory;
    
    // Detailed search filtering if searchState exists
    if (searchState) {
      const matchesLocation = !searchState.location || 
        property.location.toLowerCase().includes(searchState.location.toLowerCase()) || 
        property.title.toLowerCase().includes(searchState.location.toLowerCase());
      
      const matchesType = searchState.type === 'Any' || 
        (searchState.type === 'Building' && (property.category === 'Residential' || property.category === 'Commercial')) ||
        (searchState.type === 'Plot' && property.category === 'Plots') ||
        (searchState.type === 'Villa' && property.subCategory === 'Villa');

      // Budget filtering is skipped for now as per previous implementation
      
      // If we are applying search filters, we ignore the button category unless the user clicks a button AFTER searching
      return matchesLocation && matchesType && matchesCategory;
    }

    return matchesCategory;
  });

  const rentalProperties = featuredProperties.filter(p => p.category === 'Rent');

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col space-y-8 mb-16">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block"
            >
              Indian Premium Properties
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-light text-black tracking-tight leading-tight"
            >
              Explore <span className="italic font-normal">Our Diverse</span> Portfolio
            </motion.h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Categories Filter */}
            <div className="flex flex-wrap gap-2 md:gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border ${
                    activeCategory === cat 
                    ? 'bg-black text-white border-black shadow-lg' 
                    : 'bg-transparent text-gray-500 border-gray-200 hover:border-black hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Rent Quick Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Layers size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Available Now</p>
                <p className="text-sm font-bold text-black">{rentalProperties.length} Rental Listings</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100 mb-6">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-black text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      {property.subCategory}
                    </span>
                    {property.tags.map(tag => (
                      <span key={tag} className="bg-black/50 backdrop-blur-md text-white text-[9px] font-medium px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Overlay Interaction */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        to={`/property/${property.id}`}
                        className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm flex items-center space-x-2 shadow-xl"
                      >
                        <span>Explore Details</span>
                        <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  </div>
                  
                  {/* Price Plate */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg flex justify-between items-center">
                      <div className="flex items-center text-black font-bold text-xl">
                        <IndianRupee size={18} className="mr-0.5" />
                        {property.price}
                      </div>
                      <div className="text-[10px] uppercase font-bold text-gold tracking-tighter">
                        Verified
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Text */}
                <div className="px-1">
                  <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                    <MapPin size={12} className="mr-1.5 text-gold" />
                    {property.location}
                  </div>
                  <h3 className="text-2xl font-light text-black group-hover:text-gold transition-colors duration-300 mb-3">
                    {property.title}
                  </h3>
                  <div className="flex items-center space-x-4 pt-1 border-t border-gray-50">
                    <div className="flex items-center text-gray-500 text-xs">
                      <Maximize2 size={14} className="mr-1.5 opacity-40" />
                      {property.sqft} sq.ft
                    </div>
                    {property.beds > 0 && (
                      <div className="flex items-center text-gray-500 text-xs">
                        <Layers size={14} className="mr-1.5 opacity-40" />
                        {property.beds} BHK
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PropertiesShowcase;