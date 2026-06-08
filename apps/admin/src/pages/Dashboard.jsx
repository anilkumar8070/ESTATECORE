import { useState, useEffect } from 'react';
import { Building, Users, ShoppingCart, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    properties: 0,
    users: 0,
    requests: 0,
    visits: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [propRes, userRes, reqRes, visitRes] = await Promise.all([
        api.get('/properties'),
        api.get('/users'),
        api.get('/buy-requests'),
        api.get('/visits')
      ]);
      setStats({
        properties: propRes.data.length,
        users: userRes.data.length,
        requests: reqRes.data.length,
        visits: visitRes.data.length
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats', error);
    }
  };

  const statCards = [
    { title: 'Total Properties', value: stats.properties, icon: <Building size={24} className="text-gold" />, trend: '+12%', isUp: true },
    { title: 'Active Users', value: stats.users, icon: <Users size={24} className="text-gold" />, trend: '+5%', isUp: true },
    { title: 'Buy Requests', value: stats.requests, icon: <ShoppingCart size={24} className="text-gold" />, trend: '+18%', isUp: true },
    { title: 'Scheduled Visits', value: stats.visits, icon: <Calendar size={24} className="text-gold" />, trend: '-2%', isUp: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back, Admin 👋</h1>
        <p className="text-gray-500 mt-2 text-lg">Here's what's happening with EstateCore today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
              </div>
              <div className="p-3 bg-accent rounded-xl">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`flex items-center text-sm font-medium ${stat.isUp ? 'text-green-600' : 'text-red-500'}`}>
                {stat.isUp ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                {stat.trend}
              </span>
              <span className="text-gray-400 text-sm ml-2">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-gold">
            <Building size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Analytics Dashboard</h3>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Detailed charts and graphs will be populated here as your platform gathers more real-time data from user interactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
