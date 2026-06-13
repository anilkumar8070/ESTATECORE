import React from 'react';
import { useUserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const ComparePage = () => {
  const { compareList, toggleCompare } = useUserContext();

  if (compareList.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No properties selected for comparison</h2>
          <Link to="/properties" className="px-6 py-3 bg-[#c9a84c] text-white rounded-full">
            Browse Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Compare <span className="text-[#c9a84c]">Properties</span></h1>
          <p className="text-gray-500">Side-by-side comparison of your selected properties.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-gray-100 min-w-[200px]">Features</th>
                {compareList.map(prop => (
                  <th key={prop.id} className="p-4 border-b border-gray-100 min-w-[300px] align-top relative">
                    <button 
                      onClick={() => toggleCompare(prop)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                    >
                      <X size={20} />
                    </button>
                    <img src={prop.image || prop.gallery[0]} alt={prop.title} className="w-full h-48 object-cover rounded-xl mb-4" />
                    <h3 className="font-bold text-xl">{prop.title}</h3>
                    <p className="text-[#c9a84c] font-black text-2xl mt-1">₹ {prop.price}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-gray-100 font-bold text-gray-700 bg-gray-50">Location</td>
                {compareList.map(prop => (
                  <td key={prop.id} className="p-4 border-b border-gray-100">{prop.location}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-bold text-gray-700 bg-gray-50">Type</td>
                {compareList.map(prop => (
                  <td key={prop.id} className="p-4 border-b border-gray-100">{prop.category} - {prop.subCategory}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-bold text-gray-700 bg-gray-50">Bedrooms</td>
                {compareList.map(prop => (
                  <td key={prop.id} className="p-4 border-b border-gray-100">{prop.beds || 'N/A'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-bold text-gray-700 bg-gray-50">Bathrooms</td>
                {compareList.map(prop => (
                  <td key={prop.id} className="p-4 border-b border-gray-100">{prop.baths || 'N/A'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-bold text-gray-700 bg-gray-50">Area (Sq.ft)</td>
                {compareList.map(prop => (
                  <td key={prop.id} className="p-4 border-b border-gray-100">{prop.sqft}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-bold text-gray-700 bg-gray-50">Amenities</td>
                {compareList.map(prop => (
                  <td key={prop.id} className="p-4 border-b border-gray-100">
                    <ul className="space-y-2 text-sm text-gray-600">
                      {prop.features?.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check size={14} className="text-green-500 mt-0.5" />
                          {f}
                        </li>
                      )) || 'N/A'}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b border-gray-100 font-bold text-gray-700 bg-gray-50">Action</td>
                {compareList.map(prop => (
                  <td key={prop.id} className="p-4 border-b border-gray-100">
                    <Link to={`/property/${prop.id}`} className="block w-full py-3 text-center bg-[#1a1a2e] text-white rounded-lg hover:bg-[#2a2a3e] transition-colors font-bold text-sm">
                      View Details
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
