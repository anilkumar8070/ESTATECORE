import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Heart, Clock, Calendar, ArrowRight, ShoppingBag } from 'lucide-react';
import { userStats, properties } from '../data/dummy';

const StatCard = ({ title, value, icon, gradient }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative overflow-hidden bg-[#111]/40 backdrop-blur-xl border border-white/5 p-6 rounded-3xl flex items-center gap-5 transition-all duration-300 group"
  >
    <div className={`absolute -inset-px opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 bg-gradient-to-r ${gradient} blur-sm -z-10`}></div>
    <div className="absolute inset-0 bg-[#111]/80 rounded-3xl -z-10"></div>
    <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} bg-opacity-10 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-sm font-light tracking-wide">{title}</p>
      <h3 className="text-3xl font-bold mt-1 text-[#f5f5f5] tracking-tight">{value}</h3>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      <div>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-5xl font-bold text-[#f5f5f5] tracking-tighter"
        >
          Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-[#e8c87e]">John!</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 mt-3 font-light text-lg"
        >
          Here is what's happening with your real estate journey today.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Purchased Properties" 
          value={1} 
          icon={<ShoppingBag size={24} className="text-white" />} 
          gradient="from-emerald-500/40 to-teal-500/40"
        />
        <StatCard 
          title="Pending Purchases" 
          value={userStats.activeRequests || 3} 
          icon={<Clock size={24} className="text-white" />} 
          gradient="from-[#c5a059]/60 to-yellow-500/40"
        />
        <StatCard 
          title="Completed Visits" 
          value={userStats.viewed || 15} 
          icon={<Eye size={24} className="text-white" />} 
          gradient="from-blue-500/40 to-cyan-500/40"
        />
        <StatCard 
          title="Pending Visits" 
          value={userStats.scheduledVisits || 2} 
          icon={<Calendar size={24} className="text-white" />} 
          gradient="from-red-500/40 to-pink-500/40"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#f5f5f5]">Recently Viewed Properties</h2>
          <button className="flex items-center gap-2 text-[#c5a059] hover:text-[#e8c87e] text-sm font-medium transition-colors group">
            View all 
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.slice(0, 3).map((property, idx) => (
            <motion.div 
              key={property.id}
              onClick={() => navigate(`/properties/${property.id}`)}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-[#111]/30 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden hover:border-[#c5a059]/30 hover:shadow-[0_0_30px_rgba(197,160,89,0.1)] transition-all group cursor-pointer"
            >
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-[#c5a059] font-bold text-xl drop-shadow-md">${property.price.toLocaleString()}</p>
                </div>
              </div>
              <div className="p-6 relative">
                <div className="absolute -top-6 right-6 z-20 bg-[#111] p-3 rounded-2xl border border-white/5 shadow-xl group-hover:bg-[#c5a059] group-hover:text-black transition-colors duration-300">
                  <ArrowRight size={20} className="-rotate-45" />
                </div>
                <h3 className="font-semibold text-xl text-[#f5f5f5] tracking-tight mb-2 pr-12">{property.title}</h3>
                <p className="text-gray-400 text-sm font-light mb-5">{property.location}</p>
                <div className="flex items-center gap-4 text-xs font-medium text-gray-400 bg-white/5 p-3 rounded-xl border border-white/5">
                  <div className="flex flex-col"><span className="text-[#f5f5f5] text-lg">{property.beds}</span> Beds</div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="flex flex-col"><span className="text-[#f5f5f5] text-lg">{property.baths}</span> Baths</div>
                  <div className="w-px h-8 bg-white/10"></div>
                  <div className="flex flex-col"><span className="text-[#f5f5f5] text-lg">{property.sqft}</span> SqFt</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
