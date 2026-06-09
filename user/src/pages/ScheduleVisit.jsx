import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function ScheduleVisit() {
  const navigate = useNavigate();
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const { data: users } = await api.get('/users');
        const user = users.length > 0 ? users[0] : null;
        if (!user) { setLoading(false); return; }

        const { data } = await api.get('/visits');
        setVisits(data.filter(v => v.userId?._id === user._id));
      } catch (error) {
        console.error("Failed to fetch visits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisits();
  }, []);

  if (loading) {
    return <div className="text-gray-500 text-center py-20">Loading visits...</div>;
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-10">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#f5f5f5] tracking-tighter">Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-[#e8c87e]">Visits</span></h1>
        <p className="text-gray-400 mt-2 font-light">Track your upcoming and past property visits.</p>
      </div>

      {visits.length === 0 ? (
        <div className="text-center py-20 bg-[#111]/40 border border-white/5 rounded-3xl">
          <CalendarIcon size={48} className="mx-auto text-gray-600 mb-4" />
          <h2 className="text-xl font-semibold text-[#f5f5f5]">No scheduled visits yet</h2>
          <p className="text-gray-400 mt-2">Find a property you love and schedule a tour.</p>
          <button 
            onClick={() => navigate('/user/properties')}
            className="mt-6 bg-[#c5a059] text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
          >
            Explore Properties
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visits.map((visit) => (
            <div key={visit._id} className="bg-[#111]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-lg group hover:border-[#c5a059]/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest ${
                  visit.status === 'scheduled' ? 'bg-[#c5a059]/20 text-[#c5a059]' : 
                  visit.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {visit.status}
                </span>
                <button 
                  onClick={() => navigate(`/user/properties/${visit.propertyId?._id}`)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <ExternalLink size={14} />
                </button>
              </div>
              
              <div className="h-40 rounded-xl overflow-hidden mb-5">
                <img src={visit.propertyId?.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"} alt="Property" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>

              <h3 className="text-[#f5f5f5] font-bold text-lg mb-1">{visit.propertyId?.title}</h3>
              <p className="text-gray-400 text-sm flex items-center gap-1 mb-4"><MapPin size={14} className="text-[#c5a059]"/> {visit.propertyId?.location}</p>

              <div className="flex items-center gap-4 pt-4 border-t border-white/5 text-gray-300 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <CalendarIcon size={16} className="text-[#c5a059]"/>
                  {new Date(visit.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#c5a059]"/>
                  {visit.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
