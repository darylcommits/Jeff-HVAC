import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';

export default function CtaBanner({ onBookServices, onGetQuote }) {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-air-stripes border border-brand-green-100 p-8 sm:p-14 md:p-20 text-center shadow-xl shadow-brand-green-500/5">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />

          {/* Left Floating Technician Pill Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 w-28 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl rotate-[-6deg]"
          >
            <img
              src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=400&q=80"
              alt="Technician inspection"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Floating Technician Pill Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 w-28 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl rotate-[6deg]"
          >
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80"
              alt="Cooling system work"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-white text-brand-green-600 border border-brand-green-200/80 mb-4 shadow-sm">
              Comfort Restored
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
              Ready to Upgrade Your Cooling System?
            </h2>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={onBookServices}
                className="px-8 py-3.5 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-brand-green-500/25 hover:shadow-brand-green-500/40 transition-all duration-200 flex items-center gap-2 group"
              >
                <span>Book Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onGetQuote}
                className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200"
              >
                Request a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
