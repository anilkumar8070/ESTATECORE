import React from 'react';
import { Mail, Phone, Send } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-[#0a0a0a] text-white py-24 px-6 lg:px-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Content */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
              FIND YOUR <br />
              <span className="italic font-light opacity-50 outline-text">DREAM</span> <br />
              HOME <br />
              WITH US.
            </h2>
            <p className="mt-8 text-gray-400 text-lg max-w-md leading-relaxed">
              Whether you're looking to buy, sell, or invest in premium Indian real estate, our dedicated team is here to guide you through every step of the journey.
            </p>
          </div>

          <div className="mt-16 space-y-8">
            <div className="flex items-center space-x-6 group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-black transition-all duration-300">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Inquiries</p>
                <a href="mailto:contact@estatecore.com" className="text-lg hover:text-gold transition-colors font-medium">
                  contact@estatecore.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-6 group">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:text-black transition-all duration-300">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Support Line</p>
                <a href="tel:+918005550123" className="text-lg hover:text-gold transition-colors font-medium">
                  +91 800 555 0123
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-[#111111] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl -mr-16 -mt-16 rounded-full"></div>
          
          <form className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Inquiry Type</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all appearance-none cursor-pointer">
                <option className="bg-[#111]">Buying a Property</option>
                <option className="bg-[#111]">Selling a Property</option>
                <option className="bg-[#111]">Investment Advice</option>
                <option className="bg-[#111]">General Inquiry</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Your Message</label>
              <textarea 
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all resize-none"
                placeholder="How can we help you find your next home?"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-gold text-black py-5 rounded-xl flex items-center justify-center space-x-3 font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-4 shadow-lg shadow-gold/10"
            >
              <span>Explore Opportunities</span>
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 1px white;
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
