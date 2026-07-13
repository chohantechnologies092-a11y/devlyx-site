import React, { useEffect, useState } from 'react';
import { clientService } from '../services/clientService';
import { motion } from 'framer-motion';

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    clientService.getActiveClients().then(data => {
      setClients(data);
    }).catch(console.error);
  }, []);

  if (!clients || clients.length === 0) return null;

  // Duplicate clients so the marquee never has empty spaces even if there's only 1 client
  let displayClients = [...clients];
  while (displayClients.length > 0 && displayClients.length < 12) {
    displayClients = [...displayClients, ...clients];
  }

  return (
    <section className="py-20 bg-gray-950 border-y border-white/5 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 mb-8 text-center">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-3"
        >
          Trusted By Innovators
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white font-bold text-lg md:text-2xl tracking-tight"
        >
          Powering digital transformation for industry leaders.
        </motion.p>
      </div>
      
      {/* Center se pop-in + Scrolling */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full flex overflow-hidden group py-10"
      >
        {/* Gradient Masks for smooth fading edges */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-950 to-transparent z-20 pointer-events-none" />
        
        {/* Custom CSS for Marquee */}
        <style>{`
          @keyframes custom-marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-custom-marquee {
            animation: custom-marquee 40s linear infinite;
          }
          .animate-custom-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Single Marquee Track with duplicated items translating -50% */}
        <div className="flex animate-custom-marquee items-center w-max">
          {[...displayClients, ...displayClients].map((client, i) => (
            <div key={`${client.id}-${i}`} className="mx-8 md:mx-12 flex-shrink-0 transition-all duration-500 flex flex-col items-center gap-2 group/logo">
              {client.logoUrl ? (
                <img 
                  src={client.logoUrl} 
                  alt={client.name} 
                  className="h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-60 group-hover/logo:opacity-100 group-hover/logo:scale-110 group-hover/logo:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-500 hover:-translate-y-2" 
                />
              ) : (
                <span className="font-black text-xl md:text-3xl text-gray-700 group-hover/logo:text-white transition-colors duration-500 hover:-translate-y-2 inline-block">{client.name}</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
