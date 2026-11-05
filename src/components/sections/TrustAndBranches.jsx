import React, { useState } from 'react';
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
  RotateCw,
  Search,
  Navigation,
  Clock,
  Sparkles
} from 'lucide-react';

const COVERAGE_AREAS = [
  {
    province: 'Pangasinan (Main Coverage)',
    badge: 'Same-Day / Priority Dispatch',
    towns: [
      'Rosales (HQ)',
      'Urdaneta City',
      'Dagupan City',
      'San Carlos City',
      'Calasiao',
      'Malasiqui',
      'Lingayen',
      'Alaminos City',
      'Mangaldan',
      'Villasis',
      'Binalonan',
      'Santa Barbara',
      'Tayug',
      'Asingan',
      'Manaoag',
      'Pozorrubio',
      'Bayambang',
      'San Manuel',
      'Umingan',
      'Alcala',
      'Balungao',
      'Bautista'
    ]
  },
  {
    province: 'Pampanga (Apalit Branch)',
    badge: 'Direct Service Center',
    towns: [
      'Apalit (Branch)',
      'City of San Fernando',
      'Angeles City',
      'Mabalacat',
      'Guagua',
      'Lubao',
      'Mexico',
      'Floridablanca',
      'Candaba',
      'Macabebe',
      'Masantol'
    ]
  },
  {
    province: 'Tarlac & La Union (Neighboring Hubs)',
    badge: 'Scheduled Service Route',
    towns: [
      'Tarlac City',
      'Paniqui',
      'Gerona',
      'Moncada',
      'Camiling',
      'Agoo (La Union)',
      'Santo Tomas (La Union)',
      'Rosario (La Union)'
    ]
  }
];

export default function TrustAndBranches({ onBookService }) {
  const [flippedCard, setFlippedCard] = useState(null);
  const [locationSearch, setLocationSearch] = useState('');

  const branches = [
    {
      id: 'pangasinan',
      name: 'Pangasinan Branch',
      location: 'San Bartolome, Rosales, Pangasinan',
      badge: 'Main Regional Center & Warehouse',
      facebook: 'https://facebook.com/jeffairconpangasinan',
      fbLabel: 'Jeff Aircondition and Refridgeration Maintainance Services Pangasinan',
      hours: '8:00 AM - 5:00 PM (Daily)',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      staff: [
        { name: 'Jeff "CEO"', phone: '0977 699 1662', rawPhone: '09776991662', role: 'CEO / General Manager' },
        { name: 'Gian', phone: '0924 375 0879', rawPhone: '09243750879', role: 'Main Operations Hotline (Nav)' },
        { name: 'MJ', phone: '0927 045 1215', rawPhone: '09270451215', role: 'Service Coordinator' },
        { name: 'Kristle', phone: '0949 569 0281', rawPhone: '09495690281', role: 'Customer Support Desk' },
        { name: 'Ailyn', phone: '0914 375 607', rawPhone: '0914375607', role: 'Dispatch Support' },
      ],
    },
    {
      id: 'apalit',
      name: 'Apalit Branch',
      location: 'Apalit, Pampanga',
      badge: 'Pampanga Service Facility',
      facebook: 'https://facebook.com/jeffairconapalit',
      fbLabel: 'Jeff Aircondition and Refridgeration Maintainance Services Apalit',
      hours: '8:00 AM - 5:00 PM (Daily)',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
      staff: [
        { name: 'Apalit Hotline 1', phone: '0915 971 7470', rawPhone: '09159717470', role: 'Branch Dispatch' },
        { name: 'Apalit Hotline 2', phone: '0969 223 5507', rawPhone: '09692235507', role: 'Field Operations' },
        { name: 'Pampanga Team Desk', phone: '0977 699 1662', rawPhone: '09776991662', role: 'Central Coordination' }
      ],
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
            PROMO HIGHLIGHT BANNER: FREE INSTALLATION AND DELIVERY
           ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-red-500 via-rose-600 to-brand-red-600 p-8 sm:p-10 text-white shadow-xl shadow-brand-red-500/15 mb-16">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
                <Truck className="w-9 h-9 text-white stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start mb-1">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-white/25 text-white text-[10px] font-black uppercase tracking-wider">
                    Exclusive Dealer Promo
                  </span>
                  <span className="inline-block px-3 py-0.5 rounded-full bg-yellow-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    1-3 Years Warranty on PCB Board
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  FREE INSTALLATION AND DELIVERY
                </h3>
                <p className="text-white/90 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  Available on all brand-new Split Type, Window Type, 2-Way & 4-Way Cassette inverter air conditioner units. Includes complimentary <strong>Ocular Visit or Site Survey</strong> and <strong>1 to 3 Years Warranty on PCB / board of unit for selected brands</strong>!
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {/* Badge 1: Authorized Service Center */}
          <div className="bg-gradient-to-br from-brand-green-50 to-emerald-100/40 rounded-3xl p-6 border border-brand-green-200/80 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-brand-green-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-brand-green-700 block mb-0.5">
                Official Credential
              </span>
              <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                Certified Dealer & Service Center
              </h4>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                Factory certified for Fujidenzo, Whirlpool, Maytag, Tecnogas, CHiQ, Daikin, Midea, Kolin, Carrier.
              </p>
            </div>
          </div>

          {/* Badge 2: 1 Year Labor Warranty */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100/40 rounded-3xl p-6 border border-blue-200/80 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 block mb-0.5">
                Full Labor Coverage
              </span>
              <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                1 Year Labor Warranty
              </h4>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                Comprehensive maintenance and workmanship guarantee on all installations and major servicing.
              </p>
            </div>
          </div>

          {/* Badge 3: 1 - 3 Years PCB Board Warranty */}
          <div className="bg-gradient-to-br from-purple-50 to-fuchsia-100/40 rounded-3xl p-6 border border-purple-200/80 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 block mb-0.5">
                Circuit Board Protection
              </span>
              <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                1-3 Years PCB Warranty
              </h4>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                Warranty on PCB or main control board of unit on selected authorized brands.
              </p>
            </div>
          </div>

          {/* Badge 4: Up to 10 Years Compressor Warranty */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100/40 rounded-3xl p-6 border border-amber-200/80 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block mb-0.5">
                Compressor Protection
              </span>
              <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                Up to 10 Years Warranty
              </h4>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                10 Years compressor warranty on selected brands, and 5 Years on recognized brands.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            OFFICIAL BRANCHES (3D Flip Cards on Hover / Pointer)
           ========================================================================= */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-brand-green-600 bg-brand-green-50 px-3 py-1 rounded-full border border-brand-green-200/60">
              Our Locations & Staff
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Visit or Contact Our Official Branches
            </h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1.5">
              <RotateCw className="w-3.5 h-3.5 text-brand-green-600" />
              <span>Point cursor or hover over a branch card to flip and view company showroom / vehicle image!</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {branches.map((b) => {
              const isManuallyFlipped = flippedCard === b.id;
              return (
                <div
                  key={b.id}
                  className="group relative min-h-[500px] w-full [perspective:1400px] cursor-pointer"
                  onClick={() => setFlippedCard(isManuallyFlipped ? null : b.id)}
                >
                  {/* Flip Container */}
                  <div
                    className={`relative w-full h-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] ${
                      isManuallyFlipped ? '[transform:rotateY(180deg)]' : 'group-hover:[transform:rotateY(180deg)]'
                    }`}
                  >
                    {/* ================= CARD FRONT ================= */}
                    <div className="absolute inset-0 w-full h-full bg-[#F8FAFC] rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-md flex flex-col justify-between [backface-visibility:hidden] z-10">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-green-500 text-white shadow-sm">
                            {b.badge}
                          </span>
                          <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-brand-green-600" />
                            <span>{b.hours}</span>
                          </span>
                        </div>

                        <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                          {b.name}
                        </h4>

                        <div className="flex items-start gap-2.5 text-sm text-slate-600 mb-6">
                          <MapPin className="w-4 h-4 text-brand-green-600 shrink-0 mt-0.5" />
                          <span className="font-semibold">{b.location}</span>
                        </div>

                        {/* Staff Contacts Table / Cards */}
                        <div className="space-y-2 mb-6">
                          <span className="text-[11px] uppercase font-black text-slate-400 block tracking-wider">
                            Direct Contacts & Hotline Numbers:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {b.staff.map((person, idx) => (
                              <a
                                key={idx}
                                href={`tel:${person.rawPhone}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-brand-green-500 hover:bg-brand-green-50/50 transition-all group/call shadow-sm"
                              >
                                <div>
                                  <div className="font-extrabold text-xs text-slate-900 group-hover/call:text-brand-green-600 flex items-center gap-1.5">
                                    <span>{person.name}</span>
                                    {person.role.includes('Nav') && (
                                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-brand-green-100 text-brand-green-700 font-bold">
                                        Nav Hotline
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-slate-400">{person.role}</div>
                                </div>
                                <div className="flex items-center gap-1.5 font-bold text-xs text-brand-green-600 pl-2">
                                  <Phone className="w-3.5 h-3.5 shrink-0" />
                                  <span className="text-[11px] font-mono">{person.phone}</span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer Flip Hint & Facebook Link */}
                      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                        <a
                          href={b.facebook}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <svg className="w-4 h-4 fill-blue-600 shrink-0" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                          </svg>
                          <span className="truncate max-w-[200px] sm:max-w-xs">{b.fbLabel}</span>
                        </a>

                        <div className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-green-600 bg-brand-green-50 px-2.5 py-1 rounded-full border border-brand-green-200">
                          <RotateCw className="w-3 h-3 animate-spin [animation-duration:4s]" />
                          <span>Hover to flip ↷</span>
                        </div>
                      </div>
                    </div>

                    {/* ================= CARD BACK (Image of Company on Hover) ================= */}
                    <div className="absolute inset-0 w-full h-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden] z-20 flex flex-col justify-between p-7 sm:p-8 text-white border-2 border-brand-green-500">
                      {/* Company Image Background */}
                      <img
                        src={b.image}
                        alt={`${b.name} Facility & Fleet`}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50" />

                      {/* Header on back */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-green-400">
                            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-brand-green-400 block">
                              Authorized Facility & Warehouse
                            </span>
                            <h4 className="text-xl font-extrabold text-white leading-tight">
                              {b.name}
                            </h4>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                          Company Hub
                        </span>
                      </div>

                      {/* Center Brand statement */}
                      <div className="relative z-10 py-4 my-auto">
                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed mb-3">
                            📍 <strong>{b.location}</strong>
                          </p>
                          <p className="text-xs text-white/80 leading-relaxed">
                            Serving residential homes and commercial establishments with complete certified equipment, OEM parts supply, and vacuum-sealed testing workshop.
                          </p>
                          <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-emerald-300">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Operating Hours: 8:00 AM - 5:00 PM (Daily)</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Controls on back */}
                      <div className="relative z-10 pt-3 border-t border-white/20 flex items-center justify-between gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onBookService('Brand-New AC Units & Expert Installation');
                          }}
                          className="px-6 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                        >
                          Book Dispatch Here
                        </button>
                        <span className="text-[10px] text-slate-300 font-semibold">
                          Click to flip back ↶
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            KAYA NAMING PUNTAHAN LOCATIONS (SERVICE COVERAGE AREAS)
           ========================================================================= */}
        <div id="service-coverage" className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-md mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-brand-green-50 text-brand-green-700 border border-brand-green-200/60 mb-2">
                <Navigation className="w-3.5 h-3.5 text-brand-green-600" />
                <span>Service Reach & Coverage</span>
              </span>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Mga Lugar na Kaya Naming Puntahan
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Naka-deploy ang aming mga service fleet at certified technicians sa iba't ibang bayan at siyudad sa buong Pangasinan, Pampanga, Tarlac, at karatig probinsya.
              </p>
            </div>

            {/* Filter Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Hanapin ang inyong bayan..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green-500 shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COVERAGE_AREAS.map((region) => {
              const filteredTowns = region.towns.filter((t) =>
                t.toLowerCase().includes(locationSearch.toLowerCase())
              );

              return (
                <div
                  key={region.province}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-green-50 text-brand-green-700 border border-brand-green-200/60">
                        {region.badge}
                      </span>
                    </div>
                    <h5 className="font-extrabold text-slate-900 text-base mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-green-600 shrink-0" />
                      <span>{region.province}</span>
                    </h5>

                    {filteredTowns.length === 0 ? (
                      <p className="text-xs text-slate-400 italic py-2">Walang tugmang bayan sa rehiyong ito.</p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {filteredTowns.map((town) => (
                          <span
                            key={town}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-brand-green-50 hover:text-brand-green-700 text-slate-700 border border-slate-200/70 transition-colors"
                          >
                            {town}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>Doorstep Dispatch Ready</span>
                    <button
                      onClick={() => onBookService('Brand-New AC Units & Expert Installation')}
                      className="text-brand-green-600 hover:underline font-bold cursor-pointer"
                    >
                      Mag-schedule →
                    </button>
                  </div>
                </div>
              );
            })}
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
