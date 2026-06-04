import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Maximize2, BedDouble, Bath, IndianRupee, 
  CheckCircle2, Phone, MessageSquare, ArrowLeft, 
  Share2, Heart, Calendar, ShieldCheck, User, Info
} from 'lucide-react';
import { featuredProperties } from '../data/indianRealEstate';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const found = featuredProperties.find(p => p.id === parseInt(id));
    setProperty(found);
  }, [id]);

  if (!property) return <div className="pt-32 text-center">Loading Property Details...</div>;

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs / Back */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/properties" className="flex items-center space-x-2 text-gray-500 hover:text-black transition-colors font-medium">
            <ArrowLeft size={18} />
            <span>Back to Properties</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button className="p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
              <Share2 size={20} />
            </button>
            <button className="p-3 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
              <Heart size={20} />
            </button>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-8">
            <motion.div 
              layoutId={`property-image-${property.id}`}
              className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-2xl"
            >
              <img 
                src={property.gallery ? property.gallery[activeImage] : property.image} 
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute top-6 left-6 flex space-x-2">
                <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                  {property.subCategory}
                </span>
                {property.specifications?.status && (
                  <span className="bg-gold text-black text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest flex items-center space-x-1">
                    <ShieldCheck size={12} />
                    <span>{property.specifications.status}</span>
                  </span>
                )}
              </div>
            </motion.div>
            
            {/* Thumbnails */}
            {property.gallery && (
              <div className="grid grid-cols-4 gap-4 mt-6">
                {property.gallery.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-gold shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & Quick Action Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 sticky top-32">
              <div className="mb-8">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Asking Price</p>
                <div className="flex items-center text-4xl font-bold text-black tracking-tight">
                  <IndianRupee size={28} className="mr-1" />
                  <span>{property.price}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <BedDouble size={20} />
                    <span className="text-sm font-medium">Bedrooms</span>
                  </div>
                  <span className="font-bold">{property.beds} BHK</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Bath size={20} />
                    <span className="text-sm font-medium">Baths</span>
                  </div>
                  <span className="font-bold">{property.baths} Baths</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Maximize2 size={20} />
                    <span className="text-sm font-medium">Area</span>
                  </div>
                  <span className="font-bold">{property.sqft} sq.ft</span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-black text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-900 transition-all flex items-center justify-center space-x-3">
                  <MessageSquare size={18} />
                  <span>Inquire Now</span>
                </button>
                <button className="w-full bg-white text-black border-2 border-black/5 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center space-x-3 text-gold">
                  <Phone size={18} />
                  <span>Call Agent</span>
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={property.owner?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Listed by</p>
                    <p className="text-sm font-bold text-black">{property.owner?.name || "Premium Estates"}</p>
                    <p className="text-[10px] text-gold font-bold uppercase">{property.owner?.experience || "Elite Partner"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs / Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="space-y-12">
              {/* Title & Location */}
              <div>
                <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-4">
                  {property.title}
                </h1>
                <div className="flex items-center text-gray-500 font-medium">
                  <MapPin size={20} className="mr-2 text-gold" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-black mb-6">About this Property</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {property.description || "Discover luxury living at its finest. This property offers a perfect blend of comfort, style, and premium amenities. Located in one of the most sought-after neighborhoods, it provides both tranquility and accessibility to the city's key points."}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-bold text-black mb-8">Premium Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {(property.features || ["Smart Home", "Private Pool", "Gym", "Garden", "Security", "Parking"]).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications Table */}
              <div>
                <h3 className="text-xl font-bold text-black mb-8">Property Details</h3>
                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="p-6 border-b border-r border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Type</p>
                      <p className="font-bold text-black">{property.specifications?.type || property.subCategory}</p>
                    </div>
                    <div className="p-6 border-b border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Status</p>
                      <p className="font-bold text-black">{property.specifications?.status || "Ready to Move"}</p>
                    </div>
                    <div className="p-6 border-b border-r border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Year Built</p>
                      <p className="font-bold text-black">{property.specifications?.yearBuilt || "2023"}</p>
                    </div>
                    <div className="p-6 border-b border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Facing</p>
                      <p className="font-bold text-black">{property.specifications?.facing || "North East"}</p>
                    </div>
                    <div className="p-6 border-r border-gray-100">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Furnishing</p>
                      <p className="font-bold text-black">{property.specifications?.furnishing || "Semi-Furnished"}</p>
                    </div>
                    <div className="p-6">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Property ID</p>
                      <p className="font-bold text-black">ESC-{1000 + property.id}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chat Helper */}
              <div className="p-10 bg-[#0a0a0a] rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-gold/10 blur-[100px] -ml-32 -mt-32"></div>
                <div className="relative z-10 space-y-4">
                  <h4 className="text-3xl font-light tracking-tight">Interested in this <br /><span className="italic">extraordinary</span> space?</h4>
                  <p className="text-gray-400 text-sm max-w-sm">Connect directly with the owner to discuss negotiation and site visits.</p>
                </div>
                <div className="relative z-10 mt-8 md:mt-0 flex items-center space-x-4">
                  <button className="px-8 py-4 bg-white text-black rounded-2xl font-bold flex items-center space-x-3 hover:bg-gold transition-all">
                    <MessageSquare size={20} />
                    <span>Start Chat</span>
                  </button>
                  <button className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
                    <Info size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
