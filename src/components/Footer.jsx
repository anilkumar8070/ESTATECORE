import React from 'react';
import { Mail, Search, Heart, Globe, Download, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-12 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Brand Section (Left) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
              ESTATECORE
            </h3>
            <h2 className="text-5xl md:text-6xl font-normal mb-8 tracking-tighter">
              ESTATECORE
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-sm">
              Crafting premium real estate experiences and architectural excellence. 
              We specialize in luxury buildings, prime plots, and high-performance investment properties.
            </p>
            
            <button className="flex items-center space-x-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-all px-6 py-4 rounded-2xl mb-12 group">
              <Download size={20} className="text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium">Download Brochure</span>
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Open to Inquiries
              </span>
            </div>
          </div>

          {/* Links Section (Middle) */}
          <div className="lg:col-span-4">
            <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-lg text-gray-300 hover:text-white transition-colors">About</a>
                <a href="#" className="text-lg text-gray-300 hover:text-white transition-colors">Properties</a>
                <a href="#" className="text-lg text-gray-300 hover:text-white transition-colors">Projects</a>
                <a href="#" className="text-lg text-gray-300 hover:text-white transition-colors">Buildings</a>
              </div>
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-lg text-gray-300 hover:text-white transition-colors">Contact</a>
                <a href="#" className="text-lg text-gray-300 hover:text-white transition-colors">Services</a>
                <a href="#" className="text-lg text-gray-300 hover:text-white transition-colors">Process</a>
                <a href="#" className="text-lg text-gray-300 hover:text-white transition-colors">Help</a>
              </div>
            </div>
          </div>

          {/* Contact Blocks (Right) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 lg:mb-12">
              Stay Connected
            </h3>
            
            {/* Contact Block: Email */}
            <a href="mailto:hello@estatecore.com" className="group bg-white/5 border border-white/5 hover:border-white/10 p-6 rounded-3xl transition-all flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-sm font-medium text-gray-300 group-hover:text-white">hello@estatecore.com</p>
                </div>
              </div>
              <ExternalLink size={18} className="text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            {/* Contact Block: Social/Github-equivalent */}
            <a href="#" className="group bg-white/5 border border-white/5 hover:border-white/10 p-6 rounded-3xl transition-all flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-all">
                  <Globe size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Github</p>
                  <p className="text-sm font-medium text-gray-300 group-hover:text-white">@estatecore_dev</p>
                </div>
              </div>
              <ExternalLink size={18} className="text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            {/* Contact Block: LinkedIn */}
            <a href="#" className="group bg-white/5 border border-white/5 hover:border-white/10 p-6 rounded-3xl transition-all flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-all">
                  <Search size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Linkedin</p>
                  <p className="text-sm font-medium text-gray-300 group-hover:text-white">@estatecore_global</p>
                </div>
              </div>
              <ExternalLink size={18} className="text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-gray-500 text-xs">
          <p>© 2026 ESTATECORE. All Rights Reserved.</p>
          
          <div className="flex items-center space-x-10">
            <div className="flex space-x-6 items-center">
              <a href="#" className="hover:text-white transition-colors"><Globe size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Heart size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Mail size={18} /></a>
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden md:block"></div>
            <div className="flex space-x-6 uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
