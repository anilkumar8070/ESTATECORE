import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Clock, Calendar, ArrowRight, ShoppingBag, MapPin, Sparkles, TrendingUp, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { propertyService } from '../services/propertyService';
import Hero from '../components/Hero';

const StatCard = ({ title, value, icon, gradient, delay, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    whileHover={{ y: -6, scale: 1.02 }}
    className="group relative bg-white/70 backdrop-blur-3xl border border-white/80 p-7 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500"
  >
    {/* Subtle animated background glow */}
    <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full blur-[50px] opacity-[0.15] group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />
    
    {/* Animated Shine Effect */}
    <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/60 to-transparent z-0 pointer-events-none" />

    <div className="relative z-10 flex items-start justify-between">
      <div>
        <p className="text-zinc-500 text-[11px] font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
          {title}
        </p>
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2, duration: 0.5 }}
          className="flex items-baseline gap-3"
        >
          <h3 className="text-4xl font-light text-zinc-900 tracking-tight">{value}</h3>
          {trend && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${gradient} bg-opacity-10 text-transparent bg-clip-text tracking-wider uppercase`}>
              {trend}
            </span>
          )}
        </motion.div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-50 rounded-[1.25rem] group-hover:scale-110 transition-transform duration-500" />
        <div className={`relative p-4 rounded-[1.25rem] bg-gradient-to-br ${gradient} shadow-lg shadow-zinc-200/50 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
          {icon}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({ purchased: 0, pendingRequests: 0, completedVisits: 0, scheduledVisits: 0 });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propData = await propertyService.getAllProperties();
        setProperties(propData.filter(p => p.status === 'available'));
        
        if (currentUser) {
          const [reqSnap, visitSnap] = await Promise.all([
            getDocs(query(collection(db, 'buyRequests'), where('userId', '==', currentUser.uid))),
            getDocs(query(collection(db, 'visits'), where('userId', '==', currentUser.uid)))
          ]);
          
          const userRequests = reqSnap.docs.map(doc => doc.data());
          const userVisits = visitSnap.docs.map(doc => doc.data());
          
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
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="pb-24 bg-[#FAFAFA] min-h-screen relative overflow-hidden">
      
      {/* Floating Header specifically for Dashboard over the Hero */}
      <div className="absolute top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-start pointer-events-none">
        {/* Brand */}
        <div className="pointer-events-auto text-white">
          <h2 className="text-2xl font-black tracking-widest uppercase drop-shadow-lg">
            ESTATE<span className="text-gold">CORE</span>
          </h2>
        </div>

        {/* User Menu */}
        <div className="relative pointer-events-auto">
          <button 
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-3 bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/20 p-2 pr-4 rounded-full transition-all text-white shadow-lg"
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <User size={18} />
            </div>
            <span className="text-sm font-semibold tracking-wide hidden sm:block">
              {currentUser?.email?.split('@')[0] || 'User'}
            </span>
            <ChevronDown size={14} className={`transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-56 bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-zinc-100 overflow-hidden"
              >
                <div className="p-4 border-b border-zinc-100 bg-zinc-50/50">
                  <p className="text-sm font-bold text-zinc-900 truncate">{currentUser?.email}</p>
                  <p className="text-[10px] font-bold text-gold uppercase tracking-widest mt-1">Premium Client</p>
                </div>
                <div className="p-2 flex flex-col gap-1">
                  <button 
                    onClick={() => navigate('/user/settings')}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold tracking-wide text-zinc-600 hover:text-prime hover:bg-zinc-50 rounded-xl transition-colors w-full text-left"
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold tracking-wide text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full text-left"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Global Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[40vw] h-[40vw] bg-prime/5 rounded-full blur-[100px] pointer-events-none" />

      <Hero />

      <div className="max-w-[1600px] mx-auto px-6 md:px-10 -mt-8 relative z-20 space-y-16">
        
        {/* Welcome Section - Enhanced */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white/60 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
        >
          {/* Decorative line */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-gold font-bold text-[10px] tracking-widest uppercase mb-4">
              <Sparkles size={16} className="animate-pulse" />
              <span>Command Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-light text-zinc-900 tracking-tight">
              Welcome back, <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-prime to-gold">{currentUser?.email?.split('@')[0] || 'User'}</span>
            </h1>
          </div>
          <p className="relative z-10 text-zinc-500 font-medium max-w-sm text-sm leading-relaxed border-l-2 border-gold/30 pl-5">
            Your personal portfolio overview. Track acquisitions, monitor pending requests, and manage upcoming property viewings.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Acquisitions" 
            value={stats.purchased} 
            icon={<ShoppingBag size={22} className="text-white" />} 
            gradient="from-emerald-400 to-emerald-600"
            delay={0.1}
            trend="Active"
          />
          <StatCard 
            title="Pending Actions" 
            value={stats.pendingRequests} 
            icon={<Clock size={22} className="text-white" />} 
            gradient="from-gold to-yellow-600"
            delay={0.2}
            trend="Review"
          />
          <StatCard 
            title="Properties Visited" 
            value={stats.completedVisits} 
            icon={<Eye size={22} className="text-white" />} 
            gradient="from-blue-400 to-blue-600"
            delay={0.3}
          />
          <StatCard 
            title="Upcoming Viewings" 
            value={stats.scheduledVisits} 
            icon={<Calendar size={22} className="text-white" />} 
            gradient="from-rose-400 to-rose-600"
            delay={0.4}
            trend="Scheduled"
          />
        </div>

        {/* Properties Section */}
        <div>
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-prime font-bold text-[10px] tracking-widest uppercase mb-2">
                <TrendingUp size={14} />
                <span>Curated For You</span>
              </div>
              <h2 className="text-3xl font-light tracking-tight text-zinc-900">Featured Discoveries</h2>
            </div>
            <button 
              onClick={() => navigate('/user/properties')}
              className="group flex items-center gap-3 text-[11px] font-bold tracking-widest uppercase text-zinc-500 hover:text-prime transition-colors"
            >
              Explore Collection
              <div className="w-12 h-12 rounded-full bg-white border border-zinc-200/60 flex items-center justify-center group-hover:bg-prime group-hover:text-gold group-hover:border-prime transition-all shadow-sm group-hover:shadow-xl group-hover:scale-110">
                <ArrowRight size={18} />
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.slice(0, 3).map((property, idx) => (
              <motion.div 
                key={property._id}
                onClick={() => navigate(`/user/properties/${property._id}`)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12 }}
                className="group cursor-pointer bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgb(0,0,0,0.12)] transition-all duration-500"
              >
                <div className="relative h-72 rounded-[2rem] overflow-hidden mb-6">
                  {/* Glassmorphism Price Pill */}
                  <div className="absolute top-4 right-4 z-20 bg-white/70 backdrop-blur-xl px-5 py-2.5 rounded-full text-sm font-semibold text-zinc-900 shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-white/50 group-hover:bg-prime group-hover:text-gold group-hover:border-prime transition-colors duration-500">
                    ${property.price ? property.price.toLocaleString() : property.price}
                  </div>
                  
                  <img 
                    src={property.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"} 
                    alt={property.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[0.22,1,0.36,1]"
                  />
                  {/* Elegant Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                <div className="px-6 pb-6">
                  <div className="flex items-center gap-2 text-gold font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
                    <MapPin size={14} strokeWidth={2.5} />
                    {property.location}
                  </div>
                  <h3 className="text-2xl font-light text-zinc-900 mb-6 line-clamp-1 group-hover:text-prime transition-colors tracking-tight">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                     <div className="flex gap-6 text-zinc-500 font-medium text-sm">
                        <span className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-xs text-zinc-400 group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                             {property.bedrooms}
                          </div>
                          Beds
                        </span>
                        <span className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-xs text-zinc-400 group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                             <Sparkles size={12} />
                          </div>
                          {property.area} sqft
                        </span>
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
