import React from 'react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

export default function Footer({ onBookSchedule }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A1118] text-white pt-20 pb-12 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          {/* Left CTA Column (Matching frame 32) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-700">
                  <img
                    src="/logo.jpg"
                    alt="Jeff Air Condition & Refrigeration"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-white block">
                    Jeff <span className="text-brand-green-400">Air-condition</span> and Refrigeration
                  </span>
                  <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                    Maintenance Services
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-snug">
                Restore Cooling Comfort Without Delay
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                Professional AC repair services ensure your cooling and refrigeration systems operate with maximum efficiency and zero downtime.
              </p>
            </div>

            <div>
              <button
                onClick={onBookSchedule}
                className="px-7 py-3 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold text-sm shadow-lg shadow-brand-green-500/20 transition-all duration-200"
              >
                Book A Schedule
              </button>
            </div>
          </div>

          {/* Navigation Column 1 */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">
                  Get In Touch
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-emerald-400 transition-colors">
                  Our Process
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2 */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li>
                <a href="#projects" className="hover:text-emerald-400 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#blogs" className="hover:text-emerald-400 transition-colors">
                  Blogs
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors">
                  Book Inspection
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: Social Links & Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-6">
              Follow Us:
            </h4>
            <div className="flex items-center gap-2.5 mb-8">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-brand-green-500 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-brand-green-500 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-brand-green-500 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-brand-green-500 hover:text-white text-slate-300 flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>

            <div className="text-xs text-slate-400 space-y-2">
              <p className="font-semibold text-white">Official Branches:</p>
              <p>📍 <strong className="text-emerald-400">Pangasinan:</strong> San Bartolome, Rosales (0977 699 1662 / 0949 569 0281)</p>
              <p>📍 <strong className="text-emerald-400">Apalit:</strong> Apalit, Pampanga (0915 971 7470 / 0969 223 5507)</p>
              <p className="text-[11px] text-slate-500 pt-1">Certified Authorized Service Center • 1-Year Labor Warranty</p>
            </div>
          </div>
        </div>

        {/* GIANT WATERMARK BRAND TYPOGRAPHY (Exact match to VENTRO in frame 33 & 35) */}
        <div className="relative py-12 md:py-16 text-center overflow-hidden">
          <span className="text-[18vw] font-black tracking-widest text-slate-800/30 select-none block leading-none font-sans pointer-events-none uppercase">
            JEFF
          </span>
        </div>

        {/* Bottom Credits & Back To Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800/60 gap-4">
          <p>© {new Date().getFullYear()} Jeff Air-condition and Refrigeration Maintenance Services. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>Maintenance Service & Dealer</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
