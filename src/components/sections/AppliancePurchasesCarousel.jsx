import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Truck, ShieldCheck, Sparkles, Play, Pause } from 'lucide-react';

const APPLIANCE_DECK = [
  {
    id: 'buy-1',
    category: 'BRAND NEW AC',
    location: 'ROSALES, PANGASINAN',
    brand: 'Daikin',
    title: 'Daikin Inverter Split Type AC',
    badge: 'FREE Installation & Delivery',
    warranty: '1-3 Yrs PCB Warranty',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80',
    desc: 'High-efficiency inverter split unit with smart sensor and whisper-quiet airflow. Delivered and installed with complimentary ocular survey.'
  },
  {
    id: 'buy-2',
    category: 'INVERTER REFRIGERATOR',
    location: 'CALASIAO, PANGASINAN',
    brand: 'Fujidenzo',
    title: 'Fujidenzo Two-Door No-Frost Ref',
    badge: 'Doorstep Safe Delivery',
    warranty: '10 Yrs Compressor Warranty',
    image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=900&q=80',
    desc: 'Two-door inverter refrigerator with multi-airflow cooling and anti-bacterial gasket. Delivered brand new in box with official dealer guarantee.'
  },
  {
    id: 'buy-3',
    category: 'COMMERCIAL COOLING',
    location: 'DAGUPAN CITY, PANGASINAN',
    brand: 'Carrier',
    title: 'Carrier 4-Way Inverter Cassette',
    badge: 'FREE Ocular Survey Included',
    warranty: 'Full Manufacturer Warranty',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=900&q=80',
    desc: 'Concealed ceiling cassette AC for restaurants, commercial dining halls, and executive offices with heavy-duty inverter performance.'
  },
  {
    id: 'buy-4',
    category: 'WINDOW INVERTER AC',
    location: 'URDANETA CITY, PANGASINAN',
    brand: 'Kolin',
    title: 'Kolin Inverter Window Type AC',
    badge: 'FREE Standard Delivery',
    warranty: '1-3 Yrs PCB Board Warranty',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
    desc: 'High-SEER compact window inverter air conditioner with remote control and anti-allergy washable filter.'
  },
  {
    id: 'buy-5',
    category: 'WASHING MACHINE',
    location: 'APALIT, PAMPANGA',
    brand: 'Whirlpool',
    title: 'Whirlpool Front-Load Inverter Washer',
    badge: 'FREE Delivery & Demo',
    warranty: 'Heavy-Duty Warranty',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=80',
    desc: 'Heavy-duty front load washer with stain-wash technology, 1400 RPM spin speed, and silent brushless inverter motor.'
  },
  {
    id: 'buy-6',
    category: 'SMART AIR CONDITIONER',
    location: 'SAN CARLOS CITY',
    brand: 'CHiQ',
    title: 'CHiQ Smart Inverter Split AC',
    badge: 'FREE Installation Promo',
    warranty: '1-3 Yrs Board Warranty',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    desc: 'Smart WiFi inverter split unit featuring turbo rapid-chill cooling and corrosion-resistant gold fins.'
  },
  {
    id: 'buy-7',
    category: 'COMMERCIAL FREEZER',
    location: 'VILLASIS, PANGASINAN',
    brand: 'Midea',
    title: 'Midea Heavy-Duty Inverter Freezer',
    badge: 'FREE Delivery to Business',
    warranty: 'Commercial Warranty',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=900&q=80',
    desc: 'Fast freeze technology with high density foam insulation, dual temperature zone switch, and thick aluminum liner.'
  },
  {
    id: 'buy-8',
    category: 'PREMIUM COMMERCIAL',
    location: 'LINGAYEN, PANGASINAN',
    brand: 'Maytag',
    title: 'Maytag Commercial Inverter Unit',
    badge: 'Certified Dealer Unit',
    warranty: 'OEM Warranty',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80',
    desc: 'Heavy gauge steel cabinet with commercial grade electronic controls designed for long duty cycles and durability.'
  },
  {
    id: 'buy-9',
    category: 'APPLIANCE SALES',
    location: 'SANTA BARBARA, PANGASINAN',
    brand: 'Tecnogas',
    title: 'Tecnogas Italian Inverter Appliance',
    badge: 'FREE Delivery Included',
    warranty: 'Factory Warranty',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
    desc: 'Precision engineering appliance delivered and tested on-site by Jeff HVAC authorized technicians.'
  },
  {
    id: 'buy-10',
    category: 'PREMIUM INVERTER AC',
    location: 'MALASIQUI, PANGASINAN',
    brand: 'Panasonic',
    title: 'Panasonic Aero-Wing Inverter AC',
    badge: 'FREE Installation & Survey',
    warranty: '1-3 Yrs Board Warranty',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
    desc: 'Nanoe-X air purification technology equipped with twin inverter flaps for draft-free comfort.'
  }
];

const AUTOPLAY_INTERVAL = 3200; // 3.2 seconds automatic cycle

export default function AppliancePurchasesCarousel({ onInquireAppliance }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const total = APPLIANCE_DECK.length;
  const timerRef = useRef(null);

  // Resize listener
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automatic interval rotation: advances smoothly every 3.2s
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextSlide]);

  // Safe manual selection that resets timer
  const handleSelectCard = (index) => {
    setCurrentIndex(index);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      if (!isPaused) {
        timerRef.current = setInterval(nextSlide, AUTOPLAY_INTERVAL);
      }
    }
  };

  // Touch gesture support
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    setTouchStart(null);
  };

  const activeItem = APPLIANCE_DECK[currentIndex];

  // Helper to compute circular offset relative to center
  const getOffset = (index) => {
    let offset = index - currentIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  // Geometry computation to match reference image (fanned arch deck)
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth < 1024;
  const stepX = isMobile ? 65 : isTablet ? 105 : 125;

  return (
    <section
      className="py-14 sm:py-20 md:py-24 bg-[#14181B] text-white relative overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient center radial glow behind cards */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        
        {/* Subtle Section Badge & Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mb-3">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Authorized Dealer Showcase • Automatic Deck</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Customer Appliance Purchases
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Mga nabiling brand-new units ng aming mga suki na may <strong>Free Installation, Free Delivery, at 1-3 Years PCB Warranty</strong>.
          </p>
        </div>

        {/* =========================================================================
            3D FAN / COVER FLOW DECK (Exact visual match to reference image)
            - Cards fan outward with 3D arc perspective
            - Center card dips forward & downward
            - Outer cards step higher & tuck behind in depth
            - No text clutter on the cards themselves
           ========================================================================= */}
        <div className="relative w-full max-w-5xl h-[310px] sm:h-[370px] md:h-[420px] flex items-center justify-center overflow-visible my-2">
          {APPLIANCE_DECK.map((item, index) => {
            const offset = getOffset(index);
            const absOffset = Math.abs(offset);
            const isCenter = offset === 0;

            // Render up to 4 cards on each side (total 9 visible cards matching reference)
            if (absOffset > 4) return null;

            // Geometry calculations
            const x = offset * stepX;
            // Back cards step upward (negative y) while center card hangs lower (positive y)
            const y = isCenter ? (isMobile ? 12 : 20) : -absOffset * (isMobile ? 7 : 9);
            const scale = Math.max(0.65, 1 - absOffset * 0.085);
            const zIndex = 50 - absOffset * 6;
            const opacity = Math.max(0.35, 1 - absOffset * 0.16);
            const brightness = isCenter ? 1.0 : Math.max(0.3, 1 - absOffset * 0.18);

            return (
              <motion.div
                key={item.id}
                onClick={() => handleSelectCard(index)}
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
                  stiffness: 240,
                  damping: 24,
                  mass: 0.8,
                }}
                className={`absolute w-[170px] h-[235px] sm:w-[215px] sm:h-[295px] md:w-[245px] md:h-[340px] rounded-[20px] sm:rounded-[26px] overflow-hidden shadow-2xl cursor-pointer border transition-all duration-300 ${
                  isCenter
                    ? 'border-white/40 ring-1 ring-white/20 shadow-2xl shadow-black/90'
                    : 'border-white/10 hover:border-white/30 shadow-xl shadow-black/80'
                }`}
                style={{
                  transformOrigin: 'bottom center',
                }}
              >
                {/* Full-bleed card photo matching reference screenshot */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                  loading="lazy"
                />

                {/* Subtle natural photo gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

                {/* Subtle active center glow border */}
                {isCenter && (
                  <div className="absolute inset-0 border border-emerald-400/40 rounded-[20px] sm:rounded-[26px] pointer-events-none" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================================
            BOTTOM CAPTION & DETAILS (Exact match to reference image:
            Small tracked uppercase subtitle, followed by large clean title)
           ========================================================================= */}
        <div className="mt-6 sm:mt-8 text-center flex flex-col items-center min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              {/* Category — Location subtitle (matching reference image e.g. TRAVEL — COAST) */}
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 mb-1.5">
                {activeItem.category} — {activeItem.location}
              </p>

              {/* Large Bold Clean Title (matching reference image e.g. Island Time) */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight max-w-xl">
                {activeItem.title}
              </h3>

              {/* Badges: Free Installation & Delivery + Warranty */}
              <div className="flex items-center gap-2 mt-3.5 flex-wrap justify-center">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-emerald-300 border border-white/15 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeItem.badge}</span>
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeItem.warranty}</span>
                </span>
              </div>

              {/* Order / Inquire Button */}
              <div className="mt-4">
                <button
                  onClick={() => onInquireAppliance?.(activeItem.title)}
                  className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Inquire / Book This Unit</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls: Arrows + Dots Indicator + Autoplay status */}
        <div className="flex items-center gap-4 mt-4 sm:mt-6">
          {/* Previous Arrow */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {APPLIANCE_DECK.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelectCard(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex
                    ? 'w-7 bg-emerald-400'
                    : 'w-1.5 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Autoplay Play/Pause Toggle */}
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
            title={isPaused ? 'Click to resume automatic rotation' : 'Automatic rotation running'}
            className="ml-2 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 text-emerald-400" />
                <span>Auto: Paused</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-emerald-400" />
                <span>Auto: Running</span>
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}
