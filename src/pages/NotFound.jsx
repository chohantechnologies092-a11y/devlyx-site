import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft, Terminal, ShieldAlert } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="w-full bg-[#0a0a0b] min-h-screen text-white font-sans selection:bg-[#6a35ff] selection:text-white flex flex-col justify-between overflow-hidden">
      <Helmet>
        <title>404 - Node Not Found | Devlyx Solutions</title>
        <meta name="description" content="The requested engineering node or protocol could not be located on Devlyx servers." />
      </Helmet>

      <Navbar />

      <main className="relative flex-grow flex items-center justify-center px-6 pt-36 pb-20">
        {/* Ambient Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#6a35ff]/20 to-[#00c2cb]/15 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <ShieldAlert size={14} className="text-[#00c2cb] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">ERROR_CODE: 404 // NODE_NOT_FOUND</span>
          </motion.div>

          {/* Glitch 404 Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-8xl md:text-[140px] font-black tracking-tighter leading-none mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">4</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] via-[#00c2cb] to-[#3ecf8e]">0</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">4</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl font-black tracking-tight text-white mb-4"
          >
            System Node Disconnected
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-400 text-sm md:text-base font-medium leading-relaxed max-w-lg mx-auto mb-10"
          >
            The route or engineering asset you requested has been relocated, archived, or does not exist on our active clusters.
          </motion.p>

          {/* Terminal Console Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10 p-4 rounded-2xl bg-black/60 border border-white/5 text-left font-mono text-[11px] text-gray-400 max-w-md mx-auto shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70"></span>
              <span className="ml-2 text-[9px] uppercase tracking-widest text-gray-500">devlyx-kernel-trace</span>
            </div>
            <p className="text-[#00c2cb]">$ ping endpoint --target route</p>
            <p className="text-red-400">STATUS: 404 Destination Unreachable</p>
            <p className="text-gray-500">&gt; fallback protocol initiated: return_to_home</p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-gray-950 font-black uppercase tracking-widest text-xs hover:bg-[#6a35ff] hover:text-white transition-all duration-300 shadow-xl shadow-white/5 hover:shadow-purple-500/25 hover:-translate-y-0.5"
            >
              <Home size={14} />
              Return Home
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Terminal size={14} />
              Explore Work
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
