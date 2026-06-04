import { useState, useEffect } from 'react';
import { Star, Eye, EyeOff, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const ReviewsManager = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get('/reviews');
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/reviews/${id}`);
      setReviews(reviews.filter(r => r._id !== id));
    } catch (error) {
      console.error('Failed to delete review', error);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < rating ? "fill-gold text-gold" : "text-gray-300"} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reviews & Testimonials</h1>
        <p className="text-gray-500 mt-1">Monitor and manage property reviews from users.</p>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <AnimatePresence>
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              layout
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-prime text-gold flex items-center justify-center font-bold">
                    {review.userId?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{review.userId?.name || 'Unknown User'}</h3>
                    <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {renderStars(review.rating)}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-xs font-semibold text-prime mb-1">PROPERTY:</p>
                <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-md border border-gray-100">
                  {review.propertyId?.title || 'Unknown Property'}
                </p>
              </div>

              <div className="flex-grow">
                <p className="text-gray-600 text-sm leading-relaxed">"{review.comment}"</p>
              </div>

              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-50">
                <button 
                  onClick={() => handleDelete(review._id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete Review"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {reviews.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">No reviews found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsManager;
