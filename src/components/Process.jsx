import React, { useEffect } from 'react';

const Process = () => {
    // Scroll Reveal Animation Logic
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        document.querySelectorAll('.scroll-reveal-card').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const steps = [
        {
            number: '01',
            title: 'Discovery',
            description: 'We dive deep into your business ecosystem to align your vision with market demands. Every great project starts with a data-driven foundation.',
            phase: 'Insight Phase',
            color: '#6a35ff',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            number: '02',
            title: 'Architecture',
            description: 'Mapping out the digital blueprint. We craft intuitive wireframes and user flows designed to maximize engagement and optimize conversions.',
            phase: 'Blueprint Phase',
            color: '#00c2cb',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor">
                    <path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            number: '03',
            title: 'Development',
            description: 'Turning concepts into reality with clean, scalable code. Leveraging 15 years of expertise in Full-stack development and high-end UI design.',
            phase: 'Build Phase',
            color: '#6a35ff',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor">
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
        },
        {
            number: '04',
            title: 'Deployment',
            description: "Final optimization and global deployment. We don’t just launch; we ensure your brand is positioned for exponential growth and market dominance.",
            phase: 'Launch Phase',
            color: '#00c2cb',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            ),
        },
    ];

    return (
        <section id="process" className="py-24 md:py-32 bg-[#020204] relative overflow-hidden font-sans">

            {/* Global Styles */}
            <style>{`
                .scroll-reveal-card {
                    opacity: 0;
                    transform: translateY(40px) scale(0.98);
                    transition: all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1);
                }
                .scroll-reveal-card.active {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.1; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(1.5); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s infinite ease-in-out;
                }
            `}</style>

            {/* 1. Ambient Grid Background */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* --- 2. Header Section with Logo behind Text --- */}
                <div className="scroll-reveal-card mb-24 md:mb-32 max-w-4xl mx-auto text-center relative">

                    {/* Ghost Logo Watermark (Behind Protocol) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10 translate-y-[-10%]">
                        <img
                            src="/devlyxsol-01.png"
                            alt=""
                            className="w-[350px] md:w-[600px] lg:w-[750px] opacity-[0.035] grayscale brightness-150"
                            draggable="false"
                        />
                    </div>

                    <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 mb-6 relative z-10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6a35ff] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6a35ff]"></span>
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Execution Roadmap</span>
                    </div>

                    <h3 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6 relative z-10">
                        The Master <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-500 to-gray-800">Protocol.</span>
                    </h3>

                    <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl mx-auto relative z-10">
                        A structured development cycle engineered for clean architecture, rapid scalability, and market dominance.
                    </p>
                </div>

                {/* --- 3. Alternating Timeline Layout --- */}
                <div className="relative space-y-20 md:space-y-16">

                    {/* Mobile Only: Left Connecting Line */}
                    <div className="absolute left-[30px] top-10 bottom-10 w-[1px] bg-white/10 md:hidden z-0"></div>

                    {/* Desktop Central Connecting Line */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-[70px] bottom-[70px] w-[2px] bg-gradient-to-b from-transparent via-white/5 to-transparent z-0"></div>

                    {steps.map((step, index) => {
                        const isEven = index % 2 !== 0;

                        return (
                            <div
                                key={index}
                                className={`scroll-reveal-card group md:flex md:items-center md:justify-between gap-10 lg:gap-16 relative z-10 ${isEven ? 'md:flex-row-reverse' : ''}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >

                                {/* Connection Hub */}
                                <div className="absolute left-0 top-0 md:relative md:left-auto md:top-auto flex flex-col items-center justify-center md:w-1/12">
                                    <div className="w-16 h-16 rounded-full bg-[#020204] border-[2px] border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-20" style={{ boxShadow: `0 0 40px ${step.color}20` }}>
                                        <div className="w-4 h-4 rounded-full transition-colors duration-500" style={{ backgroundColor: step.color }}></div>
                                        <div className="absolute inset-0 rounded-full animate-pulse-slow transition-opacity opacity-0 group-hover:opacity-100" style={{ backgroundColor: `${step.color}15` }}></div>
                                    </div>
                                    <span className="hidden md:block text-2xl font-black text-white/10 mt-4 font-mono">{step.number}</span>
                                </div>

                                {/* Content Card */}
                                <div className="md:w-11/12 lg:w-10/12 pl-20 md:pl-0">
                                    <div className="relative p-10 md:p-12 bg-white/[0.01] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm group-hover:bg-white/[0.03] group-hover:border-white/10 group-hover:-translate-y-2 transition-all duration-500">

                                        {/* Colored Glow on Hover */}
                                        <div className="absolute -inset-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none select-none -z-10" style={{ background: `radial-gradient(ellipse 60% 70% at 50% 50%, ${step.color}10, transparent)` }}></div>

                                        <div className="flex flex-col md:flex-row md:items-center gap-8 lg:gap-12">

                                            {/* Icon */}
                                            <div className="w-16 h-16 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-lg" style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}CC)`, boxShadow: `0 15px 40px ${step.color}33` }}>
                                                {step.icon}
                                            </div>

                                            {/* Text Content */}
                                            <div className="flex-1">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6 border-b border-white/5 pb-5">
                                                    <h4 className="text-3xl lg:text-4xl font-black text-white tracking-tighter uppercase">{step.title}</h4>
                                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10" style={{ color: step.color }}>{step.phase}</span>
                                                </div>
                                                <p className="text-gray-400 text-base md:text-lg leading-relaxed font-medium">
                                                    {step.description}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Background Number (Mobile) */}
                                        <span className="absolute top-4 right-8 text-[80px] font-black text-white/[0.02] select-none md:hidden font-mono">{step.number}</span>
                                    </div>
                                </div>

                                {/* Desktop Spacer */}
                                <div className="hidden md:block md:w-1/12"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Process;