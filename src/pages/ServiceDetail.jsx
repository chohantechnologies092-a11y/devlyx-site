import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { Code, Smartphone, Palette, Search, BarChart, CheckCircle2, ArrowUpRight, ArrowLeft } from 'lucide-react';

const serviceContent = {
  'software-development': {
    title: "Software Development",
    headline: "Enterprise Software, Engineered to Scale",
    desc: "We architect complex business systems — from custom ERPs to SaaS platforms — that power growth and eliminate operational inefficiency.",
    icon: <Code className="w-10 h-10" />,
    accent: '#6a35ff',
    benefits: ["Custom ERP & CRM Systems", "Cloud-Native Architecture", "Legacy System Migration", "REST & GraphQL APIs", "Real-time Data Sync", "Multi-Tenant SaaS Platforms"],
    process: ["Discovery & Architecture", "Agile Development Sprints", "QA & Load Testing", "Launch & Monitoring"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
  },
  'app-development': {
    title: "Mobile App Development",
    headline: "Apps That Feel Native. Perform at Scale.",
    desc: "We build cross-platform mobile applications using Flutter and React Native that deliver native speed, biometric security, and seamless UX.",
    icon: <Smartphone className="w-10 h-10" />,
    accent: '#00c2cb',
    benefits: ["iOS & Android Development", "Flutter & React Native", "Offline-First Architecture", "Biometric Authentication", "Push Notification Systems", "App Store Optimization"],
    process: ["UX Wireframing", "Cross-Platform Development", "Beta Testing & QA", "Store Submission & Launch"],
    image: "https://images.unsplash.com/photo-1630442923896-244dd3717b35?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  'ui-ux-design': {
    title: "UI/UX Design",
    headline: "Design Systems That Drive Revenue",
    desc: "We create stunning, conversion-optimized interfaces and cohesive brand identities that make your digital presence unforgettable.",
    icon: <Palette className="w-10 h-10" />,
    accent: '#f59e0b',
    benefits: ["User Research & Journey Mapping", "Hi-Fi Prototyping (Figma)", "Design System Creation", "Usability Testing", "Brand Identity Design", "Motion & Micro-Interactions"],
    process: ["Research & Discovery", "Wireframing & Prototyping", "Visual Design", "Developer Handoff"],
    image: "https://images.unsplash.com/photo-1603969072881-b0fc7f3d77d7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  'seo-growth': {
    title: "SEO & Growth",
    headline: "Search Domination. Sustainable Traffic.",
    desc: "We engineer technical SEO systems and content ecosystems that consistently rank on page one and compound your organic growth over time.",
    icon: <Search className="w-10 h-10" />,
    accent: '#2563eb',
    benefits: ["Full Technical SEO Audit", "Keyword & Competitor Research", "Content Strategy", "Backlink Building", "Core Web Vitals Optimization", "Monthly Performance Reporting"],
    process: ["Full-Site Audit", "Strategy & Roadmap", "On-Page Optimization", "Off-Page Authority Building"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
  },
  'performance-marketing': {
    title: "Performance Marketing",
    headline: "Every Dirham Spent. Every Lead Tracked.",
    desc: "We build and manage paid ad campaigns across Google, Meta, and TikTok that generate qualified leads and real ROI, not just clicks.",
    icon: <BarChart className="w-10 h-10" />,
    accent: '#10b981',
    benefits: ["Google & Meta Ads Management", "Campaign Strategy & Setup", "Audience Research & Targeting", "A/B Creative Testing", "Conversion Funnel Optimization", "Weekly Performance Reports"],
    process: ["Market & Audience Research", "Campaign Architecture", "Creative Production", "Optimization & Scaling"],
    image: "https://images.unsplash.com/photo-1711097383282-28097ae16b1d?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
};

const regionMeta = {
  'uae': {
    name: 'United Arab Emirates',
    shortName: 'UAE',
    flag: '🇦🇪',
    stat: '#1 Tech Hub in MENA',
    insight: "UAE is the most advanced digital economy in the GCC. We build fully compliant solutions integrated with local payment gateways (Telr, PayFort) and UAE government APIs.",
    keywords: 'Dubai, Abu Dhabi, Sharjah digital market'
  },
  'saudi-arabia': {
    name: 'Saudi Arabia',
    shortName: 'KSA',
    flag: '🇸🇦',
    stat: 'Vision 2030 Ready',
    insight: "Saudi Arabia is experiencing a digital revolution under Vision 2030. Our solutions are tailored for the KSA market with SADAD payment integration and Arabic RTL support.",
    keywords: 'Riyadh, Jeddah, KSA tech ecosystem'
  },
  'qatar': {
    name: 'Qatar',
    shortName: 'QAT',
    flag: '🇶🇦',
    stat: 'Fastest Growing GCC Tech',
    insight: "Qatar's booming economy post-FIFA 2022 presents massive digital opportunities. We build systems aligned with Qatar National Vision 2030.",
    keywords: 'Doha, Qatar digital transformation'
  },
  'bahrain': {
    name: 'Bahrain',
    shortName: 'BHR',
    flag: '🇧🇭',
    stat: 'GCC Fintech Capital',
    insight: "Bahrain is the GCC's fintech hub. We specialize in building financial technology solutions compliant with the Central Bank of Bahrain's regulations.",
    keywords: 'Manama, Bahrain fintech market'
  },
  'global': {
    name: 'International Clients',
    shortName: 'Global',
    flag: '✦',
    stat: 'Europe · US · APAC',
    insight: "Devlyx operates as a globally distributed engineering team, delivering world-class digital products to clients across Europe, North America, and Asia-Pacific. We guarantee timezone-compatible communication, ISO-aligned project management, and international payment & compliance standards. No matter where you are, you get the same precision and speed.",
    keywords: 'International software development agency, global IT company, remote engineering team'
  }
};

const ServiceDetail = () => {
  const { type, region } = useParams();
  const content = serviceContent[type] || serviceContent['software-development'];
  const regionInfo = regionMeta[region] || regionMeta['global'];

  useEffect(() => { window.scrollTo(0, 0); }, [type, region]);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{`${content.title} in ${regionInfo.name} | Devlyx Solutions`}</title>
        <meta name="description" content={`Premium ${content.title} services in ${regionInfo.name}. ${content.desc}`} />
        <meta name="keywords" content={`${content.title} ${regionInfo.name}, ${regionInfo.keywords}`} />
        <meta property="og:title" content={`${content.title} in ${regionInfo.name} | Devlyx Solutions`} />
        <meta property="og:description" content={content.desc} />
      </Helmet>

      <Navbar />

      {/* ─── HERO ───────────────────────────────── */}
      <section className="pt-32 pb-0 relative overflow-hidden bg-[#050507]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/2 w-[800px] h-[400px] -translate-x-1/2 blur-[150px] rounded-full pointer-events-none"
          style={{ backgroundColor: content.accent + '15' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-12 text-gray-500">
            <Link to="/services" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> All Services
            </Link>
            <span>/</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">{content.title}</span>
            <span>/</span>
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: content.accent }}>{regionInfo.shortName}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end pb-0">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              {/* Region badge */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 mb-10">
                <span className="text-2xl">{regionInfo.flag}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">{regionInfo.name}</span>
                <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: content.accent }}>{regionInfo.stat}</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-8">
                {content.headline}
              </h1>
              <p className="text-gray-400 text-lg font-medium leading-relaxed">
                {content.desc}
              </p>
            </motion.div>

            {/* Hero image — floats to bottom of section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="relative mt-16 lg:mt-0"
            >
              <div className="aspect-[4/3] rounded-t-[3rem] overflow-hidden">
                <img src={content.image} alt={content.title} className="w-full h-full object-cover scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/30 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ────────────────────────────── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-6" style={{ color: content.accent }}>What's Included</div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-12 leading-none">
                Everything You Need. <br /> Nothing You Don't.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: content.accent }} />
                    <span className="text-xs font-black uppercase tracking-widest text-gray-800">{b}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Regional Insight Card */}
            <div className="relative">
              <div className="rounded-[3rem] overflow-hidden bg-gray-900 p-12 text-white relative">
                <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full" style={{ backgroundColor: content.accent + '20' }} />
                <div className="relative z-10">
                  <div className="text-6xl mb-8">{regionInfo.flag}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Why {regionInfo.name}?</div>
                  <h3 className="text-3xl font-black tracking-tight mb-6 leading-snug">Local Expertise. <br /> Global Standards.</h3>
                  <p className="text-gray-400 font-medium leading-relaxed mb-10">{regionInfo.insight}</p>

                  <a href="#contact"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/20 hover:border-current transition-all group"
                    style={{ '--hover-color': content.accent }}>
                    Start Project in {regionInfo.shortName}
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────── */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4">Our Process</div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">How We Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {content.process.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-[2rem] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all group"
              >
                <div className="text-[80px] font-black leading-none text-gray-100 group-hover:text-gray-200 transition-colors mb-6">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="text-sm font-black uppercase tracking-widest text-gray-900">{step}</div>
                {i < content.process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[1px] bg-gray-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────── */}
      <section className="py-24 px-6 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top, ${content.accent}15, transparent 70%)` }} />

        {/* Global-specific: timezone bar */}
        {region === 'global' && (
          <div className="absolute top-0 left-0 right-0 flex justify-center gap-12 py-4 border-b border-white/5 overflow-hidden">
            {['New York  EST', 'London  GMT', 'Dubai  GST', 'Singapore  SGT', 'Sydney  AEST'].map(tz => (
              <span key={tz} className="text-[9px] font-black uppercase tracking-widest text-white/20 whitespace-nowrap">{tz}</span>
            ))}
          </div>
        )}

        <div className="max-w-4xl mx-auto text-center relative z-10 pt-8">
          {region === 'global' ? (
            <div className="flex items-center justify-center gap-3 mb-10">
              {['🇺🇸', '🇬🇧', '🇦🇪', '🇸🇬', '🇩🇪', '🇦🇺'].map(f => (
                <span key={f} className="text-3xl opacity-60 hover:opacity-100 transition-opacity">{f}</span>
              ))}
            </div>
          ) : (
            <div className="text-6xl mb-8">{regionInfo.flag}</div>
          )}

          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">
            {region === 'global'
              ? <> Let's Build Something <br /><span style={{ color: content.accent }}>the World Will Notice.</span></>
              : <> Let's Build Something <br /><span style={{ color: content.accent }}>Remarkable in {regionInfo.shortName}.</span></>
            }
          </h2>
          <p className="text-gray-400 text-lg font-medium mb-12">
            {region === 'global'
              ? "Wherever your business is, our engineers are ready. Zero consultation fee."
              : "Zero consultation fee. Our architects are ready to analyze your vision."
            }
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a href="#contact"
              className="px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-2xl hover:scale-105"
              style={{ backgroundColor: content.accent }}>
              Start Your Project
            </a>
            <Link to="/services"
              className="px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 border border-white/10 hover:border-white/30 hover:text-white transition-all">
              Explore Other Services
            </Link>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
