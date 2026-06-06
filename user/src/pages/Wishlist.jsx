import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, BedDouble, Bath, Square, Trash2 } from 'lucide-react';
import { properties } from '../data/dummy';
import { motion } from 'framer-motion';

export default function Wishlist() {
  const navigate = useNavigate();
  const wishlistItems = properties.slice(1, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#f5f5f5]">Your Wishlist</h1>
        <p className="text-gray-400 mt-1">Properties you have saved for later.</p>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {wishlistItems.map((property, idx) => (
            <motion.div 
              key={property.id}
              onClick={() => navigate(`/properties/${property.id}`)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#111] border border-[#222] rounded-2xl flex flex-col sm:flex-row overflow-hidden hover:border-[#c5a059] transition-colors group cursor-pointer"
            >
              <div className="w-full sm:w-48 h-48 sm:h-auto shrink-0 overflow-hidden relative">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col justify-between w-full">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-lg text-[#f5f5f5]">{property.title}</h3>
                    <button className="text-gray-500 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                    <MapPin size={14} />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300 text-sm">
                    <div className="flex items-center gap-1.5"><BedDouble size={14} className="text-[#c5a059]"/> {property.beds}</div>
                    <div className="flex items-center gap-1.5"><Bath size={14} className="text-[#c5a059]"/> {property.baths}</div>
                    <div className="flex items-center gap-1.5"><Square size={14} className="text-[#c5a059]"/> {property.sqft} sqft</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-[#c5a059] font-bold text-xl">${property.price.toLocaleString()}</p>
                  <button className="bg-[#222] hover:bg-[#c5a059] hover:text-black text-[#f5f5f5] px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#111] border border-[#222] rounded-2xl">
          <Heart size={48} className="mx-auto text-gray-600 mb-4" />
          <h2 className="text-xl font-semibold text-[#f5f5f5]">Your wishlist is empty</h2>
          <p className="text-gray-400 mt-2">Start exploring properties and save your favorites here.</p>
          <button className="mt-6 bg-[#c5a059] text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
            Browse Properties
          </button>
        </div>
      )}
    </div>
  );
}
