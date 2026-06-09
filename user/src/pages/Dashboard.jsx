import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Clock, Calendar, ArrowRight, ShoppingBag, MapPin } from 'lucide-react';
import api from '../api';
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
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({ purchased: 0, pendingRequests: 0, completedVisits: 0, scheduledVisits: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [propRes, usersRes] = await Promise.all([
          api.get('/properties'),
          api.get('/users')
        ]);
        setProperties(propRes.data.filter(p => p.status === 'available'));
        
        const user = usersRes.data.length > 0 ? usersRes.data[0] : null;
        if (user) {
          const [reqRes, visitRes] = await Promise.all([
            api.get('/buy-requests'),
            api.get('/visits')
          ]);
          
          const userRequests = reqRes.data.filter(r => r.userId?._id === user._id);
          const userVisits = visitRes.data.filter(v => v.userId?._id === user._id);
          
          setStats({
            purchased: userRequests.filter(r => r.status === 'approved').length,
            pendingRequests: userRequests.filter(r => r.status === 'pending').length,
            completedVisits: userVisits.filter(v => v.status === 'completed').length,
            scheduledVisits: userVisits.filter(v => v.status === 'scheduled').length
          });
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pb-16">
      <Hero />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard 
            title="Purchased Properties" 
            value={stats.purchased} 
            icon={<ShoppingBag size={24} className="text-white" />} 
            gradient="from-emerald-500 to-teal-500"
          />
          <StatCard 
            title="Pending Purchases" 
            value={stats.pendingRequests} 
            icon={<Clock size={24} className="text-white" />} 
            gradient="from-gold to-yellow-600"
          />
          <StatCard 
            title="Completed Visits" 
            value={stats.completedVisits} 
            icon={<Eye size={24} className="text-white" />} 
            gradient="from-blue-500 to-indigo-600"
          />
          <StatCard 
            title="Pending Visits" 
            value={stats.scheduledVisits} 
            icon={<Calendar size={24} className="text-white" />} 
            gradient="from-rose-500 to-pink-600"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black tracking-tight text-gray-900">Recently Viewed Properties</h2>
            <button 
              onClick={() => navigate('/user/properties')}
              className="flex items-center gap-3 text-gray-500 hover:text-prime font-bold transition-colors group"
            >
              View all 
              <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-all shadow-sm">
                <ArrowRight size={16} />
              </div>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {properties.slice(0, 3).map((property, idx) => (
              <motion.div 
                key={property._id}
                onClick={() => navigate(`/user/properties/${property._id}`)}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:border-gold/20 hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-black text-prime shadow-lg">
                    ${property.price ? property.price.toLocaleString() : property.price}
                  </div>
                  <img 
                    src={property.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"} 
                    alt={property.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out bg-gray-100"
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
                        <span>{property.bedrooms} Beds</span>
                        <span>{property.area} sqft</span>
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
