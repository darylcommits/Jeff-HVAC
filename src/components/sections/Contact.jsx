import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../lib/supabase';

export default function Contact({ services = [], preselectedService = '' }) {
  const [formData, setFormData] = useState({
    service_requested: preselectedService || (services[0]?.title || 'Climate Fix'),
    full_name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Update preselected service if changed
  React.useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service_requested: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email || !formData.phone || !formData.message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await api.submitInquiry(formData);
      setSubmitted(true);
      // Trigger festive celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00873E', '#22C55E', '#38BDF8', '#E51A24'],
      });
      // Reset form
      setFormData({
        service_requested: services[0]?.title || 'Climate Fix',
        full_name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to submit request. Please try calling directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Brand Card (Exact match to frame 30 & 31) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-green-600 via-brand-green-700 to-slate-900 p-8 sm:p-12 md:p-16 text-white shadow-2xl shadow-brand-green-900/20">
          {/* Subtle blueprint grid overlay */}
          <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />

          {/* Ambient blur glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-red-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Info */}
            <div className="lg:col-span-5">
              <span className="inline-block px-3.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-sm mb-4 text-white border border-white/20">
                Get In Touch
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-8 text-white leading-tight">
                Let's Connect with Us Now
              </h2>

              <div className="space-y-6">
                {/* Email Box */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-white/60 block">
                      Email
                    </span>
                    <a
                      href="mailto:service@jeffhvac.com"
                      className="text-white font-medium hover:text-emerald-300 transition-colors text-sm sm:text-base"
                    >
                      service@jeffhvac.com
                    </a>
                  </div>
                </div>

                {/* Phone Box */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-white/60 block">
                      Direct Hotlines
                    </span>
                    <div className="text-white text-xs sm:text-sm space-y-1 mt-0.5">
                      <p>
                        <span className="text-emerald-300 font-semibold">Pangasinan:</span>{' '}
                        <a href="tel:09776991662" className="hover:underline">0977 699 1662</a> /{' '}
                        <a href="tel:09495690281" className="hover:underline">0949 569 0281</a>
                      </p>
                      <p>
                        <span className="text-emerald-300 font-semibold">Apalit:</span>{' '}
                        <a href="tel:09159717470" className="hover:underline">0915 971 7470</a> /{' '}
                        <a href="tel:09692235507" className="hover:underline">0969 223 5507</a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Locations Box */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shrink-0 mt-1">
                    <MapPin className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-white/60 block">
                      Branch Offices
                    </span>
                    <div className="text-white text-xs sm:text-sm space-y-1 mt-0.5">
                      <p>• <span className="font-semibold text-slate-200">Pangasinan:</span> San Bartolome, Rosales, Pangasinan</p>
                      <p>• <span className="font-semibold text-slate-200">Apalit:</span> Apalit, Pampanga</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 shadow-xl">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center mx-auto mb-4 border border-emerald-400/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white mb-2">
                      Request Submitted Successfully!
                    </h3>
                    <p className="text-white/80 text-sm max-w-md mx-auto mb-6">
                      Thank you for contacting Jeff Air Condition & Refrigeration. Our dispatch specialist is reviewing your inquiry and will contact you promptly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full bg-white text-brand-green-800 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                        {errorMsg}
                      </div>
                    )}

                    {/* Row 1: Your Service & Full Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/80 mb-1.5">
                          Your Service
                        </label>
                        <select
                          value={formData.service_requested}
                          onChange={(e) =>
                            setFormData({ ...formData, service_requested: e.target.value })
                          }
                          className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none cursor-pointer"
                        >
                          {services.map((s) => (
                            <option key={s.id || s.title} value={s.title} className="text-slate-900">
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white/80 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={formData.full_name}
                          onChange={(e) =>
                            setFormData({ ...formData, full_name: e.target.value })
                          }
                          className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/80 mb-1.5">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white/80 mb-1.5">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                    </div>

                    {/* Row 3: Message */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Type your message..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                      />
                    </div>

                    {/* Submit Button (White button matching frame 30) */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-brand-green-600" />
                            <span>Submitting Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Services</span>
                            <Send className="w-4 h-4 text-brand-green-600" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
