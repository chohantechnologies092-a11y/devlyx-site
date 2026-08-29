import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { projectService } from '../services/projectService';
import { 
  ArrowLeft, Loader2, ExternalLink, Target, Zap, CheckCircle2,
  ChevronRight, Cpu, MapPin, TrendingUp, FileText, Sparkles,
  ArrowRight, Layout, BarChart2, Quote, Globe, X
} from 'lucide-react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// Removed custom parseContent since we are using Rich Text (HTML) now

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getProjectBySlug(slug);
        if (data) { setProject(data); } 
        else { navigate('/projects'); }
      } catch (error) { console.error("Error fetching project:", error); } 
      finally { setLoading(false); }
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#0a0a0a]">
        <Loader2 size={40} className="animate-spin text-white/50" />
        <div className="mt-6 text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">Curating Experience</div>
      </div>
    );
  }

  if (!project) return null;

  const color = project.color || '#6a35ff';

  return (
    <div className="w-full bg-white min-h-screen font-sans selection:bg-gray-900 selection:text-white overflow-x-hidden">
      <SEO 
        title={project.metaTitle || `${project.title} Case Study`} 
        description={project.metaDescription || project.desc} 
        keywords={project.metaKeywords || ''}
        image={project.image} 
      />
      
      {/* Reading Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 z-50 origin-left" style={{ scaleX, backgroundColor: color }} />
      
      {/* Navbar with dark theme integration */}
      <div className="absolute top-0 w-full z-50">
        <Navbar dark />
      </div>

      <main className="w-full">
        {/* Immersive Dark Hero */}
        <section ref={heroRef} className="relative w-full pt-48 md:pt-60 pb-32 md:pb-48 px-6 bg-[#0a0a0a] overflow-hidden">
           {/* Ambient Color Glows */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] md:w-[800px] md:h-[800px] rounded-full blur-[120px] opacity-[0.15] mix-blend-screen pointer-events-none" style={{ backgroundColor: color }} />
           
           <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-10"
              >
                 <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ backgroundColor: color }}></span>
                 <span className="text-[11px] font-bold text-white/80 uppercase tracking-[0.2em]">{project.category}</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white tracking-tighter leading-[0.9] max-w-5xl mx-auto"
              >
                 {project.title}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-white/60 font-light max-w-3xl mx-auto mt-10 leading-[1.6]"
              >
                 {project.desc}
              </motion.p>
           </motion.div>
        </section>

        {/* Parallax Hero Image & Glassmorphic Facts Bar */}
        <section className="px-4 md:px-8 w-full max-w-7xl mx-auto relative z-20 -mt-24 md:-mt-40 mb-32 md:mb-48">
           <motion.div 
             initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
             className="relative"
           >
              {project.image && (
                <div className="w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative bg-[#111] border border-white/10 flex items-center justify-center group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out" />
                </div>
              )}

              {/* Glassmorphic Facts Bar - Overlapping the image bottom */}
              <div className="absolute -bottom-16 md:-bottom-12 left-1/2 -translate-x-1/2 w-[95%] md:w-11/12 max-w-5xl bg-white/80 backdrop-blur-2xl border border-white p-6 md:p-8 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] z-30 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 text-gray-900">
                <div className="flex-1 w-full text-center md:text-left">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Client</p>
                  <h4 className="text-xl md:text-2xl font-bold tracking-tight">{project.client || "Confidential"}</h4>
                  {project.clientLocation && (
                    <div className="flex items-center justify-center md:justify-start gap-1.5 mt-1.5 text-xs font-medium text-gray-500">
                      <MapPin size={14} className="text-gray-400" /> {project.clientLocation}
                    </div>
                  )}
                </div>
                
                <div className="hidden md:block w-px h-16 bg-gray-200" />
                <div className="md:hidden w-full h-px bg-gray-200" />

                <div className="flex-[2] w-full text-center md:text-left">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center justify-center md:justify-start gap-2">
                    <Cpu size={14} /> Technologies
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {project.techStack?.map(t => (
                      <span key={t} className="px-3.5 py-1.5 bg-gray-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform cursor-default">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {project.links?.length > 0 && (
                  <>
                    <div className="hidden md:block w-px h-16 bg-gray-200" />
                    <div className="md:hidden w-full h-px bg-gray-200" />
                    <div className="flex-1 w-full flex flex-col gap-3">
                      {project.links.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-center md:justify-between px-6 py-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors group">
                          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-900">{link.label}</span>
                          <ExternalLink size={16} className="text-gray-400 group-hover:text-gray-900 transition-colors ml-3 md:ml-0" />
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
           </motion.div>
        </section>

        {/* Narrative - Elegant Storytelling */}
        <section className="w-full px-6 py-10 md:py-20 mt-20">
           <div className="max-w-[800px] mx-auto space-y-32">
              
              {project.challenge && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} className="space-y-8">
                   <div className="flex items-center gap-3 text-gray-400 mb-6">
                     <Target size={24} />
                     <span className="text-sm font-bold uppercase tracking-[0.2em]">The Challenge</span>
                   </div>
                   <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tighter leading-tight">
                      Navigating complexity.
                   </h3>
                   <div 
                      className="text-[20px] md:text-[22px] text-gray-600 font-light leading-[1.9] tracking-[-0.01em] prose prose-lg max-w-none prose-p:my-2" 
                      dangerouslySetInnerHTML={{ __html: project.challenge }} 
                   />
                </motion.div>
              )}

              {project.solution && (
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} className="space-y-8 relative">
                   <div className="absolute -left-12 -top-12 w-32 h-32 blur-[60px] opacity-20 pointer-events-none" style={{ backgroundColor: color }} />
                   <div className="flex items-center gap-3 mb-6" style={{ color }}>
                     <Zap size={24} />
                     <span className="text-sm font-bold uppercase tracking-[0.2em]">The Solution</span>
                   </div>
                   <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tighter leading-tight">
                      An uncompromising approach to engineering.
                   </h3>
                   <div 
                      className="text-[20px] md:text-[22px] text-gray-600 font-light leading-[1.9] tracking-[-0.01em] prose prose-lg max-w-none prose-p:my-2" 
                      dangerouslySetInnerHTML={{ __html: project.solution }} 
                   />
                </motion.div>
              )}

              {project.content && (
                <div className="pt-16 border-t border-gray-100 relative prose prose-lg md:prose-xl max-w-none prose-headings:font-extrabold prose-headings:tracking-tighter prose-a:text-[#6a35ff] prose-img:rounded-3xl prose-p:text-gray-600 prose-p:font-light">
                   <div dangerouslySetInnerHTML={{ __html: project.content }} />
                </div>
              )}

           </div>
        </section>

        {/* Impact Section - Premium Modern */}
        {((project.stats && project.stats.length > 0) || project.beforeStats || project.afterStats) && (
           <section className="w-full bg-[#050505] text-white py-32 px-6 rounded-[3rem] md:rounded-[5rem] my-32 max-w-[96%] mx-auto relative overflow-hidden shadow-2xl">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[200px] opacity-[0.08] pointer-events-none" style={{ backgroundColor: color }} />
              
              <div className="max-w-6xl mx-auto relative z-10">
                 <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                       <BarChart2 size={16} style={{ color }} />
                       <span className="text-[10px] font-bold text-white/80 uppercase tracking-[0.3em]">Measurable Impact</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight">The Results.</h2>
                 </div>

                 {/* Stats Grid */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-32 pb-24 border-b border-white/10">
                    {project.growthBadge && (
                       <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center">
                          <div className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" style={{ color }}>{project.growthBadge.split(' ')[0]}</div>
                          <div className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">{project.growthBadge.split(' ').slice(1).join(' ')}</div>
                       </motion.div>
                    )}
                    {project.stats?.map((s, i) => (
                       <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} key={i} className="text-center">
                          <div className="text-6xl md:text-7xl font-extrabold text-white mb-4 tracking-tighter">{s.value}</div>
                          <div className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">{s.label}</div>
                       </motion.div>
                    ))}
                 </div>

                 {/* Before / After */}
                 {(project.beforeStats || project.afterStats) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                       {project.beforeStats && (
                         <div className="p-10 md:p-14 rounded-[2.5rem] bg-white/5 border border-white/5 relative overflow-hidden backdrop-blur-xl">
                            <h4 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                              <TrendingUp size={18} className="rotate-180" /> Before Devlyx
                            </h4>
                            <div className="whitespace-pre-line text-xl md:text-2xl text-white/50 font-light leading-[1.8]">{project.beforeStats}</div>
                         </div>
                       )}
                       {project.afterStats && (
                         <div className="p-10 md:p-14 rounded-[2.5rem] bg-[#111] border border-white/10 relative overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700" style={{ background: `radial-gradient(circle at top right, ${color}, transparent 70%)` }} />
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-10 flex items-center gap-3" style={{ color }}>
                              <TrendingUp size={18} /> After Devlyx
                            </h4>
                            <div className="whitespace-pre-line text-xl md:text-2xl text-white font-light leading-[1.8] relative z-10">{project.afterStats}</div>
                         </div>
                       )}
                    </div>
                 )}
              </div>
           </section>
        )}

        {/* Premium Features Grid */}
        {project.features && project.features.length > 0 && project.features[0] !== '' && (
          <section className="w-full max-w-7xl mx-auto px-6 py-32">
             <div className="flex flex-col items-center text-center mb-20">
               <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-50 mb-8" style={{ color }}>
                  <Sparkles size={28} />
               </div>
               <h3 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tighter">Key Capabilities</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.features.map((f, i) => (
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}
                     key={i} className="p-8 rounded-[2rem] bg-gray-50/50 hover:bg-white border border-gray-100 hover:border-gray-200 transition-all hover:shadow-xl group"
                   >
                      <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ color }}>
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="text-[18px] font-medium text-gray-900 leading-snug">{f}</span>
                   </motion.div>
                ))}
             </div>
          </section>
        )}

        {/* Immersive Gallery Section */}
        {project.gallery?.length > 0 && (
           <section className="py-24 md:py-40 px-6 bg-gray-50/50">
              <div className="max-w-[1400px] mx-auto text-center mb-20">
                 <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tighter mb-6">Visual Proof.</h2>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.3em]">The Interface</p>
              </div>

              <div className="columns-1 md:columns-2 gap-8 space-y-8 max-w-[1400px] mx-auto">
                 {project.gallery.map((img, i) => (
                    <motion.div 
                      key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }}
                      className="rounded-[2.5rem] overflow-hidden shadow-lg border border-black/5 group relative inline-block w-full break-inside-avoid bg-white cursor-pointer"
                      onClick={() => setSelectedImage(img)}
                    >
                       <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                          <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">View</span>
                       </div>
                       <img src={img} className="w-full h-auto transition-transform duration-[1.5s] ease-out group-hover:scale-105" alt="Screenshot" loading="lazy" />
                    </motion.div>
                 ))}
              </div>
           </section>
        )}

        {/* Fullscreen Image Modal */}
        <AnimatePresence>
           {selectedImage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
              >
                 <button 
                   onClick={() => setSelectedImage(null)}
                   className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full backdrop-blur-md"
                 >
                    <X size={24} />
                 </button>
                 <motion.img 
                   initial={{ scale: 0.9 }}
                   animate={{ scale: 1 }}
                   exit={{ scale: 0.9 }}
                   src={selectedImage} 
                   alt="Fullscreen view" 
                   className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" 
                   onClick={(e) => e.stopPropagation()}
                 />
              </motion.div>
           )}
        </AnimatePresence>

        {/* Grand Bottom Navigation */}
        <section className="py-40 px-6 bg-white">
           <div className="max-w-[1000px] mx-auto flex flex-col items-center text-center gap-10">
              <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-300">
                 <Globe size={40} />
              </div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">Ready to build something similar?</h4>
              <Link to="/#contact" className="text-6xl md:text-[6rem] font-extrabold text-gray-900 tracking-tighter hover:text-gray-500 transition-colors flex items-center justify-center flex-wrap gap-4 md:gap-8 group">
                 Let's Talk <ArrowRight size={60} className="group-hover:translate-x-4 transition-transform hidden md:block" />
              </Link>

              <button onClick={() => navigate('/projects')} className="mt-24 flex items-center gap-3 px-8 py-4 rounded-full border border-gray-200 text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-900 hover:text-white transition-all group">
                 <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Back to Archive
              </button>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
