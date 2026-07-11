import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Target, Eye, Award, Rocket, Shield, Cpu, Globe, Zap, Code2 } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bentoItems = [
    {
      title: "15+ Years",
      subtitle: "Industry Mastery",
      icon: Award,
      desc: "A decade and a half of engineering complex digital ecosystems.",
      className: "md:col-span-2 md:row-span-1 bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      title: "99% Success",
      subtitle: "Client Satisfaction",
      icon: Zap,
      desc: "Delivering results that exceed global standards.",
      className: "md:col-span-1 md:row-span-1 bg-cyan-50",
      iconColor: "text-cyan-600"
    },
    {
      title: "Global Reach",
      subtitle: "250+ Clients",
      icon: Globe,
      desc: "Partnering with innovators from Silicon Valley to Dubai.",
      className: "md:col-span-1 md:row-span-2 bg-gray-50 flex-col justify-between",
      iconColor: "text-gray-900"
    },
    {
      title: "Modern Tech",
      subtitle: "Next-Gen Stack",
      icon: Cpu,
      desc: "Specializing in React, Node, AI, and Cloud Architecture.",
      className: "md:col-span-2 md:row-span-1 bg-green-50",
      iconColor: "text-green-600"
    }
  ];

  return (
    <div className="w-full bg-white font-sans selection:bg-[#6a35ff] selection:text-white">
      <Helmet>
        <title>Our Story | Devlyx Solutions</title>
      </Helmet>

      <Navbar />

      <main>
        {/* Cinematic Hero */}
        <section className="relative h-[90vh] flex items-center overflow-hidden bg-gray-950">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.pexels.com/photos/3183190/pexels-photo-3183190.jpeg"
              className="w-full h-full object-cover opacity-40 scale-110"
              alt="Background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
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
              <h1 className="text-6xl md:text-[120px] font-black text-white tracking-tighter leading-[0.85] mb-10">
                We Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] to-[#00c2cb]">Digital Empires.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed max-w-2xl">
                More than an agency. We are a high-performance engineering cell dedicated to the craft of technical excellence.
              </p>
            </motion.div>
          </div>

          {/* Floating animated logo badge */}
          <div className="absolute bottom-10 right-10 hidden md:block group/badge">
            <div className="w-36 h-36 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md relative overflow-hidden transition-all duration-500 hover:border-[#6a35ff]/50 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
              {/* Outer spinning ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-white/20 animate-[spin_20s_linear_infinite]" />

              {/* Inner glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#6a35ff]/5 to-[#00c2cb]/5 blur-sm opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500" />

              {/* Logo icon */}
              <div className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-700 group-hover/badge:scale-110 group-hover/badge:rotate-[360deg]">
                <img
                  src="/devlyxsol-01.png"
                  alt="Devlyx Logo"
                  className="w-10 h-auto object-contain"
                />
              </div>


            </div>
          </div>
        </section>

        {/* The Bento Mission */}
        <section className="py-32 px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 flex flex-col justify-center mb-10 md:mb-0">
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6 leading-tight">
                  Driven by <br />Performance.
                </h2>
                <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-md">
                  Our approach combines architectural rigor with creative intuition. We don't just solve problems; we engineer competitive advantages.
                </p>
              </div>

              {bentoItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-10 rounded-[3rem] flex flex-col group hover:shadow-2xl transition-all duration-500 ${item.className}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-auto group-hover:scale-110 transition-transform ${item.iconColor} bg-white shadow-sm`}>
                    <item.icon size={24} />
                  </div>
                  <div className="mt-8">
                    <div className="text-4xl font-black text-gray-900 tracking-tighter mb-1">{item.title}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">{item.subtitle}</div>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Dark Philosophy Section */}
        <section className="py-32 bg-gray-950 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#6a35ff]/20 blur-[120px] rounded-full"></div>
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                  Our <br /> Philosophy.
                </h2>
                <div className="space-y-8">
                  {[
                    { t: "Radical Transparency", d: "No black boxes. We work in the open, keeping you aligned at every stage." },
                    { t: "Quality as Standard", d: "Zero technical debt. We build for the long term with clean, tested code." },
                    { t: "User-First Thinking", d: "Technology is nothing without a seamless user experience." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="text-[#00c2cb] font-black text-2xl italic">0{i + 1}</div>
                      <div>
                        <h4 className="text-white font-bold text-xl mb-2">{item.t}</h4>
                        <p className="text-gray-500 leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="aspect-square rounded-[4rem] overflow-hidden border border-white/10">
                  <img
                    src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg"
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000"
                    alt="Team work"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 bg-[#6a35ff] p-12 rounded-[3rem] hidden md:block">
                  <Code2 size={48} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-[1200px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#fcfcfd] border border-gray-100 rounded-[4rem] p-16 md:p-32"
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
