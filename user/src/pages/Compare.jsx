import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import api from '../api';
import { propertyService } from '../services/propertyService';

export default function Compare() {
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    propertyService.getAllProperties().then((data) => setCompareList(data.slice(0, 3))).catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#f5f5f5]">Compare Properties</h1>
        <p className="text-gray-400 mt-1">Side-by-side comparison of your selected properties.</p>
      </div>

      <div className="overflow-x-auto pb-4">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr>
              <th className="p-4 bg-[#111] border border-[#222] text-left text-gray-400 font-medium rounded-tl-2xl w-48">Features</th>
              {compareList.map((property, idx) => (
                <th key={property._id} className={`p-4 bg-[#111] border border-[#222] text-center ${idx === compareList.length - 1 ? 'rounded-tr-2xl' : ''}`}>
                  <div className="relative h-32 rounded-lg overflow-hidden mb-3 bg-gray-800">
                    <img src={property.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"} alt={property.title} className="w-full h-full object-cover" />
                    <button className="absolute top-2 right-2 bg-black/50 p-1 rounded-full text-white hover:text-red-500">
                      <X size={14} />
                    </button>
                  </div>
                  <h3 className="text-[#f5f5f5] font-semibold text-sm leading-tight">{property.title}</h3>
                  <p className="text-[#c5a059] font-bold mt-1">${property.price ? property.price.toLocaleString() : property.price}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border border-[#222] bg-[#0a0a0a] text-gray-400">Location</td>
              {compareList.map(property => (
                <td key={property._id} className="p-4 border border-[#222] bg-[#0a0a0a] text-[#f5f5f5] text-center">{property.location}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border border-[#222] bg-[#111] text-gray-400">Property Type</td>
              {compareList.map(property => (
                <td key={property._id} className="p-4 border border-[#222] bg-[#111] text-[#f5f5f5] text-center">{property.type || 'House'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border border-[#222] bg-[#0a0a0a] text-gray-400">Bedrooms</td>
              {compareList.map(property => (
                <td key={property._id} className="p-4 border border-[#222] bg-[#0a0a0a] text-[#f5f5f5] text-center font-semibold">{property.bedrooms}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border border-[#222] bg-[#111] text-gray-400">Bathrooms</td>
              {compareList.map(property => (
                <td key={property._id} className="p-4 border border-[#222] bg-[#111] text-[#f5f5f5] text-center font-semibold">{property.bathrooms}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border border-[#222] bg-[#0a0a0a] text-gray-400">Square Feet</td>
              {compareList.map(property => (
                <td key={property._id} className="p-4 border border-[#222] bg-[#0a0a0a] text-[#f5f5f5] text-center">{property.area} sqft</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border border-[#222] bg-[#111] text-gray-400">Swimming Pool</td>
              {compareList.map(property => (
                <td key={property._id} className="p-4 border border-[#222] bg-[#111] text-center">
                  {property.price > 4000000 ? <Check size={20} className="text-[#c5a059] mx-auto" /> : <span className="text-gray-600">-</span>}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border border-[#222] bg-[#0a0a0a] text-gray-400 rounded-bl-2xl">Action</td>
              {compareList.map((property, idx) => (
                <td key={property._id} className={`p-4 border border-[#222] bg-[#0a0a0a] text-center ${idx === compareList.length - 1 ? 'rounded-br-2xl' : ''}`}>
                  <button className="bg-transparent border border-[#c5a059] text-[#c5a059] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#c5a059] hover:text-black transition-colors w-full">
                    Details
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
