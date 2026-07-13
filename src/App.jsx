import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
import { HelmetProvider } from 'react-helmet-async';
import { statsService } from './services/statsService';

// Lazy load components for performance
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const PostEditorPage = lazy(() => import('./pages/PostEditorPage'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const AllProjects = lazy(() => import('./pages/AllProjects'));
const ProjectEditorPage = lazy(() => import('./pages/ProjectEditorPage'));
const StartProject = lazy(() => import('./pages/StartProject'));
const SoftwareDevelopment = lazy(() => import('./pages/SoftwareDevelopment'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Premium Loading Component
const PageLoader = () => (
  <div className="fixed inset-0 bg-[#0a0a0b] z-[9999] flex flex-col items-center justify-center">
    {/* Logo */}
    <img src="/devlyxsol-01.webp" alt="Devlyx Solutions" className="w-32 md:w-40 h-auto mb-10 filter brightness-0 invert opacity-90 animate-pulse" />
    
    {/* Spinner */}
    <div className="relative flex items-center justify-center">
      <div className="w-16 h-16 border-[3px] border-white/5 border-t-[#6a35ff] border-r-[#00c2cb] rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-[3px] border-transparent border-b-[#6a35ff] border-l-[#00c2cb] rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
      <div className="absolute w-10 h-10 bg-gradient-to-tr from-[#6a35ff] to-[#00c2cb] blur-xl opacity-40 animate-pulse"></div>
    </div>
    
    <div className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
      Initializing...
    </div>
  </div>
);

import ChatBubble from './components/ChatBubble';

function App() {
  useEffect(() => {
    // Track the visit (with geolocation + device)
    statsService.trackVisit().catch(console.error);

    // Save time-on-site when user hides tab or closes browser
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        statsService.saveTimeOnSite().catch(console.error);
      }
    };
    const handleBeforeUnload = () => {
      statsService.saveTimeOnSite().catch(console.error);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/start-project" element={<StartProject />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:type/:region" element={<ServiceDetail />} />
            <Route path="/services/software-development-uae" element={<SoftwareDevelopment />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/dashboard/editor/:id" element={<PostEditorPage />} />
            <Route path="/dashboard/projects/editor/:id" element={<ProjectEditorPage />} />
          </Routes>
          <ChatBubble />
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
