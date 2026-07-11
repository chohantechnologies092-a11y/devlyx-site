import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Palette, Search, BarChart, ArrowUpRight } from 'lucide-react';

const allServices = [
  {
    id: 'software-development',
    title: "Full-Stack Software Development",
    subtitle: "Enterprise Systems & SaaS",
    desc: "Custom ERPs, CRMs, and enterprise-grade platforms built for scale, security, and speed.",
    icon: <Code className="w-7 h-7" />,
    regions: [{ name: 'UAE', slug: 'uae' }, { name: 'Saudi Arabia', slug: 'saudi-arabia' }, { name: 'Qatar', slug: 'qatar' }, { name: 'Global', slug: 'global' }],
    accent: '#6a35ff',
    tags: ['Microservices', 'Cloud-Native', 'API Engineering']
  },
  {
    id: 'app-development',
    title: "Mobile App Development",
    subtitle: "iOS, Android & Cross-Platform",
    desc: "Native-performance apps built with Flutter and React Native for iOS and Android markets.",
    icon: <Smartphone className="w-7 h-7" />,
    regions: [{ name: 'UAE', slug: 'uae' }, { name: 'Saudi Arabia', slug: 'saudi-arabia' }, { name: 'Bahrain', slug: 'bahrain' }, { name: 'Global', slug: 'global' }],
    accent: '#00c2cb',
    tags: ['Flutter', 'React Native', 'Biometrics']
  },
  {
    id: 'ui-ux-design',
    title: "UI/UX Design & Branding",
    subtitle: "Human-Centered Design Systems",
    desc: "Pixel-perfect interfaces and cohesive brand identities that convert visitors into loyal clients.",
    icon: <Palette className="w-7 h-7" />,
    regions: [{ name: 'UAE', slug: 'uae' }, { name: 'Global', slug: 'global' }],
    accent: '#f59e0b',
    tags: ['Design Systems', 'Prototyping', 'Branding']
  },
  {
    id: 'seo-growth',
    title: "SEO & Growth Architecture",
    subtitle: "Data-Driven Search Dominance",
    desc: "Technical SEO strategies and content ecosystems that rank on page one and stay there.",
    icon: <Search className="w-7 h-7" />,
    regions: [{ name: 'UAE', slug: 'uae' }, { name: 'Saudi Arabia', slug: 'saudi-arabia' }, { name: 'Global', slug: 'global' }],
    accent: '#2563eb',
    tags: ['Technical SEO', 'Keyword Mapping', 'Backlinks']
  },
  {
    id: 'performance-marketing',
    title: "Performance Marketing",
    subtitle: "ROI-First Ad Strategy",
    desc: "Data-driven paid campaigns across Google, Meta, and TikTok that generate high-value leads.",
    icon: <BarChart className="w-7 h-7" />,
    regions: [{ name: 'UAE', slug: 'uae' }, { name: 'Global', slug: 'global' }],
    accent: '#10b981',
    tags: ['Paid Ads', 'Conversion Funnels', 'A/B Testing']
  }
];

const ServicesPage = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#050507]">
      <Helmet>
        <title>Expert Digital Services | UAE, Saudi Arabia & Global | Devlyx Solutions</title>
        <meta name="description" content="Explore Devlyx's full range of premium digital services including Software Development, Mobile Apps, UI/UX Design, and SEO — specialized for UAE, Saudi Arabia, Qatar, and global markets." />
      </Helmet>

      <Navbar />

      {/* ─── HERO ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#6a35ff]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00c2cb]/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10 w-full">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-3 mb-10">
                <div className="w-8 h-[1px] bg-[#6a35ff]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6a35ff]">Our Capabilities</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.9] mb-10">
                World-Class <br />
                <span className="text-gradient">Expertise.</span>
              </h1>
              <p className="text-gray-400 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mb-16">
                We engineer digital products that dominate markets — from Dubai to Riyadh to Silicon Valley.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-8 max-w-lg"
            >
              {[['50+', 'Clients Served'], ['5', 'Services'], ['4+', 'Countries']].map(([num, label]) => (
                <div key={label}>
                  <div className="text-4xl font-black text-white tracking-tighter">{num}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES GRID ─────────────────────────── */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6a35ff] mb-4">What We Do</div>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
                Services Built <br /> to <span className="text-gradient">Convert</span>
              </h2>
            </div>
            <p className="text-gray-400 font-medium max-w-xs mt-6 md:mt-0 leading-relaxed">
              Each service is a precision-engineered solution designed for the GCC and global markets.
            </p>
          </div>

          <div className="space-y-6">
            {allServices.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group grid grid-cols-1 lg:grid-cols-12 items-stretch rounded-[2.5rem] border border-gray-100 bg-white hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500 overflow-hidden"
              >
                {/* Number + Icon */}
                <div className="lg:col-span-2 flex flex-col items-center justify-center p-10 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/50">
                  <span className="text-[60px] font-black text-gray-100 leading-none">{String(i + 1).padStart(2, '0')}</span>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mt-4" style={{ backgroundColor: s.accent + '15', color: s.accent }}>
                    {s.icon}
                  </div>
                </div>

                {/* Main info */}
                <div className="lg:col-span-5 p-10 flex flex-col justify-center">
                  <div className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: s.accent }}>{s.subtitle}</div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-4">{s.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed mb-6">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-gray-100 text-gray-600">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Regions */}
                <div className="lg:col-span-4 p-10 bg-gray-50/30 border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-5">Target Regions</div>
                    <div className="space-y-3">
                      {s.regions.map(r => (
                        <Link
                          key={r.slug}
                          to={`/services/${s.id}/${r.slug}`}
                          className="flex items-center justify-between py-3 px-5 rounded-xl bg-white border border-gray-100 hover:border-current hover:shadow-md transition-all group/r"
                          style={{ '--tw-text-opacity': 1 }}
                        >
                          <span className="text-[11px] font-black uppercase tracking-widest text-gray-700 group-hover/r:text-gray-900">{r.name}</span>
                          <ArrowUpRight size={14} className="text-gray-300 group-hover/r:text-current transition-colors" style={{ color: s.accent }} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST SECTION ─────────────────────────── */}
      <section className="py-24 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">
            Ready to Dominate <span className="text-gradient">Your Market?</span>
          </h2>
          <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto mb-12">
            Our team is open for Q3 2026 enterprise engagements. Zero consultation fee.
          </p>
          <Link to="/start-project"
            className="inline-flex items-center gap-3 px-12 py-5 bg-gray-900 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#6a35ff] transition-all shadow-2xl">
            Start Your Project <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
};

export default ServicesPage;
