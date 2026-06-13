import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Check, X, CalendarClock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

const VisitsManager = () => {
  const [visits, setVisits] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'visits'));
      const data = querySnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
      setVisits(data);
    } catch (error) {
      console.error('Failed to fetch visits', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const statusToSet = newStatus.toLowerCase();
      await updateDoc(doc(db, 'visits', id), { status: statusToSet });
      setVisits(visits.map(v => v._id === id ? { ...v, status: statusToSet } : v));
    } catch (error) {
      console.error('Failed to update visit status', error);
    }
  };

  const filteredVisits = filter === 'All' 
    ? visits 
    : visits.filter(v => v.status === filter.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Visits</h1>
          <p className="text-gray-500 mt-1">Manage scheduled property tours and visits.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 border-b border-gray-200 pb-4">
        {['All', 'Scheduled', 'Completed', 'Cancelled'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status 
                ? 'bg-prime text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredVisits.map((visit) => (
            <motion.div
              key={visit._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider capitalize ${
                  visit.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                  visit.status === 'completed' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {visit.status}
                </div>
                <CalendarClock size={20} className="text-gray-300" />
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">{visit.propertyTitle || visit.propertyId?.title || 'Unknown Property'}</h3>
              <p className="text-sm text-gray-500 mb-4">Requested by: <span className="font-medium text-gray-700">{visit.userName || visit.userId?.name || 'Unknown User'}</span></p>

              <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center mb-6">
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <CalendarIcon size={16} className="text-gold mr-2" />
                  {new Date(visit.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm font-medium text-gray-700">
                  <Clock size={16} className="text-gold mr-2" />
                  {visit.time}
                </div>
              </div>

              <div className="mt-auto flex justify-end space-x-2">
                {visit.status === 'scheduled' && (
                  <>
                    <button 
                      onClick={() => handleStatusChange(visit._id, 'Completed')}
                      className="flex-1 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors text-sm font-medium flex justify-center items-center"
                    >
                      <Check size={16} className="mr-1" /> Complete
                    </button>
                    <button 
                      onClick={() => handleStatusChange(visit._id, 'Cancelled')}
                      className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium flex justify-center items-center"
                    >
                      <X size={16} className="mr-1" /> Cancel
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredVisits.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">No visits found for this status.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitsManager;
