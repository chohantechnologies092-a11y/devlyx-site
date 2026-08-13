import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Monitor,
  Palette,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  Target
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { leadService } from '../services/leadService';

const SERVICES = [
  { id: 'mobile', title: 'Mobile Apps', icon: Smartphone, desc: 'High-performance iOS & Android experiences', color: 'indigo' },
  { id: 'web', title: 'Web Platforms', icon: Monitor, desc: 'Scalable SaaS & enterprise web apps', color: 'purple' },
  { id: 'design', title: 'UI/UX Design', icon: Palette, desc: 'Strategic & cinematic user experiences', color: 'rose' },
  { id: 'software', title: 'AI & Automation', icon: Zap, desc: 'Custom intelligence for your workflow', color: 'cyan' }
];

const FEATURE_MAPPING = {
  mobile: ['Native iOS', 'Android SDK', 'Real-time Sync', 'Offline Core', 'Push Engine'],
  web: ['User Dashboards', 'Payment Gateway', 'CMS Integration', 'Auth System', 'Live Analytics'],
  design: ['Visual Identity', 'Design System', 'User Personas', 'High-Fi Prototyping', 'Brand Strategy'],
  software: ['AI Integration', 'Data Pipeline', 'Legacy Migration', 'Security Shield', 'Cloud Native']
};

const CURRENCIES = {
  USD: { symbol: '$', rate: 1, label: 'USD' },
  PKR: { symbol: 'Rs', rate: 280, label: 'PKR' },
  AED: { symbol: 'AED', rate: 3.67, label: 'UAE' },
  SAR: { symbol: 'SAR', rate: 3.75, label: 'Saudi' },
  QAR: { symbol: 'QAR', rate: 3.64, label: 'Qatar' },
  GBP: { symbol: '£', rate: 0.79, label: 'UK' }
};

const TIMELINES = ['Quick (< 1m)', 'Standard (1-3m)', 'Deep (3-6m)', 'Long-term'];

const BUDGET_RANGES = [
  '< 10,000',
  '10,000 - 25,000',
  '25,000 - 50,000',
  '50,000 - 100,000',
  '100,000+'
];

const STEPS = [
  { id: 1, label: 'Services' },
  { id: 2, label: 'Features' },
  { id: 3, label: 'Timeline & Budget' },
  { id: 4, label: 'Details' }
];

const StartProject = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    services: [],
    features: [],
    timeline: '',
    budgetRange: '',
    currency: 'USD',
    name: '',
    email: '',
    phone: '',
    description: ''
  });

  const currency = CURRENCIES[formData.currency];

  const handleServiceToggle = (id) => {
    setFormData(prev => {
      const isSelected = prev.services.includes(id);
      const newServices = isSelected ? prev.services.filter(s => s !== id) : [...prev.services, id];
      const allowedFeatures = newServices.flatMap(s => FEATURE_MAPPING[s] || []);
      const newFeatures = prev.features.filter(f => allowedFeatures.includes(f));
      return { ...prev, services: newServices, features: newFeatures };
    });
  };

  const calculateEstimate = () => {
    let base = 0;
    if (formData.services.includes('mobile')) base += 2500;
    if (formData.services.includes('web')) base += 2000;
    if (formData.services.includes('design')) base += 1000;
    if (formData.services.includes('software')) base += 3500;
    base += formData.features.length * 400;
    
    // Minimum base if no services selected
    if (base === 0) base = 1000; 
    
    if (formData.timeline === 'Quick (< 1m)') base *= 1.4;
    
    const min = (base * 0.8) * currency.rate;
    const max = (base * 1.3) * currency.rate;
    return { min: Math.round(min / 100) * 100, max: Math.round(max / 100) * 100 };
  };

  const estimate = calculateEstimate();

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return;
    setLoading(true);
    try {
      const estimateText = `${currency.symbol}${estimate.min.toLocaleString()} - ${currency.symbol}${estimate.max.toLocaleString()} (Client Budget: ${formData.budgetRange})`;
      await leadService.submitLead({
        ...formData,
        calculatedEstimate: estimateText,
        source: 'Consultant Wizard v3'
      });
      setSuccess(true);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#050507] selection:bg-[#6a35ff] selection:text-white">
      <SEO title="Consultant Wizard | Build Your Digital Future" />
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          {!success ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

              {/* Left Side: Context & Real-time Stats */}
              <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32">
                <div>
                  <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                    Let's Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] to-[#00c2cb]">Vision.</span>
                  </h1>
                  <p className="text-gray-400 font-medium text-lg mt-6 max-w-md leading-relaxed">
                    Our interactive consultant wizard helps you define your requirements and generates a real-time engineering roadmap.
                  </p>
                </div>

                <div className="p-8 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#6a35ff]/20 blur-[80px] rounded-full pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00c2cb]/10 blur-[80px] rounded-full pointer-events-none"></div>
                  
                  <div className="relative z-10 space-y-8">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/50">Live Algorithm Estimate</div>
                      </div>
                      <div className="text-2xl lg:text-3xl xl:text-4xl font-black tracking-tighter whitespace-nowrap">
                        {currency.symbol}{estimate.min.toLocaleString()} <span className="text-xl md:text-2xl text-gray-500 font-medium mx-1">-</span> {estimate.max.toLocaleString()}
                      </div>
                      <p className="text-[11px] font-bold text-gray-400 mt-3 leading-relaxed">
                        Based on your selected complexity, {formData.services.length} core services, and {formData.features.length} unique features.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Timeframe</div>
                        <div className="text-sm font-bold text-white">{formData.timeline || 'Not Selected'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Security</div>
                        <div className="text-sm font-bold text-[#00c2cb] flex items-center gap-2">
                          <ShieldCheck size={16} /> Enterprise Grade
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: The Form */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-[3rem] border border-gray-100 p-8 md:p-14 shadow-2xl relative min-h-[750px] flex flex-col">
                  
                  {/* Visual Progress Stepper */}
                  <div className="flex items-center w-full mb-12">
                    {STEPS.map((s, idx) => (
                      <React.Fragment key={s.id}>
                        <div className="flex items-center shrink-0">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full text-xs font-black transition-all duration-500 ${step >= s.id ? 'bg-[#6a35ff] text-white shadow-lg shadow-[#6a35ff]/30' : 'bg-gray-100 text-gray-400'}`}>
                            {step > s.id ? <CheckCircle size={18} /> : s.id}
                          </div>
                          <div className={`ml-3 text-[10px] font-black uppercase tracking-widest hidden sm:block transition-all duration-500 ${step >= s.id ? 'text-gray-900' : 'text-gray-400'}`}>
                            {s.label}
                          </div>
                        </div>
                        {idx !== STEPS.length - 1 && (
                          <div className={`flex-1 h-1 mx-3 rounded-full transition-all duration-1000 ${step > s.id ? 'bg-[#6a35ff]/30' : 'bg-gray-100'}`} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="flex-1 relative">
                    <AnimatePresence mode="wait">
                    {/* STEP 1 */}
                    {step === 1 && (
                      <motion.div
                        key="s1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                        <div>
                          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">What's the core focus?</h2>
                          <p className="text-gray-500 font-medium text-lg">Select the primary engineering services required for your transformation.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {SERVICES.map(s => {
                            const isSelected = formData.services.includes(s.id);
                            return (
                              <button
                                key={s.id}
                                onClick={() => handleServiceToggle(s.id)}
                                className={`p-8 rounded-[2rem] border-2 text-left transition-all duration-300 relative group overflow-hidden ${isSelected ? 'border-[#6a35ff] bg-white shadow-xl shadow-[#6a35ff]/10 scale-[1.02]' : 'border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#6a35ff]/30'
                                  }`}
                              >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${isSelected ? 'bg-[#6a35ff] text-white shadow-lg shadow-[#6a35ff]/40' : 'bg-white shadow-sm border border-gray-100 text-gray-400 group-hover:text-[#6a35ff]'
                                  }`}>
                                  <s.icon size={26} />
                                </div>
                                <div className={`text-xl font-black mb-2 ${isSelected ? 'text-[#6a35ff]' : 'text-gray-900'}`}>{s.title}</div>
                                <p className="text-sm text-gray-500 font-medium leading-relaxed">{s.desc}</p>
                                {isSelected && (
                                  <motion.div layoutId="check" className="absolute top-8 right-8">
                                    <CheckCircle size={24} className="text-[#6a35ff]" />
                                  </motion.div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                      <motion.div
                        key="s2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                        <div>
                          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">Mission Critical Features</h2>
                          <p className="text-gray-500 font-medium text-lg">Which components are essential for the initial rollout?</p>
                        </div>
                        
                        <div className="space-y-8">
                          {formData.services.length > 0 ? (
                            formData.services.map(serviceId => {
                              const sData = SERVICES.find(s => s.id === serviceId);
                              const feats = FEATURE_MAPPING[serviceId] || [];
                              return (
                                <div key={serviceId} className="bg-gray-50 rounded-[2rem] p-6 md:p-8 border border-gray-100">
                                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <sData.icon size={18} className="text-[#6a35ff]" /> {sData.title} Features
                                  </h3>
                                  <div className="flex flex-wrap gap-3">
                                    {feats.map(feat => {
                                      const isSelected = formData.features.includes(feat);
                                      return (
                                        <button
                                          key={feat}
                                          onClick={() => setFormData(p => ({
                                            ...p,
                                            features: isSelected ? p.features.filter(f => f !== feat) : [...p.features, feat]
                                          }))}
                                          className={`px-6 py-4 rounded-xl text-sm font-bold transition-all border-2 ${isSelected ? 'border-[#6a35ff] bg-[#6a35ff] text-white shadow-md shadow-[#6a35ff]/30' : 'border-gray-200 bg-white text-gray-500 hover:border-[#6a35ff]/40 hover:text-gray-900'
                                            }`}
                                        >
                                          {feat}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              )
                            })
                          ) : (
                            <div className="p-12 border-2 border-dashed border-gray-200 rounded-[2rem] text-center w-full bg-gray-50">
                              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Please go back and select services first</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                      <motion.div
                        key="s3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                        <div>
                          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">Timeline & Budget</h2>
                          <p className="text-gray-500 font-medium text-lg">Strategic constraints allow us to optimize the engineering roadmap.</p>
                        </div>

                        <div className="space-y-12">
                          <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">1. Select Preferred Currency</label>
                            <div className="flex flex-wrap gap-3">
                              {Object.entries(CURRENCIES).map(([code, config]) => (
                                <button
                                  key={code}
                                  onClick={() => setFormData(p => ({ ...p, currency: code }))}
                                  className={`px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${formData.currency === code ? 'border-gray-900 bg-gray-900 text-white shadow-lg' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-white'
                                    }`}
                                >
                                  {config.label} ({config.symbol})
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">2. Target Timeline</label>
                              <div className="space-y-3">
                                {TIMELINES.map(t => (
                                  <button
                                    key={t}
                                    onClick={() => setFormData(p => ({ ...p, timeline: t }))}
                                    className={`w-full p-5 rounded-2xl text-left font-bold text-sm border-2 transition-all ${formData.timeline === t ? 'border-[#6a35ff] bg-[#6a35ff]/5 text-[#6a35ff]' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-white'
                                      }`}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">3. Allocated Budget ({currency.symbol})</label>
                              <div className="space-y-3">
                                {BUDGET_RANGES.map(b => (
                                  <button
                                    key={b}
                                    onClick={() => setFormData(p => ({ ...p, budgetRange: b }))}
                                    className={`w-full p-5 rounded-2xl text-left font-bold text-sm border-2 transition-all ${formData.budgetRange === b ? 'border-[#6a35ff] bg-[#6a35ff]/5 text-[#6a35ff]' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-white'
                                      }`}
                                  >
                                    {b}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4 */}
                    {step === 4 && (
                      <motion.div
                        key="s4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10"
                      >
                        <div>
                          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">Final Details</h2>
                          <p className="text-gray-500 font-medium text-lg">Where should we send your cinematic digital roadmap?</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3 relative group">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 transition-colors group-focus-within:text-[#6a35ff]">Full Name</label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                              className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl text-sm font-bold text-gray-900 focus:bg-white focus:border-[#6a35ff] outline-none transition-all placeholder-gray-300"
                              placeholder="Jane Doe"
                            />
                          </div>
                          <div className="space-y-3 relative group">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 transition-colors group-focus-within:text-[#6a35ff]">Work Email</label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                              className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl text-sm font-bold text-gray-900 focus:bg-white focus:border-[#6a35ff] outline-none transition-all placeholder-gray-300"
                              placeholder="jane@company.com"
                            />
                          </div>
                          <div className="md:col-span-2 space-y-3 relative group">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 transition-colors group-focus-within:text-[#6a35ff]">Mobile / WhatsApp</label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                              className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl text-sm font-bold text-gray-900 focus:bg-white focus:border-[#6a35ff] outline-none transition-all placeholder-gray-300"
                              placeholder="+92 300 0000000"
                            />
                          </div>
                          <div className="md:col-span-2 space-y-3 relative group">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 transition-colors group-focus-within:text-[#6a35ff]">Project Brief</label>
                            <textarea
                              value={formData.description}
                              onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                              className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl text-sm font-bold text-gray-900 focus:bg-white focus:border-[#6a35ff] outline-none transition-all placeholder-gray-300 min-h-[160px] resize-none"
                              placeholder="Tell us more about your target audience, competitors, and #1 goal..."
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  </div>

                  {/* Wizard Controls */}
                  <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                    {step > 1 ? (
                      <button
                        onClick={() => setStep(s => s - 1)}
                        className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest px-4 py-2"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                    ) : <div />}

                    <div className="flex gap-4">
                      {step < 4 ? (
                        <button
                          onClick={() => setStep(s => s + 1)}
                          disabled={step === 1 && formData.services.length === 0}
                          className="flex items-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:bg-black hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-30 disabled:hover:scale-100"
                        >
                          Continue <ArrowRight size={16} />
                        </button>
                      ) : (
                        <div className="flex flex-col items-end gap-3">
                          <button
                            onClick={handleSubmit}
                            disabled={loading || !formData.name || !formData.email}
                            className="flex items-center gap-3 bg-[#6a35ff] text-white px-12 py-6 rounded-full text-[11px] font-black uppercase tracking-widest transition-all hover:shadow-[0_20px_50px_rgba(106,53,255,0.4)] hover:-translate-y-1 disabled:opacity-50"
                          >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Target size={18} />}
                            Initialize Project
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto text-center space-y-12 py-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[4rem]"
            >
              <div className="w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={64} className="text-green-400" />
              </div>
              <div className="space-y-6">
                <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">Transmission <br /><span className="text-[#6a35ff]">Received.</span></h2>
                <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed px-6">
                  Thanks for the brief, {formData.name.split(' ')[0]}. Our engineering leads are analyzing your requirements and will deliver a strategic proposal within 24 hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
                <a href="/" className="px-12 py-5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all">
                  Return to Portal
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StartProject;
