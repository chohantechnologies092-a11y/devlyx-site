import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Clean up classes after animation allows hover states to work
                    setTimeout(() => {
                        entry.target.classList.remove('scroll-reveal', 'active');
                    }, 1000);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const services = [
        {
            title: 'Full-Stack Engineering',
            subtitle: 'SaaS & Enterprise Systems',
            href: '/services/software-development/uae',
            description: 'Architecting scalable web ecosystems with robust backends and lightning-fast APIs. We focus on performance-first engineering.',
            points: ['Microservices Architecture', 'Real-time Data Sync', 'Scalable Cloud Hosting', 'Custom API Engines'],
            color: '#6a35ff',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor">
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" strokeWidth="0.5" strokeDasharray="2 2" />
                </svg>
            )
        },
        {
            title: 'Product Design & UX',
            subtitle: 'Human-Centered Design',
            href: '/services/ui-ux-design/uae',
            description: 'Converting complex workflows into intuitive, pixel-perfect interfaces. Our designs are engineered for user retention and ease of use.',
            points: ['User Journey Mapping', 'Hi-Fi Prototyping', 'Design Systems', 'Usability Testing'],
            color: '#f59e0b',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 2l7.586 7.586" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="11" cy="11" r="2" fill="currentColor" />
                </svg>
            )
        },
        {
            title: 'Mobile Ecosystems',
            subtitle: 'Cross-Platform Solutions',
            href: '/services/app-development/uae',
            description: 'Building fluid, native-performance apps for iOS and Android using Flutter. We ensure seamless data sync and hardware integration.',
            points: ['Native Performance', 'Biometric Integration', 'Offline-First Logic', 'Store Optimization'],
            color: '#00c2cb',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor">
                    <rect x="5" y="2" width="14" height="20" rx="3" strokeWidth="1" />
                    <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 2h6" strokeWidth="1" strokeLinecap="round" />
                    <circle cx="18" cy="5" r="3" strokeWidth="0.5" strokeDasharray="1 1" />
                </svg>
            )
        },
        {
            title: 'Shopify Ecosystems',
            subtitle: 'E-Commerce & Apps',
            href: '/services/shopify-development/uae',
            description: 'Building high-converting Shopify stores and custom private/public apps to supercharge your e-commerce operations.',
            points: ['Custom Theme Dev', 'Shopify App Dev', 'API Integrations', 'Store Optimization'],
            color: '#95bf47',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor">
                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 11v2m6-2v2" strokeWidth="1" strokeLinecap="round" />
                </svg>
            )
        },
        {
            title: 'SEO & Growth Architecture',
            subtitle: 'Data-Driven Visibility',
            href: '/services/seo-growth/uae',
            description: 'Technical SEO strategies that dominate search rankings. We build content ecosystems that drive sustainable organic growth.',
            points: ['Technical SEO Audits', 'Keyword Mapping', 'Competitor Intelligence', 'Backlink Strategy'],
            color: '#2563eb',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="1" strokeLinecap="round" />
                    <path d="M7 10h4M9 8v4" strokeWidth="1" strokeLinecap="round" />
                    <path d="M18 3l3 3-3 3" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: 'Performance Marketing',
            subtitle: 'ROI-Focused Strategy',
            href: '/services/performance-marketing/uae',
            description: 'Strategic ad campaigns and social growth systems with real-time tracking. We turn clicks into high-value conversions.',
            points: ['Paid Media Strategy', 'Conversion Funnels', 'A/B Performance Testing', 'Retention Marketing'],
            color: '#78cf3eff',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10" stroke="currentColor">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" strokeWidth="0.5" strokeDasharray="4 4" />
                </svg>
            )
        }
    ];

    return (
        <section id='services' className="py-24 md:py-32 bg-gray-50 font-sans overflow-hidden">
            {/* Dynamic Entry Animation CSS */}
            <style>{`
        .scroll-reveal { 
          opacity: 0; 
          transform: translateY(40px) scale(0.98); 
          transition: opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1), 
                      transform 1s cubic-bezier(0.2, 0.8, 0.2, 1); 
        }
        .scroll-reveal.active { 
          opacity: 1; 
          transform: translateY(0) scale(1); 
        }
      `}</style>

            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="scroll-reveal mb-20 text-center md:text-left">
                    <p className="text-[#6a35ff] font-bold text-xs uppercase tracking-[0.4em] mb-4">How we help</p>
                    <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-none">
                        Expert <span className="text-gray-300">Capabilities.</span>
                    </h2>
                </div>

                {/* Services Grid */}
                <div className="flex flex-col gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="scroll-reveal group grid grid-cols-1 lg:grid-cols-12 bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500 overflow-hidden"
                            style={{ transitionDelay: `${index * 150}ms` }} // Staggered delay logic
                        >

                            {/* Left Column: Icon Focus */}
                            <div className="lg:col-span-3 flex items-center justify-center p-12 bg-gray-50/50 relative">
                                <div
                                    className="absolute w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
                                    style={{ backgroundColor: service.color }}
                                ></div>

                                <div
                                    className="relative w-24 h-24 rounded-3xl bg-white shadow-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                                    style={{ color: service.color }}
                                >
                                    {service.icon}
                                </div>
                            </div>

                            {/* Middle Column: Description */}
                            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center">
                                <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: service.color }}>
                                    {service.subtitle}
                                </p>
                                <h3 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
                                    {service.title}
                                </h3>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            {/* Right Column: Outcomes & Button */}
                            <div className="lg:col-span-4 p-8 md:p-12 bg-gray-50/30 border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col justify-center">
                                <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-6">Execution Focus</h4>
                                <ul className="space-y-4 mb-10">
                                    {service.points.map((point, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.color }}></div>
                                            <span className="text-sm font-bold text-gray-700">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                                {service.href ? (
                                    <Link to={service.href}>
                                        <button
                                            className="w-full py-4 rounded-xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest text-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-200 hover:-translate-y-1 active:scale-95"
                                            style={{ backgroundColor: service.color }}
                                        >
                                            Explore Expertise
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </Link>
                                ) : (
                                    <a href="#contact">
                                        <button
                                            className="w-full py-4 rounded-xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest text-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-200 hover:-translate-y-1 active:scale-95"
                                            style={{ backgroundColor: service.color }}
                                        >
                                            Consult Now
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </a>
                                )}
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;