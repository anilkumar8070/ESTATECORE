
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building, ShoppingCart, MessageSquare, Users, Calendar } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Properties', path: '/properties', icon: <Building size={20} /> },
    { name: 'Buy Requests', path: '/buy-requests', icon: <ShoppingCart size={20} /> },
    { name: 'Reviews', path: '/reviews', icon: <MessageSquare size={20} /> },
    { name: 'Users', path: '/users', icon: <Users size={20} /> },
    { name: 'Visits', path: '/visits', icon: <Calendar size={20} /> },
  ];

  return (
    <div className="w-64 bg-prime text-white min-h-screen flex flex-col shadow-xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tighter">
          ESTATE<span className="text-gold">CORE</span> <span className="text-xs font-light text-gray-400">ADMIN</span>
        </h1>
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
  );
};

export default Sidebar;
