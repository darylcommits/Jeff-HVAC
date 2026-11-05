import React from 'react';

// Crisp, pixel-perfect vector representations of authorized dealer brands offered & serviced by Jeff HVAC
export const BRAND_LOGOS = [
  {
    name: 'Daikin',
    render: () => (
      <svg viewBox="0 0 160 50" className="h-9 w-auto" fill="none">
        {/* Daikin Blue Triangle Emblem */}
        <path d="M 12 36 L 42 12 L 42 36 Z" fill="#0097E6" />
        <path d="M 28 36 L 42 24 L 42 36 Z" fill="#0077B6" />
        <text
          x="52"
          y="34"
          fill="#0097E6"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="1.5"
        >
          DAIKIN
        </text>
      </svg>
    ),
  },
  {
    name: 'Fujidenzo',
    render: () => (
      <svg viewBox="0 0 170 50" className="h-9 w-auto" fill="none">
        <text
          x="85"
          y="28"
          textAnchor="middle"
          fill="#D9232E"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="23"
          letterSpacing="0.8"
        >
          FUJIDENZO
        </text>
        <text
          x="85"
          y="40"
          textAnchor="middle"
          fill="#334155"
          fontFamily="system-ui, sans-serif"
          fontWeight="700"
          fontSize="7"
          letterSpacing="2.5"
        >
          APPLIANCES FOR LIFE
        </text>
      </svg>
    ),
  },
  {
    name: 'Whirlpool',
    render: () => (
      <svg viewBox="0 0 170 50" className="h-9 w-auto" fill="none">
        {/* Whirlpool golden orbit swirl */}
        <ellipse
          cx="82"
          cy="25"
          rx="72"
          ry="15"
          stroke="#E69500"
          strokeWidth="3.2"
          transform="rotate(-8 82 25)"
          fill="none"
        />
        <text
          x="82"
          y="32"
          textAnchor="middle"
          fill="#0B2341"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontWeight="bold"
          fontStyle="italic"
          fontSize="23"
          letterSpacing="0.5"
        >
          Whirlpool
        </text>
      </svg>
    ),
  },
  {
    name: 'Midea',
    render: () => (
      <svg viewBox="0 0 160 50" className="h-9 w-auto" fill="none">
        {/* Real Midea iconic blue arc swoop */}
        <path
          d="M 12 30 C 12 15, 28 10, 44 20 C 48 23, 50 28, 52 35"
          stroke="#0081C6"
          strokeWidth="3.8"
          strokeLinecap="round"
          fill="none"
        />
        <text
          x="44"
          y="33"
          fill="#0081C6"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="800"
          fontSize="26"
          letterSpacing="-0.5"
        >
          Midea
        </text>
      </svg>
    ),
  },
  {
    name: 'Kolin',
    render: () => (
      <svg viewBox="0 0 150 50" className="h-9 w-auto" fill="none">
        {/* Real Kolin logo with official bold typography & signature orange/red dot */}
        <text
          x="20"
          y="35"
          fill="#1E293B"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="30"
          letterSpacing="-1"
        >
          kol
        </text>
        {/* Characteristic Kolin red-orange dot */}
        <circle cx="75" cy="16" r="4.8" fill="#F95700" />
        <rect x="71" y="23" width="8" height="12" rx="1.5" fill="#1E293B" />
        <text
          x="85"
          y="35"
          fill="#1E293B"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="30"
          letterSpacing="-1"
        >
          n
        </text>
      </svg>
    ),
  },
  {
    name: 'Maytag',
    render: () => (
      <svg viewBox="0 0 150 50" className="h-9 w-auto" fill="none">
        <rect x="10" y="8" width="130" height="34" rx="4" fill="#002C6C" stroke="#CBD5E1" strokeWidth="1.5" />
        <text
          x="75"
          y="31"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="20"
          letterSpacing="2.5"
        >
          MAYTAG
        </text>
      </svg>
    ),
  },
  {
    name: 'Tecnogas',
    render: () => (
      <svg viewBox="0 0 160 50" className="h-9 w-auto" fill="none">
        <text
          x="80"
          y="28"
          textAnchor="middle"
          fill="#BE1E2D"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="1.2"
        >
          TECNOGAS
        </text>
        <text
          x="80"
          y="40"
          textAnchor="middle"
          fill="#64748B"
          fontFamily="system-ui, sans-serif"
          fontWeight="700"
          fontSize="7.5"
          letterSpacing="3"
        >
          ITALIA
        </text>
      </svg>
    ),
  },
  {
    name: 'CHiQ',
    render: () => (
      <svg viewBox="0 0 140 50" className="h-9 w-auto" fill="none">
        <text
          x="22"
          y="34"
          fill="#0F172A"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="27"
          letterSpacing="0.5"
        >
          CH
        </text>
        <circle cx="70" cy="17" r="3.8" fill="#FF6B00" />
        <rect x="67.5" y="23" width="5.5" height="11" rx="1" fill="#0F172A" />
        <text
          x="77"
          y="34"
          fill="#0F172A"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="27"
          letterSpacing="0.5"
        >
          Q
        </text>
      </svg>
    ),
  },
  {
    name: 'Carrier',
    render: () => (
      <svg viewBox="0 0 160 50" className="h-10 w-auto" fill="none">
        <ellipse cx="80" cy="25" rx="76" ry="22" fill="#003882" />
        <text
          x="80"
          y="32"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="sans-serif"
          fontWeight="bold"
          fontStyle="italic"
          fontSize="24"
          letterSpacing="-0.5"
        >
          Carrier
        </text>
      </svg>
    ),
  },
  {
    name: 'Sharp',
    render: () => (
      <svg viewBox="0 0 140 50" className="h-8 w-auto" fill="none">
        <text
          x="70"
          y="34"
          textAnchor="middle"
          fill="#E51A24"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="30"
          letterSpacing="2"
        >
          SHARP
        </text>
      </svg>
    ),
  },
  {
    name: 'LG',
    render: () => (
      <svg viewBox="0 0 120 50" className="h-10 w-auto" fill="none">
        <circle cx="28" cy="25" r="18" fill="#A50034" />
        <circle cx="23" cy="20" r="2.5" fill="#FFFFFF" />
        <path
          d="M 28 15 L 28 29 L 36 29"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 39 21 A 14 14 0 1 0 39 31"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <text
          x="58"
          y="35"
          fill="#4B5563"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="30"
        >
          LG
        </text>
      </svg>
    ),
  },
  {
    name: 'Panasonic',
    render: () => (
      <svg viewBox="0 0 160 50" className="h-8 w-auto" fill="none">
        <text
          x="80"
          y="34"
          textAnchor="middle"
          fill="#004098"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="22"
          letterSpacing="0.5"
        >
          Panasonic
        </text>
      </svg>
    ),
  },
  {
    name: 'Samsung',
    render: () => (
      <svg viewBox="0 0 160 50" className="h-10 w-auto" fill="none">
        <ellipse cx="80" cy="25" rx="78" ry="21" fill="#034EA2" />
        <text
          x="80"
          y="33"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="2"
        >
          SAMSUNG
        </text>
      </svg>
    ),
  },
  {
    name: 'Condura',
    render: () => (
      <svg viewBox="0 0 150 50" className="h-8 w-auto" fill="none">
        <text
          x="75"
          y="34"
          textAnchor="middle"
          fill="#E11D48"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="1"
        >
          CONDURA
        </text>
      </svg>
    ),
  },
  {
    name: 'Koppel',
    render: () => (
      <svg viewBox="0 0 140 50" className="h-10 w-auto" fill="none">
        <rect x="5" y="6" width="130" height="38" rx="8" fill="#00529B" />
        <text
          x="70"
          y="32"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="21"
          letterSpacing="-0.5"
        >
          koppel
        </text>
      </svg>
    ),
  },
  {
    name: 'Everest',
    render: () => (
      <svg viewBox="0 0 160 50" className="h-9 w-auto" fill="none">
        <path
          d="M 8 26 L 24 10 L 36 22 L 48 6 L 68 26"
          stroke="#00873E"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <text
          x="72"
          y="25"
          fill="#00873E"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="1"
        >
          EVEREST
        </text>
        <text
          x="72"
          y="35"
          fill="#16A34A"
          fontFamily="system-ui, sans-serif"
          fontWeight="700"
          fontSize="7.5"
          letterSpacing="1"
        >
          COOLING SYSTEMS
        </text>
      </svg>
    ),
  },
  {
    name: 'TCL',
    render: () => (
      <svg viewBox="0 0 120 50" className="h-10 w-auto" fill="none">
        <rect x="8" y="7" width="104" height="36" rx="6" fill="#DC2626" />
        <text
          x="60"
          y="33"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="26"
          letterSpacing="1.5"
        >
          TCL
        </text>
      </svg>
    ),
  },
  {
    name: 'Haier',
    render: () => (
      <svg viewBox="0 0 140 50" className="h-9 w-auto" fill="none">
        <text
          x="70"
          y="34"
          textAnchor="middle"
          fill="#005A9C"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="28"
          letterSpacing="-0.5"
        >
          Haier
        </text>
      </svg>
    ),
  },
  {
    name: 'AUX',
    render: () => (
      <svg viewBox="0 0 120 50" className="h-9 w-auto" fill="none">
        <text
          x="60"
          y="35"
          textAnchor="middle"
          fill="#1D4ED8"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="30"
          letterSpacing="2"
        >
          AUX
        </text>
      </svg>
    ),
  },
];

export default function BrandLogosMarquee() {
  return (
    <div className="w-full bg-white py-10 border-y border-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-brand-green-600 bg-brand-green-50 px-3 py-1 rounded-full border border-brand-green-200/60">
            Certified Authorized Service Center & Dealer
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1.5">
            Brands We Offer & Service
          </h3>
          <p className="text-xs text-brand-green-700 font-bold mt-0.5">
            Fujidenzo • Whirlpool • Maytag • Tecnogas • CHiQ • Daikin • Midea • Kolin • Carrier • Sharp • Panasonic • LG
          </p>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm">
          Guaranteed OEM parts, factory warranty protection, and authorized multi-brand servicing with 1-3 years warranty on PCB boards for selected brands.
        </p>
      </div>

      {/* Infinite scrolling brand marquee */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-2">
        {/* Set 1 */}
        <div className="flex items-center gap-8 sm:gap-12 px-6">
          {BRAND_LOGOS.map((brand, idx) => (
            <div
              key={idx}
              className="px-5 py-3 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center shrink-0 grayscale hover:grayscale-0 transform hover:scale-105"
              title={brand.name}
            >
              {brand.render()}
            </div>
          ))}
        </div>

        {/* Set 2 (for continuous seamless loop) */}
        <div className="flex items-center gap-8 sm:gap-12 px-6" aria-hidden="true">
          {BRAND_LOGOS.map((brand, idx) => (
            <div
              key={`dup-${idx}`}
              className="px-5 py-3 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center shrink-0 grayscale hover:grayscale-0 transform hover:scale-105"
              title={brand.name}
            >
              {brand.render()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
