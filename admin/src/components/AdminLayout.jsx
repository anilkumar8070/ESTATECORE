import { useState, useRef, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { User, Settings, LogOut, Menu } from 'lucide-react';

const AdminLayout = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="flex min-h-screen bg-accent font-sans text-gray-900 antialiased overflow-hidden">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-8 z-10 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden text-gray-600 hover:text-prime focus:outline-none"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">Admin Dashboard</h2>
          </div>
          <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-full bg-prime text-gold flex items-center justify-center font-bold hover:ring-2 hover:ring-gold transition-all focus:outline-none cursor-pointer"
            >
              A
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-gray-100 mb-2">
                  <p className="text-sm font-semibold text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">admin@estatecore.com</p>
                </div>
                
                <Link 
                  to="/account" 
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-prime transition-colors"
                >
                  <User size={16} />
                  <span>Account</span>
                </Link>
                
                <Link 
                  to="/settings" 
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-prime transition-colors"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
                
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button 
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
