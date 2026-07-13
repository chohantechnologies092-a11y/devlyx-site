import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const nav = document.getElementById('dynamic-nav');
    if (nav) {
      setTimeout(() => nav.classList.add('reveal-nav'), 300);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyles = scrolled ? {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderColor: 'rgba(106, 53, 255, 0.08)',
    boxShadow: '0 20px 40px rgba(106, 53, 255, 0.08), 0 1px 1px rgba(106, 53, 255, 0.05)',
    backdropFilter: 'blur(16px)'
  } : {
    backgroundColor: 'rgba(3, 7, 18, 0.85)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(16px)'
  };

  const textStyle = scrolled ? { color: '#111827' } : { color: 'white' };

  return (
    <div className="fixed top-8 w-full z-[1000] px-4 flex justify-center" id="navbar-container">
      <div className="relative w-full md:max-w-fit flex flex-col items-center gap-3">

        <nav id="dynamic-nav" style={navStyles} className={`w-full flex items-center justify-between md:justify-center gap-4 md:gap-6 px-5 md:px-6 py-3 rounded-[2rem] md:rounded-full border transition-all duration-500 ease-in-out hover:border-[#6a35ff]/30`}>

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div
              id="logo-bg"
              style={{ backgroundColor: scrolled ? '#111827' : 'white' }}
              className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:rotate-[360deg] duration-700"
            >
              <img
                id="logo-img"
                src={scrolled ? "/img/devlyxwht.svg" : "/devlyxsol-01.png"}
                alt="Devlyx"
                className="w-5.5 h-auto transition-all duration-500"
                style={scrolled ? { filter: 'brightness(0) invert(1)' } : {}}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span id="brand-name" style={textStyle} className="text-base md:text-lg font-black tracking-tighter transition-colors duration-500 group-hover:text-[#6a35ff]">DEVLYX</span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-[#00c2cb] font-bold">Solutions</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-full border border-black/[0.03] dark:border-white/[0.03]" style={scrolled ? { backgroundColor: 'rgba(0,0,0,0.03)' } : { backgroundColor: 'rgba(255,255,255,0.04)' }}>
            {[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
              { name: 'Services', href: '/services' },
              { name: 'Projects', href: '/projects' },
              { name: 'Blog', href: '/blog' },
              { name: 'Contact', href: '/contact' }
            ].map(link => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex flex-col items-center gap-1 ${
                    isActive 
                      ? 'text-[#6a35ff] bg-[#6a35ff]/10' 
                      : scrolled 
                        ? 'text-gray-600 hover:text-black hover:bg-black/5' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#6a35ff]" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block w-[1px] h-6 bg-white/10" style={scrolled ? { backgroundColor: 'rgba(0,0,0,0.1)' } : {}}></div>

          {/* Call To Action with hover glow */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/start-project" className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-500 shadow-md ${
              scrolled 
                ? 'bg-[#6a35ff] text-white hover:shadow-[0_0_20px_rgba(106,53,255,0.4)] hover:-translate-y-0.5' 
                : 'bg-white text-gray-900 hover:bg-[#6a35ff] hover:text-white hover:shadow-[0_0_20px_rgba(106,53,255,0.4)] hover:-translate-y-0.5'
            }`}>
              Start Project
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/10 transition-colors"
              style={scrolled ? { borderColor: 'rgba(0,0,0,0.1)', color: '#111' } : { color: '#fff' }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex flex-col gap-1.5">
                <span className={`block w-4 h-0.5 bg-current transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-4 h-0.5 bg-current transition-all ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-4 h-0.5 bg-current transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-18 w-full min-w-[240px] bg-gray-950/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 flex flex-col items-center gap-4 transition-all duration-500 ease-out shadow-2xl ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}`}>
          {[
            { name: 'HOME', href: '/' },
            { name: 'ABOUT', href: '/about' },
            { name: 'SERVICES', href: '/services' },
            { name: 'PROJECTS', href: '/projects' },
            { name: 'BLOG', href: '/blog' },
            { name: 'CONTACT', href: '/contact' }
          ].map(link => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-xs font-black tracking-widest uppercase transition-all duration-300 py-1.5 w-full text-center rounded-xl ${
                location.pathname === link.href ? 'text-[#6a35ff] bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="w-full h-px bg-white/10 my-2"></div>

          <Link
            to="/start-project"
            onClick={() => setIsOpen(false)}
            className="w-full text-center px-6 py-3.5 bg-gradient-to-r from-[#6a35ff] to-[#00c2cb] text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_25px_rgba(106,53,255,0.4)] transition-all"
          >
            Start Project
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;