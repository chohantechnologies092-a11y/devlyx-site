import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Monitor,
  Palette,
  Code,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  DollarSign,
  Calendar,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  Globe
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

const StartProject = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    services: [],
    serviceNotes: '',
    features: [],
    featureNotes: '',
    timeline: '',
    budgetMin: '',
    budgetMax: '',
    currency: 'USD',
    timelineNotes: '',
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
    const userMin = parseFloat(formData.budgetMin) || 0;
    const userMax = parseFloat(formData.budgetMax) || userMin * 1.5;
    let base = 0;
    if (formData.services.includes('mobile')) base += 2500;
    if (formData.services.includes('web')) base += 2000;
    if (formData.services.includes('design')) base += 1000;
    if (formData.services.includes('software')) base += 3500;
    base += formData.features.length * 400;
    if (formData.timeline === 'Quick (< 1m)') base *= 1.4;
    const min = Math.max(userMin, (base * 0.8) * currency.rate);
    const max = Math.max(userMax, (base * 1.2) * currency.rate);
    return { min: Math.round(min / 100) * 100, max: Math.round(max / 100) * 100 };
  };

  const estimate = calculateEstimate();

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return;
    setLoading(true);
    try {
      const estimateText = `${currency.symbol}${estimate.min.toLocaleString()} - ${currency.symbol}${estimate.max.toLocaleString()}`;
      await leadService.submitLead({
        ...formData,
        calculatedEstimate: estimateText,
        source: 'Consultant Wizard v2'
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
    <div className="w-full min-h-screen bg-white selection:bg-[#6a35ff] selection:text-white">
      <SEO title="Consultant Wizard | Build Your Digital Future" />
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {!success ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">

              {/* Left Side: Context & Real-time Stats */}
              <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-40">
                <div>

                  <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9]">
                    Let's Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] to-[#00c2cb]">Vision.</span>
                  </h1>
                  <p className="text-gray-500 font-medium text-lg mt-8 max-w-md">
                    Our interactive consultant wizard helps you define your needs and get an instant engineering roadmap.
                  </p>
                </div>

                <div className="p-10 bg-gray-900 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#6a35ff]/20 blur-[80px] rounded-full"></div>
                  <div className="relative z-10 space-y-8">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Live Estimate</div>
                      <div className="text-3xl font-black flex items-center gap-2">
                        {currency.symbol}{estimate.min.toLocaleString()} - {estimate.max.toLocaleString()}
                        <span className="text-[10px] text-[#00c2cb] px-2 py-0.5 bg-[#00c2cb]/10 rounded uppercase">Approx</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Timeframe</div>
                        <div className="text-sm font-bold">{formData.timeline || 'TBD'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Security</div>
                        <div className="text-sm font-bold text-[#00c2cb] flex items-center gap-2">
                          <ShieldCheck size={14} /> Enterprise
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="" />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    <span className="text-gray-900 font-black">12+ Partners</span> started a project <br /> this month.
                  </div>
                </div>
              </div>

              {/* Right Side: The Form */}
              <div className="lg:col-span-7">
                <div className="bg-[#fcfcfd] rounded-[3.5rem] border border-gray-100 p-8 md:p-16 shadow-xl relative">
                  <div className="absolute top-8 right-12 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    Consultation Step {step} / 4
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="s1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                      >
                        <div>
                          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">What's the core focus?</h2>
                          <p className="text-gray-400 font-medium">Select the primary services required for your transformation.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {SERVICES.map(s => {
                            const isSelected = formData.services.includes(s.id);
                            return (
                              <button
                                key={s.id}
                                onClick={() => handleServiceToggle(s.id)}
                                className={`p-8 rounded-[2rem] border-2 text-left transition-all duration-300 relative group ${isSelected ? 'border-[#6a35ff] bg-white shadow-2xl shadow-purple-500/10' : 'border-gray-100 bg-white/50 hover:bg-white hover:border-purple-200'
                                  }`}
                              >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${isSelected ? 'bg-[#6a35ff] text-white' : 'bg-gray-100 text-gray-400 group-hover:text-[#6a35ff]'
                                  }`}>
                                  <s.icon size={22} />
                                </div>
                                <div className={`text-xl font-black mb-2 ${isSelected ? 'text-[#6a35ff]' : 'text-gray-900'}`}>{s.title}</div>
                                <p className="text-xs text-gray-400 font-medium leading-relaxed">{s.desc}</p>
                                {isSelected && (
                                  <motion.div layoutId="check" className="absolute top-6 right-6">
                                    <CheckCircle size={20} className="text-[#6a35ff]" />
                                  </motion.div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="s2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                      >
                        <div>
                          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Mission Critical Features</h2>
                          <p className="text-gray-400 font-medium">Which components are essential for the first version?</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {formData.services.length > 0 ? (
                            formData.services.flatMap(s => FEATURE_MAPPING[s] || []).map(feat => {
                              const isSelected = formData.features.includes(feat);
                              return (
                                <button
                                  key={feat}
                                  onClick={() => setFormData(p => ({
                                    ...p,
                                    features: isSelected ? p.features.filter(f => f !== feat) : [...p.features, feat]
                                  }))}
                                  className={`px-6 py-4 rounded-2xl text-sm font-black transition-all border-2 ${isSelected ? 'border-[#6a35ff] bg-[#6a35ff] text-white shadow-lg shadow-purple-500/30' : 'border-gray-100 bg-white text-gray-500 hover:border-purple-200'
                                    }`}
                                >
                                  {feat}
                                </button>
                              );
                            })
                          ) : (
                            <div className="p-8 border-2 border-dashed border-gray-100 rounded-3xl text-center w-full">
                              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Please select services first</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="s3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                      >
                        <div>
                          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Timeline & Budget</h2>
                          <p className="text-gray-400 font-medium">Strategic constraints allow us to optimize the engineering roadmap.</p>
                        </div>

                        <div className="space-y-10">
                          <div>
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block">Select Currency</label>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(CURRENCIES).map(([code, config]) => (
                                <button
                                  key={code}
                                  onClick={() => setFormData(p => ({ ...p, currency: code }))}
                                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${formData.currency === code ? 'border-[#6a35ff] bg-[#6a35ff] text-white' : 'border-gray-100 text-gray-500 hover:border-purple-200'
                                    }`}
                                >
                                  {config.label} ({config.symbol})
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Project Timeline</label>
                              {TIMELINES.map(t => (
                                <button
                                  key={t}
                                  onClick={() => setFormData(p => ({ ...p, timeline: t }))}
                                  className={`w-full p-6 rounded-2xl text-left font-bold text-sm border-2 transition-all ${formData.timeline === t ? 'border-[#6a35ff] bg-purple-50 text-[#6a35ff]' : 'border-gray-100 text-gray-500 hover:border-purple-100'
                                    }`}
                                >
                                  {t}
                                </button>
                              ))}
                            </div>
                            <div className="space-y-6">
                              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">Budget Range ({currency.symbol})</label>
                              <input
                                type="number"
                                placeholder="Min Range"
                                value={formData.budgetMin}
                                onChange={e => setFormData(p => ({ ...p, budgetMin: e.target.value }))}
                                className="w-full p-6 bg-white border-2 border-gray-100 rounded-2xl text-xl font-black text-gray-900 focus:border-[#6a35ff] focus:ring-4 focus:ring-purple-50 transition-all outline-none"
                              />
                              <input
                                type="number"
                                placeholder="Max Range"
                                value={formData.budgetMax}
                                onChange={e => setFormData(p => ({ ...p, budgetMax: e.target.value }))}
                                className="w-full p-6 bg-white border-2 border-gray-100 rounded-2xl text-xl font-black text-gray-900 focus:border-[#6a35ff] focus:ring-4 focus:ring-purple-50 transition-all outline-none"
                              />
                              <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-[9px] font-bold text-gray-400 leading-relaxed uppercase tracking-widest">Note: These figures help us prioritize features for the initial MVP.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        key="s4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                      >
                        <div>
                          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Partner Contact</h2>
                          <p className="text-gray-400 font-medium">How should we deliver your cinematic digital roadmap?</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Full Name</label>
                            <input
                              type="text"
                              value={formData.name}
                              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                              className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl text-sm font-bold text-gray-900 focus:border-[#6a35ff] focus:ring-4 focus:ring-purple-50 transition-all outline-none"
                              placeholder="Junaid Ahsan"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Work Email</label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                              className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl text-sm font-bold text-gray-900 focus:border-[#6a35ff] focus:ring-4 focus:ring-purple-50 transition-all outline-none"
                              placeholder="name@company.com"
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Mobile / WhatsApp</label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                              className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl text-sm font-bold text-gray-900 focus:border-[#6a35ff] focus:ring-4 focus:ring-purple-50 transition-all outline-none"
                              placeholder="+92 300 0000000"
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Project Brief</label>
                            <textarea
                              value={formData.description}
                              onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                              className="w-full p-6 bg-white border-2 border-gray-100 rounded-3xl text-sm font-bold text-gray-900 focus:border-[#6a35ff] focus:ring-4 focus:ring-purple-50 transition-all outline-none min-h-[150px] resize-none"
                              placeholder="Tell us more about your target audience and #1 goal..."
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Wizard Controls */}
                  <div className="mt-20 flex items-center justify-between">
                    {step > 1 ? (
                      <button
                        onClick={() => setStep(s => s - 1)}
                        className="flex items-center gap-2 text-xs font-black text-gray-300 hover:text-gray-900 transition-all uppercase tracking-widest"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                    ) : <div />}

                    <div className="flex gap-4">
                      {step < 4 ? (
                        <button
                          onClick={() => setStep(s => s + 1)}
                          disabled={step === 1 && formData.services.length === 0}
                          className="flex items-center gap-4 bg-gray-900 text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:bg-black hover:-translate-y-1 hover:shadow-2xl disabled:opacity-30 disabled:hover:translate-y-0"
                        >
                          Next Milestone <ArrowRight size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmit}
                          disabled={loading || !formData.name || !formData.email}
                          className="flex items-center gap-4 bg-[#6a35ff] text-white px-12 py-6 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:shadow-[0_20px_50px_rgba(106,53,255,0.4)] hover:-translate-y-1 disabled:opacity-50"
                        >
                          {loading ? <Loader2 size={18} className="animate-spin" /> : <Target size={18} />}
                          Launch Partnership
                        </button>
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
              className="max-w-4xl mx-auto text-center space-y-12 py-20"
            >
              <div className="w-32 h-32 bg-[#00c2cb]/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={64} className="text-[#00c2cb]" />
              </div>
              <div className="space-y-4">
                <h2 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9]">Transmission <br /><span className="text-[#6a35ff]">Received.</span></h2>
                <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                  Thanks for the brief, {formData.name.split(' ')[0]}. Our engineering leads are analyzing your requirements and will deliver a strategic proposal within 24 hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="/" className="px-10 py-5 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-2xl transition-all">
                  Return to Portal
                </a>
                <a href="/blog" className="px-10 py-5 bg-white border border-gray-100 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                  Explore Insights
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
