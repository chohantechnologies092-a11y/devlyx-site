import React, { useEffect } from 'react';

const Tech = () => {
    useEffect(() => {
        const techObserver = new IntersectionObserver((entries) => {
            let staggerDelay = 0;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                        // Remove class after transition to unblock hover CSS transforms
                        setTimeout(() => {
                            entry.target.classList.remove('tech-reveal', 'active');
                        }, 1000);
                    }, staggerDelay);
                    staggerDelay += 150;
                    techObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        const elements = document.querySelectorAll('#tech .tech-reveal');
        elements.forEach(el => techObserver.observe(el));

        return () => techObserver.disconnect();
    }, []);

    // Orbit System Helper: Calculate positions on a circle
    const getOrbitPosition = (index, total, radius) => {
        const angle = (index / total) * (2 * Math.PI);
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        return { x: `${x}%`, y: `${y}%` };
    };

    const row1 = [
        { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61dafb' },
        { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#68a063' },
        { name: 'Tailwind', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#38b2ac' },
        { name: 'AWS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', invertCSS: true, color: '#ff9900' },
        { name: 'Laravel', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', color: '#ff2d20' },
        { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ed' },
    ];

    const row2 = [
        { name: 'Flutter', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', color: '#02569b' },
        { name: 'MongoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47a248' },
        { name: 'OpenAI', url: '/img/openai.svg', invertCSS: true, color: '#10a37f' },
        { name: 'Stripe', url: '/img/Stripe_Logo2-01.svg', invertCSS: true, color: '#eeeeeeff' },
        { name: 'WordPress', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg', color: '#21759b' },
        { name: 'Supabase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', color: '#3ecf8e' },
        { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#f24e1e' },
    ];

    // Side Blips for layout balance
    const sideBlips = [
        { label: 'Real-time Sync', top: '15%', left: '8%', color: '#6a35ff' },
        { label: 'Scalable Architecture', bottom: '20%', right: '10%', color: '#00c2cb' },
        { label: 'High Performance', top: '25%', right: '12%', color: '#6a35ff' },
        { label: 'Enterprise Ready', bottom: '15%', left: '10%', color: '#00c2cb' },
    ];

    // Coordinate Stream Data
    const dataStream = [
        "SCANNING... [88% INTERFACE]",
        "LAT: 22.40428",
        "LNG: 78.10395",
        "SYNC: ACTIVE",
        "ARCH: x64_LATEST",
        "PROTOCOL: SECURE",
    ];

    return (
        <section id="tech" className="py-24 md:py-32 bg-[#020204] relative overflow-hidden font-sans">

            {/* Digital Grid Foundation */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#6a35ff 1px, transparent 1px), linear-gradient(90deg, #6a35ff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}>
            </div>

            {/* Floating Binary/Hex Texture */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-[0.07]">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-[8px] font-mono text-white whitespace-nowrap animate-float"
                        style={{
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDelay: i * 2 + 's',
                            animationDuration: (15 + Math.random() * 10) + 's'
                        }}
                    >
                        {Math.random().toString(16).toUpperCase().substring(2, 20)}
                    </div>
                ))}
            </div>

            {/* --- CSS STYLES --- */}
            <style>{`
                .tech-reveal {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1);
                }
                .tech-reveal.active {
                    opacity: 1;
                    transform: translateY(0);
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                .animate-spin-reverse {
                    animation: spin-reverse 25s linear infinite;
                }
                .counter-rotate {
                    animation: spin-reverse 20s linear infinite;
                }
                .counter-rotate-reverse {
                    animation: spin-slow 25s linear infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-20px) translateX(10px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .orbit-svg {
                    filter: drop-shadow(0 0 8px rgba(106, 53, 255, 0.3));
                }
                @keyframes pulse-ring {
                    0% { transform: scale(0.8); opacity: 0; }
                    50% { opacity: 0.3; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                .pulse-ring-element {
                    animation: pulse-ring 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-scanline {
                    animation: scanline 4s linear infinite;
                }
                @keyframes flicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                    70% { opacity: 0.8; }
                }
                .animate-flicker {
                    animation: flicker 2s infinite;
                }
                .glass-card {
                    background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
                    backdrop-filter: blur(10px);
                }
                .glass-card::before {
                    content: "";
                    position: absolute;
                    top: 0; left: 0; right: 0; height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                }
            `}</style>

            {/* Background Constellations (Floating Particles) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white opacity-[0.03] animate-float"
                        style={{
                            width: Math.random() * 3 + 1 + 'px',
                            height: Math.random() * 3 + 1 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDelay: Math.random() * 5 + 's',
                            animationDuration: (Math.random() * 10 + 10) + 's'
                        }}
                    ></div>
                ))}
            </div>

            {/* Side Blips for better space utilization */}
            <div className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
                {sideBlips.map((blip, i) => (
                    <div
                        key={i}
                        className="absolute flex items-center gap-3 px-4 py-2 bg-white/[0.04] border border-white/[0.06] rounded-xl filter backdrop-blur-md animate-flicker"
                        style={{ top: blip.top, left: blip.left, bottom: blip.bottom, right: blip.right, animationDelay: `${i * 0.5}s` }}
                    >
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: blip.color, boxShadow: `0 0 10px ${blip.color}` }}></span>
                        <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.25em] font-mono">{blip.label}</span>
                    </div>
                ))}
            </div>

            {/* Background Orbs & Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 opacity-[0.04] mt-10">
                <img src="/devlyxsol-01.png" alt="" className="w-[800px] md:w-[1200px] h-auto filter grayscale" />
            </div>
            <div className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-[#6a35ff]/5 blur-[150px] rounded-full opacity-40"></div>
            <div className="absolute bottom-[-5%] left-[-10%] w-[600px] h-[600px] bg-[#00c2cb]/5 blur-[150px] rounded-full opacity-40"></div>

            {/* Header */}
            <div className="container mx-auto px-6 relative z-10 pt-24 pb-16 tech-reveal">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
                    <div className="flex-1">
                        <h2 className="text-[#6a35ff] font-mono text-xs tracking-[0.5em] uppercase mb-4 animate-flicker">// Technological Core</h2>
                        <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1] mb-2">
                            The Tech <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] to-[#00c2cb]">Engine Room.</span>
                        </h3>
                    </div>
                    <div className="flex-1 md:border-l border-white/5 md:pl-12">
                        <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                            An architectural foundation engineered for global scale, where performance meets pure digital craftsmanship.
                        </p>
                    </div>
                </div>
            </div>

            {/* Orbit System Area with HUD Frame */}
            <div className="relative w-full py-20 flex justify-center items-center overflow-hidden min-h-[750px] md:min-h-[850px] bg-transparent tech-reveal">

                {/* HUD Geometric Frame Container */}
                <div className="absolute z-10 w-[92%] max-w-[900px] aspect-[16/10] md:aspect-[16/8] flex items-center justify-center">

                    {/* HUD Corners with Inner Dots */}
                    {/* Top Left */}
                    <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#6a35ff]/40 rounded-tl-3xl">
                        <div className="absolute top-2 left-2 w-1 h-1 bg-white/20 rounded-full"></div>
                    </div>
                    {/* Top Right */}
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#00c2cb]/40 rounded-tr-3xl">
                        <div className="absolute top-2 right-2 w-1 h-1 bg-white/20 rounded-full"></div>
                    </div>
                    {/* Bottom Left */}
                    <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#00c2cb]/40 rounded-bl-3xl"></div>
                    {/* Bottom Right */}
                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#6a35ff]/40 rounded-br-3xl"></div>

                    {/* Geometric Mesh Lines */}
                    <div className="absolute inset-6 border border-white/[0.04] rounded-[2.5rem] pointer-events-none"></div>

                    {/* Vertical Scanline */}
                    <div className="absolute inset-0 w-full overflow-hidden pointer-events-none opacity-25">
                        <div className="w-full h-1/4 bg-gradient-to-b from-transparent via-[#6a35ff]/5 to-transparent animate-scanline"></div>
                    </div>

                    {/* Coordinate Stream Display */}
                    <div className="absolute bottom-10 left-10 hidden md:flex flex-col gap-1 text-[#6a35ff]/40 font-mono text-[7px] tracking-widest uppercase">
                        {dataStream.map((text, i) => (
                            <span key={i} className="animate-flicker" style={{ animationDelay: `${i * 0.2}s` }}>
                                {text}
                            </span>
                        ))}
                    </div>

                    <div className="absolute top-10 right-10 hidden md:flex items-center gap-4 text-[#00c2cb]/30 font-mono text-[7px] tracking-widest uppercase">
                        <span className="animate-pulse">SYSTEM_ESTABLISHED: 08.04.26</span>
                        <div className="flex gap-1">
                            <div className="w-4 h-1 bg-white/5"></div>
                            <div className="w-2 h-1 bg-[#00c2cb]/40"></div>
                        </div>
                    </div>

                    {/* SVG HUD Crosshairs & Grid */}
                    <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.05" strokeDasharray="1 2" />
                        <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255,255,255,0.1)" strokeWidth="0.05" strokeDasharray="1 2" />
                    </svg>

                    {/* The Orbit System */}
                    <div className="relative aspect-square w-full max-w-[450px] md:max-w-[650px] flex items-center justify-center z-20">

                        {/* SVG Orbit Lines */}
                        <svg className="absolute inset-0 w-full h-full orbit-svg pointer-events-none z-0 opacity-40" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.1" strokeDasharray="1 4" />
                            <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(106,53,255,0.2)" strokeWidth="0.2" strokeDasharray="2 6" />
                        </svg>

                        {/* Core */}
                        <div className="absolute z-20 pointer-events-none">
                            <div className="absolute inset-0 pulse-ring-element bg-[#6a35ff]/30 rounded-full"></div>
                        </div>

                        <div className="absolute z-30 w-28 h-28 md:w-36 md:h-36 bg-[#0a0a0c] rounded-full flex items-center justify-center p-1 border border-white/5 shadow-[0_0_100px_rgba(106,53,255,0.3)] backdrop-blur-3xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#6a35ff]/20 to-[#00c2cb]/20 animate-spin-slow"></div>
                            <img src="/devlyxsol-01.png" className="w-14 md:w-20 h-auto filter brightness-0 invert relative z-10 transition-transform group-hover:scale-110 duration-700" alt="Core" />
                        </div>

                        {/* Outer Orbit (row2) */}
                        <div className="absolute z-10 w-full h-full animate-spin-reverse">
                            {row2.map((tech, i) => {
                                const pos = getOrbitPosition(i, row2.length, 50);
                                return (
                                    <div key={i} className="absolute w-16 h-16 md:w-24 md:h-24 flex flex-col items-center justify-center group" style={{ top: pos.y, left: pos.x, transform: 'translate(-50%, -50%)' }}>
                                        <div className="counter-rotate-reverse flex flex-col items-center justify-center transition-all duration-700 group-hover:scale-110">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#0a0a0c] rounded-2xl border border-white/5 flex items-center justify-center hover:border-white/20 transition-all shadow-2xl relative glass-card">
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: tech.color }}></div>
                                                <img src={tech.url} className={`w-7 h-7 md:w-10 md:h-10 object-contain relative z-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ${tech.invertCSS ? 'invert' : ''}`} alt={tech.name} />
                                            </div>
                                            <span className="mt-2 text-[6px] md:text-[8px] font-bold text-gray-500 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap font-mono">{tech.name}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Inner Orbit (row1) */}
                        <div className="absolute z-20 w-[60%] h-[60%] animate-spin-slow">
                            {row1.map((tech, i) => {
                                const pos = getOrbitPosition(i, row1.length, 50);
                                return (
                                    <div key={i} className="absolute w-14 h-14 md:w-20 md:h-20 flex flex-col items-center justify-center group" style={{ top: pos.y, left: pos.x, transform: 'translate(-50%, -50%)' }}>
                                        <div className="counter-rotate flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-125">
                                            <div className="w-10 h-10 md:w-14 md:h-14 bg-white/[0.04] backdrop-blur-2xl rounded-full border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                                <img src={tech.url} className={`w-6 h-6 md:w-8 md:h-8 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ${tech.invertCSS ? 'invert' : ''}`} alt={tech.name} />
                                            </div>
                                            <span className="mt-1 text-[5px] md:text-[7px] font-black text-white/40 uppercase tracking-widest whitespace-nowrap font-mono">{tech.name}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Final Bento Architecture: High-Energy Engine Room */}
            <div className="container mx-auto px-6 py-24 relative z-10">

                {/* Section Header: Architectural Spec */}
                <div className="mb-20 tech-reveal">
                    <div className="flex items-center gap-6 mb-4">
                        <span className="text-[#6a35ff] font-mono text-xs font-bold tracking-[0.5em] uppercase animate-pulse">Architecture_SPEC.v3</span>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                    {/* Bento Module 1: Hybrid Mobility (Span 8) - PRIMARY FEATURE */}
                    <div className="md:col-span-8 tech-reveal group p-12 rounded-[3.5rem] bg-[#0a0a0c] border border-white/5 hover:border-[#02569b]/30 transition-all duration-700 relative overflow-hidden glass-card hover:-translate-y-3"
                        style={{ '--hover-glow': 'rgba(2, 86, 155, 0.15)' }}>
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[180px] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">Native</div>
                        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" className="w-56 h-56" alt="" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex gap-6 mb-10">
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center p-4 border border-white/5 group-hover:bg-[#02569b]/10 transition-all">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" className="w-10 h-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Flutter" />
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center p-4 border border-white/5 group-hover:bg-[#00c2cb]/10 transition-all">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" className="w-10 h-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Dart" />
                                </div>
                            </div>
                            <h4 className="text-4xl font-black text-white mb-6 tracking-tight">Hybrid Mobility</h4>
                            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg font-light">
                                High-performance native applications on iOS and Android with a single compiled codebase, ensuring seamless hardware integration and silky-smooth UIs.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {["Dart_Engine", "Cross_Native", "Fluid_UI", "Core_Sync"].map((tag, i) => (
                                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#02569b] transition-all">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bento Module 2: Enterprise MERN (Span 4) */}
                    <div className="md:col-span-4 tech-reveal group p-10 rounded-[3.5rem] bg-[#0a0a0c] border border-white/5 hover:border-[#61dafb]/30 transition-all duration-700 relative overflow-hidden glass-card hover:-translate-y-3"
                        style={{ '--hover-glow': 'rgba(97, 218, 251, 0.15)' }}>
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[100px] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">Modern</div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex gap-3 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center p-3 border border-white/5 group-hover:bg-[#61dafb]/10 transition-all">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-8 h-8 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="React" />
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center p-3 border border-white/5 group-hover:bg-[#68a063]/10 transition-all">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-8 h-8 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Node" />
                                </div>
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">Enterprise MERN</h4>
                            <p className="text-gray-500 text-sm leading-relaxed mb-10 font-light">
                                Architecting scalable ecosystems focusing on real-time sync and high-concurrency performance.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-[#61dafb] transition-all">Aggregation</span>
                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-[#61dafb] transition-all">RT_Data</span>
                            </div>
                        </div>
                    </div>

                    {/* Bento Module 3: Laravel Forge (Span 4) */}
                    <div className="md:col-span-4 tech-reveal group p-10 rounded-[3.5rem] bg-[#0a0a0c] border border-white/5 hover:border-[#ff2d20]/30 transition-all duration-700 relative overflow-hidden glass-card hover:-translate-y-3"
                        style={{ '--hover-glow': 'rgba(255, 45, 32, 0.15)' }}>
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[100px] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">Forge</div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center p-4 border border-white/5 mb-8 group-hover:bg-[#ff2d20]/10 transition-all">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" className="w-10 h-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="Laravel" />
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">Laravel Architecture</h4>
                            <p className="text-gray-500 text-sm leading-relaxed mb-10 font-light italic">
                                Rapid application development with Eloquent ORM and enterprise-grade security hardening.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-[#ff2d20] transition-all">Eloquent_ORM</span>
                            </div>
                        </div>
                    </div>

                    {/* Bento Module 4: Core PHP (Span 4) */}
                    <div className="md:col-span-4 tech-reveal group p-10 rounded-[3.5rem] bg-[#777bb4]/5 border border-white/5 hover:border-[#777bb4]/50 transition-all duration-700 relative overflow-hidden glass-card hover:-translate-y-3">
                        <div className="absolute bottom-[-10%] left-[-10%] text-[100px] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">Engine</div>
                        <div className="relative z-10 h-full flex flex-col">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" className="w-20 h-20 mb-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="PHP" />
                            <h4 className="text-2xl font-black text-white mb-4">Core PHP Engine</h4>
                            <p className="text-gray-500 text-sm leading-relaxed font-light mt-auto">
                                Over 15 years of legacy in crafting robust server-side logic and highly optimized SQL structures.
                            </p>
                        </div>
                    </div>

                    {/* Bento Module 5: Design & UI (Span 4) */}
                    <div className="md:col-span-4 tech-reveal group p-10 rounded-[3.5rem] bg-[#38b2ac]/5 border border-white/5 hover:border-[#38b2ac]/50 transition-all duration-700 relative overflow-hidden glass-card hover:-translate-y-3">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">Pixel</div>
                        <div className="relative z-10">
                            <div className="flex gap-6 mb-10">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" className="w-12 h-12 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(162,89,255,0.4)] transition-all duration-500" alt="Figma" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" className="w-12 h-12 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" alt="Tailwind" />
                            </div>
                            <h4 className="text-2xl font-black text-white mb-4 italic">Design & UI</h4>
                            <p className="text-gray-400 text-sm leading-relaxed font-light">
                                Pixel-perfect Figma-to-Code conversion. Utility-first styling with Tailwind CSS for lightning-fast responsiveness.
                            </p>
                        </div>
                    </div>

                    {/* Bento Module 5b: WordPress (Span 4) */}
                    <div className="md:col-span-4 tech-reveal group p-10 rounded-[3.5rem] bg-[#21759b]/5 border border-white/5 hover:border-[#21759b]/50 transition-all duration-700 relative overflow-hidden glass-card hover:-translate-y-3">
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[90px] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">Web</div>
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div>
                                <div className="flex gap-4 mb-8 items-center">
                                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center p-4 border border-white/5 group-hover:bg-[#21759b]/20 transition-all">
                                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" className="w-10 h-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="WordPress" />
                                    </div>
                                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center p-3 border border-white/5 group-hover:bg-[#21759b]/10 transition-all">
                                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg" className="w-9 h-9 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="WooCommerce" />
                                    </div>
                                </div>
                                <h4 className="text-2xl font-black text-white mb-4">WordPress & WooCommerce</h4>
                                <p className="text-gray-500 text-sm leading-relaxed font-light">
                                    Custom themes, plugins, and WooCommerce stores — fully optimized for performance, SEO, and conversion.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-6">
                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-[#21759b] transition-all">Custom_Themes</span>
                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-[#21759b] transition-all">E-Commerce</span>
                            </div>
                        </div>
                    </div>

                    {/* Bento Module 6: Cloud Scalability (Span 4) */}
                    <div className="md:col-span-4 tech-reveal group p-10 rounded-[3.5rem] bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all duration-700 relative overflow-hidden glass-card hover:-translate-y-3">
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[100px] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">Scale</div>
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div>
                                <div className="flex gap-8 mb-8 items-center">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" className="w-16 h-16 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 invert transition-all duration-700" alt="AWS" />
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" className="w-12 h-12 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt="GCP" />
                                </div>
                                <h4 className="text-2xl font-black text-white mb-3">Cloud Scalability</h4>
                                <p className="text-gray-500 text-sm font-light leading-relaxed">Managing global infrastructure with AWS and Google Cloud for zero-downtime deployment.</p>
                            </div>
                        </div>
                    </div>

                    {/* Bento Module 7: AI & Fintech (Span 4) */}
                    <div className="md:col-span-4 tech-reveal group p-10 rounded-[3.5rem] bg-[#4f46e5]/5 border border-white/5 hover:border-indigo-500/30 transition-all duration-700 relative overflow-hidden glass-card hover:-translate-y-3">
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[100px] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">Logic</div>
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div>
                                <div className="flex gap-8 mb-8 items-center">
                                    <img src="img/openai.svg" className="w-10 h-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 invert" alt="OpenAI" />
                                    <img src="img/Stripe_Logo2-01.svg" className="w-16 h-16 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 invert" alt="Stripe" />
                                </div>
                                <h4 className="text-2xl font-black text-white mb-3">AI & Fintech</h4>
                                <p className="text-gray-400 text-sm leading-relaxed font-light">Integrating OpenAI for smart automation and Stripe for global payment gateway ecosystems.</p>
                            </div>
                        </div>
                    </div>

                    {/* Bento Module 8: Real-Time Data Hub (Span 12) */}
                    <div className="md:col-span-12 tech-reveal group p-14 rounded-[3.5rem] bg-white/[0.02] border border-white/5 hover:bg-orange-500/5 transition-all duration-1000 relative overflow-hidden glass-card hover:-translate-y-3">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] md:text-[300px] font-black text-white/[0.01] select-none pointer-events-none uppercase tracking-tighter">Archive</div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex gap-12 items-center">
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" className="w-16 h-16 group-hover:drop-shadow-[0_0_20px_rgba(255,166,0,0.4)] transition-all duration-500" alt="Firebase" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" className="w-16 h-16" alt="MongoDB" />
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" className="w-16 h-16 grayscale group-hover:grayscale-0 transition-all duration-500" alt="Supabase" />
                            </div>
                            <div className="text-center md:text-right">
                                <h4 className="text-4xl md:text-5xl font-black text-white mb-4 italic">Real-Time Data Hub</h4>
                                <p className="text-gray-500 max-w-lg md:ml-auto text-md leading-relaxed font-light">Advanced NoSQL management and Supabase/Firebase cloud-functions for low-latency user experiences across all devices.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Ambient Atmosphere Section Glows */}
            <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-[#61dafb]/5 blur-[200px] rounded-full opacity-30 pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#6a35ff]/5 blur-[200px] rounded-full opacity-30 pointer-events-none z-0"></div>

        </section>
    );
};

export default Tech;