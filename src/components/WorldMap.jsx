import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Globe as GlobeIcon, Navigation, Activity, Users, MapPin } from 'lucide-react';
import Globe from 'react-globe.gl';

// Lat/Long Mapping for 3D Globe
const COUNTRY_COORDS = {
  // Asia
  'Pakistan': [30.3753, 69.3451],
  'United Arab Emirates': [23.4241, 53.8478],
  'India': [20.5937, 78.9629],
  'Saudi Arabia': [23.8859, 45.0792],
  'Qatar': [25.3548, 51.1839],
  'China': [35.8617, 104.1954],
  'Japan': [36.2048, 138.2529],
  'South Korea': [35.9078, 127.7669],
  'Singapore': [1.3521, 103.8198],
  'Malaysia': [4.2105, 101.9758],
  'Indonesia': [-0.7893, 113.9213],
  'Vietnam': [14.0583, 108.2772],
  'Thailand': [15.8700, 100.9925],
  
  // Americas
  'USA': [37.0902, -95.7129],
  'United States': [37.0902, -95.7129],
  'Canada': [56.1304, -106.3468],
  'Brazil': [-14.2350, -51.9253],
  'Mexico': [23.6345, -102.5528],
  'Argentina': [-38.4161, -63.6167],
  'Colombia': [4.5709, -74.2973],
  
  // Europe
  'United Kingdom': [55.3781, -3.4360],
  'Germany': [51.1657, 10.4515],
  'France': [46.2276, 2.2137],
  'Italy': [41.8719, 12.5674],
  'Spain': [40.4637, -3.7492],
  'Netherlands': [52.1326, 5.2913],
  'Switzerland': [46.8182, 8.2275],
  'Sweden': [60.1282, 18.6435],
  'Poland': [51.9194, 19.1451],
  
  // Oceania / Africa
  'Australia': [-25.2744, 133.7751],
  'New Zealand': [-40.9006, 174.8860],
  'South Africa': [-30.5595, 22.9375],
  'Egypt': [26.8206, 30.8025],
  'Nigeria': [9.0820, 8.6753],
  'Kenya': [-1.286389, 36.817223],
  
  'Unknown': [0, 0]
};

// Fallback logic for unmapped countries: Use deterministic hash to generate lat/long
const getFallbackCoords = (country) => {
  let hash = 0;
  for (let i = 0; i < country.length; i++) {
    hash = country.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Latitude: -60 to 60, Longitude: -180 to 180
  return [
    (Math.abs(hash) % 120) - 60,
    (Math.abs(hash * 3) % 360) - 180
  ];
};

const GlobeComponent = ({ countryCounts }) => {
  const globeRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef();

  useEffect(() => {
    const onResize = () => {
      if(containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetWidth
        });
      }
    };
    
    // Setup resize listener and trigger initial measure
    window.addEventListener('resize', onResize);
    setTimeout(onResize, 50); // slight delay to ensure DOM is painted
    
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    // Wait for globe to initialize and then set controls
    if(globeRef.current && dimensions.width > 0) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1.0;
      globeRef.current.controls().enableZoom = false; // Disable zooming so it doesn't break scroll
    }
  }, [dimensions]);

  // Data for glowing pulse rings
  const ringsData = useMemo(() => {
    return Object.entries(countryCounts).map(([country, count]) => {
      const location = COUNTRY_COORDS[country] || getFallbackCoords(country);
      return {
        lat: location[0],
        lng: location[1],
        maxR: Math.min(3 + (count * 1.5), 15), // Pulsing ring size
        propagationSpeed: 2,
        repeatPeriod: 1000,
      };
    });
  }, [countryCounts]);

  return (
    <div ref={containerRef} style={{ width: '100%', maxWidth: 700, aspectRatio: '1', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
       {typeof window !== 'undefined' && dimensions.width > 0 && (
         <Globe
           ref={globeRef}
           width={dimensions.width}
           height={dimensions.height}
           backgroundColor="rgba(0,0,0,0)" // Transparent background
           globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
           bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
           
           ringsData={ringsData}
           ringColor={() => '#00c2cb'}
           ringMaxRadius="maxR"
           ringPropagationSpeed="propagationSpeed"
           ringRepeatPeriod="repeatPeriod"

           labelsData={ringsData}
           labelLat={d => d.lat}
           labelLng={d => d.lng}
           labelDotRadius={0.5}
           labelColor={() => '#6a35ff'}
           labelText={() => ''}
         />
       )}
    </div>
  );
};

const WorldMap = ({ visits = [] }) => {
  const countryCounts = useMemo(() => {
    return visits.reduce((acc, v) => {
      const c = v.country || 'Unknown';
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    }, {});
  }, [visits]);

  const activeRegions = Object.keys(countryCounts).length;
  const topCountries = Object.entries(countryCounts).sort((a,b) => b[1] - a[1]).slice(0, 3);

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      {/* Header Section */}
      <div className="p-8 md:p-10 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">Live 3D Tracking</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter flex items-center gap-3">
            Global Footprint
          </h2>
          <p className="text-gray-500 font-medium text-sm mt-2 max-w-md">Real-time visitor distribution, geographic concentration, and active user engagement across the globe.</p>
        </div>
        
        <div className="flex gap-4 md:gap-8">
           <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 min-w-[140px]">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <MapPin size={16} />
                <div className="text-[10px] font-black uppercase tracking-widest">Active Regions</div>
              </div>
              <div className="text-3xl font-black text-gray-900">{activeRegions}</div>
           </div>
           <div className="p-5 rounded-2xl bg-purple-50 border border-purple-100 min-w-[140px]">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Users size={16} />
                <div className="text-[10px] font-black uppercase tracking-widest">Recent Visits</div>
              </div>
              <div className="text-3xl font-black text-[#6a35ff]">{visits.length}</div>
           </div>
        </div>
      </div>

      {/* The Visual Map Area - High-Fidelity 3D Globe */}
      <div className="relative w-full bg-[#0a0a0b] overflow-hidden group border-b border-gray-100 py-10 cursor-move">
        {/* Dynamic Grid Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Central Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00c2cb]/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* The 3D Globe */}
        <div className="relative z-10 w-full flex justify-center items-center pointer-events-auto">
          <GlobeComponent countryCounts={countryCounts} />
        </div>
      </div>

      {/* Analytics Insight Grid - Clean Footer */}
      <div className="p-8 md:p-10 bg-white">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
          <Activity size={16} /> Top Performing Regions
        </h3>
        
        {topCountries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topCountries.map(([country, count], index) => {
              const percentage = Math.round((count/visits.length)*100) || 1;
              return (
                <div key={country} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col hover:bg-white hover:border-[#6a35ff]/30 hover:shadow-xl transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm text-gray-400 group-hover:text-[#6a35ff] font-black text-xs transition-colors">
                        #{index + 1}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#00c2cb] bg-[#00c2cb]/10 px-2 py-1 rounded">
                        {percentage}% Traffic
                      </div>
                    </div>
                    
                    <div className="text-2xl font-black text-gray-900 mb-1 truncate">{country}</div>
                    <div className="text-sm font-bold text-gray-500 mb-4">{count} Active Sessions</div>
                    
                    <div className="mt-auto w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#6a35ff] to-[#00c2cb] rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
                    </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-10 text-center bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <GlobeIcon className="mx-auto text-gray-300 mb-3" size={32} />
            <div className="text-sm font-bold text-gray-500">Waiting for global traffic data...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldMap;
