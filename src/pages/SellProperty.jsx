import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Video, 
  MapPin, 
  Upload, 
  IndianRupee, 
  Maximize2, 
  Info,
  CheckCircle2,
  X,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Home,
  ShieldCheck,
  Building,
  Trash2
} from 'lucide-react';

const SellProperty = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    price: '',
    location: '',
    description: '',
    images: [],
    video: null
  });

  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        video: {
          file,
          preview: URL.createObjectURL(file)
        }
      }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const categories = [
    { name: "Residential", icon: <Home size={20} />, sub: ["Villa", "Apartment", "Penthouse"] },
    { name: "Commercial", icon: <Building size={20} />, sub: ["Shop", "Office", "Showroom"] },
    { name: "Land/Plots", icon: <MapPin size={20} />, sub: ["Industrial", "Residential Plot"] }
  ];

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8 bg-gray-50 p-12 rounded-[3rem] border border-gray-100 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full"></div>
          <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl font-light text-black tracking-tight">Listing <span className="italic">Reviewing</span></h2>
            <p className="text-gray-500 leading-relaxed">Your property details have been received. Our luxury verification team will review and publish your listing within 24 hours.</p>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-black text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all duration-300"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 overflow-hidden relative">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] -ml-64 -mt-64 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] -mr-64 -mb-64 rounded-full"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block"
          >
            Sell with EstateCore
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-light tracking-tighter leading-tight text-black"
          >
            List Your <span className="italic font-extralight text-gray-400">Masterpiece</span>
          </motion.h1>
          <p className="mt-6 text-gray-500 leading-relaxed">
            Reach high-net-worth investors and home-seekers through our global premium network.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs relative z-10 transition-all duration-500 border-2 ${
                  step >= num ? 'bg-gold border-gold text-white shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'bg-white border-gray-200 text-gray-300'
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {['Inquiry', 'Gallery', 'Finish'].map((label, i) => (
              <span key={label} className={`text-[9px] font-bold uppercase tracking-[0.2em] ${step > i ? 'text-black' : 'text-gray-400'}`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-gray-50 p-8 md:p-16 rounded-[3.5rem] border border-gray-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl -mr-32 -mt-32 rounded-full"></div>
          
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Property Vision</label>
                        <h3 className="text-2xl font-light">What are you listing?</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {categories.map((cat) => (
                          <button
                            key={cat.name}
                            type="button"
                            onClick={() => setFormData({...formData, category: cat.name})}
                            className={`flex items-center p-6 rounded-3xl border transition-all duration-300 group ${
                              formData.category === cat.name 
                              ? 'bg-gold/10 border-gold border-2' 
                              : 'bg-white border-gray-100 hover:border-black/10 hover:shadow-lg'
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-6 transition-colors ${
                              formData.category === cat.name ? 'bg-gold text-white' : 'bg-gray-100 text-gray-400 group-hover:text-black'
                            }`}>
                              {cat.icon}
                            </div>
                            <div className="text-left">
                              <p className={`font-bold uppercase tracking-widest text-[10px] ${formData.category === cat.name ? 'text-gold' : 'text-gray-400'}`}>Category</p>
                              <p className="text-lg font-light text-black">{cat.name}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Property Title</label>
                          <input 
                            type="text" 
                            className="w-full bg-white border border-gray-200 rounded-2xl p-5 focus:outline-none focus:border-gold transition-all text-black"
                            placeholder="e.g. Skyline Ocean Penthouse"
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Target Price</label>
                          <div className="relative">
                            <IndianRupee className="absolute left-5 top-1/2 -translate-y-1/2 text-gold" size={18} />
                            <input 
                              type="text" 
                              className="w-full bg-white border border-gray-200 rounded-2xl p-5 pl-12 focus:outline-none focus:border-gold transition-all text-black"
                              placeholder="4.50 Cr"
                              onChange={(e) => setFormData({...formData, price: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Location Area</label>
                          <div className="relative">
                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gold" size={18} />
                            <input 
                              type="text" 
                              className="w-full bg-white border border-gray-200 rounded-2xl p-5 pl-12 focus:outline-none focus:border-gold transition-all text-black"
                              placeholder="Worli, Mumbai"
                              onChange={(e) => setFormData({...formData, location: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-8">
                    <button 
                      type="button"
                      onClick={nextStep}
                      className="px-12 py-5 bg-black text-white rounded-2xl font-bold uppercase tracking-[0.2em] flex items-center space-x-3 hover:bg-gold transition-all duration-300 shadow-xl"
                    >
                      <span>Continue Gallery</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="text-center space-y-4 max-w-xl mx-auto">
                    <h3 className="text-3xl font-light text-black">Visual Identity</h3>
                    <p className="text-gray-500">High-resolution photography increases interest by 80%. Upload your best property captures.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center group hover:border-gold transition-all cursor-pointer relative overflow-hidden"
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        multiple 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                      />
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 group-hover:bg-gold group-hover:text-black transition-all">
                        <Camera size={32} />
                      </div>
                      <p className="font-bold text-sm tracking-widest uppercase mb-2 text-black">Primary Photos</p>
                      <p className="text-xs text-gray-400">Drag high-res files or click to browse</p>
                    </div>

                    <div 
                      onClick={() => videoInputRef.current?.click()}
                      className="bg-white border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center group hover:border-gold transition-all cursor-pointer relative overflow-hidden"
                    >
                      <input 
                        type="file" 
                        ref={videoInputRef} 
                        className="hidden" 
                        accept="video/*" 
                        onChange={handleVideoUpload} 
                      />
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 group-hover:bg-gold group-hover:text-black transition-all">
                        <Video size={32} />
                      </div>
                      <p className="font-bold text-sm tracking-widest uppercase mb-2 text-black">Cinematic Tour</p>
                      <p className="text-xs text-gray-400">Virtual walkthroughs increase listing engagement</p>
                      {formData.video && (
                         <div className="mt-4 text-xs text-gold font-bold">✓ Video Selected</div>
                      )}
                    </div>
                  </div>

                  {/* Image Previews */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                      {formData.images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100 shadow-sm">
                          <img src={img.preview} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                            className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between pt-8">
                    <button 
                      type="button"
                      onClick={prevStep}
                      className="px-10 py-5 bg-gray-100 text-black rounded-2xl font-bold uppercase tracking-[0.2em] flex items-center space-x-3 hover:bg-gray-200 transition-all font-bold"
                    >
                      <ArrowLeft size={18} />
                      <span>Back</span>
                    </button>
                    <button 
                      type="button"
                      onClick={nextStep}
                      className="px-12 py-5 bg-black text-white rounded-2xl font-bold uppercase tracking-[0.2em] flex items-center space-x-3 hover:bg-gold transition-all shadow-xl"
                    >
                      <span>Finalize Details</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Narrative</label>
                      <h3 className="text-2xl font-light text-black">Tell the story of your home</h3>
                    </div>
                    
                    <textarea 
                      rows="6"
                      className="w-full bg-white border border-gray-200 rounded-[2rem] p-8 focus:outline-none focus:border-gold transition-all resize-none text-lg font-light leading-relaxed text-black"
                      placeholder="Describe the architectural uniqueness, the neighborhood vibe, and the lifestyle this property offers..."
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    ></textarea>

                    <div className="p-8 bg-gold/5 border border-gold/10 rounded-3xl flex items-start space-x-6">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                        <ShieldCheck size={20} />
                      </div>
                      <div className="space-y-2">
                        <p className="font-bold text-sm tracking-widest uppercase text-black">Premium Verification</p>
                        <p className="text-xs text-gray-500 leading-relaxed">By listing, you agree to our exclusivity terms. Our curators will contact you for a private viewing before the listing goes live to our global investors.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-8">
                    <button 
                      type="button"
                      onClick={prevStep}
                      className="px-10 py-5 bg-gray-100 text-black rounded-2xl font-bold uppercase tracking-[0.2em] flex items-center space-x-3 hover:bg-gray-200 transition-all font-bold"
                    >
                      <ArrowLeft size={18} />
                      <span>Back</span>
                    </button>
                    <button 
                      type="submit"
                      className="px-14 py-5 bg-black text-white rounded-2xl font-bold uppercase tracking-[0.2em] flex items-center space-x-3 hover:bg-gold transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-95 transition-all"
                    >
                      <span>Publish Listing</span>
                      <CheckCircle2 size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellProperty;