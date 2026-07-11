import React, { useEffect, useState, useCallback } from 'react';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const testimonials = [
        {
            name: 'Sarah Mitchell',
            role: 'CEO & Founder',
            company: 'NovaTech Solutions',
            quote: "Devlyx completely transformed our digital presence. Their full-stack engineering team delivered a platform that handles 10x our previous traffic with zero downtime. The attention to detail in both design and architecture was exceptional.",
            rating: 5,
            color: '#6a35ff',
            initials: 'SM',
            metric: '10x',
            metricLabel: 'Traffic Growth',
        },
        {
            name: 'James Rodriguez',
            role: 'CTO',
            company: 'FinEdge Capital',
            quote: "Working with Devlyx was a game-changer for our fintech product. They built a real-time trading dashboard that our users love. The performance optimization alone reduced our load times by 70%. Highly recommend their expertise.",
            rating: 5,
            color: '#00c2cb',
            initials: 'JR',
            metric: '70%',
            metricLabel: 'Faster Load Time',
        },
        {
            name: 'Emily Zhang',
            role: 'Head of Product',
            company: 'CloudSync AI',
            quote: "The mobile app Devlyx built for us exceeded every expectation. Flutter expertise, seamless API integration, and a UI that our customers constantly compliment. They don't just build — they architect for scale.",
            rating: 5,
            color: '#f59e0b',
            initials: 'EZ',
            metric: '4.9★',
            metricLabel: 'App Store Rating',
        },
        {
            name: 'Michael Carter',
            role: 'Marketing Director',
            company: 'GrowthPulse Agency',
            quote: "Our SEO rankings skyrocketed after Devlyx restructured our entire web presence. Within 3 months, we were ranking on page one for 15+ competitive keywords. Their technical SEO knowledge is unmatched.",
            rating: 5,
            color: '#3ecf8e',
            initials: 'MC',
            metric: '15+',
            metricLabel: 'Page 1 Keywords',
        },
        {
            name: 'Aisha Patel',
            role: 'Operations Lead',
            company: 'UrbanFlow Logistics',
            quote: "Devlyx delivered a custom logistics management system that automated 80% of our manual processes. The cloud infrastructure they set up is rock-solid. Best investment we've made in technology.",
            rating: 5,
            color: '#2563eb',
            initials: 'AP',
            metric: '80%',
            metricLabel: 'Automation Rate',
        },
    ];

    // Auto-play carousel
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    const goTo = useCallback((index) => {
        setActiveIndex(index);
        setIsAutoPlaying(false);
        // Resume auto-play after 10s of inactivity
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, []);

    const goNext = useCallback(() => {
        goTo((activeIndex + 1) % testimonials.length);
    }, [activeIndex, testimonials.length, goTo]);

    const goPrev = useCallback(() => {
        goTo((activeIndex - 1 + testimonials.length) % testimonials.length);
    }, [activeIndex, testimonials.length, goTo]);

    // Scroll reveal
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        document.querySelectorAll('.testimonial-reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const active = testimonials[activeIndex];
    const prevIdx = (activeIndex - 1 + testimonials.length) % testimonials.length;
    const nextIdx = (activeIndex + 1) % testimonials.length;

    return (
        <section id="testimonials" className="py-28 md:py-40 bg-[#020204] relative overflow-hidden font-sans">

            {/* Scoped Styles */}
            <style>{`
                .testimonial-reveal {
                    opacity: 0;
                    transform: translateY(40px) scale(0.98);
                    transition: all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1);
                }
                .testimonial-reveal.active {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-12px) rotate(1deg); }
                }
                .float-animation {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .shimmer-border {
                    background: linear-gradient(90deg, transparent, rgba(106,53,255,0.3), transparent);
                    background-size: 200% 100%;
                    animation: shimmer 3s linear infinite;
                }
                .card-slide-enter {
                    transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>

            {/* Ambient Background Grid */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

            {/* Atmospheric Glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none z-0" style={{ background: `radial-gradient(circle, ${active.color}08, transparent 70%)` }}></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none z-0" style={{ background: `radial-gradient(circle, ${active.color}06, transparent 70%)` }}></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* --- Header --- */}
                <div className="testimonial-reveal mb-20 md:mb-28 max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: active.color }}></span>
                            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: active.color }}></span>
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Client Testimonials</span>
                    </div>
                    <h3 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-6">
                        Trusted by <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-400 to-gray-700">Innovators.</span>
                    </h3>
                    <p className="text-gray-500 text-lg md:text-xl font-light max-w-xl mx-auto">
                        Real results from real partnerships. See why industry leaders choose Devlyx for mission-critical projects.
                    </p>
                </div>

                {/* --- Main Testimonial Showcase --- */}
                <div className="testimonial-reveal max-w-6xl mx-auto" style={{ transitionDelay: '200ms' }}>

                    {/* Desktop: 3-Card Perspective Layout */}
                    <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-center min-h-[420px]">

                        {/* Previous Card (Dimmed) */}
                        <div
                            className="col-span-3 card-slide-enter cursor-pointer group"
                            onClick={goPrev}
                        >
                            <div className="relative p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] opacity-40 group-hover:opacity-60 group-hover:scale-[1.02] transition-all duration-500 h-[300px] flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: `linear-gradient(135deg, ${testimonials[prevIdx].color}, ${testimonials[prevIdx].color}88)` }}>
                                            {testimonials[prevIdx].initials}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-bold">{testimonials[prevIdx].name}</p>
                                            <p className="text-gray-600 text-[10px]">{testimonials[prevIdx].company}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">"{testimonials[prevIdx].quote.substring(0, 120)}..."</p>
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3 h-3" style={{ color: testimonials[prevIdx].color }} viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Active Card (Hero) */}
                        <div className="col-span-6 card-slide-enter">
                            <div className="relative p-10 md:p-12 bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] overflow-hidden backdrop-blur-sm float-animation">

                                {/* Shimmer Top Border */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] shimmer-border"></div>

                                {/* Glow */}
                                <div className="absolute -inset-1 opacity-30 blur-[80px] pointer-events-none -z-10" style={{ background: `radial-gradient(ellipse at center, ${active.color}15, transparent 70%)` }}></div>

                                {/* Quote Icon */}
                                <div className="mb-8">
                                    <svg className="w-12 h-12 opacity-20" style={{ color: active.color }} viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>

                                {/* Quote Text */}
                                <p className="text-white/90 text-lg md:text-xl leading-relaxed font-medium mb-10">
                                    "{active.quote}"
                                </p>

                                {/* Divider */}
                                <div className="w-full h-[1px] bg-white/5 mb-8"></div>

                                {/* Bottom: Author + Metric */}
                                <div className="flex items-center justify-between flex-wrap gap-6">

                                    {/* Author */}
                                    <div className="flex items-center gap-4">
                                        {/* Avatar with gradient ring */}
                                        <div className="relative">
                                            <div className="absolute -inset-[2px] rounded-full" style={{ background: `linear-gradient(135deg, ${active.color}, ${active.color}44)` }}></div>
                                            <div className="relative w-14 h-14 rounded-full bg-[#0a0a0f] flex items-center justify-center text-sm font-black text-white" style={{ textShadow: `0 0 20px ${active.color}` }}>
                                                {active.initials}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-base">{active.name}</p>
                                            <p className="text-gray-500 text-sm">{active.role}</p>
                                            <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: active.color }}>{active.company}</p>
                                        </div>
                                    </div>

                                    {/* Key Metric */}
                                    <div className="text-right px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <p className="text-3xl md:text-4xl font-black tracking-tighter" style={{ color: active.color }}>{active.metric}</p>
                                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{active.metricLabel}</p>
                                    </div>
                                </div>

                                {/* Star Rating */}
                                <div className="flex gap-1 mt-6">
                                    {[...Array(active.rating)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5" style={{ color: active.color }} viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Next Card (Dimmed) */}
                        <div
                            className="col-span-3 card-slide-enter cursor-pointer group"
                            onClick={goNext}
                        >
                            <div className="relative p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] opacity-40 group-hover:opacity-60 group-hover:scale-[1.02] transition-all duration-500 h-[300px] flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: `linear-gradient(135deg, ${testimonials[nextIdx].color}, ${testimonials[nextIdx].color}88)` }}>
                                            {testimonials[nextIdx].initials}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-bold">{testimonials[nextIdx].name}</p>
                                            <p className="text-gray-600 text-[10px]">{testimonials[nextIdx].company}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">"{testimonials[nextIdx].quote.substring(0, 120)}..."</p>
                                </div>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3 h-3" style={{ color: testimonials[nextIdx].color }} viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile: Full-width Single Card */}
                    <div className="lg:hidden">
                        <div className="relative p-8 bg-white/[0.03] border border-white/[0.08] rounded-[2rem] overflow-hidden backdrop-blur-sm">

                            <div className="absolute top-0 left-0 right-0 h-[1px] shimmer-border"></div>
                            <div className="absolute -inset-1 opacity-20 blur-[60px] pointer-events-none -z-10" style={{ background: `radial-gradient(ellipse at center, ${active.color}15, transparent 70%)` }}></div>

                            {/* Quote Icon */}
                            <svg className="w-10 h-10 opacity-20 mb-6" style={{ color: active.color }} viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>

                            <p className="text-white/90 text-base leading-relaxed font-medium mb-8">
                                "{active.quote}"
                            </p>

                            <div className="w-full h-[1px] bg-white/5 mb-6"></div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative">
                                    <div className="absolute -inset-[2px] rounded-full" style={{ background: `linear-gradient(135deg, ${active.color}, ${active.color}44)` }}></div>
                                    <div className="relative w-12 h-12 rounded-full bg-[#0a0a0f] flex items-center justify-center text-xs font-black text-white">
                                        {active.initials}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{active.name}</p>
                                    <p className="text-gray-500 text-xs">{active.role}</p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest mt-0.5" style={{ color: active.color }}>{active.company}</p>
                                </div>
                            </div>

                            {/* Metric + Stars Row */}
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex gap-0.5">
                                    {[...Array(active.rating)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4" style={{ color: active.color }} viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black tracking-tighter" style={{ color: active.color }}>{active.metric}</p>
                                    <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">{active.metricLabel}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Navigation Controls --- */}
                    <div className="testimonial-reveal flex items-center justify-center gap-6 mt-12 md:mt-16" style={{ transitionDelay: '400ms' }}>

                        {/* Prev Button */}
                        <button
                            onClick={goPrev}
                            className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 active:scale-90"
                            aria-label="Previous testimonial"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Dot Indicators */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((t, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    className="group relative flex items-center justify-center transition-all duration-500"
                                    aria-label={`Go to testimonial ${i + 1}`}
                                >
                                    <div
                                        className={`rounded-full transition-all duration-500 ${i === activeIndex
                                            ? 'w-8 h-2'
                                            : 'w-2 h-2 group-hover:scale-125'
                                            }`}
                                        style={{
                                            backgroundColor: i === activeIndex ? t.color : 'rgba(255,255,255,0.15)',
                                            boxShadow: i === activeIndex ? `0 0 15px ${t.color}50` : 'none'
                                        }}
                                    ></div>
                                </button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={goNext}
                            className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 active:scale-90"
                            aria-label="Next testimonial"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* --- Trust Badge Strip --- */}
                    <div className="testimonial-reveal mt-16 md:mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-14" style={{ transitionDelay: '600ms' }}>
                        {[
                            { value: '250+', label: 'Global Clients' },
                            { value: '15+', label: 'Years Experience' },
                            { value: '99%', label: 'Client Satisfaction' },
                            { value: '24/7', label: 'Support Available' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center group cursor-default">
                                <p className="text-2xl md:text-3xl font-black text-white/80 tracking-tighter group-hover:text-white transition-colors duration-300">
                                    {stat.value}
                                </p>
                                <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest mt-1 group-hover:text-gray-400 transition-colors duration-300">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Testimonials;
