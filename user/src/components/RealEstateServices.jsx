import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Store, 
  Truck, 
  Map, 
  Zap, 
  UserSquare2, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';

const RealEstateServices = () => {
  const serviceCategories = [
    {
      title: "Residential",
      icon: <Building2 className="w-6 h-6" />,
      items: ["Houses & Villas", "Apartments/Flats", "Farmhouses", "Studio Apartments"]
    },
    {
      title: "Commercial",
      icon: <Store className="w-6 h-6" />,
      items: ["Shops & Offices", "Showrooms", "Co-working Spaces", "Malls"]
    },
    {
      title: "Land & Plots",
      icon: <Map className="w-6 h-6" />,
      items: ["Residential Plots", "Agricultural Land", "Industrial Land", "Farm Land"]
    },
    {
      title: "Industrial",
      icon: <Truck className="w-6 h-6" />,
      items: ["Factories", "Warehouses", "Logistics Parks", "Sheds"]
    },
    {
      title: "Special Items",
      icon: <Zap className="w-6 h-6" />,
      items: ["Smart Homes", "Vacation Homes", "Rental Units", "Resorts"]
    },
    {
      title: "Services",
      icon: <UserSquare2 className="w-6 h-6" />,
      items: ["Home Loans", "Property Valuation", "Legal Verification", "Interior Design"]
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-gold font-bold uppercase tracking-[0.4em] text-[10px] bg-gold/5 px-5 py-2.5 rounded-full border border-gold/10 inline-block mb-8"
          >
            Elite Services
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold text-black tracking-tighter leading-[0.9] uppercase"
          >
            Refining <br/>
            Indian Real Estate <br/>
            <span className="italic text-gray-300 font-light lowercase tracking-normal">thru Digital Craft</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {serviceCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: idx * 0.1,
                ease: [0.21, 0.45, 0.32, 0.9]
              }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-[3.5rem] border border-gray-100 hover:border-black/5 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 group relative flex flex-col items-start min-h-[500px]"
            >
              {/* Subtle Icon Box */}
              <div className="bg-gray-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-12 border border-gray-100 group-hover:bg-black group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 text-black shadow-sm">
                {category.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-4xl font-bold mb-10 text-black tracking-tighter uppercase leading-none">
                {category.title}
              </h3>

              <div className="w-full h-px bg-gray-100 mb-10 group-hover:bg-gold/20 transition-colors"></div>

              <ul className="space-y-6 w-full flex-grow">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center group/item cursor-pointer">
                    <div className="w-1.5 h-1.5 bg-black rounded-full mr-4 group-hover/item:w-8 group-hover/item:bg-gold transition-all duration-500"></div>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 group-hover/item:text-black transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Action Indicator */}
              <div className="mt-8 flex items-center space-x-3 text-black opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="text-[10px] font-bold uppercase tracking-widest">Explore Category</span>
                <ChevronRight size={14} />
              </div>

              {/* Corner Accent */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gold/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealEstateServices;