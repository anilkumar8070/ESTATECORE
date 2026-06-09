import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, Eye, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const ActivityCard = ({ title, count, icon, items }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#111]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-lg h-full">
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
          <div 
            key={idx} 
            onClick={() => navigate(`/user/properties/${item.propertyId?._id}`)}
            className="flex gap-4 p-3 hover:bg-white/5 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-white/5 group"
          >
            <img src={item.propertyId?.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"} alt={item.propertyId?.title} className="w-20 h-20 rounded-xl object-cover bg-gray-800" />
            <div className="flex flex-col justify-center flex-1">
              <h4 className="text-[#f5f5f5] font-semibold text-sm group-hover:text-[#c5a059] transition-colors">{item.propertyId?.title}</h4>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                <MapPin size={12} className="text-[#c5a059]" /> {item.propertyId?.location}
              </p>
              <p className="text-[#c5a059] text-sm font-medium mt-1">${item.propertyId?.price?.toLocaleString()}</p>
            </div>
            <div className="flex items-center">
              <ArrowRight size={16} className="text-gray-500 group-hover:text-[#c5a059] group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        )) : (
          <div className="text-center py-10 text-gray-500 text-sm font-light">
            No items found.
          </div>
        )}
      </div>
    </div>
  );
};

export default function BuyRequest() {
  const [purchased, setPurchased] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: users } = await api.get('/users');
        const user = users.length > 0 ? users[0] : null;
        if (!user) return;
        
        const { data } = await api.get('/buy-requests');
        const userReqs = data.filter(r => r.userId?._id === user._id);
        
        setPurchased(userReqs.filter(r => r.status === 'approved'));
        setPending(userReqs.filter(r => r.status === 'pending' || r.status === 'rejected'));
      } catch (error) {
        console.error("Failed to fetch buy requests:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1400px] mx-auto space-y-10"
    >
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] tracking-tighter">Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-[#e8c87e]">Activity</span></h1>
        <p className="text-gray-400 mt-2 font-light">Track your purchases, buy requests, and property visits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Purchased Properties */}
        <ActivityCard 
          title="Purchased Properties" 
          count={purchased.length}
          icon={<ShoppingBag size={24} className="text-[#c5a059]" />}
          items={purchased} 
        />

        {/* Pending Purchases */}
        <ActivityCard 
          title="Pending Purchases" 
          count={pending.length}
          icon={<Clock size={24} className="text-[#c5a059]" />}
          items={pending} 
        />

      </div>
    </motion.div>
  );
}
