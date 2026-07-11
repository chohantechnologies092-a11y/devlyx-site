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
  <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center">
    <div className="w-16 h-16 border-4 border-gray-100 border-t-[#6a35ff] rounded-full animate-spin mb-4"></div>
    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 animate-pulse">Devlyx Solutions</div>
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
