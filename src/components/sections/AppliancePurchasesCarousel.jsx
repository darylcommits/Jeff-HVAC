import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Truck, ShieldCheck, Sparkles } from 'lucide-react';

const APPLIANCE_DECK = [
  {
    id: 'buy-1',
    category: 'BRAND NEW AC',
    location: 'ROSALES, PANGASINAN',
    brand: 'Daikin',
    title: 'Daikin Inverter Split Type AC',
    subtitle: '1.5 HP ECO R32 INVERTER',
    badge: 'FREE Installation & Delivery',
    warranty: '1-3 Yrs PCB Warranty',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    desc: 'High-efficiency inverter split unit with smart sensor and whisper-quiet airflow. Delivered and installed with complimentary ocular survey.'
  },
  {
    id: 'buy-2',
    category: 'INVERTER REFRIGERATOR',
    location: 'CALASIAO, PANGASINAN',
    brand: 'Fujidenzo',
    title: 'Fujidenzo Two-Door No-Frost Ref',
    subtitle: 'ENERGY-SAVING INVERTER',
    badge: 'Doorstep Safe Delivery',
    warranty: '10 Yrs Compressor Warranty',
    image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    desc: 'Two-door inverter refrigerator with multi-airflow cooling and anti-bacterial gasket. Delivered brand new in box with official dealer guarantee.'
  },
  {
    id: 'buy-3',
    category: 'COMMERCIAL COOLING',
    location: 'DAGUPAN CITY, PANGASINAN',
    brand: 'Carrier',
    title: 'Carrier 4-Way Inverter Cassette',
    subtitle: '360° CEILING AIRFLOW',
    badge: 'FREE Ocular Survey Included',
    warranty: 'Full Manufacturer Warranty',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
    desc: 'Concealed ceiling cassette AC for restaurants, commercial dining halls, and executive offices with heavy-duty inverter performance.'
  },
  {
    id: 'buy-4',
    category: 'WINDOW INVERTER AC',
    location: 'URDANETA CITY, PANGASINAN',
    brand: 'Kolin',
    title: 'Kolin Inverter Window Type AC',
    subtitle: 'COMPACT SLEEP MODE',
    badge: 'FREE Standard Delivery',
    warranty: '1-3 Yrs PCB Board Warranty',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    desc: 'High-SEER compact window inverter air conditioner with remote control and anti-allergy washable filter.'
  },
  {
    id: 'buy-5',
    category: 'WASHING MACHINE',
    location: 'APALIT, PAMPANGA',
    brand: 'Whirlpool',
    title: 'Whirlpool Front-Load Inverter Washer',
    subtitle: 'DIRECT DRIVE MOTOR',
    badge: 'FREE Delivery & Demo',
    warranty: 'Heavy-Duty Warranty',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    desc: 'Heavy-duty front load washer with stain-wash technology, 1400 RPM spin speed, and silent brushless inverter motor.'
  },
  {
    id: 'buy-6',
    category: 'SMART AIR CONDITIONER',
    location: 'SAN CARLOS CITY',
    brand: 'CHiQ',
    title: 'CHiQ Smart Inverter Split AC',
    subtitle: 'GOLD FIN ANTI-CORROSION',
    badge: 'FREE Installation Promo',
    warranty: '1-3 Yrs Board Warranty',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    desc: 'Smart WiFi inverter split unit featuring turbo rapid-chill cooling and corrosion-resistant gold fins.'
  },
  {
    id: 'buy-7',
    category: 'COMMERCIAL FREEZER',
    location: 'VILLASIS, PANGASINAN',
    brand: 'Midea',
    title: 'Midea Heavy-Duty Inverter Freezer',
    subtitle: 'MULTI-TEMP STORAGE',
    badge: 'FREE Delivery to Business',
    warranty: 'Commercial Warranty',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
    desc: 'Fast freeze technology with high density foam insulation, dual temperature zone switch, and thick aluminum liner.'
  },
  {
    id: 'buy-8',
    category: 'PREMIUM COMMERCIAL',
    location: 'LINGAYEN, PANGASINAN',
    brand: 'Maytag',
    title: 'Maytag Commercial Inverter Unit',
    subtitle: 'DEPENDABILITY SERIES',
    badge: 'Certified Dealer Unit',
    warranty: 'OEM Warranty',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80',
    desc: 'Heavy gauge steel cabinet with commercial grade electronic controls designed for long duty cycles and durability.'
  },
  {
    id: 'buy-9',
    category: 'APPLIANCE SALES',
    location: 'SANTA BARBARA, PANGASINAN',
    brand: 'Tecnogas',
    title: 'Tecnogas Italian Inverter Appliance',
    subtitle: 'AUTHENTIC DEALER SALES',
    badge: 'FREE Delivery Included',
    warranty: 'Factory Warranty',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    desc: 'Precision engineering appliance delivered and tested on-site by Jeff HVAC authorized technicians.'
  }
];

export default function AppliancePurchasesCarousel({ onInquireAppliance }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const total = APPLIANCE_DECK.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Autoplay rotation every 4.5 seconds
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        nextSlide();
      }, 4500);
      return () => clearInterval(timer);
    }
  }, [isPaused, total]);

  // Touch gesture support
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    setTouchStart(null);
  };

  const activeItem = APPLIANCE_DECK[currentIndex];

  // Helper to compute circular offset
  const getOffset = (index) => {
    let offset = index - currentIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  return (
    <section
      className="py-16 md:py-24 bg-[#14181B] text-white relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Subtle radial ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-3">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Authorized Dealer Showcase</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Customer Appliance Purchases
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Mga nabiling brand-new air conditioner at appliances ng aming mga suki na may <strong>Free Installation, Delivery, at 1-3 Years PCB Warranty</strong>.
          </p>
        </div>

        {/* =========================================================================
            3D FAN / COVER FLOW DECK (Exact visual match to reference image)
           ========================================================================= */}
        <div className="relative w-full max-w-5xl h-[340px] sm:h-[400px] md:h-[430px] flex items-center justify-center overflow-visible">
          {APPLIANCE_DECK.map((item, index) => {
            const offset = getOffset(index);
            const isCenter = offset === 0;

            // Only render cards within visual range (-4 to +4)
            if (Math.abs(offset) > 4) return null;

            // Calculate exact position, scale, and z-index to form the 3D arc deck
            // Center is full size, side cards fan out horizontally and scale down
            const stepX = typeof window !== 'undefined' && window.innerWidth < 640 ? 70 : 135;
            const x = offset * stepX;
            const y = Math.abs(offset) * -4; // Subtle upward dome curve as shown in reference
            const scale = 1 - Math.abs(offset) * 0.11;
            const zIndex = 30 - Math.abs(offset) * 4;
            const opacity = 1 - Math.abs(offset) * 0.18;
            const brightness = isCenter ? 1 : Math.max(0.45, 1 - Math.abs(offset) * 0.15);

            return (
              <motion.div
                key={item.id}
                onClick={() => setCurrentIndex(index)}
                initial={false}
                animate={{
                  x,
                  y,
                  scale,
                  zIndex,
                  opacity,
                  filter: `brightness(${brightness})`,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 26,
                  mass: 0.8,
                }}
                className={`absolute w-[180px] h-[250px] sm:w-[220px] sm:h-[305px] md:w-[250px] md:h-[345px] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-2xl cursor-pointer transition-shadow duration-300 border ${
                  isCenter
                    ? 'border-white/40 shadow-emerald-950/50 shadow-2xl ring-2 ring-emerald-500/30'
                    : 'border-white/10 hover:border-white/30 shadow-black/80'
                }`}
                style={{
                  transformOrigin: 'bottom center',
                }}
              >
                {/* Full-bleed card photo */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />

                {/* Subtle top & bottom vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

                {/* Top Brand Tag */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-black tracking-wider text-white border border-white/20">
                    {item.brand}
                  </span>
                  {isCenter && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-black uppercase tracking-wider shadow-sm">
                      Active
                    </span>
                  )}
                </div>

                {/* Bottom Card Label */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 line-clamp-1">
                    {item.location}
                  </p>
                  <h4 className="text-xs sm:text-sm font-extrabold line-clamp-1 text-white leading-tight">
                    {item.title}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================================
            BOTTOM CAPTION & DETAILS (Matching reference: Subtitle, Large Title)
           ========================================================================= */}
        <div className="mt-8 text-center flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {/* Category — Location breadcrumb */}
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-slate-400 mb-1.5">
                {activeItem.category} — {activeItem.location}
              </span>

              {/* Large Bold Title */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight max-w-xl">
                {activeItem.title}
              </h3>

              {/* Warranty & Badges */}
              <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-emerald-300 border border-white/15 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeItem.badge}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeItem.warranty}</span>
                </span>
              </div>

              {/* Action Button */}
              <div className="mt-5">
                <button
                  onClick={() => onInquireAppliance?.(activeItem.title)}
                  className="px-7 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Inquire / Order This Unit</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Buttons & Pagination Dots */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {APPLIANCE_DECK.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex
                    ? 'w-6 bg-emerald-400'
                    : 'w-1.5 bg-white/25 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
