import React from 'react';
import { Sparkles, Wind, ShieldCheck, Zap, Award, CheckCircle } from 'lucide-react';

export default function MarqueeTicker() {
  const items = [
    { text: 'Perfect Comfort', icon: Sparkles },
    { text: 'Comfort Restored', icon: Wind },
    { text: 'Fast & Reliable AC Service', icon: Zap },
    { text: 'Certified Technicians', icon: ShieldCheck },
    { text: 'Energy Efficient Systems', icon: Award },
    { text: 'Guaranteed Satisfaction', icon: CheckCircle },
    { text: 'Commercial & Residential', icon: Wind },
    { text: '24/7 Priority Emergency Support', icon: Zap },
  ];

  return (
    <div className="w-full bg-white border-y border-slate-100 py-6 overflow-hidden select-none relative shadow-sm">
      {/* Subtle edge fades */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* First set */}
        <div className="flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16">
          {items.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="flex items-center gap-4 group">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight whitespace-nowrap transition-colors duration-200 group-hover:text-brand-green-500">
                  {item.text}
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-green-50 text-brand-green-500 flex items-center justify-center shrink-0">
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16" aria-hidden="true">
          {items.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={`dup-${idx}`} className="flex items-center gap-4 group">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight whitespace-nowrap transition-colors duration-200 group-hover:text-brand-green-500">
                  {item.text}
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-green-50 text-brand-green-500 flex items-center justify-center shrink-0">
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
