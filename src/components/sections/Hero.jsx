import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ArrowRight } from 'lucide-react';
import InteractiveACUnit from '../3d/InteractiveACUnit';

export default function Hero({ onGetStarted, onLearnMore }) {
  return (
    <section className="relative pt-32 pb-12 md:pt-36 md:pb-16 overflow-hidden bg-air-stripes flex flex-col items-center">
      {/* Background radial gradient glow for depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center">
        {/* Animated Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-4xl break-words">
            Digital AC{' '}
            <span className="text-brand-green-500 relative inline-block">
              Solutions
              {/* Subtle underline wave */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-brand-green-300/60"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path d="M0 15 Q 25 5, 50 15 T 100 15" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
            <br />
            <span className="inline-flex items-center gap-2 sm:gap-4 flex-wrap justify-center mt-2">
              <span>For</span>
              {/* Capsule Image Badge from Reference Video */}
              <span className="inline-flex items-center align-middle rounded-full overflow-hidden border-2 border-white shadow-md w-14 sm:w-20 md:w-24 h-8 sm:h-10 md:h-12 mx-1">
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=300&q=80"
                  alt="Relaxing in clean cool air"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
              </span>
              <span>Tomorrow</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
            Expert AC repair and maintenance services that keep your home comfortable year-round technicians, guaranteed results.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={onGetStarted}
              className="px-7 py-3.5 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-brand-green-500/25 hover:shadow-brand-green-500/40 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 group"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onLearnMore}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200"
            >
              Learn More Us
            </button>
          </div>
        </motion.div>

        {/* FLOATING TILTED BADGES ON SIDES (Exact match to reference video) */}
        
        {/* Left Badge: Energy Saved 50% (Desktop only to prevent overlap) */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -12 }}
          animate={{ opacity: 1, x: 0, rotate: -10 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden xl:flex absolute left-4 lg:left-8 top-1/3 flex-col items-center bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-100 hover:rotate-0 transition-transform duration-300 select-none z-20"
        >
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Energy Saved</span>
          <span className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-1">50%</span>
          {/* Hand drawn sketch doodle */}
          <svg className="w-8 h-8 text-brand-green-500 mt-2 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.div>

        {/* Right Badge: 12k+ Happy Client's (Desktop only to prevent overlap) */}
        <motion.div
          initial={{ opacity: 0, x: 30, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 8 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden xl:flex absolute right-4 lg:right-8 top-1/3 flex-col items-center bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-100 hover:rotate-0 transition-transform duration-300 select-none z-20"
        >
          <div className="w-9 h-9 rounded-full bg-brand-green-50 text-brand-green-500 flex items-center justify-center mb-1">
            <ThumbsUp className="w-5 h-5 fill-brand-green-500/20" />
          </div>
          <span className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-0.5">12k+</span>
          <span className="text-[11px] font-semibold text-slate-400 tracking-wide">Happy Client's</span>
          {/* Hand drawn squiggle doodle */}
          <svg className="w-10 h-6 text-brand-green-400 mt-1 stroke-current" viewBox="0 0 40 20" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M2 15 C 10 2, 15 20, 25 5 C 32 -5, 38 18, 38 10" />
          </svg>
        </motion.div>
      </div>

      {/* INTERACTIVE 3D/CANVAS HVAC AC UNIT (Blowing moist cold air with ON/OFF control) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="w-full max-w-5xl mx-auto px-4 mt-2 sm:mt-4 relative z-10"
      >
        <InteractiveACUnit />
      </motion.div>
    </section>
  );
}
