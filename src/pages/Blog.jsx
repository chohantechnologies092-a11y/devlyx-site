import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import { blogService } from '../services/blogService';
import { leadService } from '../services/leadService';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle'); // idle, loading, success, error, exists

  // Derive unique categories from posts (assuming posts have a category field)
  // Fallback to tags if category doesn't exist but tags do.
  const categories = ['All', ...new Set(posts.flatMap(post => post.category || (post.tags && post.tags[0]) || []).filter(Boolean))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    const postCat = post.category || (post.tags && post.tags[0]);
    const matchesCategory = selectedCategory === 'All' || postCat === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogService.getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('loading');
    try {
      const result = await leadService.subscribeNewsletter(newsletterEmail);
      setNewsletterStatus(result.status);
      if (result.status === 'success') {
        setNewsletterEmail('');
        setTimeout(() => setNewsletterStatus('idle'), 5000);
      }
    } catch (error) {
      console.error("Newsletter error:", error);
      setNewsletterStatus('error');
    }
  };

  return (
    <div className="w-full bg-[#fcfcfd] min-h-screen">
      <Helmet>
        <title>Insights & News | Devlyx Solutions Blog</title>
        <meta name="description" content="Stay updated with the latest trends in software development, AI, and digital transformation. Expert insights from Devlyx Solutions." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://devlyxsolutions.com/blog" />
        <meta property="og:title" content="Insights & News | Devlyx Solutions Blog" />
        <meta property="og:description" content="Latest trends in software, AI, and digital transformation." />
        <meta property="og:image" content="https://devlyxsolutions.com/og-blog.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://devlyxsolutions.com/blog" />
        <meta property="twitter:title" content="Insights & News | Devlyx Solutions Blog" />
        <meta property="twitter:description" content="Latest trends in software, AI, and digital transformation." />
        <meta property="twitter:image" content="https://devlyxsolutions.com/og-blog.png" />
      </Helmet>
      <Navbar />

      {/* Hero Section */}
      <section className="pt-44 pb-16 px-6 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-50/50 via-transparent to-transparent -z-10"></div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#6a35ff] animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Engineering Journal</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-10"
            >
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] to-[#00c2cb]">Future</span> <br />
              Encoded.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto"
            >
              Deep dives into the technologies shaping tomorrow. From AI-driven systems to high-performance mobile architectures.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Post (Latest) */}
      {!loading && filteredPosts.length > 0 && selectedCategory === 'All' && !searchQuery && (
        <section className="px-6 mb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-[3rem] border border-gray-100 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-15px_rgba(106,53,255,0.1)] transition-all duration-700 flex flex-col lg:flex-row min-h-[500px]"
            >
              <div className="lg:w-3/5 relative overflow-hidden">
                <img 
                  src={filteredPosts[0].coverImage || filteredPosts[0].image} 
                  alt={filteredPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute top-8 left-8 px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#6a35ff] shadow-xl">
                  Featured Article
                </div>
              </div>
              <div className="lg:w-2/5 p-10 md:p-16 flex flex-col justify-center">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00c2cb] mb-4">
                  {filteredPosts[0].category || 'Technology'} • {filteredPosts[0].readTime || '8 min'} read
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6 group-hover:text-[#6a35ff] transition-colors">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-gray-500 text-lg font-medium leading-relaxed mb-10 line-clamp-3">
                  {filteredPosts[0].excerpt}
                </p>
                <div className="mt-auto">
                  <a 
                    href={`/blog/${filteredPosts[0].slug}`}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#6a35ff] hover:-translate-y-1 transition-all shadow-xl shadow-gray-200 hover:shadow-[#6a35ff]/30"
                  >
                    Read Full Story
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filter and Search Section */}
      <section className="px-6 relative z-20 -mt-8 mb-12">
        <div className="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-[2rem] shadow-xl shadow-purple-500/5 border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/2 relative">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#6a35ff] focus:bg-white transition-all outline-none"
            />
          </div>
          <div className="w-full md:w-1/2 overflow-x-auto pb-2 md:pb-0 flex items-center gap-2 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#6a35ff] text-white shadow-md shadow-purple-500/20' 
                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-[#6a35ff] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-100 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">No matching articles found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your search query or category filter.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#6a35ff] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3.5rem] p-10 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6a35ff]/20 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00c2cb]/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
              Stay ahead of the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6a35ff] to-[#00c2cb]">Curve.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-lg mx-auto">
              Get the latest insights on AI and Software Engineering delivered straight to your inbox.
            </p>
            
            <form onSubmit={handleNewsletter} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6a35ff] transition-all"
              />
              <button 
                type="submit"
                disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
                className="px-8 py-4 bg-[#6a35ff] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#5a2be0] hover:-translate-y-1 transition-all shadow-xl shadow-purple-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {newsletterStatus === 'loading' ? <Loader2 size={16} className="animate-spin" /> : 
                 newsletterStatus === 'success' ? <CheckCircle2 size={16} /> : 'Subscribe'}
              </button>
            </form>
            {newsletterStatus === 'success' && <p className="text-[#00c2cb] text-[10px] font-black uppercase tracking-widest mt-4 animate-bounce">Welcome to the future!</p>}
            {newsletterStatus === 'exists' && <p className="text-orange-400 text-[10px] font-black uppercase tracking-widest mt-4">You're already on the list!</p>}
            {newsletterStatus === 'error' && <p className="text-rose-400 text-[10px] font-black uppercase tracking-widest mt-4">Something went wrong. Try again.</p>}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
