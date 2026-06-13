import React from 'react';
import { useUserContext } from '../context/UserContext';
import PropertyCard from '../components/PropertyCard';
import { motion } from 'framer-motion';

const WishlistPage = () => {
  const { wishlist } = useUserContext();

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Your <span className="text-[#c9a84c]">Wishlist</span></h1>
          <p className="text-gray-500">Properties you've saved for later.</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Start exploring our properties and save your favorites here.</p>
            <a href="/properties" className="inline-block px-8 py-3 bg-[#1a1a2e] text-white rounded-full hover:bg-[#2a2a3e] transition-colors">
              Browse Properties
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
