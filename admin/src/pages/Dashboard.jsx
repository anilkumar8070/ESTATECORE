import { useState, useEffect } from 'react';
import { Building, Users, ShoppingCart, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const Dashboard = () => {
  const [stats, setStats] = useState({
    properties: 0,
    users: 0,
    requests: 0,
    visits: 0,
    chartData: null
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [propSnap, userSnap, reqSnap, visitSnap] = await Promise.all([
        getDocs(collection(db, 'properties')),
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'buyRequests')),
        getDocs(collection(db, 'visits'))
      ]);

      const propData = propSnap.docs.map(doc => doc.data());
      const reqData = reqSnap.docs.map(doc => doc.data());

      const propStatus = { available: 0, sold: 0, rented: 0 };
      propData.forEach(p => {
        if (propStatus[p.status] !== undefined) propStatus[p.status]++;
      });

      const reqStatus = { pending: 0, approved: 0, rejected: 0 };
      reqData.forEach(r => {
        if (reqStatus[r.status] !== undefined) reqStatus[r.status]++;
      });

      setStats({
        properties: propSnap.size,
        users: userSnap.size,
        requests: reqSnap.size,
        visits: visitSnap.size,
        chartData: {
          statusData: [
            { name: 'Available', value: propStatus.available },
            { name: 'Sold', value: propStatus.sold },
            { name: 'Rented', value: propStatus.rented },
          ],
          requestsData: [
            { name: 'Pending', value: reqStatus.pending },
            { name: 'Approved', value: reqStatus.approved },
            { name: 'Rejected', value: reqStatus.rejected },
          ]
        }
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Properties Status Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Property Distribution by Status</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData?.statusData || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <RechartsTooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="value" fill="#c5a059" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Requests Status Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Buy Requests Overview</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.chartData?.requestsData || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {(stats.chartData?.requestsData || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#c5a059', '#10b981', '#ef4444'][index % 3]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
