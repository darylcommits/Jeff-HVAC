import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronRight, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Process', href: '#process' },
    { label: 'Blogs', href: '#blogs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-3 sm:top-4 left-3 right-3 sm:left-4 sm:right-4 z-50 transition-all duration-300 max-w-7xl mx-auto flex justify-center`}
      >
        <div
          className={`w-full flex items-center justify-between px-4 md:px-6 py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/90 py-2'
              : 'bg-white/90 backdrop-blur-sm shadow-md border border-slate-200/60'
          }`}
        >
          {/* Brand Logo & Company Title */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden shadow-sm border border-slate-200 transition-transform group-hover:scale-105 duration-200 shrink-0">
              <img
                src="/logo.jpg"
                alt="Jeff Air-condition and Refrigeration Maintenance Services"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span className="font-extrabold text-slate-900 tracking-tight text-xs sm:text-sm md:text-[15px] leading-tight">
                <span className="font-black tracking-tight inline-block mr-1">
                  <span className="text-brand-green-500">JE</span>
                  <span className="text-brand-red-500">FF</span>
                </span> Air-condition and Refrigeration
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] tracking-wider uppercase font-bold text-slate-500 mt-0.5">
                Maintenance Services
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-brand-green-500 transition-colors duration-200 py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-green-500 rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Phone link */}
            <a
              href="tel:09776991662"
              className="hidden sm:flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-700 hover:text-brand-green-500 transition-colors px-3 py-1.5 rounded-full hover:bg-slate-100"
            >
              <div className="w-7 h-7 rounded-full bg-brand-green-50 flex items-center justify-center text-brand-green-500">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span>0977 699 1662</span>
            </a>

            {/* Book Services CTA (styled as shown in reference) */}
            <button
              onClick={onOpenBooking}
              className="hidden md:inline-flex items-center justify-center px-5 py-2 rounded-full text-xs md:text-sm font-semibold text-brand-green-600 bg-brand-green-50 hover:bg-brand-green-500 hover:text-white border border-brand-green-200 transition-all duration-200 shadow-sm"
            >
              Book Services
            </button>



            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-brand-green-500 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden pt-24 px-4 pb-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 max-w-md mx-auto flex flex-col gap-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <span className="font-bold text-slate-800">Quick Menu</span>
              <a
                href="tel:09776991662"
                className="flex items-center gap-1.5 text-xs font-semibold text-brand-green-500"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hotline</span>
              </a>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-slate-700 hover:bg-brand-green-50 hover:text-brand-green-600 font-medium transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-brand-green-500 text-white font-semibold text-sm shadow-md hover:bg-brand-green-600 transition-colors"
              >
                Book Services
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
