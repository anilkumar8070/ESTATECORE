import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Search, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Compare', href: '/compare' },
    { name: 'Sell Property', href: '/sell-property' },
    { name: 'Contact', href: '#contact' },
  ];

  const shouldBeSolid = isScrolled || !isHomePage;

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${shouldBeSolid ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className={`text-2xl font-bold tracking-tighter ${shouldBeSolid ? 'text-black' : 'text-white'}`}>
                ESTATE<span className="text-gold">CORE</span>
              </Link>
            </div>

            {/* Menu Button */}
            <div className="flex items-center space-x-6">
              <Link 
                to="/wishlist"
                className={`flex items-center group cursor-pointer transition-all ${shouldBeSolid ? 'text-black' : 'text-white'}`}
              >
                <Heart size={20} className="group-hover:text-gold transition-colors" />
              </Link>
              <Link 
                to="/dashboard"
                className={`hidden md:flex items-center space-x-2 px-6 py-2 rounded-full border transition-all duration-300 ${
                  shouldBeSolid 
                    ? 'border-gold text-gold hover:bg-gold hover:text-white' 
                    : 'border-white/30 text-white hover:bg-white hover:text-black hover:border-white'
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-widest">Dashboard</span>
              </Link>
              
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`flex items-center space-x-3 group cursor-pointer transition-all ${shouldBeSolid ? 'text-black' : 'text-white'}`}
              >
                <span className="text-sm font-bold uppercase tracking-[0.2em] group-hover:text-gold transition-colors">
                  menu
                </span>
                <div className="flex flex-col space-y-1.5 pt-0.5">
                  <div className={`h-[2px] w-8 transition-colors group-hover:bg-gold ${shouldBeSolid ? 'bg-black' : 'bg-white'}`}></div>
                  <div className={`h-[2px] w-5 transition-colors group-hover:bg-gold ${shouldBeSolid ? 'bg-black' : 'bg-white'}`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Side Panel */}
            <motion.div
              initial={{ 
                clipPath: 'circle(0% at 90% 5%)',
                opacity: 0 
              }}
              animate={{ 
                clipPath: 'circle(150% at 90% 5%)',
                opacity: 1 
              }}
              exit={{ 
                clipPath: 'circle(0% at 90% 5%)',
                opacity: 0 
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.76, 0, 0.24, 1] 
              }}
              className="relative w-full md:w-[60vw] lg:w-[45vw] bg-white h-screen shadow-2xl flex flex-col p-6 md:p-16 overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-black hover:text-gold transition-colors z-[70]"
                aria-label="Close menu"
              >
                <X size={32} strokeWidth={1.5} />
              </button>

              <div className="flex-1 mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Social Section */}
                <div className="order-2 md:order-1">
                  <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-8">
                    Social
                  </h3>
                  <div className="flex flex-col space-y-3 md:space-y-4">
                    <a href="#" className="text-lg md:text-2xl font-light hover:text-gold transition-colors">LinkedIn</a>
                    <a href="#" className="text-lg md:text-2xl font-light hover:text-gold transition-colors">Instagram</a>
                    <a href="#" className="text-lg md:text-2xl font-light hover:text-gold transition-colors">Github</a>
                  </div>
                </div>

                {/* Menu Section */}
                <div className="order-1 md:order-2">
                  <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4 md:mb-8">
                    Menu
                  </h3>
                  <div className="flex flex-col space-y-3 md:space-y-6">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        {link.href.startsWith('#') ? (
                          <a
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-3xl md:text-5xl lg:text-6xl font-normal text-black hover:text-gold transition-all duration-300 block"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-3xl md:text-5xl lg:text-6xl font-normal text-black hover:text-gold transition-all duration-300 block"
                          >
                            {link.name}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Get In Touch Section */}
              <div className="mt-8 md:mt-auto pt-8 md:pt-12 border-t border-gray-100">
                <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-4">
                  Get In Touch
                </h3>
                <a 
                  href="mailto:anilprajapati8070@gmail.com" 
                  className="text-xl md:text-2xl font-light hover:text-gold transition-colors lowercase"
                >
                  anilprajapati8070@gmail.com
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
