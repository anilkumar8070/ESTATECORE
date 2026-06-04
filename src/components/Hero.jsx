import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Building2, Landmark, ArrowRight, Upload } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    type: 'Building',
    budget: 'Any'
  });

  const handleSearch = () => {
    // Navigate to properties page with search criteria
    navigate('/properties', { state: searchData });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Home"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold font-semibold tracking-widest uppercase mb-4 block">
            The standard of luxury
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Future Property
            </span>
          </h1>
          <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto">
            Discover a curated selection of premium buildings, plots, and estates that match your lifestyle and investment goals.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link 
              to="/properties" 
              className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center space-x-2 hover:bg-gold transition-all duration-300 shadow-xl"
            >
              <span>Explore Properties</span>
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="/sell-property" 
              className="px-8 py-4 bg-black/30 backdrop-blur-md text-white border border-white/20 rounded-full font-bold flex items-center space-x-2 hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>List Your Property</span>
              <Upload size={18} className="ml-1" />
            </Link>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Buying/Selling Tabs */}
          <div className="flex space-x-2 mb-4 justify-start">
            <button className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-t-2xl">
              Buy / Rent
            </button>
            <Link 
              to="/sell-property"
              className="px-6 py-2 bg-black/40 backdrop-blur-md text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest rounded-t-2xl transition-all"
            >
              Sell
            </Link>
          </div>

          <div className="bg-white p-2 rounded-2xl md:rounded-full md:rounded-tl-none shadow-2xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2">
            <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100">
              <MapPin className="text-gold w-5 h-5 mr-3" />
              <input
                type="text"
                placeholder="Where are you looking?"
                value={searchData.location}
                onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                className="w-full bg-transparent focus:outline-none text-gray-700"
              />
            </div>
            <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100">
              <Building2 className="text-gold w-5 h-5 mr-3" />
              <select 
                value={searchData.type}
                onChange={(e) => setSearchData({ ...searchData, type: e.target.value })}
                className="w-full bg-transparent focus:outline-none text-gray-700 appearance-none cursor-pointer"
              >
                <option value="Building">Type: Building</option>
                <option value="Plot">Type: Plot</option>
                <option value="Villa">Type: Villa</option>
              </select>
            </div>
            <div className="flex-1 w-full flex items-center px-4 py-2">
              <Landmark className="text-gold w-5 h-5 mr-3" />
              <select 
                value={searchData.budget}
                onChange={(e) => setSearchData({ ...searchData, budget: e.target.value })}
                className="w-full bg-transparent focus:outline-none text-gray-700 appearance-none cursor-pointer"
              >
                <option value="Any">Budget: Any</option>
                <option value="100k-500k">$100k - $500k</option>
                <option value="500k-1M">$500k - $1M</option>
                <option value="1M+">$1M+</option>
              </select>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-xl md:rounded-full flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Indicators (Optional) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
