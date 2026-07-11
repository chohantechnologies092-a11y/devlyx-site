import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { Code, Server, Shield, Zap, Layers, Globe, ChevronRight } from 'lucide-react';

const SoftwareDevelopment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Custom Enterprise ERPs",
      desc: "Tailored management systems designed to streamline your unique business workflows in the UAE market.",
      icon: <Layers className="w-6 h-6 text-[#6a35ff]" />,
      delay: 0.1
    },
    {
      title: "Cloud-Native Architecture",
      desc: "Scalable cloud solutions built on AWS and Azure to ensure your software grows with your business.",
      icon: <Server className="w-6 h-6 text-[#00c2cb]" />,
      delay: 0.2
    },
    {
      title: "Military-Grade Security",
      desc: "Advanced encryption and security protocols to protect your sensitive corporate data.",
      icon: <Shield className="w-6 h-6 text-[#6a35ff]" />,
      delay: 0.3
    },
    {
      title: "High-Performance APIs",
      desc: "Fast, reliable, and secure API integrations to connect your digital ecosystem seamlessly.",
      icon: <Zap className="w-6 h-6 text-[#00c2cb]" />,
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Custom Software Development Dubai & UAE | Devlyx Solutions</title>
        <meta name="description" content="Devlyx Solutions provides premium custom software development in Dubai, UAE. We build scalable enterprise systems, ERPs, and high-performance cloud architectures." />
        <meta name="keywords" content="software development dubai, custom software uae, enterprise software dubai, erp development uae, software engineering dubai" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-50/50 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-[#6a35ff] text-[10px] font-black uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6a35ff]"></span>
                </span>
                Software Engineering Excellence
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none mb-8">
                Architecting the Future of <span className="text-gradient">Software in UAE</span>
              </h1>
              <p className="text-lg text-gray-600 font-medium leading-relaxed mb-10 max-w-xl">
                We transform complex business challenges into elegant, high-performance software systems. From Dubai to the world, we engineer with precision and scale.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-8 py-4 bg-gray-900 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#6a35ff] transition-all shadow-xl shadow-gray-200">
                  Start Building Your Vision
                </a>
                <div className="flex items-center gap-4 px-6 py-4">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="client" />
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trusted by 50+ Enterprises</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
                  alt="Software Engineering"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#00c2cb] flex items-center justify-center">
                        <Code className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-white font-black text-xl tracking-tight">Enterprise Stack</div>
                        <div className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Real-time Performance</div>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="h-full bg-white"
                        />
                      </div>
                      <div className="flex justify-between text-[8px] font-black text-white/40 uppercase tracking-widest">
                        <span>Optimizing Systems</span>
                        <span>85% Completed</span>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Bento Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6a35ff] mb-4">Our Expertise</div>
             <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">Software Engineered <br/> for the <span className="text-gradient">Next Decade</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: f.delay }}
                className="p-8 rounded-[2.5rem] bg-white border border-gray-100 hover:border-[#6a35ff]/30 hover:shadow-2xl hover:shadow-purple-500/5 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight mb-4">{f.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Horizontal Section */}
      <section className="py-24 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-md">
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-6">Mastering Modern <br/> Infrastructure</h2>
              <p className="text-gray-500 font-medium mb-8">We don't just write code; we build resilient digital foundations using the world's most powerful technologies.</p>
              <div className="space-y-4">
                {['Microservices Architecture', 'Blockchain Integration', 'AI & Machine Learning', 'Big Data Analytics'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center">
                      <ChevronRight className="w-3 h-3 text-[#6a35ff]" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full max-w-2xl">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes'].map((tech, i) => (
                   <div key={i} className="p-6 rounded-3xl bg-white border border-gray-100 flex flex-col items-center justify-center gap-4 hover:shadow-lg transition-all">
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{tech}</div>
                      <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00c2cb]" style={{ width: '100%' }} />
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto rounded-[3.5rem] bg-gray-900 p-12 md:p-24 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#6a35ff]/20 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00c2cb]/10 blur-[80px] rounded-full" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8">Ready to Build Something <br/> Remarkable?</h2>
            <p className="text-gray-400 font-medium text-lg mb-12 max-w-2xl mx-auto">
              Our engineering team is ready to analyze your requirements and architect a solution that sets your business apart in the competitive UAE market.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
               <a href="#contact" className="px-12 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#6a35ff] hover:text-white transition-all shadow-2xl">
                 Consult with our Architects
               </a>
               <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">Zero Consultation Fee for Q3</div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
};

export default SoftwareDevelopment;
