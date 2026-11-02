import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Users, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function AboutBento({ onLearnMore }) {
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
                Expert AC repair and maintenance services that keep your space perfectly conditioned with minimal energy footprint.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-4 flex-wrap pt-4 border-t border-white/15">
              <button
                onClick={onLearnMore}
                className="px-6 py-3 rounded-full bg-white text-brand-green-700 font-bold text-sm shadow-md hover:bg-slate-50 transition-all duration-200"
              >
                Learn More Us
              </button>
              <a
                href="tel:09776991662"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/95 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>0977 699 1662</span>
              </a>
            </div>
          </motion.div>

          {/* Card 2 (Middle - Technician Photo Card) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-4 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 relative min-h-[380px] md:min-h-full group"
          >
            <img
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80"
              alt="Certified HVAC Technician Diagnosing Air Conditioning System"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider">
                Precision Field Engineering
              </span>
            </div>
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
