import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-prime text-white py-16 px-6 md:px-12 mt-20 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-10 h-10 bg-white text-gold rounded-full flex items-center justify-center">
              <Home size={20} className="text-prime" />
            </div>
            ESTATE<span className="text-gold font-light">CORE</span>
          </div>
          <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
            Redefining the real estate experience with modern technology and curated excellence. Find your dream space with EstateCore.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-prime transition-all duration-300">
              <span className="font-bold">f</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-prime transition-all duration-300">
              <span className="font-bold">t</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-prime transition-all duration-300">
              <span className="font-bold">ig</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-prime transition-all duration-300">
              <span className="font-bold">in</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-gold">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Home</Link></li>
            <li><Link to="/user/properties" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Properties</Link></li>
            <li><Link to="/user/dashboard" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Dashboard</Link></li>
            <li><Link to="/user/wishlist" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Wishlist</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-gold">Services</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Property Management</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Real Estate Analysis</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Home Inspection</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block">Legal Consulting</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold mb-6 text-gold">Contact Us</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-gray-400">
              <MapPin size={22} className="text-gold shrink-0 mt-1" />
              <span>123 Realty Plaza, New York, NY 10001</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Phone size={20} className="text-gold shrink-0" />
              <span>+1 (234) 567-890</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <Mail size={20} className="text-gold shrink-0" />
              <span>contact@estatecore.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
        <p>© 2026 EstateCore. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gold transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;