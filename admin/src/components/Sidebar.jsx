import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building, ShoppingCart, MessageSquare, Users, Calendar, X } from 'lucide-react';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Properties', path: '/properties', icon: <Building size={20} /> },
    { name: 'Buy Requests', path: '/buy-requests', icon: <ShoppingCart size={20} /> },
    { name: 'Reviews', path: '/reviews', icon: <MessageSquare size={20} /> },
    { name: 'Users', path: '/users', icon: <Users size={20} /> },
    { name: 'Visits', path: '/visits', icon: <Calendar size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={`w-64 bg-prime text-white min-h-screen flex flex-col shadow-xl fixed md:static inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tighter">
            ESTATE<span className="text-gold">CORE</span> <span className="text-xs font-light text-gray-400">ADMIN</span>
          </h1>
          <button 
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMobileOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
      <nav className="flex-grow mt-6 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-gold text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
                end={item.path === '/'}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
        © 2026 EstateCore Admin
      </div>
    </div>
    </>
  );
};

export default Sidebar;
