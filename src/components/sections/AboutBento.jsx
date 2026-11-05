import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Users, Send } from 'lucide-react';

const ABOUT_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
    caption: 'Precision Field Engineering',
    tag: 'Certified HVAC Diagnostics'
  },
  {
    url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1000&q=80',
    caption: 'Expert Inverter Installation',
    tag: 'Deep Vacuum & Pressure Hold'
  },
  {
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    caption: 'High-Pressure Chemical Sanitization',
    tag: 'Deep-Clean Wash Service'
  },
  {
    url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1000&q=80',
    caption: 'Inverter PCB Board Diagnostics',
    tag: '1-3 Yrs Board Warranty'
  },
  {
    url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1000&q=80',
    caption: 'Prompt Unit Pull Out & Delivery',
    tag: 'Doorstep Vehicle Transport'
  }
];

export default function AboutBento({ onLearnMore }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatically cycle through images every 5 seconds (5000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % ABOUT_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeImage = ABOUT_IMAGES[currentImageIndex];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-green-50 text-brand-green-600 border border-brand-green-200/60 mb-3">
              Know About Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Get Fast & Reliable AC Service
            </h2>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Card 1 (Left - Blueprint Grid Card) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 bg-brand-green-600 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-brand-green-700/15"
          >
            {/* Blueprint Grid Texture */}
            <div className="absolute inset-0 bg-blueprint-grid opacity-25 pointer-events-none" />

            {/* Glowing Accent Orb */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-sm mb-6 text-white border border-white/20">
                Get To Know Us
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug tracking-tight mb-4 text-white">
                Reliable Cooling Services For Homes And Businesses
              </h3>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed font-light mb-8">
                Expert AC repair, brand-new sales, and maintenance services that keep your space perfectly ice-cold with minimal energy footprint. Authorized dealer in Pangasinan and Pampanga.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-4 flex-wrap pt-4 border-t border-white/15">
              <button
                onClick={onLearnMore}
                className="px-6 py-3 rounded-full bg-white text-brand-green-700 font-bold text-sm shadow-md hover:bg-slate-50 transition-all duration-200 cursor-pointer"
              >
                Learn More Us
              </button>
              <a
                href="tel:09243750879"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/95 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>0924 375 0879</span>
              </a>
            </div>
          </motion.div>

          {/* Card 2 (Middle - Technician Photo Card that CHANGES EVERY 5 SECONDS) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-4 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 relative min-h-[380px] md:min-h-full group bg-slate-900"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  src={activeImage.url}
                  alt={activeImage.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-brand-green-500/90 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-white shadow-md">
                    {activeImage.tag}
                  </span>
                  <span className="text-[10px] font-bold text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                    5s Slideshow
                  </span>
                </div>

                {/* Bottom Caption and Progress Dots */}
                <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider block w-fit mb-2 border border-white/30">
                    {activeImage.caption}
                  </span>

                  {/* 5-second indicator dots */}
                  <div className="flex items-center gap-1.5 mt-2">
                    {ABOUT_IMAGES.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === currentImageIndex ? 'w-6 bg-brand-green-400' : 'w-2 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Card 3 & 4 (Right - Stacked Stat Cards) */}
          <div className="md:col-span-3 flex flex-col gap-6 justify-between">
            {/* Top Stat Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 flex-1 flex flex-col justify-center hover:shadow-xl hover:border-brand-green-200 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-green-50 text-brand-green-500 flex items-center justify-center mb-6 group-hover:bg-brand-green-500 group-hover:text-white transition-colors duration-300">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                15+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2 flex items-center gap-1.5">
                <span className="text-brand-green-500 font-black">|</span>
                <span>Years Of Experience</span>
              </div>
            </motion.div>

            {/* Bottom Stat Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 flex-1 flex flex-col justify-center hover:shadow-xl hover:border-brand-green-200 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-green-50 text-brand-green-500 flex items-center justify-center mb-6 group-hover:bg-brand-green-500 group-hover:text-white transition-colors duration-300">
                <Send className="w-6 h-6" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                2638+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2 flex items-center gap-1.5">
                <span className="text-brand-green-500 font-black">|</span>
                <span>Happy Customers</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
