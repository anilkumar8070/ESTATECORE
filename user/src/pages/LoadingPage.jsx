import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingPage = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 1200); // Wait longer so the user can enjoy the final SVG drawing
          return 100;
        }
        // Smoothly accelerate the loader
        const increment = prev < 40 ? 1 : prev < 80 ? 2 : 4;
        return prev + increment;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
      >
        {/* Abstract Blueprint Grid Background */}
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        {/* Ambient Center Glow */}
        <motion.div 
          className="absolute w-[60vw] h-[60vw] bg-gold/5 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm px-6">
          
          {/* Architectural Drawing Animation */}
          <div className="relative w-56 h-56 mb-8 flex items-center justify-center">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">
              {/* Grid guide line */}
              <motion.line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" 
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              
              {/* House Base / Left */}
              <motion.path 
                d="M 15 80 V 45 L 35 35 V 80" 
                stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
              />
              
              {/* Main Tower */}
              <motion.path 
                d="M 35 80 V 25 L 65 10 V 80" 
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
              />
              
              {/* Right Wing */}
              <motion.path 
                d="M 65 80 V 50 L 85 40 V 80" 
                stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
              />

              {/* Windows / Details */}
              <motion.rect x="42" y="30" width="16" height="12" stroke="currentColor" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.7, ease: "easeOut" }}
              />
              <motion.rect x="42" y="50" width="16" height="12" stroke="currentColor" strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.9, ease: "easeOut" }}
              />
              
              {/* Sun/Moon arc representing setting/view */}
              <motion.path d="M 85 25 A 15 15 0 0 0 65 10" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.5, delay: 2.2, ease: "easeInOut" }}
              />
            </svg>

            {/* Glowing dot tracing the horizon line */}
            <motion.div 
              className="absolute bottom-[28px] left-[10%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_2px_rgba(255,255,255,0.8)]"
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 180, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
            />
          </div>

          <div className="overflow-hidden mb-12">
            <motion.h1 
              className="text-3xl sm:text-4xl font-light tracking-[0.15em] text-white flex space-x-[2px]"
            >
              {"ESTATECORE".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, delay: 1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={index >= 6 ? "font-medium text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200" : ""}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Loader Percentage with elegant line */}
          <div className="w-full relative">
            <div className="h-[1px] w-full bg-zinc-800/60 overflow-hidden relative rounded-full">
               <motion.div 
                 className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-transparent via-gold to-white"
                 initial={{ width: "0%" }}
                 animate={{ width: `${progress}%` }}
                 transition={{ ease: "linear", duration: 0.1 }}
               >
                 {/* Sparkle on end */}
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[4px] mix-blend-screen opacity-100 shadow-[0_0_10px_rgba(255,255,255,1)]" />
               </motion.div>
            </div>
            
            <div className="flex justify-between items-center mt-4 text-[9px] text-zinc-500 font-mono tracking-[0.2em] uppercase">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                Constructing Environment
              </motion.span>
              <motion.span
                className="text-gold tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {progress.toString().padStart(3, '0')}%
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingPage;
