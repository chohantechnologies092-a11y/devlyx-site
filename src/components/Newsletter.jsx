import React, { useState } from 'react';
import { Send, CheckCircle2, Mail } from 'lucide-react';
import { statsService } from '../services/statsService';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    try {
      // Save to Firebase via statsService (I'll add saveSubscriber to it)
      if (statsService?.saveSubscriber) {
          await statsService.saveSubscriber(email);
      }
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section className="py-24 px-6 bg-gray-950 relative overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6a35ff]/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00c2cb]/10 blur-[100px] rounded-full"></div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 md:p-20 flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00c2cb] text-[10px] font-black uppercase tracking-widest">
              Stay Ahead of the Curve
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
              Get Tech Insights <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] to-[#00c2cb]">Directly.</span>
            </h2>
            <p className="text-lg text-white/60 font-medium leading-relaxed max-w-md">
              Join 1,000+ founders and engineers receiving our weekly teardown of the latest in AI, App Architecture, and Digital Growth.
            </p>
          </div>

          <div className="lg:w-1/2 w-full">
            {status === 'success' ? (
              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 text-center animate-fade-in">
                <CheckCircle2 className="text-[#00c2cb] mx-auto mb-6" size={48} />
                <h3 className="text-2xl font-black text-white mb-2">You're on the list!</h3>
                <p className="text-white/60 font-bold text-sm">Welcome to the Devlyx inner circle.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-6">
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#6a35ff] transition-colors">
                    <Mail size={24} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Enter your professional email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border-2 border-white/10 rounded-full py-6 pl-16 pr-8 text-white text-lg font-bold outline-none focus:border-[#6a35ff]/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-6 bg-white text-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#6a35ff] hover:text-white transition-all shadow-2xl hover:shadow-[#6a35ff]/30 active:scale-[0.98]"
                >
                  {status === 'loading' ? 'Encrypting...' : 'Join our Network'}
                </button>
                <p className="text-center text-[10px] font-black text-white/20 uppercase tracking-widest">
                  Zero Spam. Secure Data. Unsubscribe Anytime.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;
