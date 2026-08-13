import React from 'react';
import { motion } from 'framer-motion';

const DexCharacter = ({ isHovered = false, scale = 1 }) => {
  return (
    <motion.div
      animate={{ 
        y: isHovered ? [0, -8, 0] : [0, -15, 0],
      }}
      transition={{ 
        duration: isHovered ? 2 : 4, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="relative group pointer-events-auto"
      style={{ transform: `scale(${scale})` }}
    >
      {/* Glow effect behind */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#6a35ff]/30 to-[#00c2cb]/30 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex flex-col items-center">
        {/* Head */}
        <div className="relative w-20 h-20 bg-gradient-to-tr from-[#0a051d] to-[#1a103c] rounded-[2rem] border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden z-20 backdrop-blur-xl">
          {/* Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-[2rem] pointer-events-none" />
          
          {/* Visor */}
          <div className="w-14 h-8 bg-black/80 rounded-full flex items-center justify-center gap-2 relative shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] border border-white/5">
            {/* Eyes - Left */}
            <motion.div 
              animate={{ scaleY: [1, 0.1, 1, 1, 1, 1, 1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.5, 0.55, 0.6, 1] }}
              className="w-3 h-3 bg-[#00c2cb] rounded-full shadow-[0_0_10px_#00c2cb]"
            />
            {/* Eyes - Right */}
            <motion.div 
              animate={{ scaleY: [1, 0.1, 1, 1, 1, 1, 1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1, 0.5, 0.55, 0.6, 1] }}
              className="w-3 h-3 bg-[#6a35ff] rounded-full shadow-[0_0_10px_#6a35ff]"
            />
          </div>

          {/* Little antenna */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white/20 rounded-t-sm" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-1 bg-[#00c2cb] rounded-full shadow-[0_0_8px_#00c2cb] animate-pulse" />
        </div>

        {/* Neck (glow/connector) */}
        <div className="w-4 h-2 bg-gradient-to-b from-[#6a35ff] to-transparent opacity-60 z-10" />

        {/* Body */}
        <div className="relative w-16 h-20 bg-gradient-to-b from-[#1a103c] to-[#0a051d] rounded-t-3xl rounded-b-[2rem] border border-white/10 shadow-2xl z-20 overflow-hidden flex flex-col items-center justify-start pt-4 backdrop-blur-xl">
          {/* Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          {/* Core/Heart */}
          <div className="w-4 h-4 rounded-full bg-[#00c2cb] shadow-[0_0_15px_#00c2cb] animate-pulse" />
          {/* Chest lines */}
          <div className="mt-3 w-8 h-[2px] bg-white/10 rounded-full" />
          <div className="mt-1.5 w-6 h-[2px] bg-white/10 rounded-full" />
        </div>

        {/* Left Arm */}
        <motion.div 
          animate={{ rotate: isHovered ? [0, -25, 0] : [0, -5, 0] }}
          transition={{ duration: isHovered ? 0.5 : 2, repeat: Infinity }}
          className="absolute top-[6.5rem] -left-2 w-3 h-12 bg-gradient-to-b from-[#1a103c] to-[#0a051d] rounded-full border border-white/10 origin-top z-10 shadow-lg"
        />

        {/* Right Arm */}
        <motion.div 
          animate={{ rotate: isHovered ? [0, 25, 0] : [0, 5, 0] }}
          transition={{ duration: isHovered ? 0.5 : 2, repeat: Infinity, delay: 0.2 }}
          className="absolute top-[6.5rem] -right-2 w-3 h-12 bg-gradient-to-b from-[#1a103c] to-[#0a051d] rounded-full border border-white/10 origin-top z-10 shadow-lg"
        />

        {/* Hover Base / Thruster */}
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute -bottom-3 w-10 h-3 bg-[#6a35ff] blur-md rounded-full pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

export default DexCharacter;
