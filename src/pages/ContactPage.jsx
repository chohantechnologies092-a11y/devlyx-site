import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, ChevronDown, Send, Globe, Star, Users } from 'lucide-react';
import { statsService } from '../services/statsService';

const ContactPage = () => {
  const [selectedService, setSelectedService] = useState('Web Applications');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', brief: '' });
  const [status, setStatus] = useState('idle');

  const services = [
    "Web Applications",
    "Mobile Apps",
    "UI/UX Design",
    "Brand Identity",
    "Cloud Architecture",
    "AI Solutions"
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch("https://formsubmit.co/ajax/devlyxsolutions@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 
            ...formData, 
            "Service": selectedService, 
            "_subject": "Project Inquiry (Mobile Included)" 
        })
      });
      if (res.ok) {
        if (statsService?.saveLead) {
            await statsService.saveLead({ 
                ...formData, 
                service: selectedService, 
                source: 'Contact Page (With Phone)' 
            });
        }
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', brief: '' });
      } else { setStatus('error'); }
    } catch (error) { setStatus('error'); }
  };

  return (
    <div className="w-full bg-white font-sans selection:bg-[#6a35ff] selection:text-white overflow-x-hidden">
      <Helmet>
        <title>Contact | Devlyx Solutions - Global Engineering Partner</title>
      </Helmet>

      <Navbar />

      <main>
        {/* Cinematic Hero */}
        <section className="relative min-h-[80vh] flex flex-col lg:flex-row pt-24">
          <div className="lg:w-1/2 p-8 md:p-20 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#6a35ff] animate-ping"></span>
                <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Partner with Excellence</span>
              </div>
              <h1 className="text-6xl md:text-[100px] font-black text-gray-900 tracking-tighter leading-[0.85] mb-10">
                Let's Make it <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] to-[#00c2cb]">Remarkable.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-900 font-bold leading-relaxed mb-12 opacity-60">
                Turn your high-stakes ideas into world-class digital products.
              </p>
            </motion.div>
          </div>
          <div className="lg:w-1/2 relative min-h-[400px] overflow-hidden">
             <motion.img initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5 }} src="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg" className="w-full h-full object-cover" alt="Team Collaboration" />
             <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent hidden lg:block"></div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-32 px-6 bg-gray-50">
           <div className="max-w-[1200px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                 
                 {/* Left Info */}
                 <div className="lg:col-span-5 space-y-16">
                    <div className="space-y-6">
                       <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none">Connect with <br /> Our Team.</h2>
                       <p className="text-lg text-gray-500 font-medium leading-relaxed">Fill out the form and our specialized engineering division will be in touch within 24 hours.</p>
                    </div>

                    <div className="space-y-8">
                       {[
                         { icon: Star, t: "Unmatched Quality", d: "Clean, documented, and future-proof code that scales." },
                         { icon: Users, t: "Client-Centric", d: "We become a dedicated extension of your team." }
                       ].map((item, i) => (
                         <div key={i} className="flex gap-6 group">
                            <div className="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-xl shadow-black/5 flex items-center justify-center text-gray-900 group-hover:bg-[#6a35ff] group-hover:text-white transition-all duration-500"><item.icon size={24} /></div>
                            <div>
                               <h4 className="text-xl font-black text-gray-900 mb-2">{item.t}</h4>
                               <p className="text-gray-500 font-medium leading-relaxed">{item.d}</p>
                            </div>
                         </div>
                       ))}
                    </div>

                    {/* Socials */}
                    <div className="pt-10 border-t border-gray-200">
                       <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Direct Channels</h4>
                       <div className="flex gap-4">
                          <a href="https://wa.me/+923395129192" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-3xl bg-white border border-gray-100 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-500 shadow-sm">
                             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.005 0C5.37 0 .002 5.368.002 12.006c0 2.092.548 4.136 1.59 5.927L0 24l6.339-1.656a11.847 11.847 0 005.666 1.44h.005c6.635 0 12.003-5.368 12.003-12.005 0-3.208-1.249-6.228-3.52-8.497z" /></svg>
                          </a>
                          <a href="https://www.instagram.com/devlyx_solutions/" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-3xl bg-white border border-gray-100 flex items-center justify-center text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-all duration-500 shadow-sm">
                             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                          </a>
                          <a href="https://facebook.com/profile.php?id=61586420621668" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-3xl bg-white border border-gray-100 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all duration-500 shadow-sm">
                             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                          </a>
                       </div>
                    </div>
                 </div>

                 {/* Form Card */}
                 <div className="lg:col-span-7">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-white p-12 md:p-20 rounded-[4rem] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.08)] border border-gray-100">
                      {status === 'success' ? (
                        <div className="text-center py-20 animate-fade-in space-y-8">
                           <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Mission Sent.</h2>
                           <button onClick={() => setStatus('idle')} className="px-10 py-4 bg-gray-900 text-white rounded-full font-black uppercase tracking-widest text-[10px]">New Inquiry</button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-12">
                           <div className="space-y-10">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                 <div className="relative group">
                                    <input type="text" placeholder=" " required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="peer w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl font-black text-gray-900 outline-none focus:border-[#6a35ff] transition-all placeholder-transparent" />
                                    <label className="absolute left-0 top-4 text-gray-400 font-black uppercase tracking-widest text-[10px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:text-[#6a35ff] peer-not-placeholder-shown:top-[-20px] peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#6a35ff]">Full Name</label>
                                 </div>
                                 <div className="relative group">
                                    <input type="email" placeholder=" " required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="peer w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl font-black text-gray-900 outline-none focus:border-[#6a35ff] transition-all placeholder-transparent" />
                                    <label className="absolute left-0 top-4 text-gray-400 font-black uppercase tracking-widest text-[10px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:text-[#6a35ff] peer-not-placeholder-shown:top-[-20px] peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#6a35ff]">Email Address</label>
                                 </div>
                              </div>

                              {/* MOBILE NUMBER FIELD ADDED HERE */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                 <div className="relative group">
                                    <input type="tel" placeholder=" " required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="peer w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl font-black text-gray-900 outline-none focus:border-[#6a35ff] transition-all placeholder-transparent" />
                                    <label className="absolute left-0 top-4 text-gray-400 font-black uppercase tracking-widest text-[10px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:text-[#6a35ff] peer-not-placeholder-shown:top-[-20px] peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#6a35ff]">Mobile Number</label>
                                 </div>
                                 <div className="relative group">
                                    <select value={selectedService} onChange={e => setSelectedService(e.target.value)} className="w-full bg-transparent border-b-2 border-gray-200 py-4 text-xl font-black text-gray-900 outline-none focus:border-[#6a35ff] appearance-none cursor-pointer transition-all">
                                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    <label className="absolute left-0 top-[-20px] text-[10px] font-black uppercase tracking-widest text-[#6a35ff]">Interested In</label>
                                    <div className="absolute right-0 top-4 pointer-events-none text-gray-400"><ChevronDown size={20} /></div>
                                 </div>
                              </div>

                              <div className="space-y-4">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">The Brief</label>
                                 <textarea rows="4" placeholder="Tell us about your goals..." required value={formData.brief} onChange={e => setFormData({...formData, brief: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-100 rounded-[2.5rem] p-8 text-xl font-bold text-gray-900 focus:bg-white focus:border-[#6a35ff]/30 outline-none transition-all placeholder-gray-400 resize-none" />
                              </div>
                           </div>

                           <button type="submit" disabled={status === 'submitting'} className="w-full py-7 bg-gray-900 text-white rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 hover:bg-[#6a35ff] transition-all shadow-2xl hover:shadow-[#6a35ff]/30 hover:-translate-y-1">
                             {status === 'submitting' ? 'Transmitting...' : 'Initialize Project Connection'}
                           </button>
                        </form>
                      )}
                    </motion.div>
                 </div>
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
