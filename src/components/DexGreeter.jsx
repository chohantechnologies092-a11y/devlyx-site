import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

import DexCharacter from './DexCharacter';

const DexGreeter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    if (!hasDismissed) {
      // Show Dex almost immediately (500ms after load)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);

      // Auto dismiss after 15 seconds if ignored
      const dismissTimer = setTimeout(() => {
        setIsVisible(false);
      }, 15500);

      return () => {
        clearTimeout(timer);
        clearTimeout(dismissTimer);
      };
    }
  }, [hasDismissed]);

  const handleInteract = () => {
    // Dispatch custom event to open ChatBubble
    window.dispatchEvent(new CustomEvent('open-dex-chat'));
    setIsVisible(false);
    setHasDismissed(true);
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsVisible(false);
    setHasDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50, scale: 0.9, transition: { duration: 0.3 } }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed bottom-8 left-6 z-[9998] flex items-end gap-4 pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Dex Character */}
          <div onClick={handleInteract} className="cursor-pointer">
            <DexCharacter isHovered={isHovered} />
          </div>

          {/* Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, originBottomLeft: true, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, type: 'spring', damping: 20 }}
            onClick={handleInteract}
            className="relative bg-white/95 backdrop-blur-xl rounded-2xl rounded-bl-sm px-5 py-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-white/20 cursor-pointer max-w-[240px] hover:shadow-[0_20px_50px_-10px_rgba(106,53,255,0.3)] transition-all duration-300 group"
          >
            {/* Dismiss button */}
            <button 
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm opacity-0 group-hover:opacity-100 z-20"
            >
              <X size={12} />
            </button>

            <div className="flex items-start gap-3 relative z-10">
              <div className="mt-0.5">
                <Sparkles size={16} className="text-[#6a35ff]" />
              </div>
              <div>
                <p className="text-[13px] text-gray-900 font-bold leading-relaxed">
                  Hi there! 👋 I'm <span className="text-[#6a35ff] font-black">Dex</span>.
                </p>
                <p className="text-[12px] text-gray-600 font-medium mt-0.5">
                  Need any help building your next big project?
                </p>
                
                <div className="mt-3 flex items-center gap-1.5 text-[10px] font-black text-[#6a35ff] uppercase tracking-widest group-hover:gap-2 transition-all">
                  Chat with me <span>→</span>
                </div>
              </div>
            </div>
            
            {/* Speech bubble tail pointer */}
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white/95 backdrop-blur-xl border-b border-l border-white/20 rounded-bl-sm transform rotate-45 z-0" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DexGreeter;
