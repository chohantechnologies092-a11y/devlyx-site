import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import About from '../components/About';
import Services from '../components/Services';
import Tech from '../components/Tech';
import Projects from '../components/Projects';
import Process from '../components/Process';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { useLocation } from 'react-router-dom';

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
      threshold: 0.05,
      rootMargin: "0px 0px 100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = Math.min(index * 40, 200);
          setTimeout(() => {
            entry.target.classList.add('active');

            if (entry.target.classList.contains('reveal-frame')) {
              entry.target.classList.remove('opacity-0', 'translate-y-10', '-translate-x-10', 'translate-x-10');
              const children = entry.target.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
              children.forEach(el => {
                el.classList.remove('opacity-0', 'translate-y-10', '-translate-x-10', 'translate-x-10');
              });
            }
          }, delay);
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
    </div>
  );
}

export default Home;
