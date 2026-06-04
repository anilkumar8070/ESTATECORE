import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {property.category}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <button className="bg-gold text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform">
            <Bed className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {property.title}
          </h3>
          <span className="text-gold font-bold text-lg">
            ${property.price}
          </span>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-6">
          <MapPin className="w-4 h-4 mr-1" />
          {property.location}
        </div>

        <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-50">
          <div className="flex items-center text-gray-600 text-sm">
            <Bed className="w-4 h-4 mr-2 text-gold" />
            {property.beds} <span className="hidden sm:inline ml-1">Beds</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Bath className="w-4 h-4 mr-2 text-gold" />
            {property.baths} <span className="hidden sm:inline ml-1">Baths</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Square className="w-4 h-4 mr-2 text-gold" />
            {property.sqft} <span className="hidden sm:inline ml-1">sqft</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Link 
            to={`/property/${property.id}`}
            className="bg-gray-50 text-center text-gray-900 py-3 rounded-xl font-semibold hover:bg-black hover:text-white transition-all duration-300"
          >
            Details
          </Link>
          <button className="bg-gold text-white py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-300">
            Purchase
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
