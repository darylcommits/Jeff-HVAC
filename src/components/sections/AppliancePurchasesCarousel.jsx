import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle2, Sparkles, ShoppingBag } from 'lucide-react';

const APPLIANCE_PURCHASES = [
  {
    id: 'buy-1',
    title: 'Daikin Inverter Split Type AC (1.5 HP)',
    brand: 'Daikin',
    category: 'Air Conditioner',
    location: 'Delivered & Installed: Rosales, Pangasinan',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    tags: ['FREE Installation', 'FREE Delivery', '1-3 Yrs PCB Warranty'],
    desc: 'Brand new high-efficiency inverter unit with eco R32 refrigerant. Complete standard mounting and vacuum testing included.',
  },
  {
    id: 'buy-2',
    title: 'Fujidenzo Two-Door No-Frost Inverter Refrigerator',
    brand: 'Fujidenzo',
    category: 'Refrigerator',
    location: 'Delivered: Calasiao, Pangasinan',
    image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
    tags: ['FREE Delivery', 'Factory Warranty', 'Fast Dispatch'],
    desc: 'Smart digital temperature inverter system. Safe doorstep transit and leveling tested on-site by Jeff HVAC crew.',
  },
  {
    id: 'buy-3',
    title: 'Carrier 4-Way Inverter Ceiling Cassette AC',
    brand: 'Carrier',
    category: 'Commercial AC',
    location: 'Commercial Install: Dagupan City',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80',
    tags: ['FREE Ocular Survey', 'FREE Installation', 'Full Warranty'],
    desc: '360-degree uniform airflow distribution for restaurant dining hall. Complimentary pre-installation ocular survey conducted.',
  },
  {
    id: 'buy-4',
    title: 'Kolin Inverter Window Type AC with Remote',
    brand: 'Kolin',
    category: 'Air Conditioner',
    location: 'Delivered: Urdaneta City, Pangasinan',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    tags: ['FREE Delivery', '1-3 Yrs PCB Board Warranty', 'In Stock'],
    desc: 'Compact energy-saving inverter window unit with quiet sleep mode. Delivered in factory box with official warranty card.',
  },
  {
    id: 'buy-5',
    title: 'Whirlpool Front-Load Inverter Washing Machine',
    brand: 'Whirlpool',
    category: 'Washing Machine',
    location: 'Delivered: Apalit, Pampanga',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    tags: ['FREE Delivery', 'Heavy Duty', 'Authorized Dealer'],
    desc: 'Direct drive inverter motor for ultra-silent spinning. Complete plumbing adapter kit and demo setup provided.',
  },
  {
    id: 'buy-6',
    title: 'CHiQ Smart Inverter Split Type Air Conditioner',
    brand: 'CHiQ',
    category: 'Air Conditioner',
    location: 'Delivered & Installed: San Carlos City',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    tags: ['FREE Delivery & Installation', 'Ocular Survey Done', 'Gold Fin Coils'],
    desc: 'Rapid turbo cooling with anti-corrosion gold fin condenser coils. Free delivery and certified bracket mounting.',
  },
  {
    id: 'buy-7',
    title: 'Midea Heavy-Duty Inverter Chest Freezer',
    brand: 'Midea',
    category: 'Commercial Freezer',
    location: 'Delivered: Villasis, Pangasinan',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
    tags: ['Commercial Grade', 'FREE Delivery', 'Multi-Airflow'],
    desc: 'Extra deep storage with multi-setting thermostat. Fast temperature pull-down ideal for businesses and stores.',
  },
];

export default function AppliancePurchasesCarousel({ onInquireAppliance }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef(null);

  const total = APPLIANCE_PURCHASES.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, total]);

  // Display 3 visible cards on desktop, 1 on mobile
  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(APPLIANCE_PURCHASES[(currentIndex + i) % total]);
    }
    return items;
  };

  return (
    <section
      className="py-14 sm:py-18 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden border-b border-slate-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-brand-green-50 text-brand-green-600 border border-brand-green-200/60">
                <ShoppingBag className="w-3.5 h-3.5 text-brand-green-600" />
                <span>Authorized Dealer Sales</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-brand-red-50 text-brand-red-600 border border-brand-red-200/60">
                <Truck className="w-3 h-3 text-brand-red-600" />
                <span>FREE Installation & Delivery</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Customer Appliance Purchases & Deliveries
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Mga bagong biling aircon, ref, at appliances ng ating mga suki sa Pangasinan at Pampanga. May kasamang 1-3 years warranty sa PCB/board para sa mga piling brands!
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-brand-green-500 hover:bg-brand-green-50 text-slate-700 hover:text-brand-green-600 shadow-sm flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-brand-green-500 hover:bg-brand-green-50 text-slate-700 hover:text-brand-green-600 shadow-sm flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getVisibleItems().map((item, idx) => (
            <motion.div
              key={`${item.id}-${idx}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo container */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />

                  {/* Brand Tag Top Left */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-black text-slate-900 shadow-sm border border-white/50">
                      {item.brand}
                    </span>
                  </div>

                  {/* Verified Purchase Tag Top Right */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Purchased</span>
                    </span>
                  </div>

                  {/* Location Bottom */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                    <span className="text-[11px] font-semibold text-white/90 flex items-center gap-1.5 drop-shadow">
                      <Truck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {item.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-green-50 text-brand-green-700 border border-brand-green-200/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2 group-hover:text-brand-green-600 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => onInquireAppliance?.(item.title)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-brand-green-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Inquire / Buy This Unit</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {APPLIANCE_PURCHASES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-8 bg-brand-green-500'
                  : 'w-2 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
