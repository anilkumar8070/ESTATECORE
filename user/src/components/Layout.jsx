import React from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  User
} from 'lucide-react';

export default function Layout() {
  const location = useLocation();
  const isPropertyDetails = location.pathname.startsWith('/properties/');

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-sans relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Top Navbar */}
      {!isPropertyDetails && (
        <header className="sticky top-0 w-full bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/5 z-50">
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex flex-col justify-center hover:opacity-80 transition-opacity">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tighter leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-[#e8c87e]">ESTATE</span>
                <span className="text-[#f5f5f5] font-light">CORE</span>
              </h1>
            </Link>

            {/* Right Navigation Icons */}
            <div className="flex items-center gap-4 md:gap-6">
              
              <NavLink 
                to="/wishlist" 
                className={({ isActive }) => 
                  `relative p-2 rounded-full transition-all duration-300 ${isActive ? 'text-[#c5a059] bg-[#c5a059]/10' : 'text-gray-400 hover:text-[#c5a059] hover:bg-white/5'}`
                }
                title="Wishlist"
              >
                <Heart size={24} />
              </NavLink>

              <NavLink 
                to="/requests" 
                className={({ isActive }) => 
                  `relative p-2 rounded-full transition-all duration-300 ${isActive ? 'text-[#c5a059] bg-[#c5a059]/10' : 'text-gray-400 hover:text-[#c5a059] hover:bg-white/5'}`
                }
                title="Cart / Offers"
              >
                <ShoppingBag size={24} />
              </NavLink>

              {/* Profile Menu Placeholder */}
              <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-white/10 ml-2">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium tracking-wide text-[#f5f5f5]">John Doe</p>
                  <p className="text-xs text-[#c5a059] font-light">User</p>
                </div>
                <button className="bg-gradient-to-br from-[#c5a059] to-[#e8c87e] p-[2px] rounded-full shadow-[0_0_15px_rgba(197,160,89,0.2)] hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-shadow">
                  <div className="bg-[#111] p-2 rounded-full">
                    <User size={20} className="text-[#c5a059]" />
                  </div>
                </button>
              </div>

            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 relative z-10 w-full">
        <div className={`max-w-[1600px] mx-auto w-full min-h-full ${isPropertyDetails ? '' : 'p-6 md:p-10'}`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
