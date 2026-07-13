import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../services/projectService';

const Projects = () => {
    const [projects, setProjects] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

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

    useEffect(() => {
        if (loading || projects.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            let delay = 0;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                        setTimeout(() => entry.target.classList.remove('project-reveal', 'active'), 1200);
                    }, delay);
                    delay += 150;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        document.querySelectorAll('.project-reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [loading, projects]);

    if (loading) {
        return (
            <section id="projects" className="relative w-full bg-[#fcfcfd] py-32 flex justify-center">
                <div className="w-12 h-12 border-4 border-[#6a35ff] border-t-transparent rounded-full animate-spin"></div>
            </section>
        );
    }

    if (projects.length === 0) {
        return (
            <section id="projects" className="relative w-full bg-[#fcfcfd] py-32 flex flex-col items-center">
                <h2 className="text-3xl font-black text-gray-400 uppercase tracking-widest">Projects Coming Soon</h2>
            </section>
        );
    }

    const flagshipProject = projects.find(p => p.slug === 'durood-circle') || projects[0];
    const gridProjects = projects.filter(p => p.id !== flagshipProject?.id).slice(0, 3);

    return (
        <section id="projects" className="relative w-full bg-[#fcfcfd] py-24 md:py-32 font-sans overflow-hidden">

            {/* Global Styles for Reveal */}
            <style>{`
                .project-reveal {
                    opacity: 0;
                    transform: translateY(40px) scale(0.98);
                    transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .project-reveal.active {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            `}</style>

            {/* Subtle Light Watermark */}
            <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none select-none z-0 hidden lg:block">
                <h1 className="text-[120px] xl:text-[220px] font-black tracking-tighter leading-none whitespace-nowrap text-gray-900/[0.02]">
                    DEPLOYS DEPLOYS DEPLOYS
                </h1>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* --- Section Header --- */}
                <div className="project-reveal flex flex-col items-center text-center mb-20 relative">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00c2cb] animate-pulse"></span>
                        <span className="text-[10px] font-bold text-[#1d1d1f] uppercase tracking-[0.1em]">Featured Cases</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1d1d1f] tracking-tighter leading-[1]">
                        Selected <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] via-[#00c2cb] to-[#00a859]">
                            Works.
                        </span>
                    </h2>
                    <p className="mt-6 text-gray-500 text-base md:text-lg font-medium leading-relaxed max-w-2xl px-4">
                        A gallery of functional artistry. We don't just build apps; we engineer <span className="text-[#1d1d1f] font-bold">scalable solutions</span> designed for maximum impact.
                    </p>
                </div>

                {/* --- FLAGSHIP HERO BLOCK (Durood Circle - Green Theme) --- */}
                {flagshipProject && (
                    <div className="project-reveal w-full max-w-[1200px] mx-auto mb-16 rounded-[2.5rem] bg-gradient-to-br from-[#00321a] to-[#00170c] overflow-hidden relative shadow-[0_30px_60px_rgba(0,168,89,0.2)] flex flex-col lg:flex-row border border-[#00a859]/30 group">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00a859]/20 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000 z-0"></div>

                        {/* Inverted White Background Logo Watermark */}
                        <img
                            src="/img/durood-wt-01.svg"
                            alt="Durood Logo Watermark"
                            className="absolute top-1/2 -left-20 -translate-y-1/2 w-[800px] h-[800px] lg:w-[900px] lg:h-[900px] object-contain opacity-5 transform -rotate-[15deg] pointer-events-none z-0 brightness-0 invert"
                        />

                        <div className="w-full lg:w-[50%] p-8 md:p-12 lg:p-16 relative z-10 flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6 w-fit backdrop-blur-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00a859] shadow-[0_0_8px_#00a859] animate-pulse"></span>
                                <span className="text-[9px] font-bold text-white uppercase tracking-[0.1em]">{flagshipProject.category}</span>
                            </div>

                            <h3 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter leading-[0.9]">
                                <Link to={`/projects/${flagshipProject.slug}`} className="hover:opacity-80 transition-opacity">
                                    {flagshipProject.title.split(' ')[0]} <br />
                                    <span className="text-[#00a859]">{flagshipProject.title.split(' ').slice(1).join(' ')}.</span>
                                </Link>
                            </h3>

                            <p className="text-white/70 text-sm md:text-base font-medium mb-8 leading-relaxed max-w-lg">
                                {flagshipProject.desc}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {flagshipProject.techStack?.map((tech, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded bg-white/10 border border-white/5 text-[9px] font-bold text-[#b4f0cf] uppercase tracking-widest">{tech}</span>
                                ))}
                            </div>

                            <ul className="space-y-2.5 mb-10">
                                {flagshipProject.features?.slice(0, 3).map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-medium">
                                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#00a859]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-3 mt-auto">
                                {flagshipProject.links?.map((link, i) => {
                                    if (link.type === 'apple') {
                                        return (
                                            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-black hover:bg-gray-100 rounded-xl font-bold transition-all hover:-translate-y-1 shadow-lg shadow-black/20">
                                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .76-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.36 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
                                                <div className="flex flex-col items-start leading-none">
                                                    <span className="text-[9px] uppercase tracking-wider text-gray-700">Download on the</span>
                                                    <span className="text-xs uppercase tracking-widest font-black">App Store</span>
                                                </div>
                                            </a>
                                        )
                                    }
                                    if (link.type === 'google') {
                                        return (
                                            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-3 bg-[#111111] border border-white/20 text-white hover:bg-[#222222] hover:-translate-y-1 rounded-xl font-bold transition-all shadow-lg shadow-black/20">
                                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M3 20.5V3.5C3 2.9 3.5 2.5 4 2.5C4.2 2.5 4.3 2.5 4.5 2.6L18.8 11.1C19.4 11.4 19.4 12.6 18.8 12.9L4.5 21.4C4.3 21.5 4.2 21.5 4 21.5C3.5 21.5 3 21.1 3 20.5Z" /></svg>
                                                <div className="flex flex-col items-start leading-none pl-1">
                                                    <span className="text-[9px] uppercase tracking-wider text-gray-400">Get it on</span>
                                                    <span className="text-xs uppercase tracking-widest font-black text-white">Google Play</span>
                                                </div>
                                            </a>
                                        )
                                    }
                                    return (
                                        <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-3 bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:-translate-y-1 rounded-xl font-bold transition-all shadow-lg shadow-black/20">
                                            <div className="flex flex-col items-start leading-none">
                                                <span className="text-[9px] uppercase tracking-wider text-gray-300">Explore</span>
                                                <span className="text-xs uppercase tracking-widest font-black text-white">{link.label}</span>
                                            </div>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Properly Adjusted Mobile Mockup Panel */}
                        <div className="w-full lg:w-[50%] relative min-h-[400px] flex items-center justify-center p-12 lg:p-16 z-10 overflow-hidden">
                            <div className="relative w-full max-w-[240px] md:max-w-[260px] aspect-[1/2.16] bg-[#111111] rounded-[2rem] md:rounded-[2.5rem] border-[8px] md:border-[10px] border-[#4c4949] shadow-2xl overflow-hidden transform lg:-rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-[1s] ease-out">
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 md:w-20 h-4 md:h-5 bg-[#4c4949] rounded-full z-30"></div>
                                {(flagshipProject.mockupImage || flagshipProject.image) ? (
                                    <img src={flagshipProject.mockupImage || flagshipProject.image} className="w-full h-full object-cover object-top opacity-100 transition-opacity duration-700" alt={flagshipProject.title} />
                                ) : (
                                    <div
                                        className="w-full h-full"
                                        style={{ background: `linear-gradient(135deg, ${flagshipProject.color || '#00a859'} 0%, #111 100%)` }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- STANDARD GRID DECK --- */}
                {gridProjects.length > 0 && (
                    <div className="relative w-full max-w-[1200px] mx-auto pb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {gridProjects.map((proj, index) => (
                                <div
                                    key={index}
                                    className="project-reveal group relative rounded-[2.5rem] bg-white border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                                >
                                    {/* Top Image Section */}
                                    <div className="relative w-full h-[260px] overflow-hidden bg-gray-100 shrink-0">
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
                                        <Link to={`/projects/${proj.slug}`}>
                                            <h3 className="absolute bottom-6 left-6 right-6 text-2xl font-black text-white tracking-tighter leading-tight hover:text-gray-200 transition-colors">{proj.title}</h3>
                                        </Link>
                                    </div>

                                    {/* Bottom Content Section */}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed font-medium line-clamp-3">
                                            {proj.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {proj.techStack?.slice(0, 4).map((tech, i) => (
                                                <span key={i} className="px-2 py-1 rounded bg-gray-50 border border-gray-100 text-[9px] font-bold text-gray-500 uppercase tracking-widest">{tech}</span>
                                            ))}
                                        </div>

                                        {proj.stats?.length > 0 && (
                                            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 mt-auto mb-6">
                                                {proj.stats.slice(0, 2).map((stat, i) => (
                                                    <div key={i}>
                                                        <div className="text-xl font-black text-[#1d1d1f] tracking-tighter">{stat.value}</div>
                                                        <div className="text-[9px] text-gray-400 uppercase font-black tracking-widest">{stat.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <Link to={`/projects/${proj.slug}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-[#6a35ff] hover:text-[#00c2cb] transition-colors mt-auto">
                                            View Case Study
                                            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- Bottom Light CTA --- */}
                <div className="project-reveal flex flex-col items-center text-center py-20 mt-10 relative">
                    <h4 className="text-3xl md:text-5xl font-black text-[#1d1d1f] tracking-tighter mb-8 max-w-2xl leading-tight">
                        Have an impossible idea? <br />
                        <span className="italic text-gray-400">Let's build it anyway.</span>
                    </h4>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <Link to="/projects" className="group/btn relative px-8 py-4 bg-white border border-gray-200 text-gray-900 rounded-full font-bold overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.05)]">
                            <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-[10px]">
                                View All Projects
                            </span>
                        </Link>
                        <a href="#contact" className="group/btn relative px-8 py-4 bg-[#6a35ff] text-white rounded-full font-bold overflow-hidden transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(106,53,255,0.2)]">
                            <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-[10px]">
                                Initiate Protocol
                                <svg className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </span>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Projects;
