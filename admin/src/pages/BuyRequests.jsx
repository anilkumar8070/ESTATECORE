import { useState, useEffect } from 'react';
import { Check, X, Clock, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const BuyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('All');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/buy-requests');
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch buy requests', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await api.put(`/buy-requests/${id}`, { status: newStatus.toLowerCase() });
      setRequests(requests.map(req => req._id === id ? data : req));
    } catch (error) {
      console.error('Failed to update request status', error);
    }
  };

  const filteredRequests = filter === 'All' 
    ? requests 
    : requests.filter(r => r.status === filter.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Buy Requests</h1>
          <p className="text-gray-500 mt-1">Manage all incoming property inquiries and purchase requests.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 border-b border-gray-200 pb-4">
        {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
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

      {/* Requests List */}
      <div className="grid gap-4">
        <AnimatePresence>
          {filteredRequests.map(request => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{request.userId?.name || 'Unknown User'}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 flex items-center space-x-4">
                  <span className="flex items-center"><Mail size={14} className="mr-1" /> {request.userId?.email || 'N/A'}</span>
                  <span>•</span>
                  <span className="font-medium text-gray-900">Property: {request.propertyId?.title || 'Unknown Property'}</span>
                  <span>•</span>
                  <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                </div>
                {request.message && (
                  <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded border border-gray-100">
                    "{request.message}"
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {request.status !== 'approved' && (
                  <button 
                    onClick={() => handleStatusChange(request._id, 'Approved')}
                    className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                    title="Approve"
                  >
                    <Check size={18} />
                  </button>
                )}
                {request.status !== 'rejected' && (
                  <button 
                    onClick={() => handleStatusChange(request._id, 'Rejected')}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    title="Reject"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 flex justify-center items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-t-gold animate-spin"></div>
            <p className="text-gray-500">Loading requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">No requests found for this status.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BuyRequests;
