import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Slide Data ─────────────────────────────────────────────────── */
const slides = [
    {
        tagline: "Custom Software Development",
        title1: "We Build",
        titleGradient: "Scalable Software",
        title2: "That Drives Growth.",
        description: "End-to-end web & mobile solutions — from idea to live, revenue-generating products. Scalable, secure, and pixel-perfect on every device.",
        accentColor: "#6a35ff",
        service: "Web & App Development",
        serviceIcon: "https://cdn.simpleicons.org/react/61DAFB",
        serviceIconAlt: "React",
        benefits: [
            "High-performance web & mobile apps",
            "Pixel-perfect UI/UX design",
            "Scalable cloud architecture",
        ],
        stack: [
            { logo: "https://cdn.simpleicons.org/laravel/FF2D20", name: "Laravel" },
            { logo: "https://cdn.simpleicons.org/react/61DAFB", name: "React" },
            { logo: "https://cdn.simpleicons.org/flutter/54C5F8", name: "Flutter" },
            { logo: "https://cdn.simpleicons.org/nodedotjs/339933", name: "Node.js" },
        ],
        stats: [
            { value: "100+", label: "Projects" },
            { value: "50+", label: "Clients" },
            { value: "5★", label: "Rating" },
        ],
    },
    {
        tagline: "Enterprise Backend Engineering",
        title1: "We Engineer",
        titleGradient: "Robust Systems",
        title2: "For Enterprise Scale.",
        description: "Secure, high-availability backend APIs and cloud systems. From REST to real-time deployments — engineered to handle millions of users reliably.",
        accentColor: "#FF2D20",
        service: "Backend & Cloud Solutions",
        serviceIcon: "https://cdn.simpleicons.org/laravel/FF2D20",
        serviceIconAlt: "Laravel",
        benefits: [
            "Secure & scalable REST / GraphQL APIs",
            "99.9% uptime with cloud redundancy",
            "AWS, GCP & Docker deployments",
        ],
        stack: [
            { logo: "https://cdn.simpleicons.org/laravel/FF2D20", name: "Laravel" },
            { logo: "https://cdn.simpleicons.org/mysql/4479A1", name: "MySQL" },
            { logo: "https://cdn.simpleicons.org/amazonaws/FF9900", name: "AWS" },
            { logo: "https://cdn.simpleicons.org/docker/2496ED", name: "Docker" },
        ],
        stats: [
            { value: "99.9%", label: "Uptime" },
            { value: "5ms", label: "Avg Latency" },
            { value: "24/7", label: "Monitoring" },
        ],
    },
    {
        tagline: "AI & Automation Agency",
        title1: "We Automate",
        titleGradient: "With AI Power",
        title2: "To 10x Efficiency.",
        description: "Custom AI models, automation pipelines, and GPT-powered tools that eliminate manual work, cut operational costs, and scale your business 10x.",
        accentColor: "#3776AB",
        service: "AI & Machine Learning",
        serviceIcon: "https://cdn.simpleicons.org/python/3776AB",
        serviceIconAlt: "Python",
        benefits: [
            "Custom GPT & LLM integrations",
            "Predictive analytics & ML models",
            "Workflow automation at scale",
        ],
        stack: [
            { logo: "https://cdn.simpleicons.org/python/3776AB", name: "Python" },
            { logo: "https://cdn.simpleicons.org/tensorflow/FF6F00", name: "TensorFlow" },
            { logo: "https://cdn.simpleicons.org/pytorch/EE4C2C", name: "PyTorch" },
            { logo: "https://cdn.simpleicons.org/huggingface/FFD21E", name: "HuggingFace" },
        ],
        stats: [
            { value: "10x", label: "Faster" },
            { value: "60%", label: "Cost Cut" },
            { value: "AI", label: "Powered" },
        ],
    },
];

/* ── Component ──────────────────────────────────────────────────── */
const Hero = () => {
    const canvasRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-play slider
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5500);
        return () => clearInterval(interval);
    }, []);

    // Interactive Magnetic Wave Grid
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        let cols, rows;
        const spacing = 40; // Space between dots
        let dots = [];
        const mouse = { x: -1000, y: -1000, radius: 250 };
        let time = 0;

        const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        function init() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            cols = Math.floor(canvas.width / spacing) + 2;
            rows = Math.floor(canvas.height / spacing) + 2;
            dots = [];
            
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push({
                        x: i * spacing,
                        y: j * spacing,
                        baseX: i * spacing,
                        baseY: j * spacing,
                    });
                }
            }
        }

        let animId;
        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            time += 0.015;
            
            dots.forEach(dot => {
                // Organic wave effect
                const waveY = Math.sin(dot.baseX * 0.005 + time) * 15;
                const waveX = Math.cos(dot.baseY * 0.005 + time) * 15;
                
                let targetX = dot.baseX + waveX;
                let targetY = dot.baseY + waveY;
                
                // Magnetic repel effect from mouse
                const dx = targetX - mouse.x;
                const dy = targetY - mouse.y;
                const distance = Math.hypot(dx, dy);
                
                let size = 1.2;
                let alpha = 0.15;
                
                if (distance < mouse.radius) {
                    const force = Math.pow((mouse.radius - distance) / mouse.radius, 1.5);
                    targetX += (dx / distance) * force * 60;
                    targetY += (dy / distance) * force * 60;
                    size += force * 2.5;
                    alpha += force * 0.5;
                }
                
                // Smooth follow
                dot.x += (targetX - dot.x) * 0.1;
                dot.y += (targetY - dot.y) * 0.1;
                
                // Draw
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(106, 53, 255, ${alpha})`;
                ctx.fill();
            });
            
            animId = requestAnimationFrame(animate);
        }
        init(); animate();
        window.addEventListener('resize', init);
        return () => {
            window.removeEventListener('resize', init);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animId);
        };
    }, []);

    const slide = slides[currentSlide];

    const renderCtaButtons = (extraClass = "") => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className={`inline-flex flex-col sm:flex-row items-center gap-2 bg-white/75 backdrop-blur-xl p-2 rounded-[24px] border border-gray-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.06)] w-full sm:w-auto max-w-md sm:max-w-none ${extraClass}`}
        >
            <Link to="/start-project" className="w-full sm:w-auto block sm:inline-block">
                <button 
                    className="group relative w-full sm:w-auto bg-gray-950 text-white px-7 py-3.5 rounded-[18px] font-black text-[10px] tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-95 overflow-hidden shadow-sm"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        BOOK CONSULTATION
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                    </span>
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            background: `linear-gradient(90deg, ${slide.accentColor}, #00c2cb)`
                        }}
                    />
                </button>
            </Link>

            <a href="#projects" className="w-full sm:w-auto block sm:inline-block text-center sm:text-left">
                <div 
                    className="group flex items-center justify-center gap-2.5 px-6 py-3 rounded-[18px] text-[10px] font-black tracking-[0.2em] text-gray-700 hover:text-gray-900 transition-colors duration-300 cursor-pointer"
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = slide.accentColor;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#374151';
                    }}
                >
                    <span>VIEW WORK</span>
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100/80 group-hover:bg-gray-100 transition-all duration-300 group-hover:translate-y-0.5">
                        <svg className="w-3 h-3 text-gray-500 group-hover:text-gray-950" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </span>
                </div>
            </a>
        </motion.div>
    );

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-mesh px-4 md:px-6 pt-28 md:pt-32 pb-16 overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-50" />

            {/* Ambient glows */}
            <div className="absolute top-1/4 -right-16 w-80 h-80 bg-[#6a35ff]/8 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -left-16 w-80 h-80 bg-[#00c2cb]/8 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                    {/* ── LEFT: Text Content ──────────────────────────── */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-1">

                        {/* Animated text — fixed height, absolute positioned to prevent ANY layout jump */}
                        <div className="relative w-full min-h-[340px] sm:min-h-[380px] md:min-h-[420px] xl:min-h-[460px] mb-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -16 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="absolute inset-0 flex flex-col items-center lg:items-start"
                                >
                                    {/* Tagline */}
                                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gray-100 shadow-sm mb-5 w-fit">
                                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: slide.accentColor, boxShadow: `0 0 6px ${slide.accentColor}` }} />
                                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em]">{slide.tagline}</span>
                                    </div>

                                    {/* Heading */}
                                    <h1 className="text-[2.4rem] sm:text-5xl md:text-6xl xl:text-7xl font-black text-gray-950 leading-[0.92] tracking-tighter mb-5 text-center lg:text-left">
                                        {slide.title1}&nbsp;<br />
                                        <span className="text-gradient">{slide.titleGradient}</span><br />
                                        <span className="text-gray-800">{slide.title2}</span>
                                    </h1>

                                    {/* Description */}
                                    <p className="text-gray-500 text-base md:text-[1.05rem] max-w-lg leading-relaxed font-light text-center lg:text-left">
                                        {slide.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>



                        {/* Slide dots */}
                        <div className="flex gap-2 mb-8">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    aria-label={`Slide ${i + 1}`}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-7 bg-[#6a35ff]' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                                />
                            ))}
                        </div>

                        {renderCtaButtons("hidden lg:inline-flex mb-8")}

                        {/* Trust bar */}

                    </div>

                    {/* ── RIGHT: Service Card ─────────────────────────── */}
                    <div className="order-2 w-full flex flex-col gap-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -30, scale: 0.97 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="w-full"
                            >
                                {/* Main Service Card */}
                                <div className="relative bg-white rounded-3xl border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden p-6 md:p-8 min-h-[420px] flex flex-col">

                                    {/* Background color glow */}
                                    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20 blur-2xl pointer-events-none transition-all duration-700" style={{ background: slide.accentColor }} />

                                    {/* Devlyx logo watermark in background */}
                                    <div className="absolute -bottom-8 -right-8 w-64 h-64 pointer-events-none select-none">
                                        <img
                                            src="/devlyxsol-01.webp"
                                            alt=""
                                            aria-hidden="true"
                                            className="w-full h-full object-contain"
                                            style={{ 
                                                opacity: 0.045,
                                                filter: `blur(1px) drop-shadow(0 0 60px ${slide.accentColor})` 
                                            }}
                                        />
                                    </div>

                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            {/* Tech Logo */}
                                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border border-gray-50" style={{ background: `${slide.accentColor}12` }}>
                                                <img
                                                    src={slide.serviceIcon}
                                                    alt={slide.serviceIconAlt}
                                                    className="w-9 h-9 object-contain"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Our Specialty</p>
                                                <h2 className="text-lg md:text-xl font-black text-gray-950 leading-tight">{slide.service}</h2>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Benefits */}
                                    <div className="flex flex-col gap-3 mb-6">
                                        {slide.benefits.map((b, i) => (
                                            <div key={i} className="flex items-center gap-3 group">
                                                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: `${slide.accentColor}18` }}>
                                                    <svg className="w-3 h-3" fill="none" stroke={slide.accentColor} viewBox="0 0 24 24" strokeWidth="3">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm text-gray-700 font-medium">{b}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

                                    {/* Stats row */}
                                    <div className="grid grid-cols-3 gap-3 mb-6">
                                        {slide.stats.map((s, i) => (
                                            <div key={i} className="text-center p-3 rounded-2xl bg-gray-50 border border-gray-100">
                                                <div className="text-xl md:text-2xl font-black text-gray-950 leading-none mb-1" style={{ color: i === 0 ? slide.accentColor : undefined }}>{s.value}</div>
                                                <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-400">{s.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Tech Stack</p>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            {slide.stack.map((tech) => (
                                                <div key={tech.name} className="flex items-center gap-2 bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm px-3 py-2 rounded-xl transition-all duration-200 cursor-default group">
                                                    <img
                                                        src={tech.logo}
                                                        alt={tech.name}
                                                        className="w-4 h-4 object-contain group-hover:scale-110 transition-transform duration-200"
                                                        onError={(e) => { e.target.style.display = 'none'; }}
                                                    />
                                                    <span className="text-[10px] font-black text-gray-700 uppercase tracking-wide">{tech.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {renderCtaButtons("inline-flex lg:hidden mt-6 mx-auto")}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
