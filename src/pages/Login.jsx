import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-100/50 blur-[150px] rounded-full"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-cyan-100/50 blur-[150px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[3rem] border border-white shadow-2xl shadow-purple-500/5">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#6a35ff] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-purple-500/20 rotate-12">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">Admin Access</h1>
            <p className="text-gray-500 text-sm font-medium">Manage your content and insights.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-[#6a35ff] transition-all font-medium text-gray-900"
                  placeholder="admin@devlyx.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-[#6a35ff] transition-all font-medium text-gray-900"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#6a35ff] text-white rounded-full font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-purple-500/30 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => navigate('/')}
              className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#6a35ff] transition-colors"
            >
              Back to Website
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
