import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, Eye, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { properties } from '../data/dummy';

const ActivityCard = ({ title, count, icon, items }) => (
  <div className="bg-[#111]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-[#f5f5f5] tracking-tight">{title}</h3>
      </div>
      <span className="text-2xl font-bold text-[#c5a059]">{count}</span>
    </div>
    
    <div className="space-y-4">
      {items.length > 0 ? items.map((item, idx) => (
        <div key={idx} className="flex gap-4 p-3 hover:bg-white/5 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-white/5 group">
          <img src={item.image} alt={item.title} className="w-20 h-20 rounded-xl object-cover" />
          <div className="flex flex-col justify-center flex-1">
            <h4 className="text-[#f5f5f5] font-semibold text-sm group-hover:text-[#c5a059] transition-colors">{item.title}</h4>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
              <MapPin size={12} className="text-[#c5a059]" /> {item.location}
            </p>
            <p className="text-[#c5a059] text-sm font-medium mt-1">${item.price.toLocaleString()}</p>
          </div>
          <div className="flex items-center">
            <ArrowRight size={16} className="text-gray-500 group-hover:text-[#c5a059] group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      )) : (
        <div className="text-center py-6 text-gray-500 text-sm font-light">
          No items found in this category.
        </div>
      )}
    </div>
  </div>
);

export default function BuyRequest() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1400px] mx-auto space-y-10"
    >
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] tracking-tighter">Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-[#e8c87e]">Activity</span></h1>
        <p className="text-gray-400 mt-2 font-light">Track your purchases, offers, and property visits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Purchased Properties */}
        <ActivityCard 
          title="Purchased Properties" 
          count={1}
          icon={<ShoppingBag size={24} className="text-[#c5a059]" />}
          items={[properties[1]]} // Dummy data
        />

        {/* Pending Purchases */}
        <ActivityCard 
          title="Pending Purchases" 
          count={2}
          icon={<Clock size={24} className="text-[#c5a059]" />}
          items={[properties[0], properties[2]]} // Dummy data
        />

        {/* Completed Visits */}
        <ActivityCard 
          title="Completed Visits" 
          count={2}
          icon={<Eye size={24} className="text-[#c5a059]" />}
          items={[properties[1], properties[3]]} // Dummy data
        />

        {/* Pending Visits */}
        <ActivityCard 
          title="Pending Visits" 
          count={1}
          icon={<Calendar size={24} className="text-[#c5a059]" />}
          items={[properties[0]]} // Dummy data
        />

      </div>
    </motion.div>
  );
}
