import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const neighborhoods = [
  {
    name: "Mumbai South",
    properties: "124 Properties",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800",
    size: "large"
  },
  {
    name: "Delhi NCR",
    properties: "86 Properties",
    image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?auto=format&fit=crop&q=80&w=800",
    size: "small"
  },
  {
    name: "Bangalore",
    properties: "243 Properties",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
    size: "small"
  },
  {
    name: "Pune",
    properties: "95 Properties",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    size: "wide"
  }
];

const FeaturedNeighborhoods = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-gold font-bold uppercase tracking-[0.4em] text-[10px] bg-gold/5 px-5 py-2.5 rounded-full border border-gold/10 inline-block mb-6"
            >
              Curated Locations
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-light text-black tracking-tight leading-tight"
            >
              Explore Our <br/>
              <span className="font-bold">Prime Neighborhoods</span>
            </motion.h2>
          </div>
          
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-gold transition-colors pb-2"
          >
            View All Locations <ArrowRight size={16} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {neighborhoods.map((hood, idx) => (
            <motion.div
              key={hood.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`relative rounded-[2rem] overflow-hidden group cursor-pointer ${
                hood.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
                hood.size === 'wide' ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              <img 
                src={hood.image} 
                alt={hood.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
                      {hood.name}
                    </h3>
                    <p className="text-gold font-bold text-xs uppercase tracking-widest">
                      {hood.properties}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gold group-hover:text-black transition-all duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedNeighborhoods;
