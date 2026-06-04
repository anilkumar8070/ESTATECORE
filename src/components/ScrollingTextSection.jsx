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
          className="flex justify-center"
        >
          <span className="text-6xl md:text-[10rem] font-bold text-black uppercase leading-none tracking-tighter opacity-100">
            Exclusive
          </span>
        </motion.div>

        {/* Second Text - Moves Right */}
        <motion.div 
          style={{ x: moveRight }}
          className="flex flex-col items-center justify-center"
        >
          <span className="text-6xl md:text-[10rem] font-bold text-black uppercase leading-none tracking-tighter">
            Premium
          </span>
          <p className="mt-6 text-gray-500 font-bold text-[10px] md:text-xs tracking-[1em] uppercase text-center ml-[1em]">
            Curating the future of modern living
          </p>
        </motion.div>

        {/* Third Text - Moves Left */}
        <motion.div 
          style={{ x: moveLeft }}
          className="flex justify-center"
        >
          <span className="text-6xl md:text-[10rem] font-bold text-black uppercase leading-none tracking-tighter">
            Modern
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollingTextSection;