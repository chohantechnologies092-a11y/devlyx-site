import React, { useEffect, Suspense, lazy } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import { useLocation } from 'react-router-dom';

const Clients = lazy(() => import('../components/Clients'));
const About = lazy(() => import('../components/About'));
const Tech = lazy(() => import('../components/Tech'));
const Projects = lazy(() => import('../components/Projects'));
const Services = lazy(() => import('../components/Services'));
const Process = lazy(() => import('../components/Process'));
const Testimonials = lazy(() => import('../components/Testimonials'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));
const Newsletter = lazy(() => import('../components/Newsletter'));

function Home() {
  const location = useLocation();

  // Handle scroll to hash when navigating from other pages
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Shorter timeout to feel more responsive, but enough for render
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  // Global intersection observer logic
  useEffect(() => {

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Staggered delay for .scroll-reveal and .reveal-card elements
          setTimeout(() => {
            entry.target.classList.add('active');

            if (entry.target.classList.contains('reveal-frame')) {
              entry.target.classList.remove('opacity-0', 'translate-y-10', '-translate-x-10', 'translate-x-10');
              const children = entry.target.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
              children.forEach(el => {
                el.classList.remove('opacity-0', 'translate-y-10', '-translate-x-10', 'translate-x-10');
              });
            }
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('.scroll-reveal, .reveal-card, .reveal-frame');
    elementsToObserve.forEach(el => observer.observe(el));

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full bg-[#fcfcfd]">
      <SEO 
        title="Premium Digital Engineering" 
        description="Transforming visions into world-class digital products with expert web, mobile, and AI engineering."
      />
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="min-h-screen w-full bg-[#fcfcfd] animate-pulse"></div>}>
        <Clients />
        <About />
        <Services />
        <Tech />
        <Projects />
        <Process />
        <Testimonials />
        <Newsletter />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
}

export default Home;
