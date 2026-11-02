import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, Search, Wrench, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: 'STEP - 01',
    title: 'Request Service',
    description: 'Submit service request easily through our platform or dial our 24/7 hotline directly.',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=80',
    highlight: 'Instant Online Booking',
  },
  {
    number: 'STEP - 02',
    title: 'Schedule Technician',
    description: 'Choose a convenient arrival window for our EPA-certified cooling master technicians.',
    icon: Calendar,
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1000&q=80',
    highlight: 'GPS Live Dispatch Tracking',
  },
  {
    number: 'STEP - 03',
    title: 'Diagnose Issue',
    description: 'Technician accurately identifies airflow restrictions, electrical loads, and refrigerant pressures.',
    icon: Search,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
    highlight: 'Digital Multi-Point Inspection',
  },
  {
    number: 'STEP - 04',
    title: 'Repair And Test',
    description: 'We execute OEM repairs, flush lines, test thermal performance, and issue certified reports.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    highlight: '100% Performance Guarantee',
  },
];

export default function Process({ onRequestService }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Timeline Steps */}
          <div className="lg:col-span-6">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-green-50 text-brand-green-600 border border-brand-green-200/60 mb-4">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-12">
              Our Working Process
            </h2>

            {/* Vertical timeline */}
            <div className="relative pl-8 sm:pl-10 space-y-10">
              {/* Connecting vertical line */}
              <div className="absolute left-[15px] sm:left-[19px] top-4 bottom-4 w-0.5 bg-slate-200" />

              {STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={step.number}
                    onClick={() => setActiveStep(idx)}
                    className="relative cursor-pointer group"
                  >
                    {/* Node circle on timeline */}
                    <div
                      className={`absolute -left-8 sm:-left-10 top-1 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                        isActive
                          ? 'bg-brand-green-500 border-brand-green-500 text-white shadow-lg shadow-brand-green-500/30 ring-4 ring-brand-green-100'
                          : 'bg-white border-slate-300 text-slate-400 group-hover:border-brand-green-400'
                      }`}
                    >
                      {isActive ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-brand-green-400" />
                      )}
                    </div>

                    {/* Step Content */}
                    <div
                      className={`p-5 rounded-2xl transition-all duration-200 ${
                        isActive
                          ? 'bg-brand-green-50/60 border border-brand-green-200 shadow-sm'
                          : 'hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${
                          isActive ? 'text-brand-green-600' : 'text-slate-400'
                        }`}
                      >
                        {step.number}
                      </span>
                      <h3
                        className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 ${
                          isActive ? 'text-slate-900' : 'text-slate-700'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Active Step Preview Photo */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 h-[400px] sm:h-[480px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStep}
                  src={STEPS[activeStep].image}
                  alt={STEPS[activeStep].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Floating Bottom Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/60">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green-600 block">
                      Phase {activeStep + 1} of 4
                    </span>
                    <h4 className="text-base sm:text-lg font-extrabold text-slate-900 mt-0.5">
                      {STEPS[activeStep].highlight}
                    </h4>
                  </div>
                  <button
                    onClick={onRequestService}
                    className="px-4 py-2 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white text-xs font-bold shadow-md transition-colors"
                  >
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
