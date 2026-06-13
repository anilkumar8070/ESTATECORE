import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollingTextSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const moveLeft = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const moveRight = useTransform(scrollYProgress, [0, 1], [0, 400]);

  return (
    <section 
      ref={containerRef} 
      className="py-16 md:py-32 overflow-hidden bg-white select-none border-y border-gray-100"
    >
      <div className="flex flex-col space-y-12 md:space-y-20">
        {/* First Text - Moves Left */}
        <motion.div 
          style={{ x: moveLeft }}
          className="flex items-center justify-center gap-8 whitespace-nowrap"
        >
          <span className="text-6xl md:text-[10rem] font-bold text-black uppercase leading-none tracking-tighter opacity-100">
            Exclusive
          </span>
          <div className="w-32 h-20 md:w-64 md:h-32 rounded-full overflow-hidden shrink-0 hidden sm:block">
            <img src="https://images.unsplash.com/photo-1613490908677-1e52dbb7dbf3?auto=format&fit=crop&q=80&w=800" alt="Luxury" className="w-full h-full object-cover" />
          </div>
          <span className="text-6xl md:text-[10rem] font-bold text-transparent text-stroke uppercase leading-none tracking-tighter opacity-30 hidden sm:block" style={{ WebkitTextStroke: '2px black' }}>
            Properties
          </span>
        </motion.div>

        {/* Second Text - Moves Right */}
        <motion.div 
          style={{ x: moveRight }}
          className="flex flex-col items-center justify-center relative"
        >
          <div className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-6xl md:text-[10rem] font-bold text-transparent text-stroke uppercase leading-none tracking-tighter opacity-30 hidden sm:block" style={{ WebkitTextStroke: '2px black' }}>
              Global
            </span>
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 hidden sm:block">
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" alt="Luxury" className="w-full h-full object-cover" />
            </div>
            <span className="text-6xl md:text-[10rem] font-bold text-black uppercase leading-none tracking-tighter">
              Premium
            </span>
          </div>
          <p className="mt-6 text-gray-500 font-bold text-[10px] md:text-xs tracking-[1em] uppercase text-center md:ml-[1em]">
            Curating the future of modern living
          </p>
        </motion.div>

        {/* Third Text - Moves Left */}
        <motion.div 
          style={{ x: moveLeft }}
          className="flex items-center justify-center gap-8 whitespace-nowrap"
        >
          <span className="text-6xl md:text-[10rem] font-bold text-black uppercase leading-none tracking-tighter">
            Modern
          </span>
          <div className="w-40 h-16 md:w-80 md:h-24 rounded-[3rem] overflow-hidden shrink-0 hidden sm:block">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" alt="Luxury" className="w-full h-full object-cover" />
          </div>
          <span className="text-6xl md:text-[10rem] font-bold text-transparent text-stroke uppercase leading-none tracking-tighter opacity-30 hidden sm:block" style={{ WebkitTextStroke: '2px black' }}>
            Living
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollingTextSection;