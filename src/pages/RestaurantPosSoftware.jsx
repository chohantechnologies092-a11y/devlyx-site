import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import { 
  UtensilsCrossed, 
  ChefHat, 
  Smartphone, 
  Printer, 
  Truck, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Clock
} from 'lucide-react';

const RestaurantPosSoftware = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Real-time KOT & Kitchen Display",
      desc: "Instant wireless Kitchen Order Tickets (KOT) routing to separate kitchen stations (Grill, Bar, Desserts) with sub-second order dispatch.",
      icon: <ChefHat className="w-6 h-6 text-[#ff6b00]" />
    },
    {
      title: "Interactive Floor & Table Maps",
      desc: "Visual table layout manager. Easily split bills, transfer tables, manage reservations, and track table turnover speed in real time.",
      icon: <UtensilsCrossed className="w-6 h-6 text-[#6a35ff]" />
    },
    {
      title: "Delivery Aggregator Integration",
      desc: "Direct integration readiness for Foodpanda, UberEats, Talabat, and custom in-house rider dispatch with live status tracking.",
      icon: <Truck className="w-6 h-6 text-[#00c2cb]" />
    },
    {
      title: "Raw Material & Recipe Costing",
      desc: "Automatic ingredient inventory deduction upon order placement. Track meat, cheese, packaging waste, and maintain accurate gross margins.",
      icon: <Layers className="w-6 h-6 text-[#3ecf8e]" />
    },
    {
      title: "Thermal Receipts & Multi-Cashier",
      desc: "One-click 80mm & 58mm thermal bills with custom QR codes, tax / GST compliance, service charges, and cashier shift reconciliation.",
      icon: <Printer className="w-6 h-6 text-[#f59e0b]" />
    },
    {
      title: "Mobile Waiter & QR Ordering",
      desc: "Empower captains to punch orders directly from Android/iOS tablets or phones at the table. Faster table service, zero order errors.",
      icon: <Smartphone className="w-6 h-6 text-[#ff00a0]" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfd] font-sans selection:bg-[#ff6b00] selection:text-white">
      <Helmet>
        <title>Restaurant POS Software & Billing System | Devlyx Solutions</title>
        <meta name="description" content="Turnkey Restaurant POS software with wireless KOT, interactive table layout, ingredients inventory, delivery aggregator sync, and multi-branch cloud analytics." />
        <meta name="keywords" content="restaurant pos software, cafe billing software, foodpanda pos integration, kot software, restaurant inventory management pakistan uae" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pb-28 overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/70 border border-orange-200/60 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#ff6b00] animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-950">Food & Beverage Engine</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-950 tracking-tight leading-[1] mb-6">
                High-Speed <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b00] via-[#ff00a0] to-[#6a35ff]">
                  Restaurant POS.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-xl mb-8">
                All-in-one restaurant management system built for high-rush dine-ins, quick-service cafes, and multi-branch franchises. Fast KOT generation, real-time table maps, and recipe inventory control.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a 
                  href="https://wa.me/923395129192?text=Hello%20Devlyx!%20I%20want%20to%20see%20a%20live%20demo%20of%20the%20Restaurant%20POS%20Software."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full bg-[#25D366] text-white font-black text-xs uppercase tracking-widest hover:bg-[#1faa4b] transition-all shadow-xl shadow-green-600/20 hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                  <span>Book Live Demo via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-gray-900 text-white font-black text-xs uppercase tracking-widest hover:bg-[#6a35ff] transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  Request Quote
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-gray-100 text-xs text-gray-500 font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b00]" />
                  <span>Wireless KOT Printing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b00]" />
                  <span>Recipe Stock Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6b00]" />
                  <span>Works 100% Offline</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column / Interactive Spec Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-[2.5rem] bg-[#0a0a0b] p-8 md:p-10 border border-white/10 shadow-2xl text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b00]/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                      <UtensilsCrossed className="w-6 h-6 text-[#ff6b00]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black tracking-tight">RestoCloud Enterprise</h3>
                      <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">v4.8 Stable Engine</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-500/30">
                    Live
                  </span>
                </div>

                {/* Specs List */}
                <div className="space-y-4 mb-8 text-xs">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400 font-medium">Architecture</span>
                    <span className="font-bold text-white">Electron + React + Local DB</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400 font-medium">KOT Latency</span>
                    <span className="font-bold text-[#ff6b00]">&lt; 250ms Wireless Print</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400 font-medium">Hardware Support</span>
                    <span className="font-bold text-white">Touch Terminal, Android, ESC/POS</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400 font-medium">Offline Resilience</span>
                    <span className="font-bold text-[#3ecf8e]">100% Local Cache With Auto Cloud Sync</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400 font-medium">Branch Multi-Tenancy</span>
                    <span className="font-bold text-white">Unlimited Multi-Outlet Sync</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Implementation</div>
                    <div className="text-sm font-bold text-white">Turnkey Setup & Staff Training</div>
                  </div>
                  <a
                    href="https://wa.me/923395129192?text=Hello%20Devlyx!%20Please%20share%20Restaurant%20POS%20pricing%20and%20hardware%20requirements."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white text-gray-950 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-[#ff6b00] hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ff6b00] mb-3 block">Engineered for Rush Hours</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight">Everything a busy restaurant needs.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-[2rem] bg-gray-50/70 border border-gray-200/60 hover:bg-white hover:shadow-xl hover:border-gray-300/80 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-gray-100 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black text-gray-950 mb-3 tracking-tight">{item.title}</h3>
                <p className="text-gray-600 text-sm font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware & Ecosystem Compatibility */}
      <section className="py-20 px-6 bg-[#0a0a0b] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ff6b00]">Hardware Plug & Play</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                Works with your existing restaurant hardware.
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                Zero proprietary lock-in. RestoCloud connects seamlessly via USB, Ethernet, or Bluetooth with industry-standard thermal printers, customer-facing pole displays, cash drawers, and handheld order devices.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="font-bold text-white text-sm mb-1">Receipt Printers</div>
                  <div className="text-xs text-gray-400">Epson, Bixolon, Xprinter (ESC/POS)</div>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5">
                  <div className="font-bold text-white text-sm mb-1">Terminals & Tablets</div>
                  <div className="text-xs text-gray-400">Windows Touch POS, Android, iPad</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-gradient-to-tr from-[#141416] to-[#1c1c20] p-8 md:p-10 rounded-[2.5rem] border border-white/10">
              <h3 className="text-xl font-black mb-6 text-white tracking-tight">Daily Operations Checklist</h3>
              <ul className="space-y-4 text-sm text-gray-300 font-medium">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ff6b00] shrink-0 mt-0.5" />
                  <span>Morning float entry & opening cash balance validation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ff6b00] shrink-0 mt-0.5" />
                  <span>Real-time table occupancy & elapsed order time indicators.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ff6b00] shrink-0 mt-0.5" />
                  <span>Mid-day stock deduction tracking for perishables & meat.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#ff6b00] shrink-0 mt-0.5" />
                  <span>End-of-Day Z-Report with cash, credit card, and online payment split.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <Contact />

      <Footer />
    </div>
  );
};

export default RestaurantPosSoftware;
