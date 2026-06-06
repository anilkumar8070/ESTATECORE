import React from 'react';
import { Star } from 'lucide-react';
import { properties } from '../data/dummy';

export default function Reviews() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#f5f5f5]">Reviews & Ratings</h1>
        <p className="text-gray-400 mt-1">See what others are saying and leave your feedback.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-[#111] border border-[#222] rounded-2xl p-6">
            <div className="flex gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-[#f5f5f5]">{property.title}</h3>
                <p className="text-sm text-gray-400">{property.location}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star size={14} className="text-[#c5a059] fill-[#c5a059]" />
                  <span className="text-[#f5f5f5] text-sm font-bold">{property.rating}</span>
                  <span className="text-gray-500 text-xs">({property.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#222]">
              <p className="text-gray-300 text-sm italic">
                "Absolutely beautiful property. The location is perfect and the amenities are top-notch. Highly recommend!"
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[#c5a059] text-xs font-semibold">- Jane Doe</span>
                <span className="text-gray-500 text-xs">2 days ago</span>
              </div>
            </div>

            <button className="w-full mt-4 bg-transparent border border-[#c5a059] text-[#c5a059] py-2 rounded-lg text-sm font-semibold hover:bg-[#c5a059]/10 transition-colors">
              Write a Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
