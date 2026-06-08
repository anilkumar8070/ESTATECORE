import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Clock, Calendar, ArrowRight, ShoppingBag, MapPin } from 'lucide-react';
import { userStats, properties } from '../data/dummy';
import Hero from '../components/Hero';

const StatCard = ({ title, value, icon, gradient }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative overflow-hidden bg-white border border-gray-100 p-6 rounded-3xl flex items-center gap-5 transition-all duration-300 group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl"
  >
    <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-semibold tracking-wide">{title}</p>
      <h3 className="text-3xl font-black mt-1 text-gray-900 tracking-tight">{value}</h3>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="pb-16">
      <Hero />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard 
            title="Purchased Properties" 
            value={1} 
            icon={<ShoppingBag size={24} className="text-white" />} 
            gradient="from-emerald-500 to-teal-500"
          />
          <StatCard 
            title="Pending Purchases" 
            value={userStats.activeRequests || 3} 
            icon={<Clock size={24} className="text-white" />} 
            gradient="from-gold to-yellow-600"
          />
          <StatCard 
            title="Completed Visits" 
            value={userStats.viewed || 15} 
            icon={<Eye size={24} className="text-white" />} 
            gradient="from-blue-500 to-indigo-600"
          />
          <StatCard 
            title="Pending Visits" 
            value={userStats.scheduledVisits || 2} 
            icon={<Calendar size={24} className="text-white" />} 
            gradient="from-rose-500 to-pink-600"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black tracking-tight text-gray-900">Recently Viewed Properties</h2>
            <button className="flex items-center gap-3 text-gray-500 hover:text-prime font-bold transition-colors group">
              View all 
              <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all shadow-sm">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {properties.slice(0, 3).map((property, idx) => (
              <motion.div 
                key={property.id}
                onClick={() => navigate(`/user/properties/${property.id}`)}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:border-gold/20 hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-black text-prime shadow-lg">
                    ${property.price}
                  </div>
                  <img 
                    src={property.image} 
                    alt={property.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-3">
                    <MapPin size={14} />
                    {property.location}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-6 group-hover:text-gold transition-colors">{property.title}</h3>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                     <div className="flex gap-4 text-gray-500 font-bold text-sm">
                        <span>{property.beds} Beds</span>
                        <span>{property.sqft} sqft</span>
                     </div>
                     <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-prime group-hover:bg-prime group-hover:text-gold transition-colors">
                        <ArrowRight size={20} />
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
