import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative pt-24 pb-8 px-6 bg-[#0a0a0b] font-sans border-t border-[#1d1d1f]/30 overflow-hidden">

            {/* Ambient Lighting */}
            <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-[#6a35ff]/[0.05] blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#00c2cb]/[0.04] blur-[120px] rounded-full pointer-events-none"></div>

            {/* Background Text - Moved Up & Positioned Carefully */}
            <div className="absolute top-10 left-0 w-full pointer-events-none overflow-hidden select-none z-0">
                <h2 className="text-[14vw] leading-none font-black text-center text-transparent bg-clip-text bg-gradient-to-b from-white/[0.04] to-transparent uppercase tracking-tighter whitespace-nowrap">
                    DEVLYX SOLUTIONS
                </h2>
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-12">

                    {/* Brand & Social Section */}
                    <div className="md:col-span-5 space-y-8">
                        <Link to="/" className="inline-flex items-center gap-4 group">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:rotate-6 border border-white/10">
                                <img src="/devlyxsol-01.png" alt="Devlyx" className="w-8 h-auto brightness-0" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-black tracking-tighter text-white">DEVLYX</span>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#00c2cb] font-bold">Solutions</span>
                            </div>
                        </Link>

                        <p className="text-gray-400 text-sm md:text-base font-medium leading-relaxed max-w-sm">
                            Architecting high-performance digital ecosystems with master-level engineering and breathtaking aesthetics.
                        </p>

                        {/* Refined Social Icons */}
                        <div className="flex gap-4 pt-2">
                            {[
                                { name: 'WhatsApp', color: '#25D366', link: 'https://wa.me/+923395129192', path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.005 0C5.37 0 .002 5.368.002 12.006c0 2.092.548 4.136 1.59 5.927L0 24l6.339-1.656a11.847 11.847 0 005.666 1.44h.005c6.635 0 12.003-5.368 12.003-12.005 0-3.208-1.249-6.228-3.52-8.497z' },
                                { name: 'Instagram', color: '#E1306C', link: 'https://www.instagram.com/devlyx_solutions/', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                                { name: 'Facebook', color: '#1877F2', link: 'https://facebook.com/profile.php?id=61586420621668', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex items-center justify-center w-11 h-11 rounded-full bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white transition-all duration-300"
                                    style={{ '--hover-bg': social.color }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = social.color}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                                >
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.path} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-2 mt-4 md:mt-0">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6a35ff] mb-6">Sitemap</h4>
                        <ul className="space-y-4 text-sm font-bold text-gray-500">
                            {[
                                { name: "Home", path: "/" },
                                { name: "Identity", path: "/#about" },
                                { name: "Services", path: "/#services" },
                                { name: "Blog", path: "/blog" }
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link to={item.path} className="group flex items-center gap-2 hover:text-white transition-colors">
                                        <span className="w-0 overflow-hidden group-hover:w-4 transition-all text-[#6a35ff]">→</span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Expertise */}
                    <div className="md:col-span-2 mt-4 md:mt-0">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00c2cb] mb-6">Expertise</h4>
                        <ul className="space-y-4 text-sm font-bold text-gray-500">
                            {["Web Systems", "Mobile Apps", "UI/UX Design", "Cloud Architecture"].map((cat, idx) => (
                                <li key={idx} className="group flex items-center gap-2 hover:text-white transition-colors cursor-default">
                                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all text-[#00c2cb]">→</span>
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Call to Action Bento */}
                    <div className="md:col-span-3 mt-4 md:mt-0">
                        <div className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-md hover:border-[#6a35ff]/30 transition-all duration-500 h-full flex flex-col justify-between group overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#6a35ff]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="flex h-2 w-2 rounded-full bg-[#25D366] animate-pulse"></span>
                                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-white">Project Status</span>
                                </div>
                                <p className="text-gray-400 text-xs font-semibold leading-relaxed mb-6">
                                    Open for enterprise engineering engagements for Q3 2026.
                                </p>
                            </div>
                            <a href="#contact" className="w-full py-3 bg-white text-black text-center text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#00c2cb] hover:text-white transition-all">
                                Start Inquiry
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Legal Bar */}
                <div className="flex flex-col md:row justify-between items-center gap-4 border-t border-white/5 pt-8 mt-8">
                    <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                        © {currentYear} Devlyx Solutions. Engineered with Precision.
                    </p>
                    <div className="flex gap-6 text-[9px] font-bold text-gray-600 uppercase tracking-widest">
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;