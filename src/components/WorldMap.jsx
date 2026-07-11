import React from 'react';
import { Globe, Navigation } from 'lucide-react';

// Comprehensive Coordinate Mapping for most countries
const COUNTRY_COORDS = {
  // Asia
  'Pakistan': { x: 70, y: 38 },
  'United Arab Emirates': { x: 64, y: 45 },
  'India': { x: 72, y: 45 },
  'Saudi Arabia': { x: 62, y: 48 },
  'Qatar': { x: 64, y: 44 },
  'China': { x: 80, y: 35 },
  'Japan': { x: 90, y: 35 },
  
  // Americas
  'USA': { x: 20, y: 40 },
  'United States': { x: 20, y: 40 },
  'Canada': { x: 20, y: 25 },
  'Brazil': { x: 35, y: 70 },
  
  // Europe
  'United Kingdom': { x: 48, y: 25 },
  'Germany': { x: 52, y: 28 },
  'France': { x: 50, y: 32 },
  'Italy': { x: 53, y: 35 },
  
  // Others
  'Australia': { x: 88, y: 75 },
  'South Africa': { x: 55, y: 80 },
  'Unknown': { x: 50, y: 50 }
};

const WorldMap = ({ visits = [] }) => {
  const countryCounts = visits.reduce((acc, v) => {
    const c = v.country || 'Unknown';
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});

  const activeRegions = Object.keys(countryCounts).length;

  return (
    <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden p-10">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tighter flex items-center gap-3">
            <Globe className="text-[#6a35ff]" size={28} />
            Live Global Footprint
          </h2>
          <p className="text-gray-500 font-medium text-sm mt-1">Real-time visitor distribution and engagement.</p>
        </div>
        <div className="flex gap-10">
           <div className="text-right">
              <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Active Regions</div>
              <div className="text-2xl font-black text-gray-900">{activeRegions}</div>
           </div>
           <div className="text-right">
              <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Recent Visits</div>
              <div className="text-2xl font-black text-[#6a35ff]">{visits.length}</div>
           </div>
        </div>
      </div>

      {/* The Visual Map Area */}
      <div className="relative w-full aspect-[21/9] bg-[#f8f9fc] rounded-[2rem] border border-gray-100 overflow-hidden group">
        
        {/* Radar Sweep Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square rounded-full pointer-events-none mix-blend-overlay opacity-50"
             style={{ 
               background: 'conic-gradient(from 0deg, transparent 70%, rgba(106,53,255,0.1) 90%, rgba(0,194,203,0.3) 100%)', 
               animation: 'spin 8s linear infinite' 
             }}>
        </div>

        {/* World Map Background Image (Simplified SVG representation) */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none p-12">
           <svg viewBox="0 0 1000 500" className="w-full h-full fill-current text-gray-400">
             {/* North America */}
             <path d="M100,100 Q150,80 200,100 T300,150 L250,250 L100,200 Z" />
             {/* South America */}
             <path d="M250,250 Q300,300 350,400 L300,450 L200,350 Z" />
             {/* Europe/Africa */}
             <path d="M450,100 Q550,80 600,150 L550,400 L450,450 L400,250 Z" />
             {/* Asia */}
             <path d="M600,150 Q750,100 900,150 L850,300 L700,400 L600,250 Z" />
             {/* Australia */}
             <path d="M800,350 Q850,380 900,420 L850,450 L750,400 Z" />
           </svg>
        </div>

        {/* The Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '30px 30px' }}>
        </div>

        {/* Floating Data Pins */}
        <div className="relative w-full h-full">
           {Object.entries(countryCounts).map(([country, count]) => {
             const coords = COUNTRY_COORDS[country] || COUNTRY_COORDS['Unknown'];
             const size = Math.min(32 + (count * 2), 80);
             
             return (
               <div 
                 key={country}
                 className="absolute group/pin transition-all duration-1000 ease-out"
                 style={{ left: `${coords.x}%`, top: `${coords.y}%`, transform: 'translate(-50%, -50%)' }}
               >
                 {/* Double Ping Effect */}
                 <div className="absolute inset-0 rounded-full bg-[#6a35ff]/10 animate-ping" style={{ width: size * 1.5, height: size * 1.5, left: -size*0.25, top: -size*0.25 }}></div>
                 <div className="absolute inset-0 rounded-full bg-[#00c2cb]/10 animate-ping [animation-delay:0.5s]" style={{ width: size * 1.2, height: size * 1.2, left: -size*0.1, top: -size*0.1 }}></div>
                 
                 {/* Main Analytics Hub */}
                 <div 
                   className="relative rounded-2xl bg-white border-2 border-gray-100 shadow-2xl flex flex-col items-center justify-center transition-all group-hover/pin:scale-110 group-hover/pin:border-[#6a35ff] cursor-help overflow-hidden"
                   style={{ width: size, height: size }}
                 >
                   <div className="text-xs font-black text-gray-900">{count}</div>
                   <div className="text-[7px] font-black text-gray-400 uppercase tracking-widest mt-1">{country.slice(0, 3)}</div>
                   {/* Bottom Progress bar based on weight */}
                   <div className="absolute bottom-0 left-0 h-1 bg-[#6a35ff]" style={{ width: `${(count/visits.length)*100}%` }}></div>
                 </div>

                 {/* High-End Tooltip */}
                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 opacity-0 group-hover/pin:opacity-100 transition-all scale-90 group-hover/pin:scale-100 pointer-events-none z-50">
                    <div className="bg-gray-950 text-white p-5 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-w-[180px] border border-white/10">
                       <div className="flex items-center justify-between mb-3">
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30">Target Audience</span>
                          <span className="px-2 py-0.5 bg-white/10 rounded text-[8px] font-bold text-[#00c2cb]">LIVE</span>
                       </div>
                       <div className="text-sm font-black mb-1">{country}</div>
                       <div className="flex items-center gap-2">
                          <div className="text-lg font-black text-[#6a35ff]">{count}</div>
                          <div className="text-[10px] font-bold text-white/40">Recent Visits</div>
                       </div>
                    </div>
                    <div className="w-4 h-4 bg-gray-950 rotate-45 mx-auto -mt-2 border-r border-b border-white/10"></div>
                 </div>
               </div>
             );
           })}
        </div>

        {/* Legend */}
        <div className="absolute bottom-8 left-8 flex items-center gap-8">
           <div className="flex items-center gap-3 px-5 py-2.5 bg-white shadow-xl rounded-full border border-gray-50">
              <span className="w-2 h-2 rounded-full bg-[#6a35ff] animate-pulse"></span>
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-900">Tracking Active</span>
           </div>
           <div className="flex gap-4">
              {['Asia', 'Americas', 'Europe'].map(r => (
                <span key={r} className="text-[8px] font-black text-gray-300 uppercase tracking-[0.2em]">{r}</span>
              ))}
           </div>
        </div>
      </div>

      {/* Analytics Insight Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
         {Object.entries(countryCounts).sort((a,b) => b[1] - a[1]).slice(0, 3).map(([country, count]) => (
            <div key={country} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 flex flex-col gap-6 group hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all">
               <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#6a35ff] group-hover:bg-[#6a35ff] group-hover:text-white transition-all">
                     <Navigation size={20} />
                  </div>
                  <div className="text-3xl font-black text-gray-900">{count}</div>
               </div>
               <div>
                  <div className="text-sm font-black text-gray-900 mb-1">{country}</div>
                  <div className="flex items-center justify-between">
                     <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Share of Traffic</div>
                     <div className="text-[10px] font-black text-[#00c2cb]">{Math.round((count/visits.length)*100)}%</div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                     <div className="h-full bg-gradient-to-r from-[#6a35ff] to-[#00c2cb]" style={{ width: `${(count/visits.length)*100}%` }}></div>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default WorldMap;
