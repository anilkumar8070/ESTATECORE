import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  BedDouble, 
  Bath, 
  Square, 
  Wifi, 
  Building, 
  Layers, 
  Compass, 
  CheckCircle, 
  Share2, 
  Heart, 
  Star, 
  Calendar, 
  MessageSquare, 
  ShoppingBag, 
  X, 
  Clock, 
  Users, 
  CheckCircle2,
  ArrowLeftRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { propertyService } from '../services/propertyService';
import { motion, AnimatePresence } from 'framer-motion';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleStep, setScheduleStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [persons, setPersons] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useAuth();

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('estatecore_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [compare, setCompare] = useState(() => {
    const saved = localStorage.getItem('estatecore_compare');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('estatecore_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('estatecore_compare', JSON.stringify(compare));
  }, [compare]);

  const toggleWishlist = () => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(itemId => itemId !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const toggleCompare = () => {
    if (compare.includes(id)) {
      setCompare(compare.filter(itemId => itemId !== id));
    } else {
      setCompare([...compare, id]);
    }
  };

  useEffect(() => {
    const fetchPropertyAndReviews = async () => {
      try {
        setLoading(true);
        const data = await propertyService.getPropertyById(id);
        setProperty(data);

        // Fetch real reviews
        const q = query(collection(db, 'reviews'), where('propertyId', '==', id));
        const querySnapshot = await getDocs(q);
        const fetchedReviews = querySnapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Failed to fetch property details or reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyAndReviews();
  }, [id]);

  const resetSchedule = () => {
    setIsScheduleOpen(false);
    setTimeout(() => {
      setScheduleStep(1);
      setSelectedDate(null);
      setSelectedTime(null);
      setPersons(1);
    }, 300);
  };

  const handleBuyProperty = async () => {
    try {
      if (!currentUser) {
        alert("Please sign in to buy a property.");
        return;
      }
      await addDoc(collection(db, 'buyRequests'), {
        propertyId: property._id,
        propertyTitle: property.title,
        userId: currentUser.uid,
        userName: currentUser.fullName || currentUser.email,
        userEmail: currentUser.email,
        message: `I am interested in buying ${property.title}`,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      alert('Buy request submitted successfully!');
    } catch (error) {
      console.error('Failed to submit buy request:', error);
      alert('Failed to submit buy request');
    }
  };

  const handleSubmitReview = async () => {
    try {
      if (!reviewComment.trim()) return alert("Please enter a review comment.");
      if (!currentUser) return alert("Please sign in to leave a review.");
      
      const newReview = {
        propertyId: property._id,
        propertyTitle: property.title,
        userId: currentUser.uid,
        userName: currentUser.fullName || currentUser.email,
        rating: reviewRating,
        comment: reviewComment,
        createdAt: new Date().toISOString()
      };
      
      const docRef = await addDoc(collection(db, 'reviews'), newReview);
      setReviews([{ _id: docRef.id, ...newReview }, ...reviews]);
      alert('Review submitted successfully!');
      setReviewComment('');
      setReviewRating(5);
    } catch (error) {
      console.error('Failed to submit review:', error);
      alert('Failed to submit review');
    }
  };

  const handleConfirmVisit = async () => {
    try {
      if (!currentUser) return alert("Please sign in to schedule a visit.");
      
      let parsedDate = new Date().toISOString();
      
      await addDoc(collection(db, 'visits'), {
        propertyId: property._id,
        propertyTitle: property.title,
        userId: currentUser.uid,
        userName: currentUser.fullName || currentUser.email,
        date: parsedDate,
        time: selectedTime,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      });
      setScheduleStep(4);
    } catch (error) {
      console.error('Failed to confirm visit:', error);
      alert('Failed to schedule visit');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-gold animate-spin"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3] text-gray-500">
        Property not found.
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen text-gray-900 bg-transparent pb-20"
    >
      {/* Hero Header */}
      <div className="relative h-[450px] md:h-[600px] w-full flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img 
            src={property.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"} 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay for visual hierarchy */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Fades cleanly to layout bg color (#f3f3f3) at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#f3f3f3]"></div>
        </div>

        {/* Top Navbar Overlay (On top of hero image) */}
        <div className="absolute top-0 left-0 w-full px-6 md:px-10 py-6 flex justify-between items-center z-50">
          <button 
            onClick={() => navigate(-1)} 
            className="bg-black/35 hover:bg-black/60 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full text-white hover:text-[#c5a059] transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
          >
            &larr; Back to Listings
          </button>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleCompare}
              className={`backdrop-blur-md border border-white/10 p-3 rounded-full transition-all ${
                compare.includes(id) ? 'bg-gold/90 text-prime' : 'bg-black/35 hover:bg-black/60 text-white hover:text-[#c5a059]'
              }`}
              title="Compare Property"
            >
              <ArrowLeftRight size={18} />
            </button>
            <button className="bg-black/35 hover:bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-full text-white hover:text-[#c5a059] transition-all" title="Share Property">
              <Share2 size={18} />
            </button>
            <button 
              onClick={toggleWishlist}
              className="bg-black/35 hover:bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-full transition-all" 
              title={wishlist.includes(id) ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart size={18} className={wishlist.includes(id) ? 'fill-red-500 text-red-500' : 'text-white hover:text-red-400'} />
            </button>
          </div>
        </div>
        
        <div className="relative z-10 max-w-5xl px-6 flex flex-col items-center mt-10">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg leading-tight">
            {property.title}
          </h1>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#c5a059] drop-shadow-md">
            Price: ${property.price.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Main Content Grid - 2 Columns (Main + Sidebar) */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 relative z-10 -mt-10">
        
        {/* LEFT/MAIN COLUMN: All Content */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            {/* Main Large Image */}
            <div className="w-full h-[400px] md:h-[550px] rounded-[2.5rem] overflow-hidden shadow-xl border border-white z-10 group relative">
              <img 
                src={property.imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800"} 
                alt="Main" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
              />
            </div>
            
            {/* 4 Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=400",
                "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=400"
              ].map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-3xl overflow-hidden border border-white shadow-sm group relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                  <img 
                    src={img} 
                    alt={`Thumb ${i}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out cursor-pointer" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <h3 className="text-2xl font-black text-gray-900 mb-8 tracking-tight">Property Overview</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-[#c5a059]/10 rounded-2xl flex items-center justify-center mb-1"><Layers className="text-[#c5a059]" size={22} /></div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Floors</span>
                <span className="font-black text-gray-900 text-2xl">32</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-[#c5a059]/10 rounded-2xl flex items-center justify-center mb-1"><Square className="text-[#c5a059]" size={22} /></div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Square Feet</span>
                <span className="font-black text-gray-900 text-2xl">{property.area ? property.area.toLocaleString() : 'N/A'}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-[#c5a059]/10 rounded-2xl flex items-center justify-center mb-1"><Building className="text-[#c5a059]" size={22} /></div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Zoning</span>
                <span className="font-black text-gray-900 text-2xl">Comm.</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-12 h-12 bg-[#c5a059]/10 rounded-2xl flex items-center justify-center mb-1"><Compass className="text-[#c5a059]" size={22} /></div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Year Built</span>
                <span className="font-black text-gray-900 text-2xl">2023</span>
              </div>
            </div>
            
            <div className="h-px w-full bg-gradient-to-r from-gray-100 via-gray-50 to-transparent my-10"></div>
            
            <h4 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Key Amenities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6">
               <div className="flex items-center gap-3 text-base text-gray-600 font-medium">
                 <CheckCircle size={18} className="text-[#c5a059]" /> Modern Lobby
               </div>
               <div className="flex items-center gap-3 text-base text-gray-600 font-medium">
                 <Wifi size={18} className="text-[#c5a059]" /> Fiber Internet
               </div>
               <div className="flex items-center gap-3 text-base text-gray-600 font-medium">
                 <Building size={18} className="text-[#c5a059]" /> Multi-level parking
               </div>
               <div className="flex items-center gap-3 text-base text-gray-600 font-medium">
                 <CheckCircle size={18} className="text-[#c5a059]" /> 24/7 Security
               </div>
               <div className="flex items-center gap-3 text-base text-gray-600 font-medium">
                 <CheckCircle size={18} className="text-[#c5a059]" /> Fitness Center
               </div>
               <div className="flex items-center gap-3 text-base text-gray-600 font-medium">
                 <CheckCircle size={18} className="text-[#c5a059]" /> Smart Elevators
               </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">About this property</h3>
            <p className="text-base text-gray-600 leading-relaxed font-medium whitespace-pre-line">
              {property.title} is a premium placement building, stellar location, and maximum conveniences in vibrant spots in prosperous fast growth areas. Experience unparalleled amenities located in the prestigious area of {property.location}.
              
              Featuring high-end finishes, an open-concept space, and breathtaking views. Every detail has been meticulously crafted to offer a lifestyle of absolute sophistication and tranquility. The architectural brilliance seamlessly integrates indoor and outdoor living, making it an ideal space for modern commercial enterprises.
            </p>
          </div>

          {/* Floor Plan & Map Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Floor Plan</h3>
              <div className="border border-gray-100 rounded-[2.5rem] p-6 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center justify-center aspect-[4/3] w-full">
                <img 
                  src={property.floorPlanUrl || "/floorplan.png"} 
                  alt="Floor Plan" 
                  className="w-full h-full object-contain bg-white rounded-2xl" 
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Location</h3>
              <div className="w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-gray-100 relative group shadow-[0_4px_20px_rgba(0,0,0,0.02)] bg-gray-50">
                <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">Loading map...</div>
                <iframe 
                  title="Property Location"
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  style={{ border: 0, position: 'relative', zIndex: 10 }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Property Reviews */}
          <div className="pt-4">
            <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Property Reviews</h3>
            <div className="flex items-center gap-2 mb-8">
              <div className="flex text-[#c5a059]">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" opacity={0.5} />
              </div>
              <span className="text-gray-500 font-bold text-sm">{property.rating || '4.8'} out of 5 ({property.reviews || '12'} reviews)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {reviews.map(review => (
                <div key={review._id} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-gold/10 text-gold rounded-full flex items-center justify-center font-bold text-base shadow-sm uppercase">
                        {review.userName ? review.userName.charAt(0) : 'U'}
                      </div>
                      <div>
                        <p className="text-gray-950 font-bold text-sm">{review.userName || 'Unknown User'}</p>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-[#c5a059]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "fill-[#c5a059]" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm font-medium leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              ))}
              
              {reviews.length === 0 && (
                <div className="col-span-full py-8 text-center text-gray-400 font-medium">
                  No reviews yet. Be the first to review!
                </div>
              )}
            </div>

            {/* Leave a Review Form */}
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h4 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Leave a Review</h4>
              <p className="text-xs text-gray-500 mb-8 font-medium">Share your thoughts after visiting this property to help other buyers.</p>
              
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">How would you rate your visit?</label>
                <div className="flex gap-2 text-gray-300">
                  {[1,2,3,4,5].map(star => (
                    <Star 
                      key={star} 
                      size={24} 
                      onClick={() => setReviewRating(star)}
                      className={`cursor-pointer transition-colors ${reviewRating >= star ? 'fill-[#c5a059] text-[#c5a059]' : 'hover:text-[#c5a059]'}`} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Your Review</label>
                <textarea 
                  rows="4" 
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-5 text-gray-800 focus:outline-none focus:border-[#c5a059]/50 focus:ring-1 focus:ring-[#c5a059]/50 transition-all resize-none text-sm placeholder:text-gray-400 font-medium"
                  placeholder="Tell us what you liked or disliked about the property after your visit..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={handleSubmitReview}
                  className="bg-prime hover:bg-gold text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>

          {/* Nearby & Similar Opportunities */}
          {/* Note: This section temporarily hidden until 'similar properties' endpoint is available */}



        </div>

        {/* RIGHT COLUMN: Action Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            
            {/* White Sidebar Card */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 pt-10 pb-8 px-8 relative">
              <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2 relative z-10">Secure Property</h3>
              <h2 className="text-prime font-black text-4xl xl:text-5xl mb-8 relative z-10 tracking-tight">
                ${property.price.toLocaleString()}
              </h2>

              <div className="space-y-4 border-b border-gray-150 pb-8 mb-8 relative z-10">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-500">Estimated Escrow Fee</span>
                  <span className="text-gray-900">${(property.price * 0.01).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-500">Estimated Closing Costs</span>
                  <span className="text-gray-900">${(property.price * 0.02).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8 relative z-10">
                <span className="text-gray-950 font-bold text-base">Projected Total</span>
                <span className="text-[#c5a059] font-black text-2xl">${(property.price * 1.03).toLocaleString()}</span>
              </div>

              <div className="space-y-4 relative z-10">
                <button 
                  onClick={handleBuyProperty}
                  className="w-full bg-prime hover:bg-gold text-white font-semibold py-4 rounded-2xl transition-all shadow-md text-base flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={18} />
                  Buy Property
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setIsScheduleOpen(true)}
                    className="w-full bg-gray-50 border border-gray-200 hover:border-gold/30 hover:bg-gold/5 text-prime font-bold py-3 rounded-2xl transition-all flex flex-col items-center justify-center gap-1"
                  >
                    <Calendar size={16} className="text-[#c5a059]" />
                    <span className="text-xs">Schedule Visit</span>
                  </button>
                  <button 
                    onClick={() => navigate('/user/chat', { state: { propertyContext: property } })}
                    className="w-full bg-gray-50 border border-gray-200 hover:border-gold/30 hover:bg-gold/5 text-prime font-bold py-3 rounded-2xl transition-all flex flex-col items-center justify-center gap-1"
                  >
                    <MessageSquare size={16} className="text-[#c5a059]" />
                    <span className="text-xs">Chat with Agent</span>
                  </button>
                </div>
              </div>

            </div>
            
          </div>
        </div>

      </div>

      {/* Schedule Visit Modal */}
      <AnimatePresence>
        {isScheduleOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={resetSchedule}
            />
            
            {/* Panel */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl z-10 text-gray-900"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                <h3 className="text-lg font-black text-gray-900">Schedule a Visit</h3>
                <button onClick={resetSchedule} className="text-gray-400 hover:text-prime transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {scheduleStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="text-center mb-8">
                      <Calendar className="w-12 h-12 text-[#c5a059] mx-auto mb-4" />
                      <h4 className="text-lg font-bold text-gray-950">Select a Date</h4>
                      <p className="text-xs text-gray-500 mt-1">When would you like to visit?</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {['Today', 'Tomorrow', 'June 10', 'June 11', 'June 12', 'June 13'].map((date, i) => (
                        <button 
                          key={i} 
                          onClick={() => setSelectedDate(date)}
                          className={`py-3 rounded-2xl border transition-all text-xs font-semibold ${selectedDate === date ? 'bg-[#c5a059]/15 border-[#c5a059] text-[#c5a059]' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-100'}`}
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                    <button 
                      disabled={!selectedDate}
                      onClick={() => setScheduleStep(2)}
                      className="w-full mt-6 bg-prime hover:bg-gold text-white font-bold py-3.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
                    >
                      Continue
                    </button>
                  </motion.div>
                )}

                {scheduleStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="text-center mb-8">
                      <Clock className="w-12 h-12 text-[#c5a059] mx-auto mb-4" />
                      <h4 className="text-lg font-bold text-gray-950">Select a Time</h4>
                      <p className="text-xs text-gray-500 mt-1">Available slots for {selectedDate}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {['10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'].map((time, i) => (
                        <button 
                          key={i} 
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-2xl border transition-all text-xs font-semibold ${selectedTime === time ? 'bg-[#c5a059]/15 border-[#c5a059] text-[#c5a059]' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-100'}`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setScheduleStep(1)} className="w-1/3 bg-gray-100 text-gray-800 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors text-sm">Back</button>
                      <button 
                        disabled={!selectedTime}
                        onClick={() => setScheduleStep(3)}
                        className="w-2/3 bg-prime hover:bg-gold text-white font-bold py-3.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md text-sm"
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
                      <h4 className="text-lg font-bold text-gray-950">Who is coming?</h4>
                      <p className="text-xs text-gray-500 mt-1">How many people will attend the visit?</p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-6 py-6 bg-gray-50 border border-gray-150 rounded-2xl">
                      <button 
                        onClick={() => setPersons(Math.max(1, persons - 1))}
                        className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-700 text-lg flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
                      >-</button>
                      <span className="text-3xl font-black text-gray-900 w-12 text-center">{persons}</span>
                      <button 
                        onClick={() => setPersons(Math.min(10, persons + 1))}
                        className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-700 text-lg flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
                      >+</button>
                    </div>

                    <div className="flex gap-3 mt-8">
                      <button onClick={() => setScheduleStep(2)} className="w-1/3 bg-gray-100 text-gray-800 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors text-sm">Back</button>
                      <button 
                        onClick={handleConfirmVisit}
                        className="w-2/3 bg-prime hover:bg-gold text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-sm"
                      >
                        Confirm Visit
                      </button>
                    </div>
                  </motion.div>
                )}

                {scheduleStep === 4 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 mb-2">Visit Scheduled!</h4>
                    <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto">
                      You are all set for <span className="text-[#c5a059] font-bold">{selectedDate}</span> at <span className="text-[#c5a059] font-bold">{selectedTime}</span> for {persons} person(s).
                    </p>
                    <button 
                      onClick={resetSchedule}
                      className="w-full bg-prime hover:bg-gold text-white font-bold py-3.5 rounded-xl transition-colors shadow-md text-sm"
                    >
                      Done
                    </button>
                  </motion.div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
