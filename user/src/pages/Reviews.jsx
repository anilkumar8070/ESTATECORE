import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import api from '../api';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/reviews').then(({ data }) => {
      setReviews(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="text-gray-500 text-center py-20">Loading reviews...</div>;
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#f5f5f5]">Reviews & Ratings</h1>
        <p className="text-gray-400 mt-1">See what others are saying and leave your feedback.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No reviews have been posted yet.
          </div>
        ) : reviews.map((review) => (
          <div key={review._id} className="bg-[#111] border border-[#222] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex gap-4 mb-4 border-b border-white/5 pb-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <img src={review.propertyId?.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"} alt={review.propertyId?.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#f5f5f5]">{review.propertyId?.title || 'Unknown Property'}</h3>
                  <p className="text-sm text-gray-400">{review.propertyId?.location || 'Unknown Location'}</p>
                </div>
              </div>
              
              <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#222] mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < review.rating ? "text-[#c5a059] fill-[#c5a059]" : "text-gray-600"} />
                  ))}
                </div>
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "{review.comment}"
                </p>
                <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-3">
                  <span className="text-[#c5a059] text-xs font-semibold uppercase tracking-wider">{review.userId?.name || 'Anonymous User'}</span>
                  <span className="text-gray-500 text-xs">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
