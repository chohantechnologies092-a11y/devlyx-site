import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { 
  Barcode, 
  Clock, 
  Search, 
  Printer, 
  ShieldCheck, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  MonitorSmartphone, 
  Zap, 
  Building2, 
  Play
} from 'lucide-react';

const PharmacyPosSoftware = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "0ms Barcode Checkout",
      desc: "Instant keystroke barcode scanning optimized for peak store rush hours. Compatible with all USB & wireless scanners.",
      icon: <Barcode className="w-6 h-6 text-[#3ecf8e]" />
    },
    {
      title: "Batch & Expiry Countdown",
      desc: "Automated alerts for near-expiry medicines (30/60/90 days). Stop financial losses and maintain strict drug audit compliance.",
      icon: <Clock className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: "Formula & Substitute Finder",
      desc: "Search by generic formula to instantly recommend alternatives when a brand name is out of stock. Never lose a customer.",
      icon: <Search className="w-6 h-6 text-[#6a35ff]" />
    },
    {
      title: "Thermal Receipt & Label Engine",
      desc: "One-click 80mm & 58mm thermal receipts with custom store logos, Urdu/English receipt support, and barcode shelf tag printing.",
      icon: <Printer className="w-6 h-6 text-[#f59e0b]" />
    },
    {
      title: "Distributor Khata & Orders",
      desc: "Automated purchase orders, distributor invoices, credit ledger tracking, and supplier payment scheduling.",
      icon: <Building2 className="w-6 h-6 text-[#3ecf8e]" />
    },
    {
      title: "Multi-Counter Offline LAN",
      desc: "Works 100% offline during internet downtime with local network sync, plus real-time cloud dashboard backup for owners.",
      icon: <MonitorSmartphone className="w-6 h-6 text-[#00c2cb]" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] font-sans selection:bg-[#3ecf8e] selection:text-white">
      <Helmet>
        <title>Pharmacy POS Software & Medical Store Management | Devlyx Solutions</title>
        <meta name="description" content="Turnkey Pharmacy POS & Medical Store Billing Software. Sub-second barcode checkout, batch expiry tracking, formula search, and multi-counter LAN sync." />
        <meta name="keywords" content="pharmacy pos software, medical store software pakistan, pharmacy billing software react electron, medical store inventory system, best pharmacy pos dubai" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-emerald-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200/60 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#3ecf8e] animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900">Medical Retail Engine</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-950 tracking-tight leading-[1] mb-6">
                Next-Gen <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a859] via-[#00c2cb] to-[#6a35ff]">
                  Pharmacy POS.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-xl mb-8">
                Blazing-fast desktop & cloud billing software engineered specifically for pharmacies, clinic chains, and medical retailers. Eliminates checkout lag and protects against expired medicine write-offs.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a 
                  href="#contact" 
                  className="px-8 py-4 bg-gray-950 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#00a859] hover:shadow-xl hover:shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
                >
                  Request Live Demo
                </a>
                <a 
                  href="https://wa.me/+923395129192?text=Hello%20Devlyx,%20I%20am%20interested%20in%20the%20Pharmacy%20POS%20Software" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-8 py-4 bg-[#25D366] text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#1eb855] hover:shadow-xl hover:shadow-green-500/25 transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  Chat on WhatsApp
                </a>
              </div>

              {/* Metric Strip */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-100">
                <div>
                  <div className="text-2xl md:text-3xl font-black text-gray-950">0.2s</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Barcode Scan</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-gray-950">99.9%</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Audit Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-black text-gray-950">100%</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Offline-Ready</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column Showcase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-[2.5rem] bg-gray-950 p-6 shadow-2xl border border-white/10 overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#3ecf8e]/20 rounded-full blur-3xl pointer-events-none"></div>
                <img 
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80" 
                  alt="Modern Pharmacy Counter System" 
                  className="w-full h-80 object-cover rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-700"
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-gray-400">
                    <span className="text-[#3ecf8e]">● SYSTEM STATUS: ONLINE</span>
                    <span>REACT 19 + ELECTRON</span>
                  </div>
                  <h3 className="text-white font-black text-xl tracking-tight">Turnkey Hardware Ready</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    Pre-configured for plug & play with Honeywell, Zebra, Xprinter, Epson, and Posiflex hardware.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight mb-4">
              Engineered For Speed & Compliance
            </h2>
            <p className="text-gray-500 font-medium text-base">
              Every feature designed from direct feedback with high-volume retail pharmacists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[2rem] bg-gray-50/60 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200/60 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-black text-gray-950 mb-3 tracking-tight">{feat.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Deploy Section */}
      <section className="py-20 px-6 bg-[#0a0a0b] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Ready to Modernize Your Pharmacy?
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-medium">
            Schedule a 15-minute live screen share walkthrough or have our engineer deploy on-site.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#contact" 
              className="px-10 py-4 bg-white text-gray-950 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#3ecf8e] hover:text-white transition-all shadow-xl"
            >
              Get Free Consultation
            </a>
            <Link 
              to="/products" 
              className="px-10 py-4 bg-white/10 border border-white/20 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </div>
  );
};

export default PharmacyPosSoftware;
