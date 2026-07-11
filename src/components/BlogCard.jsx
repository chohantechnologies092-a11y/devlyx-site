import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogCard = ({ post }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={post.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60"></div>
        
        {/* Category Tag */}
        <div className="absolute top-6 left-6">
          <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-[#6a35ff] rounded-full border border-purple-100 shadow-sm">
            {post.category || 'Tech'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
            <Calendar size={12} className="text-purple-500" />
            {new Date(post.createdAt?.seconds * 1000).toLocaleDateString() || 'Recently'}
          </div>
          <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
          <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
            <Clock size={12} className="text-cyan-500" />
            {post.readingTime || '5 min read'}
          </div>
        </div>

        <h3 className="text-xl font-black text-gray-900 mb-4 line-clamp-2 group-hover:text-[#6a35ff] transition-colors duration-300">
          {post.title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
          {post.excerpt || 'Explore the latest insights and trends in software development and technology.'}
        </p>

        <Link 
          to={`/blog/${post.slug}`} 
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#6a35ff] group/btn"
        >
          Read Article
          <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
