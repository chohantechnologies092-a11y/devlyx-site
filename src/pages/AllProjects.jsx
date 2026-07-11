import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projectService } from '../services/projectService';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const AllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];
    const filtered = projects.filter(p => {
        const matchesSearch = (p.title || '').toLowerCase().includes(search.toLowerCase()) || (p.desc || '').toLowerCase().includes(search.toLowerCase());
        const matchesCat = activeCategory === 'All' || p.category === activeCategory;
        return matchesSearch && matchesCat;
    });

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectService.getAllProjects();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="w-full bg-[#fcfcfd] min-h-screen">
            <Helmet>
                <title>Portfolio | Devlyx Solutions</title>
                <meta name="description" content="Explore our complete portfolio of high-performance mobile apps, web platforms, and digital ecosystems." />
            </Helmet>
            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 pb-16 px-6 overflow-hidden relative">
                {/* Abstract Ambient Lights */}
                <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#6a35ff]/15 to-[#00c2cb]/15 blur-[140px] rounded-full pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#00c2cb]/10 to-[#ff00a0]/8 blur-[160px] rounded-full pointer-events-none z-0 animate-pulse" style={{ animationDuration: '12s' }} />

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2.5 px-4.5 py-2 bg-white/70 backdrop-blur-md rounded-full border border-gray-200/50 shadow-sm mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#00c2cb] inline-block shadow-[0_0_8px_#00c2cb] animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-800">Our Masterpieces</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none mb-6"
                    >
                        Crafting Digital <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] via-[#3b82f6] to-[#00c2cb]">Landmarks.</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-gray-500 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto font-light"
                    >
                        A curated archive of high-concurrency mobile apps, scalable web platforms, and tailored digital experiences built to disrupt markets.
                    </motion.p>

                    {/* Search and Filters - Ultra Modern & Premium */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-gray-200/60 p-3 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center gap-3"
                    >
                        {/* Search Bar */}
                        <div className="relative w-full md:flex-1">
                            <svg className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search our creations..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-semibold text-gray-800 placeholder-gray-400"
                            />
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-[1px] h-8 bg-gray-200" />

                        {/* Categories List */}
                        <div className="flex gap-1.5 overflow-x-auto p-1 hide-scrollbar w-full md:w-auto shrink-0 justify-start md:justify-end">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${activeCategory === cat
                                        ? 'bg-gradient-to-r from-[#6a35ff] to-[#4f46e5] text-white shadow-lg shadow-purple-500/20 scale-[1.03]'
                                        : 'text-gray-400 hover:text-gray-900 bg-transparent hover:bg-gray-50'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured: Durood Circle Flagship */}
            {!loading && (() => {
                const flagship = projects.find(p => p.slug === 'durood-circle') || (projects.length > 0 ? projects[0] : null);
                if (!flagship) return null;
                return (
                    <section className="px-6 pb-4">
                        <div className="max-w-7xl mx-auto">
                            <div className="w-full rounded-[2.5rem] bg-gradient-to-br from-[#00321a] to-[#00170c] overflow-hidden relative shadow-[0_30px_60px_rgba(0,168,89,0.15)] flex flex-col lg:flex-row border border-[#00a859]/30 group">
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00a859]/15 blur-[120px] rounded-full pointer-events-none z-0" />
                                {/* Watermark */}
                                <img src="/img/durood-wt-01.svg" alt="" className="absolute top-1/2 -left-10 -translate-y-1/2 w-[600px] h-[600px] object-contain opacity-5 transform -rotate-[15deg] pointer-events-none z-0 brightness-0 invert" />

                                {/* Left Content */}
                                <div className="w-full lg:w-[55%] p-8 md:p-12 relative z-10 flex flex-col justify-center">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-5 w-fit backdrop-blur-md">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00a859] shadow-[0_0_8px_#00a859] animate-pulse" />
                                        <span className="text-[9px] font-bold text-white uppercase tracking-[0.15em]">⭐ Featured Project · {flagship.category}</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tighter leading-[0.95]">
                                        {flagship.title?.split(' ')[0]} <br />
                                        <span className="text-[#00a859]">{flagship.title?.split(' ').slice(1).join(' ')}.</span>
                                    </h2>
                                    <p className="text-white/60 text-sm md:text-base font-medium mb-6 leading-relaxed max-w-lg">
                                        {flagship.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {flagship.techStack?.map((tech, i) => (
                                            <span key={i} className="px-2.5 py-1 rounded bg-white/10 border border-white/5 text-[9px] font-bold text-[#b4f0cf] uppercase tracking-widest">{tech}</span>
                                        ))}
                                    </div>
                                    <ul className="space-y-2 mb-8">
                                        {flagship.features?.slice(0, 3).map((feat, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-medium">
                                                <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#00a859]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="flex flex-wrap gap-3">
                                        {flagship.links?.map((link, i) => {
                                            if (link.type === 'apple') return (
                                                <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-white text-black hover:bg-gray-100 rounded-xl font-bold transition-all hover:-translate-y-1 shadow-lg shadow-black/20 text-xs">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .76-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.36 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                                                    App Store
                                                </a>
                                            );
                                            if (link.type === 'google') return (
                                                <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-3 bg-[#111] border border-white/20 text-white hover:bg-[#222] rounded-xl font-bold transition-all hover:-translate-y-1 text-xs">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 20.5V3.5C3 2.9 3.5 2.5 4 2.5C4.2 2.5 4.3 2.5 4.5 2.6L18.8 11.1C19.4 11.4 19.4 12.6 18.8 12.9L4.5 21.4C4.3 21.5 4.2 21.5 4 21.5C3.5 21.5 3 21.1 3 20.5Z" /></svg>
                                                    Google Play
                                                </a>
                                            );
                                            return (
                                                <Link key={i} to={`/projects/${flagship.slug}`} className="flex items-center gap-2 px-5 py-3 bg-white/10 border border-white/20 text-white hover:bg-white/20 rounded-xl font-bold transition-all hover:-translate-y-1 text-xs">
                                                    View Case Study →
                                                </Link>
                                            );
                                        })}
                                        {(!flagship.links || flagship.links.length === 0) && (
                                            <Link to={`/projects/${flagship.slug}`} className="flex items-center gap-2 px-5 py-3 bg-[#00a859] text-white hover:bg-[#009950] rounded-xl font-bold transition-all hover:-translate-y-1 text-xs">
                                                View Case Study →
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                {/* Right: Phone Mockup */}
                                <div className="w-full lg:w-[45%] relative min-h-[320px] flex items-center justify-center p-10 z-10 overflow-hidden">
                                    <div className="relative w-full max-w-[200px] aspect-[1/2.16] bg-[#111111] rounded-[2rem] border-[8px] border-[#4c4949] shadow-2xl overflow-hidden transform lg:-rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-[1s] ease-out">
                                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#4c4949] rounded-full z-30" />
                                        {(flagship.mockupImage || flagship.image) ? (
                                            <img src={flagship.mockupImage || flagship.image} className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-700" alt={flagship.title} />
                                        ) : (
                                            <div className="w-full h-full" style={{ background: `linear-gradient(135deg, #00a859 0%, #003020 100%)` }} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })()}

            {/* Projects Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="w-10 h-10 border-4 border-[#6a35ff] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : filtered.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((proj, index) => (
                                <motion.div
                                    key={proj.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group relative rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full"
                                >
                                    {/* Top Image Section */}
                                    <Link to={`/projects/${proj.slug}`} className="relative w-full h-[240px] overflow-hidden bg-gray-100 shrink-0 block">
                                        {proj.image ? (
                                            <img src={proj.image} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out" alt={proj.title} />
                                        ) : (
                                            <div
                                                className="w-full h-full"
                                                style={{ background: `linear-gradient(135deg, ${proj.color || '#6a35ff'}33 0%, #f8f9fc 100%)` }}
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                        <div className="absolute top-6 left-6 inline-flex border border-white/20 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full">
                                            <span className="text-[9px] font-bold text-white uppercase tracking-widest">{proj.category}</span>
                                        </div>
                                    </Link>

                                    {/* Bottom Content Section */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <Link to={`/projects/${proj.slug}`}>
                                            <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-3 group-hover:text-[#6a35ff] transition-colors">{proj.title}</h3>
                                        </Link>
                                        <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed font-medium line-clamp-3">
                                            {proj.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {proj.techStack?.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="px-2 py-1 rounded bg-gray-50 border border-gray-100 text-[9px] font-bold text-gray-500 uppercase tracking-widest">{tech}</span>
                                            ))}
                                            {proj.techStack?.length > 3 && (
                                                <span className="px-2 py-1 rounded bg-gray-50 border border-gray-100 text-[9px] font-bold text-gray-400 uppercase tracking-widest">+{proj.techStack.length - 3}</span>
                                            )}
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-gray-50">
                                            <Link to={`/projects/${proj.slug}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[#6a35ff] hover:text-purple-700 transition-colors group-hover:translate-x-1 duration-300">
                                                Explore Case Study
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100 max-w-2xl mx-auto">
                            <h3 className="text-xl font-black text-gray-900 mb-2">No projects found.</h3>
                            <p className="text-gray-500 text-sm">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 px-6 bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-6">Ready to start your project?</h2>
                    <p className="text-gray-500 text-lg mb-10">Let's build something extraordinary together.</p>
                    <Link to="/#contact" className="inline-flex items-center gap-3 px-8 py-4 bg-[#1d1d1f] text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#6a35ff] hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:-translate-y-1">
                        Get In Touch
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AllProjects;
