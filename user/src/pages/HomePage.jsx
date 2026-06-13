import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, Home, Building, MapPin, Search, ArrowRight,
  ArrowUpRight, Star, Menu, X, Building2, Landmark, Upload
} from 'lucide-react';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

const HomePage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState({ open: false, tab: 'login' });

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const [heroSearch, setHeroSearch] = useState({ location: '', type: 'Building', budget: 'Any' });

  const openAuth = (tab = 'login') => setAuthModal({ open: true, tab });
  const closeAuth = () => setAuthModal({ open: false, tab: 'login' });

  const transition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

  const bentoVariants = {
    hidden: { opacity: 0, y: 40 },
    show: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, ...transition }
    })
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-gray-900 font-sans selection:bg-gold selection:text-white">

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal.open}
        onClose={closeAuth}
        defaultTab={authModal.tab}
      />

      {/* ── Floating Navbar ── */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-6 py-3 flex items-center justify-between"
      >
        <div className="text-xl font-black tracking-tighter flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-prime text-gold rounded-full flex items-center justify-center">
            <Home size={16} />
          </div>
          ESTATE<span className="text-gold font-light">CORE</span>
        </div>

        <div className="hidden md:flex items-center space-x-1 bg-gray-100/50 p-1 rounded-full">
          {['Buy', 'Rent', 'Sell', 'Agents'].map((item, i) => (
            <button
              key={item}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${i === 0 ? 'bg-white shadow-sm text-prime' : 'text-gray-500 hover:text-prime hover:bg-white/50'}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openAuth('login')}
            className="hidden md:block text-sm font-bold text-gray-600 hover:text-prime transition-colors px-4"
          >
            Login
          </button>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
            <button
              onClick={() => openAuth('signup')}
              className="bg-prime text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-prime/20"
            >
              Sign Up
            </button>
          </motion.div>
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center bg-gray-100 text-prime rounded-full focus:outline-none hover:bg-gray-200 transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl flex flex-col p-6 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="text-xl font-black tracking-tighter flex items-center gap-2">
                <div className="w-8 h-8 bg-prime text-gold rounded-full flex items-center justify-center">
                  <Home size={16} />
                </div>
                ESTATE<span className="text-gold font-light">CORE</span>
              </div>
              <button
                className="w-10 h-10 flex items-center justify-center bg-gray-100 text-prime rounded-full focus:outline-none hover:bg-gray-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-6 text-3xl font-black mt-8">
              {['Buy', 'Rent', 'Sell', 'Agents'].map((item) => (
                <button key={item} className="text-left text-gray-900 hover:text-gold transition-colors">{item}</button>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-4">
              <button
                onClick={() => { setIsMenuOpen(false); openAuth('login'); }}
                className="text-center text-lg font-bold text-gray-600 hover:text-prime transition-colors py-3"
              >
                Login
              </button>
              <button
                onClick={() => { setIsMenuOpen(false); openAuth('signup'); }}
                className="text-center bg-prime text-white px-6 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-prime/20"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          HERO SECTION  (same as /user/dashboard)
      ══════════════════════════════════════════ */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 w-full mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-semibold tracking-widest uppercase mb-4 block">
              The standard of luxury
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
              Find Your Perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Future Property
              </span>
            </h1>
            <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto font-medium">
              Discover a curated selection of premium buildings, plots, and estates that match your lifestyle and investment goals.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={() => openAuth('signup')}
                className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center space-x-2 hover:bg-gold hover:text-white transition-all duration-300 shadow-xl"
              >
                <span>Explore Properties</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => openAuth('signup')}
                className="px-8 py-4 bg-black/30 backdrop-blur-md text-white border border-white/20 rounded-full font-bold flex items-center space-x-2 hover:bg-white hover:text-black transition-all duration-300"
              >
                <span>List Your Property</span>
                <Upload size={18} className="ml-1" />
              </button>
            </div>
          </motion.div>

          {/* Hero Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Tabs */}
            <div className="flex space-x-2 mb-4 justify-start">
              <button className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-t-2xl">
                Buy / Rent
              </button>
              <button className="px-6 py-2 bg-black/40 backdrop-blur-md text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest rounded-t-2xl transition-all">
                Sell
              </button>
            </div>

            <div className="bg-white p-2 rounded-2xl md:rounded-full md:rounded-tl-none shadow-2xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2">
              <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100">
                <MapPin className="text-gold w-5 h-5 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Where are you looking?"
                  value={heroSearch.location}
                  onChange={(e) => setHeroSearch({ ...heroSearch, location: e.target.value })}
                  className="w-full bg-transparent focus:outline-none text-gray-700 font-medium"
                />
              </div>
              <div className="flex-1 w-full flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100">
                <Building2 className="text-gold w-5 h-5 mr-3 shrink-0" />
                <select
                  value={heroSearch.type}
                  onChange={(e) => setHeroSearch({ ...heroSearch, type: e.target.value })}
                  className="w-full bg-transparent focus:outline-none text-gray-700 appearance-none cursor-pointer font-medium"
                >
                  <option value="Building">Type: Building</option>
                  <option value="Plot">Type: Plot</option>
                  <option value="Villa">Type: Villa</option>
                </select>
              </div>
              <div className="flex-1 w-full flex items-center px-4 py-2">
                <Landmark className="text-gold w-5 h-5 mr-3 shrink-0" />
                <select
                  value={heroSearch.budget}
                  onChange={(e) => setHeroSearch({ ...heroSearch, budget: e.target.value })}
                  className="w-full bg-transparent focus:outline-none text-gray-700 appearance-none cursor-pointer font-medium"
                >
                  <option value="Any">Budget: Any</option>
                  <option value="100k-500k">$100k – $500k</option>
                  <option value="500k-1M">$500k – $1M</option>
                  <option value="1M+">$1M+</option>
                </select>
              </div>
              {/* Search — opens auth modal for guests */}
              <button
                onClick={() => openAuth('login')}
                className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-xl md:rounded-full flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors"
              >
                <Search className="w-5 h-5" />
                <span className="font-bold">Search</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          BENTO GRID  (original home content)
      ════════════════════════════════════ */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 pt-16 md:pt-20">

        {/* Bento Hero Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-6 min-h-[600px]">

          {/* Main Panel */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={bentoVariants}
            className="md:col-span-8 md:row-span-2 bg-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-between border border-gray-100/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-gold/10 transition-colors duration-700" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full mb-8 border border-gray-100">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-gray-500">24 New Properties Today</span>
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] text-gray-900 mb-6">
                Discover <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-prime to-gray-500">Modern</span> Living.
              </h2>

              <p className="text-lg md:text-xl text-gray-500 max-w-md font-medium leading-relaxed">
                Elevate your lifestyle with our curated collection of premium real estate worldwide.
              </p>
            </div>

            <div className="relative z-10 mt-12 flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => openAuth('signup')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-prime text-white px-8 py-4 rounded-full font-bold flex items-center justify-between gap-4 group/btn"
              >
                <span>Explore Portfolio</span>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-prime transition-colors">
                  <ArrowUpRight size={18} />
                </div>
              </motion.button>

              <motion.button
                onClick={() => openAuth('login')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white border-2 border-gray-100 text-prime px-8 py-4 rounded-full font-bold hover:border-gray-200 transition-colors"
              >
                View Agents
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Panel */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={bentoVariants}
            className="md:col-span-4 md:row-span-1 bg-prime rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-center items-center text-center shadow-xl shadow-prime/10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 opacity-20"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-gold rounded-full border-dashed" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white rounded-full" />
            </motion.div>

            <div className="relative z-10">
              <h3 className="text-5xl font-black text-white tracking-tighter mb-2">2.5k<span className="text-gold">+</span></h3>
              <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">Premium Listings</p>
            </div>
          </motion.div>

          {/* Luxury Villas Panel */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={bentoVariants}
            onClick={() => openAuth('signup')}
            className="md:col-span-4 md:row-span-1 bg-gold rounded-[2rem] p-8 flex items-end relative overflow-hidden group cursor-pointer shadow-xl shadow-gold/20"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 w-full flex items-center justify-between">
              <div>
                <p className="text-white/80 font-bold uppercase tracking-widest text-xs mb-1">Featured</p>
                <h3 className="text-2xl font-black text-white">Luxury Villas</h3>
              </div>
              <motion.div
                whileHover={{ x: 5 }}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-prime shadow-lg"
              >
                <ArrowRight size={20} />
              </motion.div>
            </div>

            <Star className="absolute top-6 right-6 text-white/30" size={64} strokeWidth={1} />
          </motion.div>
        </div>

        {/* Search Bar below bento */}
        <motion.div
          custom={4}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={bentoVariants}
          className="mt-6 bg-white rounded-[2rem] p-4 flex flex-col md:flex-row items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50"
        >
          <div className="flex-1 w-full flex items-center bg-gray-50 rounded-2xl px-6 py-4 border border-gray-100 focus-within:border-gold/50 focus-within:bg-white transition-colors group">
            <Search className="text-gray-400 group-focus-within:text-gold mr-4 shrink-0" size={24} />
            <input
              type="text"
              placeholder="Search by neighborhood, city, or zip code..."
              className="w-full bg-transparent border-none outline-none text-gray-900 font-semibold placeholder-gray-400 text-lg"
            />
          </div>

          <div className="hidden md:flex gap-4 h-full">
            <select className="bg-gray-50 border border-gray-100 rounded-2xl px-6 font-semibold text-gray-600 outline-none focus:border-gold/50 cursor-pointer">
              <option>Price Range</option>
              <option>$500k – $1M</option>
              <option>$1M – $5M</option>
              <option>$5M+</option>
            </select>
            <select className="bg-gray-50 border border-gray-100 rounded-2xl px-6 font-semibold text-gray-600 outline-none focus:border-gold/50 cursor-pointer">
              <option>Property Type</option>
              <option>House</option>
              <option>Apartment</option>
              <option>Villa</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openAuth('login')}
            className="w-full md:w-auto bg-prime text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-800 transition-colors shrink-0"
          >
            Search
          </motion.button>
        </motion.div>

        {/* Grid Categories */}
        <div className="mt-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-900">Explore by Category</h2>
            <button className="hidden md:flex items-center gap-2 font-bold text-gray-500 hover:text-prime transition-colors group">
              View All
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors">
                <ChevronRight size={16} />
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Building size={32} strokeWidth={1.5} />, title: 'Urban Spaces', count: '124 Listings' },
              { icon: <MapPin size={32} strokeWidth={1.5} />, title: 'Suburban', count: '86 Listings' },
              { icon: <Home size={32} strokeWidth={1.5} />, title: 'Luxury Villas', count: '42 Listings' },
            ].map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, ...transition }}
                whileHover={{ y: -5 }}
                onClick={() => openAuth('signup')}
                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-xl hover:border-gold/20 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-prime group-hover:bg-prime group-hover:text-gold transition-colors duration-300">
                    {cat.icon}
                  </div>
                  <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:border-gold group-hover:text-gold transition-colors">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">{cat.title}</h3>
                <p className="font-semibold text-gray-400">{cat.count}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
