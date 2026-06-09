import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { 
  User, 
  X, 
  LayoutDashboard, 
  Building2, 
  Heart, 
  ShoppingBag, 
  Calendar, 
  MessageSquare, 
  ArrowLeftRight, 
  LogOut 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const isPropertyDetails = location.pathname.startsWith('/user/properties/');
  const isDashboard = location.pathname === '/user/dashboard';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const headerClass = isDashboard ? "fixed top-0 w-full z-50 bg-prime/90 backdrop-blur-2xl border-b border-white/5 py-4" : `fixed top-0 w-full z-50 transition-all duration-500 ${
    isScrolled ? 'bg-prime/90 backdrop-blur-2xl border-b border-white/5 shadow-lg py-4' : 'bg-transparent border-transparent py-6'
  }`;

  return (
    <div className="flex flex-col min-h-screen bg-[#f3f3f3] text-gray-900 font-sans relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Fixed Header */}
      {!isPropertyDetails && !isDashboard && (
        <header className={headerClass}>
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex items-center justify-between">
            
            {/* Logo - White, clean typography */}
            <Link to="/user/dashboard" className="flex flex-col justify-center hover:opacity-80 transition-opacity text-white">
              <h1 className="text-xl md:text-2xl font-black tracking-widest leading-none uppercase">
                ESTATE<span className="text-gold">CORE</span>
              </h1>
            </Link>

            {/* Right Navigation */}
            <div className="flex items-center gap-6 md:gap-8">
              {/* Sell Property Pill Button */}
              <Link 
                to="/user/dashboard" 
                className="hidden sm:inline-block border border-white/30 hover:border-white hover:bg-white hover:text-prime px-5 py-2.5 rounded-full text-[10px] md:text-xs font-bold tracking-widest text-white uppercase transition-all duration-300"
              >
                Sell Property
              </Link>

              {/* Menu Hamburger Trigger */}
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center gap-3 text-white hover:text-gold text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors"
              >
                <span>Menu</span>
                <div className="flex flex-col gap-[5px] w-5">
                  <span className="h-[2px] w-full bg-white rounded-full"></span>
                  <span className="h-[2px] w-full bg-white rounded-full"></span>
                </div>
              </button>
            </div>

          </div>
        </header>
      )}

      {/* Side Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[320px] sm:w-[380px] bg-prime/95 backdrop-blur-2xl border-l border-white/5 z-[60] flex flex-col justify-between p-8 text-white shadow-2xl"
            >
              {/* Top Section */}
              <div>
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <h2 className="text-xl font-black tracking-widest uppercase text-white">
                    ESTATE<span className="text-gold">CORE</span>
                  </h2>
                  <button 
                    onClick={() => setIsMenuOpen(false)} 
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-3">
                  {[
                    { to: "/user/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
                    { to: "/user/properties", label: "Explore Properties", icon: <Building2 size={18} /> },
                    { to: "/user/wishlist", label: "My Wishlist", icon: <Heart size={18} /> },
                    { to: "/user/requests", label: "Buy", icon: <ShoppingBag size={18} /> },
                    { to: "/user/visits", label: "Scheduled Visits", icon: <Calendar size={18} /> },
                    { to: "/user/chat", label: "Chat with Agent", icon: <MessageSquare size={18} /> },
                    { to: "/user/compare", label: "Compare Tools", icon: <ArrowLeftRight size={18} /> },
                  ].map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-300 font-semibold ${
                          isActive 
                            ? 'bg-gold text-prime shadow-[0_0_15px_rgba(197,160,89,0.3)]' 
                            : 'hover:bg-white/5 text-gray-300 hover:text-white border border-transparent'
                        }`
                      }
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Bottom Section - User Info */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2.5 rounded-full text-white">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">John Doe</p>
                    <p className="text-xs text-gold font-semibold uppercase tracking-wider">Premium Client</p>
                  </div>
                </div>
                <Link
                  to="/"
                  className="p-2.5 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 relative z-10 w-full">
        <div className={isPropertyDetails || isDashboard ? 'w-full min-h-full' : 'max-w-[1600px] mx-auto w-full min-h-full p-6 md:p-10 pt-24 md:pt-28'}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
