import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { projectService } from '../services/projectService';
import { 
  ArrowLeft, 
  Loader2, 
  ExternalLink, 
  Code, 
  Layers, 
  Activity, 
  Target, 
  Zap, 
  CheckCircle2,
  ChevronRight,
  Monitor,
  Cpu
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5]);

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
      <div className="flex flex-col justify-center items-center h-screen bg-white">
        <Loader2 size={40} className="animate-spin text-[#6a35ff]" />
        <div className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Analyzing Case Study</div>
      </div>
    );
  }

  if (!project) return null;

  const color = project.color || '#6a35ff';

  return (
    <div className="w-full bg-white min-h-screen font-sans selection:bg-[#6a35ff] selection:text-white overflow-x-hidden">
      <SEO 
        title={`${project.title} Case Study`} 
        description={project.desc}
        image={project.image}
      />
      
      <Navbar />

      <main className="w-full">
        {/* Cinematic Parallax Hero */}
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-20 bg-gray-900">
           <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
              {project.image ? (
                <img src={project.image} className="w-full h-full object-cover opacity-40 grayscale-[50%]" alt="" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800" />
              )}
           </motion.div>
           
           <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10" />

           <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center space-y-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mx-auto"
              >
                 <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: color }}></span>
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{project.category}</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-[140px] font-black text-white tracking-tighter leading-[0.8] mb-10"
              >
                 {project.title}
              </motion.h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex justify-center gap-12">
                 {project.stats?.slice(0, 3).map((s, i) => (
                    <div key={i} className="text-left border-l border-white/10 pl-6">
                       <div className="text-2xl md:text-4xl font-black text-white">{s.value}</div>
                       <div className="text-[10px] font-black text-white/40 uppercase tracking-widest">{s.label}</div>
                    </div>
                 ))}
              </motion.div>
           </div>

           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
              <div className="w-px h-16 bg-gradient-to-t from-white to-transparent opacity-20" />
           </div>
        </section>

        {/* Executive Summary Grid */}
        <section className="py-32 px-6 relative bg-white">
           <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                 
                 {/* Left: Sticky Info */}
                 <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-12">
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black text-[#6a35ff] uppercase tracking-[0.3em]">Client Objective</h4>
                       <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">Redefining the <br /> Industry Standard.</h2>
                    </div>

                    <div className="space-y-6">
                       <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-4">
                          <h5 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-3">
                             <Cpu size={16} style={{ color }} /> Stack & Tools
                          </h5>
                          <div className="flex flex-wrap gap-2">
                             {project.techStack?.map(t => (
                                <span key={t} className="px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-[9px] font-black text-gray-400 uppercase tracking-widest">{t}</span>
                             ))}
                          </div>
                       </div>

                       {project.links?.map((link, i) => (
                          <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-8 bg-gray-900 text-white rounded-[2.5rem] group hover:bg-[#6a35ff] transition-all duration-500 shadow-xl shadow-black/5 hover:shadow-[#6a35ff]/20">
                             <span className="text-[10px] font-black uppercase tracking-widest">{link.label}</span>
                             <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </a>
                       ))}
                    </div>
                 </div>

                 {/* Right: The Narrative */}
                 <div className="lg:col-span-8 space-y-32">
                    <div className="space-y-12">
                       <div className="inline-block p-4 rounded-3xl bg-[#6a35ff]/5 text-[#6a35ff]"><Target size={32} /></div>
                       <div className="space-y-8">
                          <h3 className="text-4xl font-black text-gray-900 tracking-tighter italic">The Challenge</h3>
                          <p className="text-2xl text-gray-500 font-medium leading-relaxed italic">
                             {project.desc}
                          </p>
                       </div>
                    </div>

                    <div className="space-y-12">
                       <div className="inline-block p-4 rounded-3xl bg-[#00c2cb]/5 text-[#00c2cb]"><Zap size={32} /></div>
                       <div className="space-y-8">
                          <h3 className="text-4xl font-black text-gray-900 tracking-tighter italic">The Solution</h3>
                          <div className="prose prose-2xl prose-gray text-gray-600 font-medium leading-relaxed">
                             {project.longDescription || "We engineered a robust, scalable digital ecosystem designed to handle high concurrency while maintaining an effortless user experience."}
                          </div>
                       </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
                       {project.features?.map((f, i) => (
                          <div key={i} className="flex gap-4 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                             <CheckCircle2 size={24} className="text-[#00c2cb] shrink-0" />
                             <span className="text-lg font-black text-gray-900 tracking-tight">{f}</span>
                          </div>
                       ))}
                    </div>
                 </div>

              </div>
           </div>
        </section>

        {/* Immersive Gallery Section */}
        {project.gallery?.length > 0 && (
           <section className="py-32 px-6 bg-gray-50 overflow-hidden">
              <div className="max-w-[1400px] mx-auto text-center mb-24">
                 <h2 className="text-5xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none mb-6">Visual Proof.</h2>
                 <p className="text-xl text-gray-400 font-bold uppercase tracking-[0.2em]">Crafted to Perfection</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-[1600px] mx-auto px-4">
                 {project.gallery.map((img, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className={`${i % 3 === 0 ? 'md:col-span-8 aspect-[16/10]' : 'md:col-span-4 aspect-square'} rounded-[4rem] overflow-hidden shadow-2xl border border-gray-200 group relative`}
                    >
                       <img src={img} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                 ))}
              </div>
           </section>
        )}

        {/* Bottom Navigation */}
        <section className="py-40 px-6 bg-white border-t border-gray-100">
           <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
              <button 
                onClick={() => navigate('/projects')}
                className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-gray-400 hover:text-gray-900 transition-all group"
              >
                 <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" /> Back to Archive
              </button>

              <div className="text-center md:text-right">
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-4">Start Your Story</h4>
                 <Link to="/#contact" className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter hover:text-[#6a35ff] transition-all flex items-center gap-4 group justify-center md:justify-end">
                    Work With Us <ChevronRight size={48} className="group-hover:translate-x-2 transition-transform" />
                 </Link>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
