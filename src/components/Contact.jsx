import React, { useEffect, useState } from 'react';
import { statsService } from '../services/statsService';
import { ChevronDown, Send } from 'lucide-react';

const Contact = () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const res = await fetch("https://formsubmit.co/ajax/devlyxsolutions@gmail.com", {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ ...formData, "Service": selectedService, "_subject": "Home Page Inquiry" })
            });
            if (res.ok) {
                if (statsService?.saveLead) {
                    await statsService.saveLead({ ...formData, service: selectedService, source: 'Home Page Contact (Fixed)' });
                }
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', brief: '' });
            } else { setStatus('error'); }
        } catch (error) { setStatus('error'); }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('active'); }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="contact" className="py-24 md:py-32 px-6 bg-[#fcfcfd] relative overflow-hidden font-sans">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6a35ff]/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Left side */}
                    <div className="lg:col-span-5 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-[#6a35ff] text-[10px] font-black uppercase tracking-widest mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6a35ff] animate-pulse"></span>
                            Get in Touch
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-8">
                            Let's <br /> Build Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] to-[#00c2cb]">Future.</span>
                        </h2>
                        <p className="text-xl text-gray-900 font-bold leading-relaxed mb-12 opacity-60">
                            Partner with our expert engineering team to scale your vision.
                        </p>

                        <div className="space-y-6 pt-10 border-t border-gray-200">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Follow Our Journey</h3>
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

                    {/* Right side */}
                    <div className="lg:col-span-7 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 delay-200">
                        <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-black/5 border border-gray-100">
                            {status === 'success' ? (
                                <div className="text-center py-20">
                                    <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Mission Sent.</h3>
                                    <button onClick={() => setStatus('idle')} className="px-10 py-4 bg-gray-900 text-white rounded-full font-black uppercase tracking-widest text-[10px]">Send New Inquiry</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="relative group">
                                            <input type="text" placeholder=" " required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="peer w-full bg-transparent border-b-2 border-gray-100 py-4 text-lg font-black text-gray-900 outline-none focus:border-[#6a35ff] transition-all placeholder-transparent" />
                                            <label className="absolute left-0 top-4 text-gray-400 font-black uppercase tracking-widest text-[10px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:text-[#6a35ff] peer-not-placeholder-shown:top-[-20px] peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#6a35ff]">Full Name</label>
                                        </div>
                                        <div className="relative group">
                                            <input type="email" placeholder=" " required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="peer w-full bg-transparent border-b-2 border-gray-100 py-4 text-lg font-black text-gray-900 outline-none focus:border-[#6a35ff] transition-all placeholder-transparent" />
                                            <label className="absolute left-0 top-4 text-gray-400 font-black uppercase tracking-widest text-[10px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:text-[#6a35ff] peer-not-placeholder-shown:top-[-20px] peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#6a35ff]">Email Address</label>
                                        </div>
                                    </div>
                                    
                                    {/* MOBILE NUMBER FIELD FOR HOME SECTION */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="relative group">
                                            <input type="tel" placeholder=" " required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="peer w-full bg-transparent border-b-2 border-gray-100 py-4 text-lg font-black text-gray-900 outline-none focus:border-[#6a35ff] transition-all placeholder-transparent" />
                                            <label className="absolute left-0 top-4 text-gray-400 font-black uppercase tracking-widest text-[10px] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:top-[-20px] peer-focus:text-[10px] peer-focus:text-[#6a35ff] peer-not-placeholder-shown:top-[-20px] peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-[#6a35ff]">Mobile Number</label>
                                        </div>
                                        <div className="relative group">
                                            <select value={selectedService} onChange={e => setSelectedService(e.target.value)} className="w-full bg-transparent border-b-2 border-gray-100 py-4 text-lg font-black text-gray-900 outline-none focus:border-[#6a35ff] appearance-none cursor-pointer transition-all">
                                                {services.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                            <label className="absolute left-0 top-[-20px] text-[10px] font-black uppercase tracking-widest text-[#6a35ff]">Interested In</label>
                                            <div className="absolute right-0 top-4 pointer-events-none text-gray-400"><ChevronDown size={20} /></div>
                                        </div>
                                    </div>

                                    <textarea rows="4" placeholder="Tell us about your project..." required value={formData.brief} onChange={e => setFormData({...formData, brief: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-100 rounded-[2.5rem] p-8 text-lg font-bold text-gray-900 focus:bg-white focus:border-[#6a35ff]/20 outline-none transition-all resize-none" />
                                    <button type="submit" disabled={status === 'submitting'} className="w-full py-6 bg-gray-900 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-[#6a35ff] transition-all">
                                        {status === 'submitting' ? 'Processing...' : 'Start Journey'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`.reveal-on-scroll.active { opacity: 1 !important; transform: translateY(0) !important; }`}</style>
        </section>
    );
};

export default Contact;
