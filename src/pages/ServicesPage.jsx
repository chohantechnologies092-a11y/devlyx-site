import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const allServices = [
  {
    id: 'software-development',
    title: "Full-Stack Software Development",
    subtitle: "Enterprise Systems & SaaS",
    desc: "Custom ERPs, CRMs, and enterprise-grade platforms built for scale, security, and speed.",
    image: "/img/services/software.png",
    regions: [{ name: 'UAE', slug: 'uae' }, { name: 'Saudi Arabia', slug: 'saudi-arabia' }, { name: 'Qatar', slug: 'qatar' }, { name: 'Global', slug: 'global' }],
    accent: '#6a35ff',
    tags: ['Microservices', 'Cloud-Native', 'API Engineering']
  },
  {
    id: 'app-development',
    title: "Mobile App Development",
    subtitle: "iOS, Android & Cross-Platform",
    desc: "Native-performance apps built with Flutter and React Native for iOS and Android markets.",
    image: "/img/services/app.png",
    regions: [{ name: 'UAE', slug: 'uae' }, { name: 'Saudi Arabia', slug: 'saudi-arabia' }, { name: 'Bahrain', slug: 'bahrain' }, { name: 'Global', slug: 'global' }],
    accent: '#00c2cb',
    tags: ['Flutter', 'React Native', 'Biometrics']
  },
  {
    id: 'ui-ux-design',
    title: "UI/UX Design & Branding",
    subtitle: "Human-Centered Design Systems",
    desc: "Pixel-perfect interfaces and cohesive brand identities that convert visitors into loyal clients.",
    image: "/img/services/ui.png",
    regions: [{ name: 'UAE', slug: 'uae' }, { name: 'Global', slug: 'global' }],
    accent: '#f59e0b',
    tags: ['Design Systems', 'Prototyping', 'Branding']
  },
  {
    id: 'seo-growth',
    title: "SEO & Growth Architecture",
    subtitle: "Data-Driven Search Dominance",
    desc: "Technical SEO strategies and content ecosystems that rank on page one and stay there.",
    image: "/img/services/seo.png",
    regions: [{ name: 'UAE', slug: 'uae' }, { name: 'Saudi Arabia', slug: 'saudi-arabia' }, { name: 'Global', slug: 'global' }],
    accent: '#2563eb',
    tags: ['Technical SEO', 'Keyword Mapping', 'Backlinks']
  },
  {
    id: 'performance-marketing',
    title: "Performance Marketing",
    subtitle: "ROI-First Ad Strategy",
    desc: "Data-driven paid campaigns across Google, Meta, and TikTok that generate high-value leads.",
    image: "/img/services/marketing.png",
    regions: [{ name: 'UAE', slug: 'uae' }, { name: 'Global', slug: 'global' }],
    accent: '#10b981',
    tags: ['Paid Ads', 'Conversion Funnels', 'A/B Testing']
  },
  {
    id: 'shopify-development',
    title: "Shopify Ecosystems",
    subtitle: "E-Commerce & Apps",
    desc: "Building high-converting Shopify stores and custom private/public apps to supercharge your e-commerce operations.",
    image: "/img/services/shopify.png",
    regions: [{ name: 'UAE', slug: 'uae' }, { name: 'Global', slug: 'global' }],
    accent: '#95bf47',
    tags: ['Custom Themes', 'Shopify Apps', 'API Integrations']
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
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
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
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-10">
                World-Class <br />
                <span className="text-gradient">Expertise.</span>
              </h1>
              <p className="text-gray-400 text-xl md:text-2xl font-medium leading-relaxed max-w-2xl mb-16">
                We engineer digital products that dominate markets — from Dubai to Riyadh to Silicon Valley.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES GRID (IMAGE + DETAILS + REGIONS) ─────────────────────────── */}
      <section className="bg-[#f8f9fa] py-32 px-6 rounded-t-[3rem] -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6a35ff] mb-4">What We Do</div>
              <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
                Services Built <br /> to <span className="text-gradient">Convert</span>
              </h2>
            </div>
            <p className="text-gray-400 font-medium max-w-sm mt-6 md:mt-0 leading-relaxed">
              Detailed capabilities categorized by target regions. Pick your location to see specialized case studies and tailored solutions.
            </p>
          </div>

          <div className="space-y-10">
            {allServices.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group grid grid-cols-1 lg:grid-cols-12 items-stretch rounded-[2.5rem] border border-gray-200 bg-white shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-gray-300/60 transition-all duration-500 overflow-hidden hover:-translate-y-1"
              >
                {/* 1. Image Column */}
                <div className="lg:col-span-3 bg-gray-50/50 relative overflow-hidden flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay" style={{ backgroundColor: s.accent }} />
                  <img 
                    src={s.image} 
                    alt={s.title} 
                    className="relative z-10 w-full h-full object-cover min-h-[250px] group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* 2. Main Details Column */}
                <div className="lg:col-span-6 p-10 lg:p-12 flex flex-col justify-center">
                  <div className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: s.accent }}>{s.subtitle}</div>
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-4">{s.title}</h3>
                  <p className="text-gray-500 font-medium leading-relaxed mb-8">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map(t => (
                      <span key={t} className="px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest bg-gray-50 text-gray-600 border border-gray-100">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Regions Column */}
                <div className="lg:col-span-3 p-10 lg:p-12 bg-gray-50/30 border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col justify-center">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Explore By Region</div>
                    <div className="space-y-3">
                      {s.regions.map(r => (
                        <Link
                          key={r.slug}
                          to={`/services/${s.id}/${r.slug}`}
                          className="flex items-center justify-between py-3 px-5 rounded-xl bg-white border border-gray-100 hover:border-current hover:shadow-md transition-all group/r"
                          style={{ color: s.accent }}
                        >
                          <span className="text-[11px] font-black uppercase tracking-widest text-gray-700 group-hover/r:text-gray-900">{r.name}</span>
                          <ArrowUpRight size={16} className="text-gray-300 group-hover/r:text-current transition-colors" />
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
