import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Truck,
  Award,
  CheckCircle2,
  Phone,
  MapPin,
  CreditCard,
  Banknote,
  Smartphone,
  Building,
  ExternalLink,
} from 'lucide-react';

export default function TrustAndBranches({ onBookService }) {
  const branches = [
    {
      name: 'Pangasinan Branch',
      location: 'San Bartolome, Rosales, Pangasinan',
      hotlines: ['0977 699 1662', '0949 569 0281'],
      facebook: 'https://facebook.com',
      fbLabel: 'Jeff Aircondition and Refridgeration Maintainance Services Pangasinan',
      badge: 'Main Regional Center',
    },
    {
      name: 'Apalit Branch',
      location: 'Apalit, Pampanga',
      hotlines: ['0915 971 7470', '0969 223 5507'],
      facebook: 'https://facebook.com',
      fbLabel: 'Jeff Aircondition and Refridgeration Maintainance Services Apalit',
      badge: 'Pampanga Service Center',
    },
  ];

  const paymentMethods = [
    { name: 'Cash on Delivery (COD)', icon: Banknote, desc: 'Pay safely upon unit arrival & testing' },
    { name: 'Bank Transfer', icon: Building, desc: 'Direct online bank deposit' },
    { name: 'GCash', icon: Smartphone, desc: 'Instant QR code or mobile wallet payment' },
    { name: 'Credit Card', icon: CreditCard, desc: 'Straight payment supported' },
  ];

  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            PROMO HIGHLIGHT BANNER: FREE INSTALLATION & DELIVERY
           ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-red-500 via-rose-600 to-brand-red-600 p-8 sm:p-10 text-white shadow-xl shadow-brand-red-500/15 mb-16">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
                <Truck className="w-9 h-9 text-white stroke-[2.2]" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/25 text-white text-[10px] font-black uppercase tracking-wider mb-1">
                  Exclusive Dealer Promo
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  FREE INSTALLATION AND DELIVERY
                </h3>
                <p className="text-white/90 text-xs sm:text-sm mt-1 max-w-xl">
                  Available on all brand-new Split Type, Window Type, 2-Way & 4-Way Cassette inverter air conditioner units.
                </p>
              </div>
            </div>

            <button
              onClick={() => onBookService('Brand-New AC Units & Expert Installation')}
              className="px-8 py-3.5 rounded-full bg-white text-brand-red-600 font-extrabold text-xs sm:text-sm hover:bg-slate-50 transition-all shadow-md shrink-0 cursor-pointer"
            >
              Inquire Now
            </button>
          </div>
        </div>

        {/* =========================================================================
            WARRANTY & AUTHORIZED SERVICE CENTER BADGES
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Badge 1: Authorized Service Center */}
          <div className="bg-gradient-to-br from-brand-green-50 to-emerald-100/40 rounded-3xl p-6 sm:p-8 border border-brand-green-200/80 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-brand-green-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-green-700 block mb-0.5">
                Official Credential
              </span>
              <h4 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
                Certified Authorized Service Center
              </h4>
              <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                Factory certified for many leading brands and selected appliances with genuine OEM parts.
              </p>
            </div>
          </div>

          {/* Badge 2: 1 Year Warranty */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100/40 rounded-3xl p-6 sm:p-8 border border-blue-200/80 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block mb-0.5">
                Full Coverage
              </span>
              <h4 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
                1 Year Warranty
              </h4>
              <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                Comprehensive maintenance and labor warranty on all professional installations and servicing.
              </p>
            </div>
          </div>

          {/* Badge 3: 5 - 10 Years Warranty */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100/40 rounded-3xl p-6 sm:p-8 border border-amber-200/80 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block mb-0.5">
                Compressor Protection
              </span>
              <h4 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
                Up to 10 Years Warranty
              </h4>
              <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
                10 Years compressor warranty on selected brands, and 5 Years warranty on other recognized brands.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            OFFICIAL BRANCHES (Pangasinan & Apalit)
           ========================================================================= */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-brand-green-600 bg-brand-green-50 px-3 py-1 rounded-full border border-brand-green-200/60">
              Our Locations
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Visit or Contact Our Official Branches
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {branches.map((b) => (
              <div
                key={b.name}
                className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-green-500 text-white">
                      {b.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Authorized Facility</span>
                  </div>

                  <h4 className="text-2xl font-extrabold text-slate-900 mb-2">{b.name}</h4>

                  <div className="flex items-start gap-2.5 text-sm text-slate-600 mb-6">
                    <MapPin className="w-4 h-4 text-brand-green-600 shrink-0 mt-0.5" />
                    <span className="font-medium">{b.location}</span>
                  </div>

                  {/* Hotlines */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] uppercase font-bold text-slate-400 block tracking-wider">
                      Branch Hotlines:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {b.hotlines.map((num) => (
                        <a
                          key={num}
                          href={`tel:${num.replace(/\s+/g, '')}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold text-xs hover:border-brand-green-500 hover:text-brand-green-600 transition-colors shadow-sm"
                        >
                          <Phone className="w-3.5 h-3.5 text-brand-green-500" />
                          <span>{num}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Facebook Page Link */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <a
                    href={b.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 fill-blue-600" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                    </svg>
                    <span className="truncate max-w-[260px] sm:max-w-xs">{b.fbLabel}</span>
                  </a>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            ACCEPTED PAYMENT METHODS ("WE ACCEPT")
           ========================================================================= */}
        <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-slate-200/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Convenient & Secure
              </span>
              <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Payment Methods We Accept
              </h4>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Flexible options for residential & commercial clients
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paymentMethods.map((pm) => {
              const Icon = pm.icon;
              return (
                <div
                  key={pm.name}
                  className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-green-50 text-brand-green-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm">{pm.name}</h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{pm.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
