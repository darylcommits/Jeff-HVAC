import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowRight, User, Calendar, X } from 'lucide-react';

export default function Blog({ blogs = [] }) {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section id="blogs" className="py-20 md:py-28 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-green-50 text-brand-green-600 border border-brand-green-200/60 mb-3">
              Read Our Insights
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Latest Blog & News
            </h2>
          </div>
          <div>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold text-sm shadow-md transition-all duration-200 inline-block"
            >
              Read More Blogs
            </a>
          </div>
        </div>

        {/* Blog Cards Grid (Matching frame 28) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blogs.map((post, idx) => (
            <motion.div
              key={post.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-brand-green-200 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center group cursor-pointer"
            >
              {/* Image */}
              <div className="w-full sm:w-48 sm:h-48 h-52 rounded-2xl overflow-hidden shrink-0 relative bg-slate-100">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-brand-green-600 transition-colors mb-2.5 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-3 text-slate-400 font-medium">
                    <span className="flex items-center gap-1.5 font-semibold text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-brand-green-500" />
                      <span>{post.date || (post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent')}</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.read_time}</span>
                    </span>
                  </div>

                  <span className="font-bold text-brand-green-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Read Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Blog Article Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="rounded-2xl overflow-hidden h-64 mb-6">
                <img
                  src={selectedPost.featured_image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-medium flex-wrap">
                <span className="px-2.5 py-1 rounded-full bg-brand-green-50 text-brand-green-700 font-semibold">
                  {selectedPost.category}
                </span>
                <span className="flex items-center gap-1 text-slate-600 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-brand-green-500" />
                  <span>{selectedPost.date || (selectedPost.published_at ? new Date(selectedPost.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent')}</span>
                </span>
                <span>•</span>
                <span>By {selectedPost.author_name}</span>
                <span>•</span>
                <span>{selectedPost.read_time}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                {selectedPost.title}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {selectedPost.content}
              </p>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-2.5 rounded-full bg-brand-green-500 text-white font-semibold text-xs hover:bg-brand-green-600 transition-colors shadow-sm"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
