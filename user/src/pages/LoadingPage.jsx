import React from 'react';
import { motion } from 'framer-motion';

const LoadingPage = ({ onComplete }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-accent"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* Decorative background blur */}
      <div className="absolute w-96 h-96 bg-gold/5 rounded-full blur-[100px] animate-pulse" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center bg-white/80 backdrop-blur-xl p-14 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-white"
      >
        <div className="relative w-20 h-20 mb-8">
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
          <motion.div 
            className="absolute inset-0 border-4 border-transparent border-t-gold border-r-gold rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-prime rounded-full animate-pulse" />
          </div>
        </div>
        
        <div className="overflow-hidden">
          <motion.h1 
            className="text-4xl font-extrabold text-gray-900 tracking-tight"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Estate<span className="text-gold">Core</span>
          </motion.h1>
        </div>
        
        <div className="overflow-hidden mt-3">
          <motion.p
            className="text-sm font-semibold text-gray-400 tracking-widest uppercase"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => {
              setTimeout(onComplete, 1800);
            }}
          >
            Curating Excellence
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingPage;
