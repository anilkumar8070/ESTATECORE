import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, MapPin, Maximize2, IndianRupee, Layers, Search, Heart, CheckSquare, Square as SquareOutline } from 'lucide-react';
import { propertyService } from '../services/propertyService';
import { useUserContext } from '../context/UserContext';

const PropertiesShowcase = () => {
  const { toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useUserContext();
  const location = useLocation();
  const searchState = location.state;

  const categories = ['All', 'Residential', 'Commercial', 'Rent', 'Plots', 'Industrial'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    propertyService.getAllProperties()
      .then(data => setFeaturedProperties(data.filter(p => p.status === 'available')))
      .catch(console.error);
  }, []);

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

    const matchesCategory = activeCategory === 'All' || property.type === activeCategory || (activeCategory === 'Residential' && ['House', 'Apartment', 'Villa', 'Estate'].includes(property.type));
    const matchesSearch = searchTerm === '' || 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Detailed search filtering if searchState exists
    if (searchState) {
      const matchesLocation = !searchState.location || 
        property.location.toLowerCase().includes(searchState.location.toLowerCase()) || 
        property.title.toLowerCase().includes(searchState.location.toLowerCase());
      
      const matchesType = searchState.type === 'Any' || 
        (searchState.type === 'Building' && ['House', 'Apartment', 'Villa', 'Estate'].includes(property.type)) ||
        (searchState.type === 'Plot' && property.type === 'Plot') ||
        (searchState.type === 'Villa' && property.type === 'Villa');

      // Budget filtering is skipped for now as per previous implementation
      
      // If we are applying search filters, we ignore the button category unless the user clicks a button AFTER searching
      return matchesLocation && matchesType && matchesCategory && matchesSearch;
    }

    return matchesCategory && matchesSearch;
  });

  const rentalProperties = featuredProperties.filter(p => p.status === 'rented' || p.status === 'rent');

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
            {/* Categories & Search Filter */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200 md:w-96">
                <Search size={18} className="text-gray-400 mr-2" />
                <input 
                  type="text"
                  placeholder="Search by location or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm w-full font-medium"
                />
              </div>
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
                key={property._id}
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
                    src={property.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Badge & Actions */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <span className="bg-white/90 backdrop-blur-md text-black text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm w-max">
                      {property.type || 'House'}
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(property._id); }}
                      className={`p-2.5 rounded-full shadow-lg transition-transform ${isInWishlist(property._id) ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'}`}
                    >
                      <Heart className="w-4 h-4" fill={isInWishlist(property._id) ? 'currentColor' : 'none'} />
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleCompare(property._id); }}
                      className={`p-2.5 rounded-full shadow-lg transition-transform ${isInCompare(property._id) ? 'bg-[#1a1a2e] text-white' : 'bg-white/90 text-gray-400 hover:text-[#1a1a2e]'}`}
                      title="Compare"
                    >
                      {isInCompare(property._id) ? <CheckSquare className="w-4 h-4" /> : <SquareOutline className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Overlay Interaction */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        to={`/user/properties/${property._id}`}
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
                        {property.price ? property.price.toLocaleString() : property.price}
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
                      {property.area} sq.ft
                    </div>
                    {property.bedrooms > 0 && (
                      <div className="flex items-center text-gray-500 text-xs">
                        <Layers size={14} className="mr-1.5 opacity-40" />
                        {property.bedrooms} BHK
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