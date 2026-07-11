import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    // Reusable animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section id="about" className="py-24 md:py-32 bg-[#fcfcfd] relative overflow-hidden">
            {/* Ambient background matching Hero */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#6a35ff]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#00c2cb]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
                
                {/* Header Section (Split Layout) */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 lg:items-end mb-16 lg:mb-24">
                    <div className="flex-1">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-sm mb-6"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6a35ff] animate-pulse" />
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em]">Who We Are</span>
                        </motion.div>

                        <motion.h2 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-4xl sm:text-5xl lg:text-[4.5rem] font-black text-gray-950 tracking-tighter leading-[0.95]"
                        >
                            We engineer <br className="hidden lg:block"/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] to-[#00c2cb]">
                                digital excellence.
                            </span>
                        </motion.h2>
                    </div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="flex-1 max-w-lg lg:pb-3"
                    >
                        <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
                            Devlyx Solutions is a specialized engineering faction. We don't just write code; we meticulously craft performance-driven, scalable architectures for the modern web.
                        </p>
                    </motion.div>
                </div>

                {/* Main Visual & Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 lg:mb-24">
                    
                    {/* Image Card (8 cols) */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-8 h-[350px] md:h-[500px] rounded-[2rem] overflow-hidden relative group shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100"
                    >
                        <img
                            src="/about-tech.png"
                            alt="Devlyx Engineering Setup"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />
                        
                        <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 flex justify-between items-end">
                            <div>
                                <h3 className="text-white font-black text-2xl md:text-3xl mb-1">Global HQ</h3>
                                <p className="text-white/80 text-sm font-medium">Where innovation happens daily.</p>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="text-white text-[10px] font-black uppercase tracking-widest">Online</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Column (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-6">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex-1 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center group hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="text-5xl lg:text-7xl font-black text-gray-950 mb-2">15<span className="text-[#6a35ff]">+</span></div>
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Years Mastery</div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex-1 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-center items-center text-center group hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="text-5xl lg:text-7xl font-black text-gray-950 mb-2">250<span className="text-[#00c2cb]">+</span></div>
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Global Clients</div>
                        </motion.div>
                    </div>
                </div>

                {/* 3 Value Proposition Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    
                    {/* Mission */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(106,53,255,0.08)] transition-shadow duration-300 relative overflow-hidden group"
                    >
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#6a35ff]/5 rounded-full blur-2xl group-hover:bg-[#6a35ff]/15 transition-colors duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-[#6a35ff]/10 flex items-center justify-center text-[#6a35ff] mb-8 border border-[#6a35ff]/20 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Our Specialty</h4>
                        <h3 className="text-2xl font-black text-gray-950 mb-4 tracking-tight">The Mission</h3>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            To architect unbreakable applications that drive exponential growth. We cut through the noise with uncompromised code quality.
                        </p>
                    </motion.div>

                    {/* Vision */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-[2rem] p-8 md:p-10 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,194,203,0.08)] transition-shadow duration-300 relative overflow-hidden group"
                    >
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#00c2cb]/5 rounded-full blur-2xl group-hover:bg-[#00c2cb]/15 transition-colors duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-[#00c2cb]/10 flex items-center justify-center text-[#00c2cb] mb-8 border border-[#00c2cb]/20 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </div>
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Future Forward</h4>
                        <h3 className="text-2xl font-black text-gray-950 mb-4 tracking-tight">The Vision</h3>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            Redefining digital craftsmanship. We build frictionless, future-proof ecosystems that set the benchmark for modern web experiences.
                        </p>
                    </motion.div>

                    {/* Approach - Inverted Dark Card for Contrast */}
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-950 rounded-[2rem] p-8 md:p-10 border border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group text-white"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8 border border-white/20 group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </div>
                        <h4 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-2">Execution</h4>
                        <h3 className="text-2xl font-black text-white mb-4 tracking-tight">The Approach</h3>
                        <p className="text-white/60 font-medium leading-relaxed">
                            We partner with you to solve complex business problems through beautifully engineered, scalable technology and pristine design.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
