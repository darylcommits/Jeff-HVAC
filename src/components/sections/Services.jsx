import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Fan, Sparkles, Snowflake, Wind, Wrench, Truck, ArrowRight, CheckCircle, X } from 'lucide-react';

const ICON_MAP = {
  Cpu: Cpu,
  Fan: Fan,
  Sparkles: Sparkles,
  Snowflake: Snowflake,
  Wind: Wind,
  Wrench: Wrench,
  Truck: Truck,
};

export default function Services({ services = [], onBookService }) {
  const [selectedService, setSelectedService] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const displayedServices = showAll ? services : services.slice(0, 6);

  return (
    <section id="services" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Matches frame 14: left title, right description) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-green-50 text-brand-green-600 border border-brand-green-200/60 mb-3">
              Certified Dealer & Services
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Which Services Provide
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
              Authorized dealer and service center providing brand-new AC units with Free Delivery & Installation, ocular visit / survey, 1-3 years PCB board warranty on selected brands, parts replacement, Freon charging, and unit pull-out overhaul.
            </p>
          </div>
        </div>

        {/* Services Grid (3 columns on white card with soft shadow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedServices.map((service, idx) => {
            const IconComp = ICON_MAP[service.icon_name] || Wrench;
            return (
              <motion.div
                key={service.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-brand-green-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Service Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-brand-green-50 text-brand-green-600 flex items-center justify-center mb-8 group-hover:bg-brand-green-500 group-hover:text-white transition-colors duration-300">
                    <IconComp className="w-8 h-8 stroke-[1.75]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-green-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    {service.short_description}
                  </p>
                </div>

                {/* Read Now link */}
                <button
                  onClick={() => setSelectedService(service)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-green-600 hover:text-brand-green-700 transition-colors group/link pt-4 border-t border-slate-100"
                >
                  <span>Read Now</span>
                  <span className="text-base group-hover/link:translate-x-1 transition-transform">»</span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* "More Services" Center Button */}
        {services.length > 3 && (
          <div className="mt-14 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200"
            >
              {showAll ? 'Show Fewer Services' : 'More Services'}
            </button>
          </div>
        )}
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={selectedService.image_url}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="px-3 py-1 rounded-full bg-brand-green-500 text-xs font-bold uppercase tracking-wider">
                    HVAC Service Detail
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {selectedService.full_description || selectedService.short_description}
                </p>

                {selectedService.features && selectedService.features.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Key Capabilities Included:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedService.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-brand-green-500 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="px-5 py-2.5 rounded-full text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const s = selectedService;
                      setSelectedService(null);
                      onBookService(s.title);
                    }}
                    className="px-6 py-2.5 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold text-sm shadow-md transition-colors"
                  >
                    Book This Service
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
