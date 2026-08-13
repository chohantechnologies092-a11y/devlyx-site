import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

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
            image: '/img/services/software.png',
            description: 'Architecting scalable web ecosystems with robust backends and lightning-fast APIs. We focus on performance-first engineering.',
            points: ['Microservices Architecture', 'Real-time Data Sync', 'Scalable Cloud Hosting'],
            color: '#6a35ff',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor">
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: 'Product Design & UX',
            subtitle: 'Human-Centered Design',
            href: '/services/ui-ux-design/uae',
            image: '/img/services/ui.png',
            description: 'Converting complex workflows into intuitive, pixel-perfect interfaces. Our designs are engineered for user retention and ease of use.',
            points: ['User Journey Mapping', 'Hi-Fi Prototyping', 'Usability Testing'],
            color: '#f59e0b',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: 'Mobile Ecosystems',
            subtitle: 'Cross-Platform Solutions',
            href: '/services/app-development/uae',
            image: '/img/services/app.png',
            description: 'Building fluid, native-performance apps for iOS and Android using Flutter. We ensure seamless data sync and hardware integration.',
            points: ['Native Performance', 'Offline-First Logic', 'Store Optimization'],
            color: '#00c2cb',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor">
                    <rect x="5" y="2" width="14" height="20" rx="3" strokeWidth="2" />
                    <path d="M12 18h.01" strokeWidth="3" strokeLinecap="round" />
                </svg>
            )
        },
        {
            title: 'Shopify Ecosystems',
            subtitle: 'E-Commerce & Apps',
            href: '/services/shopify-development/uae',
            image: '/img/services/shopify.png',
            description: 'Building high-converting Shopify stores and custom private/public apps to supercharge your e-commerce operations.',
            points: ['Custom Theme Dev', 'Shopify App Dev', 'API Integrations'],
            color: '#95bf47',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor">
                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: 'SEO & Growth',
            subtitle: 'Data-Driven Visibility',
            href: '/services/seo-growth/uae',
            image: '/img/services/seo.png',
            description: 'Technical SEO strategies that dominate search rankings. We build content ecosystems that drive sustainable organic growth.',
            points: ['Technical SEO Audits', 'Keyword Mapping', 'Competitor Intelligence'],
            color: '#2563eb',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" />
                    <path d="M18 3l3 3-3 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: 'Performance Marketing',
            subtitle: 'ROI-Focused Strategy',
            href: '/services/performance-marketing/uae',
            image: '/img/services/marketing.png',
            description: 'Strategic ad campaigns and social growth systems with real-time tracking. We turn clicks into high-value conversions.',
            points: ['Paid Media Strategy', 'Conversion Funnels', 'Retention Marketing'],
            color: '#78cf3e',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
          transform: translateY(30px); 
          transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), 
                      transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); 
        }
        .scroll-reveal.active { 
          opacity: 1; 
          transform: translateY(0); 
        }
      `}</style>

            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="scroll-reveal mb-20 text-center">
                    <p className="text-[#6a35ff] font-bold text-xs uppercase tracking-[0.3em] mb-4">How we help</p>
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                        Expert <span className="text-gray-400">Capabilities.</span>
                    </h2>
                    <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
                        We engineer digital ecosystems that drive growth. From high-performance web apps to scalable mobile platforms, we deliver excellence.
                    </p>
                </div>

                {/* Services Grid - 3 Column Layout for higher readability */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="scroll-reveal group bg-white rounded-3xl p-8 border border-black/5 hover:border-black/10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {/* Image Header */}
                            <div className="relative h-48 -mx-8 -mt-8 mb-8 bg-gray-50 flex items-center justify-center">
                                <div className="absolute inset-0 overflow-hidden rounded-t-3xl">
                                    <div className="absolute inset-0 opacity-20 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-40 z-10" style={{ backgroundColor: service.color }} />
                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                </div>
                                
                                {/* Icon Badge */}
                                <div className="absolute -bottom-6 right-6 w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-xl shadow-black/10 z-20 group-hover:-translate-y-2 transition-transform duration-500 border border-gray-50" style={{ color: service.color }}>
                                    {service.icon}
                                </div>
                            </div>

                            {/* Subtitle */}
                            <div className="mb-4 relative z-10">
                                <span 
                                    className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md bg-gray-50"
                                    style={{ color: service.color }}
                                >
                                    {service.subtitle}
                                </span>
                            </div>

                            {/* Title & Description */}
                            <div className="relative z-10 flex-grow">
                                <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">
                                    {service.description}
                                </p>
                            </div>

                            {/* Capabilities Tags */}
                            <div className="relative z-10 mb-8 flex flex-wrap gap-2">
                                {service.points.map((point, i) => (
                                    <span key={i} className="px-2 py-1 bg-white border border-gray-100 rounded text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                        {point}
                                    </span>
                                ))}
                            </div>

                            {/* CTA Link - Low Friction */}
                            <div className="relative z-10 pt-5 border-t border-gray-100 mt-auto flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">View Details</span>
                                {service.href ? (
                                    <Link 
                                        to={service.href}
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-lg"
                                        style={{ backgroundColor: service.color }}
                                    >
                                        <ArrowRight size={18} />
                                    </Link>
                                ) : (
                                    <a 
                                        href="#contact"
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-lg"
                                        style={{ backgroundColor: service.color }}
                                    >
                                        <ArrowRight size={18} />
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