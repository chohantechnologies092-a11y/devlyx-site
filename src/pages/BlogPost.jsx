import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogService } from '../services/blogService';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import { statsService } from '../services/statsService';
import SEO from '../components/SEO';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [readingTheme, setReadingTheme] = useState('light'); // light, dark, sepia

  useEffect(() => {
    if (isReadingMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isReadingMode]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(scroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await blogService.getPostBySlug(slug);
        setPost(data);
        
        // Fetch related posts (latest 3 excluding current)
        const allPosts = await blogService.getAllPosts();
        setRelatedPosts(allPosts.filter(p => p.slug !== slug).slice(0, 3));

        if (data?.id) {
          statsService.trackPostView(data.id).catch(console.error);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = (platform) => {
    const url = `https://devlyxsolutions.com/blog/${slug}`;
    const text = post?.title;
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
      return;
    }

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#fcfcfd]">
        <div className="w-10 h-10 border-4 border-[#6a35ff] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fcfcfd] flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-black text-gray-900 mb-6">Article Not Found</h1>
        <Link to="/blog" className="text-[#6a35ff] font-bold flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fcfcfd]">
      <SEO 
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        url={`https://devlyxsolutions.com/blog/${slug}`}
        type="article"
        articleData={{
          publishedTime: post.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toISOString() : new Date().toISOString(),
          modifiedTime: post.updatedAt?.seconds ? new Date(post.updatedAt.seconds * 1000).toISOString() : null
        }}
      />
      
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#6a35ff] z-[9999] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress * 100}%` }}
      ></div>

      <Navbar />

      {/* Article Header */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#6a35ff] transition-colors text-[10px] font-black uppercase tracking-widest mb-12 group">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Back to Articles
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <span className="px-4 py-2 bg-purple-50 text-[10px] font-black uppercase tracking-widest text-[#6a35ff] rounded-full">
              {post.category || 'Technology'}
            </span>
            <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
              <Clock size={12} /> {post.readingTime || '5 min read'}
            </div>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.95] mb-12">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-y border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6a35ff] to-[#00c2cb] flex items-center justify-center text-white font-bold">
                {post.authorInitial || 'D'}
              </div>
              <div>
                <div className="text-sm font-black text-gray-900 uppercase tracking-tight">{post.authorName || 'Devlyx Team'}</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{post.createdAt?.seconds ? new Date(post.createdAt.seconds * 1000).toLocaleDateString() : 'Recent'}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsReadingMode(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-[#6a35ff] hover:border-purple-100 hover:bg-purple-50 transition-all mr-2"
                title="Enter Reading Mode"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                Reading Mode
              </button>
              <button onClick={() => handleShare('facebook')} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:border-blue-100 hover:bg-blue-50 transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </button>
              <button onClick={() => handleShare('twitter')} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#000] hover:border-gray-300 hover:bg-gray-50 transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.134l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z"/></svg>
              </button>
              <button onClick={() => handleShare('linkedin')} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-blue-100 hover:bg-blue-50 transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              </button>
              <button onClick={() => handleShare('copy')} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#6a35ff] hover:border-purple-100 hover:bg-purple-50 transition-all" title="Copy Link">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Mode Overlay */}
      {isReadingMode && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`fixed inset-0 z-[10000] overflow-y-auto px-6 py-20 transition-colors duration-500 ${
            readingTheme === 'dark' ? 'bg-[#121212] text-gray-100' : 
            readingTheme === 'sepia' ? 'bg-[#f4ecd8] text-[#5b4636]' : 
            'bg-white text-gray-900'
          }`}
        >
          <div className="max-w-3xl mx-auto relative">
            <div className="fixed top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gray-50/10 backdrop-blur-md p-1.5 rounded-full border border-gray-200/20 shadow-2xl z-[10001]">
              {[
                { id: 'light', name: 'Light', color: 'bg-white' },
                { id: 'sepia', name: 'Sepia', color: 'bg-[#f4ecd8]' },
                { id: 'dark', name: 'Dark', color: 'bg-[#121212]' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setReadingTheme(t.id)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${t.color} ${readingTheme === t.id ? 'border-[#6a35ff] scale-110' : 'border-transparent opacity-50'}`}
                  title={`${t.name} Mode`}
                />
              ))}
            </div>

            <button 
              onClick={() => setIsReadingMode(false)}
              className={`fixed top-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-sm ${
                readingTheme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="text-center mb-16 pt-10">
              <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${readingTheme === 'dark' ? 'text-[#00c2cb]' : 'text-[#6a35ff]'}`}>Reading Mode</div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">{post.title}</h1>
            </div>

            <div 
              className={`prose prose-xl max-w-none leading-[1.8] font-serif prose-img:rounded-3xl ${
                readingTheme === 'dark' ? 'prose-invert text-gray-300' : 
                readingTheme === 'sepia' ? 'text-[#5b4636] prose-headings:text-[#5b4636]' : 
                'text-gray-700 prose-headings:text-gray-900'
              }`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-20 pt-10 border-t border-gray-100/10 text-center">
              <button 
                onClick={() => setIsReadingMode(false)}
                className={`px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] transition-all ${
                  readingTheme === 'dark' ? 'bg-white text-black hover:bg-[#00c2cb]' : 'bg-gray-900 text-white hover:bg-[#6a35ff]'
                }`}
              >
                Exit Reading Mode
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Featured Image */}
      <section className="px-6 mb-20">
        <div className="max-w-6xl mx-auto rounded-[3.5rem] overflow-hidden shadow-2xl shadow-purple-500/10 h-[400px] md:h-[600px]">
          <img 
            src={post.coverImage || post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div 
            className="prose prose-xl prose-purple max-w-none text-gray-600 leading-relaxed font-medium
              prose-headings:text-gray-900 prose-headings:font-black prose-headings:tracking-tight
              prose-p:mb-8 prose-img:rounded-[2.5rem] prose-img:shadow-2xl prose-strong:text-gray-900
              prose-a:text-[#6a35ff] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-24 p-12 md:p-16 bg-gray-900 rounded-[3.5rem] border border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6a35ff]/20 blur-[100px] rounded-full"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Stay ahead of the curve.</h3>
              <p className="text-gray-400 mb-10 font-medium max-w-md mx-auto">Get the latest insights on engineering and design delivered to your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#6a35ff] transition-all"
                />
                <button className="px-10 py-5 bg-[#6a35ff] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:shadow-xl hover:shadow-purple-500/30 transition-all hover:-translate-y-1">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 px-6 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6a35ff] mb-4">Up Next</div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">More Insights</h2>
              </div>
              <Link to="/blog" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">View All Articles</Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} className="group flex flex-col">
                  <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 relative bg-gray-100">
                    <img 
                      src={rp.coverImage || rp.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop'} 
                      alt={rp.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-[#00c2cb] mb-3">{rp.category || 'Tech'}</div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight leading-snug group-hover:text-[#6a35ff] transition-colors">{rp.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;
