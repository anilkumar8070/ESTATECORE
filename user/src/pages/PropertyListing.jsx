import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, BedDouble, Bath, Square, Heart, ArrowRight } from 'lucide-react';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';

export default function PropertyListing() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Persist wishlist in local storage
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('estatecore_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('estatecore_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/properties');
        setProperties(data.filter(p => p.status === 'available'));
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // Filter properties based on category and search term
  const filteredProperties = properties.filter(property => {
    const pType = property.type || 'House';
    const matchesCategory = selectedCategory === 'All' || 
                            pType.toLowerCase() === selectedCategory.toLowerCase().slice(0, -1) || 
                            (selectedCategory === 'Houses' && pType === 'House') || 
                            (selectedCategory === 'Apartments' && pType === 'Apartment') || 
                            (selectedCategory === 'Villas' && pType === 'Villa') || 
                            (selectedCategory === 'Estates' && pType === 'Estate');
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          property.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['All', 'Houses', 'Apartments', 'Villas', 'Estates'];

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto px-6 md:px-10 py-8">
      {/* Page Title & Search Bar Row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
            Explore <span className="text-gold">Properties</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium text-sm">Find your next premium investment or dream home.</p>
        </div>

        {/* Search Input Container */}
        <div className="flex w-full lg:w-auto gap-3 shrink-0">
          <div className="relative w-full lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gold transition-colors z-10" size={18} />
            <input 
              type="text" 
              placeholder="Search by title or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="relative w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-6 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all shadow-sm hover:border-gray-300 text-sm font-medium"
            />
          </div>
          <button className="bg-white border border-gray-200 p-3 rounded-full text-gray-600 hover:text-prime hover:border-gold transition-all shadow-sm flex items-center justify-center shrink-0">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button 
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              selectedCategory === category 
                ? 'bg-prime border-prime text-white shadow-lg shadow-prime/10' 
                : 'bg-white border-gray-200 text-gray-500 hover:text-prime hover:border-gray-400 shadow-sm'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <AnimatePresence mode="popLayout">
        {filteredProperties.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProperties.map((property, idx) => (
              <motion.div 
                layout
                key={property._id}
                onClick={() => navigate(`/user/properties/${property._id}`)}
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:border-gold/20 hover:shadow-2xl transition-all group cursor-pointer flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden shrink-0 bg-gray-100">
                  <img 
                    src={property.imageUrl || `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800`} 
                    alt={property.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  
                  {/* Heart / Wishlist Toggle */}
                  <button 
                    onClick={(e) => toggleWishlist(property._id, e)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2.5 rounded-full hover:scale-110 transition-transform z-20 shadow-md"
                  >
                    <Heart 
                      size={18} 
                      className={`transition-colors ${wishlist.includes(property._id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} 
                    />
                  </button>

                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black text-prime shadow-md tracking-wider uppercase">
                    {property.type || 'House'}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location */}
                    <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-3">
                      <MapPin size={13} />
                      {property.location}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-black text-gray-900 mb-5 group-hover:text-gold transition-colors line-clamp-1">
                      {property.title}
                    </h3>

                    {/* Specifications */}
                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-50 text-gray-500 font-semibold text-xs mb-6 text-center">
                      <div className="flex flex-col items-center gap-1 border-r border-gray-50">
                        <BedDouble size={16} className="text-gold" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 border-r border-gray-50">
                        <Bath size={16} className="text-gold" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Square size={14} className="text-gold" />
                        <span>{property.area} sqft</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing / Details CTA */}
                  <div className="flex justify-between items-center mt-auto pt-2">
                    <div>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Asking Price</p>
                      <p className="text-2xl font-black text-gray-900">${property.price.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-prime group-hover:bg-prime group-hover:text-gold transition-all shadow-sm">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-gold animate-spin"></div>
          </div>
        ) : (
          /* Empty State */
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white border border-gray-100 rounded-[2.5rem] shadow-sm max-w-xl mx-auto"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Properties Found</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">We couldn't find any properties matching your current search or filter criteria. Try expanding your search terms!</p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
              className="bg-prime text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-gold transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
