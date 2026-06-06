import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, BedDouble, Bath, Square, Heart } from 'lucide-react';
import { properties } from '../data/dummy';
import { motion } from 'framer-motion';

export default function PropertyListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#f5f5f5]">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-[#e8c87e]">Properties</span>
          </h1>
          <p className="text-gray-400 mt-2 font-light text-lg">Find your next dream home.</p>
        </div>
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative w-full md:w-72 group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c5a059]/20 to-transparent blur-md opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c5a059] transition-colors z-10" size={18} />
            <input 
              type="text" 
              placeholder="Search by location..." 
              className="relative w-full bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-xl py-3 pl-12 pr-4 text-[#f5f5f5] focus:outline-none focus:border-[#c5a059]/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="relative bg-[#111]/80 backdrop-blur-md border border-white/10 p-3 rounded-xl text-[#f5f5f5] hover:border-[#c5a059]/50 hover:text-[#c5a059] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] group">
            <div className="absolute inset-0 bg-[#c5a059]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
            <Filter size={20} className="relative z-10" />
          </button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {['All', 'Houses', 'Apartments', 'Villas', 'Estates', 'Commercial'].map((category, idx) => (
          <button 
            key={category}
            className={`whitespace-nowrap px-6 py-2 rounded-full border transition-all duration-300 font-medium tracking-wide text-sm ${
              idx === 0 
                ? 'bg-gradient-to-r from-[#c5a059] to-[#d4af37] border-transparent text-black shadow-[0_0_15px_rgba(197,160,89,0.3)]' 
                : 'bg-[#111]/50 border-white/10 text-gray-300 hover:text-[#f5f5f5] hover:border-[#c5a059]/50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, idx) => (
          <motion.div 
            key={property.id}
            onClick={() => navigate(`/properties/${property.id}`)}
            whileHover={{ y: -10 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-[#111]/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:border-[#c5a059]/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all group cursor-pointer flex flex-col"
          >
            <div className="relative h-64 overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 pointer-events-none"></div>
              <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full text-white/80 hover:text-red-500 hover:bg-white/10 transition-colors z-20">
                <Heart size={20} />
              </div>
              <div className="absolute top-4 left-4 bg-gradient-to-r from-[#c5a059] to-[#e8c87e] text-black text-xs font-bold tracking-widest px-3 py-1.5 rounded-full z-20 shadow-lg">
                FOR SALE
              </div>
              <div className="absolute bottom-4 left-5 z-20">
                <h3 className="font-bold text-2xl text-[#f5f5f5] tracking-tight leading-tight">{property.title}</h3>
                <div className="flex items-center gap-1.5 text-gray-300 text-sm mt-1 font-light">
                  <MapPin size={14} className="text-[#c5a059]" />
                  <span>{property.location}</span>
                </div>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between relative bg-gradient-to-b from-[#0a0a0a]/50 to-transparent">
              <div className="flex items-center justify-between text-gray-300 text-sm mb-6 bg-white/5 p-3 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2"><BedDouble size={18} className="text-[#c5a059]"/> <span className="font-medium text-[#f5f5f5]">{property.beds}</span> Beds</div>
                <div className="w-px h-6 bg-white/10"></div>
                <div className="flex items-center gap-2"><Bath size={18} className="text-[#c5a059]"/> <span className="font-medium text-[#f5f5f5]">{property.baths}</span> Baths</div>
                <div className="w-px h-6 bg-white/10"></div>
                <div className="flex items-center gap-2"><Square size={18} className="text-[#c5a059]"/> <span className="font-medium text-[#f5f5f5]">{property.sqft}</span> sqft</div>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <div>
                  <p className="text-gray-500 text-xs font-light tracking-wide uppercase mb-0.5">Asking Price</p>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-[#e8c87e] font-bold text-2xl">${property.price.toLocaleString()}</p>
                </div>
                <button className="bg-white/5 hover:bg-gradient-to-r hover:from-[#c5a059] hover:to-[#d4af37] hover:text-black border border-white/10 hover:border-transparent text-[#f5f5f5] px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
