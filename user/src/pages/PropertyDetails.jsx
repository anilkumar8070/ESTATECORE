import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, BedDouble, Bath, Square, Wifi, Building, AlignCenterVertical, Layers, Compass, CheckCircle, Share2, Heart, Star, Calendar, MessageSquare, ShoppingBag, X, Clock, Users, CheckCircle2 } from 'lucide-react';
import { properties } from '../data/dummy';
import { motion } from 'framer-motion';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const property = properties.find(p => p.id === Number(id)) || properties[0];

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleStep, setScheduleStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [persons, setPersons] = useState(1);

  const resetSchedule = () => {
    setIsScheduleOpen(false);
    setTimeout(() => {
      setScheduleStep(1);
      setSelectedDate(null);
      setSelectedTime(null);
      setPersons(1);
    }, 300);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen text-[#f5f5f5] bg-transparent pb-20"
    >
      {/* Hero Header */}
      <div className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img 
            src={property.image} 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Gradient to darken top for nav overlay, and bottom for seamless blend */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]"></div>
        </div>

        {/* Top Navbar Overlay (On top of hero image) */}
        <div className="absolute top-0 left-0 w-full px-6 md:px-10 py-6 flex justify-between items-center z-50">
          <button onClick={() => navigate(-1)} className="bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full text-white hover:text-[#c5a059] transition-all flex items-center gap-2 text-sm font-medium">
            &larr; Back to Listings
          </button>
          <div className="flex items-center gap-4">
            <button className="bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-full text-white hover:text-[#c5a059] transition-all" title="Share Property">
              <Share2 size={20} />
            </button>
            <button className="bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-full text-white hover:text-red-400 transition-all" title="Save to Wishlist">
              <Heart size={20} />
            </button>
          </div>
        </div>
        
        <div className="relative z-10 max-w-5xl px-6 flex flex-col items-center mt-10">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4 tracking-tight drop-shadow-xl">
            {property.title}
          </h1>
          <h2 className="text-2xl md:text-4xl font-semibold text-[#c5a059] drop-shadow-lg">
            Price: ${property.price.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Main Content Grid - 2 Columns (Main + Sidebar) */}
      <div className="max-w-[1400px] mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 relative z-10">
        
        {/* LEFT/MAIN COLUMN: All Content */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            {/* Main Large Image */}
            <div className="w-full h-[400px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group relative">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
              <img src={property.image} alt="Main" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000 ease-out" />
            </div>
            
            {/* 4 Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=400"
              ].map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group relative">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                  <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
            
          {/* Specifications Grid */}
          <div className="bg-[#111]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10 shadow-lg">
            <h3 className="text-3xl font-bold text-[#f5f5f5] mb-8 tracking-tight">Property Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-[#c5a059]/10 rounded-xl flex items-center justify-center mb-1"><Layers className="text-[#c5a059]" size={24} /></div>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Floors</span>
                <span className="font-bold text-white text-2xl">32</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-[#c5a059]/10 rounded-xl flex items-center justify-center mb-1"><Square className="text-[#c5a059]" size={24} /></div>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Square Feet</span>
                <span className="font-bold text-white text-2xl">{property.sqft || '150,000'}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-[#c5a059]/10 rounded-xl flex items-center justify-center mb-1"><Building className="text-[#c5a059]" size={24} /></div>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Zoning</span>
                <span className="font-bold text-white text-2xl">Comm.</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-[#c5a059]/10 rounded-xl flex items-center justify-center mb-1"><Compass className="text-[#c5a059]" size={24} /></div>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Year Built</span>
                <span className="font-bold text-white text-2xl">2023</span>
              </div>
            </div>
            
            <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent my-10"></div>
            
            <h4 className="text-xl font-semibold text-[#f5f5f5] mb-6 tracking-tight">Key Amenities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6">
               <div className="flex items-center gap-3 text-base text-gray-300">
                 <CheckCircle size={20} className="text-[#c5a059]" /> Modern Lobby
               </div>
               <div className="flex items-center gap-3 text-base text-gray-300">
                 <Wifi size={20} className="text-[#c5a059]" /> Fiber Internet
               </div>
               <div className="flex items-center gap-3 text-base text-gray-300">
                 <Building size={20} className="text-[#c5a059]" /> Multi-level parking
               </div>
               <div className="flex items-center gap-3 text-base text-gray-300">
                 <CheckCircle size={20} className="text-[#c5a059]" /> 24/7 Security
               </div>
               <div className="flex items-center gap-3 text-base text-gray-300">
                 <CheckCircle size={20} className="text-[#c5a059]" /> Fitness Center
               </div>
               <div className="flex items-center gap-3 text-base text-gray-300">
                 <CheckCircle size={20} className="text-[#c5a059]" /> Smart Elevators
               </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-3xl font-bold text-[#f5f5f5] mb-6 tracking-tight">About this property</h3>
            <p className="text-lg text-gray-300 leading-relaxed font-light whitespace-pre-line">
              {property.title} is a premium placement building, stellar location, and maximum conveniences in vibrant spots in prosperous fast growth areas. Experience unparalleled amenities located in the prestigious area of {property.location}.
              
              Featuring high-end finishes, an open-concept space, and breathtaking views. Every detail has been meticulously crafted to offer a lifestyle of absolute sophistication and tranquility. The architectural brilliance seamlessly integrates indoor and outdoor living, making it an ideal space for modern commercial enterprises.
            </p>
          </div>

          {/* Floor Plan & Map Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-[#f5f5f5] tracking-tight">Floor Plan</h3>
              <div className="border border-white/5 rounded-3xl p-4 bg-[#111]/50 backdrop-blur-sm shadow-sm flex items-center justify-center aspect-[4/3] w-full">
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Floor Plan" className="w-full h-full object-cover opacity-40 mix-blend-screen rounded-2xl" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-[#f5f5f5] tracking-tight">Location</h3>
              <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/5 relative group shadow-lg">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Map" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-[#c5a059]/20 rounded-full flex items-center justify-center animate-pulse">
                    <MapPin size={36} className="text-[#c5a059] drop-shadow-[0_0_15px_rgba(197,160,89,0.5)]" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Reviews */}
          <div className="pt-6 mt-4">
            <h3 className="text-3xl font-bold text-[#f5f5f5] mb-2 tracking-tight">Property Reviews</h3>
            <div className="flex items-center gap-2 mb-8">
              <div className="flex text-[#c5a059]">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" opacity={0.5} />
              </div>
              <span className="text-gray-400 font-medium">{property.rating || '4.8'} out of 5 ({property.reviews || '12'} reviews from site visits)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {/* Dummy Review 1 */}
              <div className="bg-[#111]/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-[#c5a059] to-[#e8c87e] rounded-full flex items-center justify-center text-black font-bold text-lg shadow-sm">
                      SM
                    </div>
                    <div>
                      <p className="text-[#f5f5f5] font-medium">Sarah Miller</p>
                      <p className="text-xs text-gray-500">Visited 2 weeks ago</p>
                    </div>
                  </div>
                  <div className="flex text-[#c5a059]">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "Absolutely stunning property. The natural light is even better than the photos. The agent was very professional during our tour. Highly considering making an offer."
                </p>
              </div>

              {/* Dummy Review 2 */}
              <div className="bg-[#111]/40 backdrop-blur-md border border-white/5 p-6 rounded-3xl shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-[#222] border border-white/10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      JD
                    </div>
                    <div>
                      <p className="text-[#f5f5f5] font-medium">James Davis</p>
                      <p className="text-xs text-gray-500">Visited 1 month ago</p>
                    </div>
                  </div>
                  <div className="flex text-[#c5a059]">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="transparent" />
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "Great location and solid construction. The layout is very practical. However, the parking situation might be a bit tight for a larger team. Still a top contender for us."
                </p>
              </div>
            </div>

            {/* Leave a Review Form */}
            <div className="bg-[#111]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              <h4 className="text-2xl font-bold text-[#f5f5f5] mb-2 tracking-tight">Leave a Review</h4>
              <p className="text-sm text-gray-400 mb-8 font-light">Share your thoughts after visiting this property to help other buyers.</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">How would you rate your visit?</label>
                <div className="flex gap-2 text-gray-600">
                  <Star size={28} className="hover:text-[#c5a059] cursor-pointer transition-colors" />
                  <Star size={28} className="hover:text-[#c5a059] cursor-pointer transition-colors" />
                  <Star size={28} className="hover:text-[#c5a059] cursor-pointer transition-colors" />
                  <Star size={28} className="hover:text-[#c5a059] cursor-pointer transition-colors" />
                  <Star size={28} className="hover:text-[#c5a059] cursor-pointer transition-colors" />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-3">Your Review</label>
                <textarea 
                  rows="4" 
                  className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-2xl p-5 text-[#f5f5f5] focus:outline-none focus:border-[#c5a059]/50 focus:ring-1 focus:ring-[#c5a059]/50 transition-all resize-none text-sm placeholder:text-gray-600"
                  placeholder="Tell us what you liked or disliked about the property after your visit..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button className="bg-gradient-to-r from-[#c5a059] to-[#e8c87e] text-black font-semibold py-3.5 px-8 rounded-xl hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all hover:-translate-y-0.5">
                  Submit Review
                </button>
              </div>
            </div>
          </div>

          {/* Nearby & Similar Opportunities */}
          <div>
            <h3 className="text-3xl font-bold text-[#f5f5f5] mb-8 tracking-tight">Similar Opportunities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               {properties.slice(0, 3).map((p, idx) => (
                 <div key={idx} className="border border-white/10 rounded-3xl overflow-hidden bg-[#111]/60 backdrop-blur-md shadow-lg cursor-pointer hover:border-[#c5a059]/30 hover:-translate-y-2 transition-all">
                   <div className="h-40 w-full bg-[#111]">
                     <img src={p.image} alt={p.title} className="w-full h-full object-cover opacity-80" />
                   </div>
                   <div className="p-5">
                     <p className="text-base font-semibold text-[#f5f5f5] truncate">{p.title}</p>
                     <p className="text-sm text-gray-400 flex items-center gap-1 mt-2 font-light">
                       <MapPin size={14} className="text-[#c5a059]" /> {p.location}
                     </p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Action Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 relative">
            
            {/* Dark Card */}
            <div className="bg-[#111]/90 backdrop-blur-3xl rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-white/10 pt-10 pb-8 px-8 relative mt-2">
              
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#c5a059]/10 rounded-full blur-[60px]"></div>

              {/* Badge Removed per request */}

              <h3 className="text-gray-400 font-medium text-sm mb-2 relative z-10 uppercase tracking-widest">Secure Property</h3>
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-[#e8c87e] font-bold text-4xl xl:text-5xl mb-8 relative z-10 tracking-tight">
                ${property.price.toLocaleString()}
              </h2>

              <div className="space-y-5 border-b border-white/5 pb-8 mb-8 relative z-10">
                <div className="flex justify-between items-center text-base">
                  <span className="text-gray-400 font-light">Estimated Escrow Fee</span>
                  <span className="text-[#f5f5f5] font-medium">${(property.price * 0.01).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-base">
                  <span className="text-gray-400 font-light">Estimated Closing Costs</span>
                  <span className="text-[#f5f5f5] font-medium">${(property.price * 0.02).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-10 relative z-10">
                <span className="text-white font-semibold text-lg">Projected Total</span>
                <span className="text-[#c5a059] font-bold text-2xl">${(property.price * 1.03).toLocaleString()}</span>
              </div>

              <div className="space-y-4 relative z-10">
                <button className="w-full bg-gradient-to-r from-[#c5a059] to-[#e8c87e] text-black font-semibold py-4 rounded-2xl hover:shadow-[0_0_25px_rgba(197,160,89,0.5)] transition-all transform hover:-translate-y-1 text-lg flex items-center justify-center gap-2">
                  <ShoppingBag size={20} />
                  Buy Property
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setIsScheduleOpen(true)}
                    className="w-full bg-transparent border-2 border-white/10 hover:border-[#c5a059]/50 hover:bg-[#c5a059]/10 text-[#f5f5f5] font-semibold py-3 rounded-2xl transition-all flex flex-col items-center justify-center gap-1"
                  >
                    <Calendar size={18} className="text-[#c5a059]" />
                    <span className="text-sm">Schedule Visit</span>
                  </button>
                  <button 
                    onClick={() => navigate('/chat')}
                    className="w-full bg-transparent border-2 border-white/10 hover:border-[#c5a059]/50 hover:bg-[#c5a059]/10 text-[#f5f5f5] font-semibold py-3 rounded-2xl transition-all flex flex-col items-center justify-center gap-1"
                  >
                    <MessageSquare size={18} className="text-[#c5a059]" />
                    <span className="text-sm">Chat with Agent</span>
                  </button>
                </div>
              </div>

            </div>
            
          </div>
        </div>

      </div>

      {/* Schedule Visit Modal */}
      {isScheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={resetSchedule}></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-[#1a1a1a]/50">
              <h3 className="text-xl font-bold text-[#f5f5f5]">Schedule a Visit</h3>
              <button onClick={resetSchedule} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {scheduleStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-8">
                    <Calendar className="w-12 h-12 text-[#c5a059] mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white">Select a Date</h4>
                    <p className="text-sm text-gray-400 mt-1">When would you like to visit?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['Today', 'Tomorrow', 'June 10', 'June 11', 'June 12', 'June 13'].map((date, i) => (
                      <button 
                        key={i} 
                        onClick={() => setSelectedDate(date)}
                        className={`py-3 rounded-xl border transition-all text-sm font-medium ${selectedDate === date ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059]' : 'bg-[#0a0a0a] border-white/5 text-gray-300 hover:border-white/20'}`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                  <button 
                    disabled={!selectedDate}
                    onClick={() => setScheduleStep(2)}
                    className="w-full mt-6 bg-gradient-to-r from-[#c5a059] to-[#e8c87e] text-black font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Continue
                  </button>
                </motion.div>
              )}

              {scheduleStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-8">
                    <Clock className="w-12 h-12 text-[#c5a059] mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white">Select a Time</h4>
                    <p className="text-sm text-gray-400 mt-1">Available slots for {selectedDate}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'].map((time, i) => (
                      <button 
                        key={i} 
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-xl border transition-all text-sm font-medium ${selectedTime === time ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#c5a059]' : 'bg-[#0a0a0a] border-white/5 text-gray-300 hover:border-white/20'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button onClick={() => setScheduleStep(1)} className="w-1/3 bg-[#222] text-white font-bold py-3.5 rounded-xl hover:bg-[#333] transition-colors">Back</button>
                    <button 
                      disabled={!selectedTime}
                      onClick={() => setScheduleStep(3)}
                      className="w-2/3 bg-gradient-to-r from-[#c5a059] to-[#e8c87e] text-black font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {scheduleStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="text-center mb-8">
                    <Users className="w-12 h-12 text-[#c5a059] mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white">Who is coming?</h4>
                    <p className="text-sm text-gray-400 mt-1">How many people will attend the visit?</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 py-6 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                    <button 
                      onClick={() => setPersons(Math.max(1, persons - 1))}
                      className="w-12 h-12 rounded-full bg-[#222] text-white text-xl flex items-center justify-center hover:bg-[#c5a059] hover:text-black transition-colors"
                    >-</button>
                    <span className="text-4xl font-bold text-white w-12 text-center">{persons}</span>
                    <button 
                      onClick={() => setPersons(Math.min(10, persons + 1))}
                      className="w-12 h-12 rounded-full bg-[#222] text-white text-xl flex items-center justify-center hover:bg-[#c5a059] hover:text-black transition-colors"
                    >+</button>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button onClick={() => setScheduleStep(2)} className="w-1/3 bg-[#222] text-white font-bold py-3.5 rounded-xl hover:bg-[#333] transition-colors">Back</button>
                    <button 
                      onClick={() => setScheduleStep(4)}
                      className="w-2/3 bg-gradient-to-r from-[#c5a059] to-[#e8c87e] text-black font-bold py-3.5 rounded-xl transition-all"
                    >
                      Confirm Visit
                    </button>
                  </div>
                </motion.div>
              )}

              {scheduleStep === 4 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Visit Scheduled!</h4>
                  <p className="text-gray-400 mb-8">
                    You are all set for <span className="text-[#c5a059] font-medium">{selectedDate}</span> at <span className="text-[#c5a059] font-medium">{selectedTime}</span> for {persons} person(s).
                  </p>
                  <button 
                    onClick={resetSchedule}
                    className="w-full bg-[#222] text-white font-bold py-3.5 rounded-xl hover:bg-[#333] transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      )}

    </motion.div>
  );
}
