import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Target, Eye, Award, Rocket, Shield, Cpu, Globe, Zap, Code2, Loader2, Quote, BookOpen } from 'lucide-react';
import { aboutService } from '../services/aboutService';

const AboutPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    aboutService.getAboutData().then(d => {
      setData(d);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="w-full h-screen bg-white flex flex-col items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#6a35ff] mb-4" />
        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Loading Story</div>
      </div>
    );
  }

  // Predefined icons array to map to dynamic stats
  const statIcons = [Award, Zap, Globe, Cpu, Target, Rocket, Shield];

  return (
    <div className="w-full bg-white font-sans selection:bg-[#6a35ff] selection:text-white">
      <Helmet>
        <title>{data.metaTitle || "Our Story | Devlyx Solutions"}</title>
        <meta name="description" content={data.metaDescription || data.heroSubtitle} />
      </Helmet>

      <Navbar />

      <main>
        {/* 1. Cinematic Hero */}
        <section className="relative h-[85vh] flex items-center overflow-hidden bg-gray-950">
          <div className="absolute inset-0 z-0">
            <img
              src={data.heroBackground || "https://images.pexels.com/photos/3183190/pexels-photo-3183190.jpeg"}
              className="w-full h-full object-cover opacity-40 scale-110"
              alt="Devlyx Team Background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00c2cb] animate-pulse"></span>
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">The Devlyx Story</span>
              </div>
              <h1 className="text-6xl md:text-[120px] font-black text-white tracking-tighter leading-[0.85] mb-10" dangerouslySetInnerHTML={{ __html: data.heroTitle.replace('Digital Empires.', '<span class="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] to-[#00c2cb]">Digital Empires.</span>') }}>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed max-w-2xl">
                {data.heroSubtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. Our Story (New Section) */}
        {data.companyStory && (
          <section className="py-24 md:py-32 bg-white px-6">
            <div className="max-w-[1200px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 mb-6">
                    <BookOpen size={14} className="text-[#6a35ff]" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">About Us</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-8 leading-tight">
                    Who We Are.
                  </h2>
                  <div className="prose prose-lg text-gray-600 font-medium leading-relaxed whitespace-pre-wrap">
                    {data.companyStory}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[#6a35ff]/20 to-[#00c2cb]/20 blur-2xl rounded-[3rem]"></div>
                  <div className="aspect-[4/3] rounded-[2rem] overflow-hidden relative z-10 border border-gray-100 shadow-2xl">
                    <img 
                      src="/img/who-we-are.jpg" 
                      alt="Professional team collaborating in a modern tech office" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* 3. CEO Message Section */}
        {(data.ceoName || data.ceoMessage) && (
          <section className="py-24 md:py-32 bg-gray-50 px-6 border-y border-gray-100">
            <div className="max-w-[1200px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-5 relative"
                >
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[#6a35ff]/20 to-[#00c2cb]/20 blur-2xl rounded-full"></div>
                  <div className="aspect-[3/4] rounded-[3rem] overflow-hidden relative z-10 border-4 border-white shadow-2xl group">
                    <img 
                      src={data.ceoImage || "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg"} 
                      alt={`Portrait of ${data.ceoName || 'CEO'}, ${data.ceoRole || 'Leadership'}`}
                      title={`${data.ceoName || 'CEO'} - Devlyx Solutions`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="text-white font-black text-2xl tracking-tight">{data.ceoName}</div>
                      <div className="text-[#00c2cb] font-bold text-xs uppercase tracking-widest">{data.ceoRole}</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-7"
                >
                  <Quote size={64} className="text-gray-200 mb-8" />
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-8 leading-tight">
                    A Message from <br/>Our Leadership.
                  </h2>
                  <div className="prose prose-lg text-gray-600 font-medium leading-relaxed max-w-none mb-10 whitespace-pre-wrap">
                    <p>{data.ceoMessage}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-[2px] bg-[#6a35ff]"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Devlyx Solutions Leadership</span>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>
        )}

        {/* 4. Dark Philosophy Section */}
        <section className="py-24 md:py-32 bg-gray-950 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#6a35ff]/20 blur-[120px] rounded-full"></div>
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                  Our <br /> Philosophy.
                </h2>
                <div className="space-y-8">
                  {data.philosophies?.map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="text-[#00c2cb] font-black text-2xl italic">0{i + 1}</div>
                      <div>
                        <h4 className="text-white font-bold text-xl mb-2">{item.title}</h4>
                        <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="aspect-square rounded-[4rem] overflow-hidden border border-white/10">
                  <img
                    src={data.philosophyImage || "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg"}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000"
                    alt="Devlyx Team Work and Philosophy"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-[#6a35ff] p-12 rounded-[3rem] hidden md:block">
                  <Code2 size={48} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. The Bento Mission (Stats - Proof) */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 flex flex-col justify-center mb-10 md:mb-0">
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6 leading-tight">
                  Driven by <br />Performance.
                </h2>
                <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-md">
                  Our results speak for themselves. We don't just solve problems; we engineer competitive advantages.
                </p>
              </div>

              {data.stats?.map((item, i) => {
                const Icon = statIcons[i % statIcons.length];
                const classes = [
                  "md:col-span-2 md:row-span-1 bg-purple-50",
                  "md:col-span-1 md:row-span-1 bg-cyan-50",
                  "md:col-span-1 md:row-span-2 bg-gray-50 flex-col justify-between",
                  "md:col-span-2 md:row-span-1 bg-green-50"
                ];
                const colors = ["text-purple-600", "text-cyan-600", "text-gray-900", "text-green-600"];
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-10 rounded-[3rem] flex flex-col group hover:shadow-2xl transition-all duration-500 ${classes[i % classes.length]}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-auto group-hover:scale-110 transition-transform ${colors[i % colors.length]} bg-white shadow-sm`}>
                      <Icon size={24} />
                    </div>
                    <div className="mt-8">
                      <div className="text-4xl font-black text-gray-900 tracking-tighter mb-1">{item.title}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">{item.subtitle}</div>
                      <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. The Team Section */}
        {data.teamMembers && data.teamMembers.length > 0 && (
          <section className="py-24 md:py-32 px-6 bg-gray-50 border-t border-gray-100">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-100 mb-6 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6a35ff]"></span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">The Minds Behind The Code</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-6">
                  Meet The Team.
                </h2>
                <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
                  A collective of engineers, designers, and strategists obsessed with perfection.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.teamMembers.map((member, i) => (
                  <motion.div 
                    key={member.id || i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative bg-white border border-gray-100 shadow-sm">
                      <img 
                        src={member.image || "https://via.placeholder.com/400x500"} 
                        alt={`${member.name} - ${member.role}`} 
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight">{member.name}</h3>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#6a35ff] mt-1">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 7. Final CTA */}
        <section className="py-24 md:py-32 px-6 bg-white">
          <div className="max-w-[1200px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gray-50 border border-gray-100 rounded-[4rem] p-16 md:p-32 shadow-xl shadow-gray-200/20"
            >
              <h2 className="text-5xl md:text-8xl font-black text-gray-900 tracking-tighter mb-10 leading-[0.85]">
                Ready to <br /> Scale?
              </h2>
              <p className="text-xl text-gray-500 font-medium mb-12 max-w-xl mx-auto">
                We are currently accepting a limited number of high-impact projects for the next quarter.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a href="/contact" className="px-12 py-6 bg-gray-900 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#6a35ff] hover:-translate-y-1 transition-all">
                  Start a Conversation
                </a>
                <a href="/services" className="px-12 py-6 border border-gray-200 text-gray-900 rounded-full font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-all">
                  Explore Services
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
