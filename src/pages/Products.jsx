import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projectService } from '../services/projectService';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Video } from 'lucide-react';
import { getYouTubeEmbedUrl } from '../utils/youtube';

const Products = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeVideo, setActiveVideo] = useState(null);

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
                const productItems = data.filter(p => p.entryType === 'product');
                setProjects(productItems);
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
                <title>Products | Devlyx Solutions</title>
                <meta name="description" content="Explore our complete suite of high-performance digital products and tools." />
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
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-800">Our Products</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none mb-6"
                    >
                        Tools <span className="text-[#6a35ff]">&</span> Products
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed mb-16"
                    >
                        Explore our suite of premium SaaS applications and digital products engineered for scale.
                    </motion.p>

                    {/* Search and Filters - Ultra Modern & Premium */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-gray-200/60 p-3 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center gap-3"
                    >
                        {/* Search Bar */}
                        <div className="relative w-full md:w-[320px] shrink-0">
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
                        <div className="hidden md:block w-[1px] h-8 bg-gray-200 shrink-0" />

                        {/* Categories List */}
                        <div className="flex-1 min-w-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <div className="flex gap-2 p-1 w-max">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`shrink-0 px-5 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${activeCategory === cat
                                            ? 'bg-gradient-to-r from-[#6a35ff] to-[#4f46e5] text-white shadow-lg shadow-purple-500/20 scale-[1.03]'
                                            : 'text-gray-400 hover:text-gray-900 bg-transparent hover:bg-gray-50'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>



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
                                    <div className="relative w-full h-auto overflow-hidden bg-gray-100 shrink-0 block">
                                        <Link to={`/projects/${proj.slug}`} className="block">
                                            {proj.image ? (
                                                <img src={proj.image} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out" alt={proj.title} />
                                            ) : (
                                                <div
                                                    className="w-full h-[240px]"
                                                    style={{ background: `linear-gradient(135deg, ${proj.color || '#6a35ff'}33 0%, #f8f9fc 100%)` }}
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                        </Link>

                                        {/* Category Badge */}
                                        <div className="absolute top-6 left-6 inline-flex border border-white/20 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full pointer-events-none">
                                            <span className="text-[9px] font-bold text-white uppercase tracking-widest">{proj.category}</span>
                                        </div>

                                        {/* Growth Badge */}
                                        {proj.growthBadge && (
                                            <div className="absolute top-6 right-6 inline-flex border border-white/20 bg-[#00c2cb] px-3 py-1 rounded-full shadow-lg shadow-[#00c2cb]/20 transform group-hover:scale-105 transition-transform pointer-events-none">
                                                <span className="text-[9px] font-black text-white uppercase tracking-widest flex items-center gap-1">
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                                    {proj.growthBadge}
                                                </span>
                                            </div>
                                        )}

                                        {/* Watch Demo Video Button on Card Overlay */}
                                        {proj.videoUrl && (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setActiveVideo({ url: proj.videoUrl, title: proj.title });
                                                }}
                                                className="absolute bottom-5 right-5 z-10 flex items-center gap-2 px-3.5 py-2 bg-white/95 hover:bg-white text-gray-900 rounded-full font-black uppercase text-[9px] tracking-widest shadow-xl backdrop-blur-md transform hover:scale-105 active:scale-95 transition-all"
                                            >
                                                <span className="w-4 h-4 rounded-full bg-red-600 text-white flex items-center justify-center">
                                                    <Play size={8} className="fill-white translate-x-[0.5px]" />
                                                </span>
                                                <span>Watch Demo</span>
                                            </button>
                                        )}
                                    </div>

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

                                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                                            <Link to={`/projects/${proj.slug}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[#6a35ff] hover:text-purple-700 transition-colors group-hover:translate-x-1 duration-300">
                                                Explore Case Study
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                            </Link>
                                            {proj.videoUrl && (
                                                <button
                                                    onClick={() => setActiveVideo({ url: proj.videoUrl, title: proj.title })}
                                                    className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase text-red-600 hover:text-red-700 transition-colors"
                                                >
                                                    <Play size={10} className="fill-red-600" />
                                                    Video Demo
                                                </button>
                                            )}
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

            {/* Video Modal */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveVideo(null)}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-8"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-4xl bg-[#0e0e10] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141418]">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center">
                                        <Play size={14} className="fill-red-500 translate-x-[0.5px]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm tracking-tight line-clamp-1">{activeVideo.title}</h3>
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Product Video Demo</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setActiveVideo(null)}
                                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Video Player */}
                            <div className="relative aspect-video w-full bg-black">
                                <iframe
                                    src={getYouTubeEmbedUrl(activeVideo.url, true)}
                                    title={activeVideo.title || "Product Demo"}
                                    className="w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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

export default Products;
