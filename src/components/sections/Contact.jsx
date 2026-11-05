import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
  Sparkles,
  Navigation,
  Clock,
  Upload,
  Image as ImageIcon,
  X,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../lib/supabase';

export default function Contact({ services = [], preselectedService = '' }) {
  const [formData, setFormData] = useState({
    service_requested: preselectedService || (services[0]?.title || 'Brand-New AC Units & Expert Installation'),
    full_name: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    preferred_date: '',
    preferred_time: '8:00 AM - 10:00 AM',
    has_ocular_visit: false,
    unit_status: 'May unit na (Installation only)',
    unit_brand: '',
    unit_years: '1 - 2 Years',
    unit_image: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  // Update preselected service if changed
  React.useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service_requested: preselectedService }));
    }
  }, [preselectedService]);

  // Handle unit photo attachment upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, unit_image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, unit_image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isBrandNewService = formData.service_requested.toLowerCase().includes('brand-new') ||
    formData.service_requested.toLowerCase().includes('sales');

  const isInstallationService = formData.service_requested.toLowerCase().includes('installation') &&
    !formData.service_requested.toLowerCase().includes('brand-new');

  const isPullOutOrRepair = formData.service_requested.toLowerCase().includes('pull out') ||
    formData.service_requested.toLowerCase().includes('repair') ||
    formData.service_requested.toLowerCase().includes('reprocessing');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.phone || !formData.address) {
      setErrorMsg('Paki-fill out po ang Full Name, Phone number, at Complete Address.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        ...formData,
        email: formData.email || 'riverajeffrrey421@gmail.com',
      };

      const res = await api.submitInquiry(payload);
      setSubmittedData(res?.data || payload);
      setSubmitted(true);
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00873E', '#22C55E', '#38BDF8', '#E51A24'],
      });
      // Reset form
      setFormData({
        service_requested: services[0]?.title || 'Brand-New AC Units & Expert Installation',
        full_name: '',
        email: '',
        phone: '',
        address: '',
        landmark: '',
        preferred_date: '',
        preferred_time: '8:00 AM - 10:00 AM',
        has_ocular_visit: false,
        unit_status: 'May unit na (Installation only)',
        unit_brand: '',
        unit_years: '1 - 2 Years',
        unit_image: '',
        message: '',
      });
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to submit request. Please try calling our hotlines directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Large Brand Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-green-600 via-brand-green-700 to-slate-900 p-8 sm:p-12 md:p-16 text-white shadow-2xl shadow-brand-green-900/20">
          {/* Blueprint grid overlay */}
          <div className="absolute inset-0 bg-blueprint-grid opacity-20 pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-red-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Info & Kaya Naming Puntahan */}
            <div className="lg:col-span-5">
              <span className="inline-block px-3.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-sm mb-4 text-white border border-white/20">
                Get In Touch
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-8 text-white leading-tight">
                Let's Connect with Us Now
              </h2>

              <div className="space-y-6">
                {/* Official Address Box (Changed from Email as requested) */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-white/70 block">
                      Official Addresses
                    </span>
                    <div className="text-white text-xs sm:text-sm space-y-1 mt-0.5">
                      <p>
                        📍 <strong className="text-emerald-300">Pangasinan HQ:</strong> San Bartolome, Rosales, Pangasinan
                      </p>
                      <p>
                        📍 <strong className="text-emerald-300">Apalit Branch:</strong> Apalit, Pampanga
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Hotlines Box with Staff Names */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-white/70 block">
                      Direct Hotlines & Staff
                    </span>
                    <div className="text-white text-xs sm:text-sm space-y-1.5 mt-1">
                      <div className="bg-white/10 rounded-xl p-2.5 space-y-1">
                        <span className="text-[10px] font-black uppercase text-emerald-300 block">
                          Pangasinan Branch:
                        </span>
                        <p className="flex justify-between gap-2 text-xs">
                          <span>Gian <strong className="text-emerald-200">(Nav)</strong>:</span>
                          <a href="tel:09243750879" className="font-mono font-bold hover:underline">0924 375 0879</a>
                        </p>
                        <p className="flex justify-between gap-2 text-xs">
                          <span>Jeff <strong className="text-emerald-200">"CEO"</strong>:</span>
                          <a href="tel:09776991662" className="font-mono font-bold hover:underline">0977 699 1662</a>
                        </p>
                        <p className="flex justify-between gap-2 text-xs">
                          <span>MJ:</span>
                          <a href="tel:09270451215" className="font-mono font-bold hover:underline">0927 045 1215</a>
                        </p>
                        <p className="flex justify-between gap-2 text-xs">
                          <span>Kristle:</span>
                          <a href="tel:09495690281" className="font-mono font-bold hover:underline">0949 569 0281</a>
                        </p>
                        <p className="flex justify-between gap-2 text-xs">
                          <span>Ailyn:</span>
                          <a href="tel:0914375607" className="font-mono font-bold hover:underline">0914 375 607</a>
                        </p>
                      </div>

                      <div className="bg-white/10 rounded-xl p-2.5">
                        <span className="text-[10px] font-black uppercase text-emerald-300 block mb-0.5">
                          Apalit Branch:
                        </span>
                        <p className="text-xs">
                          <a href="tel:09159717470" className="hover:underline font-mono font-bold">0915 971 7470</a> /{' '}
                          <a href="tel:09692235507" className="hover:underline font-mono font-bold">0969 223 5507</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Box */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider text-white/70 block">
                      Email
                    </span>
                    <a
                      href="mailto:riverajeffrrey421@gmail.com"
                      className="text-white font-medium hover:text-emerald-300 transition-colors text-xs sm:text-sm break-all"
                    >
                      riverajeffrrey421@gmail.com
                    </a>
                  </div>
                </div>

                {/* Kaya Naming Puntahan Preview Box */}
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 block mb-1 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Kaya Naming Puntahan:</span>
                  </span>
                  <p className="text-xs text-white/85 leading-relaxed">
                    Rosales, Urdaneta, Dagupan, San Carlos, Calasiao, Malasiqui, Lingayen, Alaminos, Mangaldan, Villasis, Apalit, San Fernando, Angeles, Tarlac, at karatig lugar.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Comprehensive Service Request Form */}
            <div className="lg:col-span-7">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 shadow-xl">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center mx-auto mb-3 border border-emerald-400/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 text-emerald-300 text-[11px] font-mono font-bold mb-3 border border-emerald-400/30">
                      <span>Tracking Ref:</span>
                      <span className="text-white">#{submittedData?.id?.toUpperCase() || 'INQ-SUCCESS'}</span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-white mb-2">
                      Inquiry Received by Admin Dispatch!
                    </h3>

                    <p className="text-white/85 text-xs sm:text-sm max-w-lg mx-auto mb-5 leading-relaxed">
                      Maraming salamat <strong>{submittedData?.full_name}</strong>! Na-save na po sa Jeff HVAC Dispatch System ang inyong request para sa <strong>{submittedData?.service_requested}</strong> sa <strong>{submittedData?.address}</strong>.
                    </p>

                    {/* Summary box of submitted details */}
                    <div className="bg-black/30 border border-white/15 rounded-2xl p-4 max-w-md mx-auto mb-6 text-left text-xs space-y-1.5">
                      <div className="flex justify-between border-b border-white/10 pb-1.5">
                        <span className="text-white/60">Customer Name:</span>
                        <span className="text-white font-bold">{submittedData?.full_name}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-1.5">
                        <span className="text-white/60">Phone Number:</span>
                        <span className="text-emerald-300 font-mono font-bold">{submittedData?.phone}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-1.5">
                        <span className="text-white/60">Service:</span>
                        <span className="text-white font-semibold">{submittedData?.service_requested}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-1.5">
                        <span className="text-white/60">Preferred Window:</span>
                        <span className="text-emerald-300 font-medium">{submittedData?.preferred_time}</span>
                      </div>
                      <div className="flex justify-between pt-0.5">
                        <span className="text-white/60">Admin Status:</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase">
                          NEW / RECEIVED
                        </span>
                      </div>
                    </div>

                    {/* Quick Direct Backup Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5 max-w-md mx-auto">
                      <a
                        href={`mailto:riverajeffrrey421@gmail.com?subject=New Service Request: ${encodeURIComponent(submittedData?.service_requested || '')} - ${encodeURIComponent(submittedData?.full_name || '')}&body=Customer: ${encodeURIComponent(submittedData?.full_name || '')}%0D%0APhone: ${encodeURIComponent(submittedData?.phone || '')}%0D%0AAddress: ${encodeURIComponent(submittedData?.address || '')}%0D%0ALandmark: ${encodeURIComponent(submittedData?.landmark || '')}%0D%0AService: ${encodeURIComponent(submittedData?.service_requested || '')}%0D%0APreferred Time: ${encodeURIComponent(submittedData?.preferred_time || '')}%0D%0AMessage: ${encodeURIComponent(submittedData?.message || '')}`}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-brand-green-600" />
                        <span>Send Copy to Email</span>
                      </a>

                      <a
                        href={`sms:09243750879?body=Hi Gian (Jeff HVAC), nag-submit po ako ng inquiry para sa ${encodeURIComponent(submittedData?.service_requested || '')}. Name: ${encodeURIComponent(submittedData?.full_name || '')}, Contact: ${encodeURIComponent(submittedData?.phone || '')}, Address: ${encodeURIComponent(submittedData?.address || '')}`}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>SMS Gian (0924 375 0879)</span>
                      </a>
                    </div>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-white/70 hover:text-white underline cursor-pointer"
                    >
                      Mag-submit ng isa pang Request
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                        {errorMsg}
                      </div>
                    )}

                    {/* Row 1: Service Requested & Full Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/90 mb-1.5">
                          Required Service *
                        </label>
                        <select
                          value={formData.service_requested}
                          onChange={(e) =>
                            setFormData({ ...formData, service_requested: e.target.value })
                          }
                          className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none cursor-pointer"
                        >
                          {services.map((s) => (
                            <option key={s.id || s.title} value={s.title} className="text-slate-900">
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white/90 mb-1.5">
                          Full Name / Pangalan *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Hal. Juan Dela Cruz"
                          value={formData.full_name}
                          onChange={(e) =>
                            setFormData({ ...formData, full_name: e.target.value })
                          }
                          className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                    </div>

                    {/* Row 2: Contact Details (Phone & Email) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/90 mb-1.5">
                          Contact Details (Phone Number) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="09XX XXX XXXX"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white/90 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="yourname@gmail.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                    </div>

                    {/* Row 3: Address & Landmark */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/90 mb-1.5">
                          Complete Address / Tirahan *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="House No., Street, Brgy, City/Town"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                          className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white/90 mb-1.5">
                          Landmark (Kilalang Lugar Malapit) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Tapat ng Brgy. Hall / Tabi ng Simbahan"
                          value={formData.landmark}
                          onChange={(e) =>
                            setFormData({ ...formData, landmark: e.target.value })
                          }
                          className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>
                    </div>

                    {/* Row 4: Preferred Date & Time Window (8AM - 5PM ONLY) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/90 mb-1.5">
                          Preferred Service Date
                        </label>
                        <input
                          type="date"
                          value={formData.preferred_date}
                          onChange={(e) =>
                            setFormData({ ...formData, preferred_date: e.target.value })
                          }
                          className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white/90 mb-1.5 flex items-center justify-between">
                          <span>Time Window *</span>
                          <span className="text-[10px] text-emerald-300 font-bold">8:00 AM - 5:00 PM only</span>
                        </label>
                        <select
                          value={formData.preferred_time}
                          onChange={(e) =>
                            setFormData({ ...formData, preferred_time: e.target.value })
                          }
                          className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none cursor-pointer"
                        >
                          <option value="8:00 AM - 10:00 AM" className="text-slate-900">8:00 AM - 10:00 AM</option>
                          <option value="10:00 AM - 12:00 PM" className="text-slate-900">10:00 AM - 12:00 PM</option>
                          <option value="1:00 PM - 3:00 PM" className="text-slate-900">1:00 PM - 3:00 PM</option>
                          <option value="3:00 PM - 5:00 PM" className="text-slate-900">3:00 PM - 5:00 PM</option>
                          <option value="Whole Day (8:00 AM - 5:00 PM)" className="text-slate-900">Whole Day (8:00 AM - 5:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    {/* DYNAMIC FIELD 1: Brand-New AC Units Ocular Visit Checkbox */}
                    {isBrandNewService && (
                      <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.has_ocular_visit}
                            onChange={(e) =>
                              setFormData({ ...formData, has_ocular_visit: e.target.checked })
                            }
                            className="w-4 h-4 mt-0.5 rounded text-brand-green-600 focus:ring-emerald-400"
                          />
                          <div>
                            <span className="font-bold text-xs text-white block">
                              Request Complimentary Ocular Visit or Site Survey
                            </span>
                            <span className="text-[11px] text-white/80">
                              Bumisita muna ang Jeff HVAC technician para masukat ang kwarto, electrical load, at copper piping bago i-deliver ang unit.
                            </span>
                          </div>
                        </label>
                      </div>
                    )}

                    {/* DYNAMIC FIELD 2: AC Installation - Option of Unit or Wala Pa */}
                    {isInstallationService && (
                      <div className="p-3.5 rounded-2xl bg-white/15 border border-white/25 space-y-2">
                        <span className="text-xs font-bold text-white block">
                          Option of Unit: Mayroon na ba kayong unit o bibili pa lang?
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <label className="flex items-center gap-2 p-2 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer">
                            <input
                              type="radio"
                              name="unit_status"
                              value="May unit na (Ready for installation)"
                              checked={formData.unit_status === 'May unit na (Ready for installation)'}
                              onChange={(e) => setFormData({ ...formData, unit_status: e.target.value })}
                            />
                            <span>May unit na (Kabitan lang)</span>
                          </label>
                          <label className="flex items-center gap-2 p-2 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer">
                            <input
                              type="radio"
                              name="unit_status"
                              value="Wala pa (Bibili pa sa Jeff HVAC)"
                              checked={formData.unit_status === 'Wala pa (Bibili pa sa Jeff HVAC)'}
                              onChange={(e) => setFormData({ ...formData, unit_status: e.target.value })}
                            />
                            <span>Wala pa (Bibili pa sa inyo)</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* DYNAMIC FIELD 3: Unit Pull Out of AC or Ref - Brand, Years, Picture Attachment */}
                    {isPullOutOrRepair && (
                      <div className="p-4 rounded-2xl bg-white/15 border border-white/25 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                            Unit Pull Out Details (AC / Refrigerator)
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-white/90 mb-1">
                              Brand ng Unit (e.g. Fujidenzo, Whirlpool, Daikin) *
                            </label>
                            <input
                              type="text"
                              placeholder="Hal. Kolin, Midea, Carrier, Sharp"
                              value={formData.unit_brand}
                              onChange={(e) => setFormData({ ...formData, unit_brand: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/50"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-white/90 mb-1">
                              Ilang Years na yung Unit? *
                            </label>
                            <select
                              value={formData.unit_years}
                              onChange={(e) => setFormData({ ...formData, unit_years: e.target.value })}
                              className="w-full bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs text-white appearance-none cursor-pointer"
                            >
                              <option value="Bago pa (< 1 Year)" className="text-slate-900">Bago pa (&lt; 1 Year)</option>
                              <option value="1 - 2 Years" className="text-slate-900">1 - 2 Years</option>
                              <option value="3 - 5 Years" className="text-slate-900">3 - 5 Years</option>
                              <option value="Higit 5 Taon (5+ Years)" className="text-slate-900">Higit 5 Taon (5+ Years)</option>
                              <option value="Hindi Sigurado" className="text-slate-900">Hindi Sigurado</option>
                            </select>
                          </div>
                        </div>

                        {/* Picture Attachment ng Unit */}
                        <div>
                          <label className="block text-[11px] font-semibold text-white/90 mb-1">
                            Picture Attachment ng Unit (Kuhanan ng litrato ang unit o model sticker)
                          </label>

                          {formData.unit_image ? (
                            <div className="relative rounded-xl overflow-hidden border border-emerald-400/50 bg-black/40 p-2 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <img
                                  src={formData.unit_image}
                                  alt="Attached Unit"
                                  className="w-14 h-14 object-cover rounded-lg border border-white/20"
                                />
                                <span className="text-xs text-emerald-300 font-bold flex items-center gap-1">
                                  <FileCheck className="w-4 h-4" />
                                  <span>Litrato Naka-attach na</span>
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="border border-dashed border-white/30 rounded-xl p-3 text-center cursor-pointer hover:bg-white/10 transition-colors"
                            >
                              <Upload className="w-5 h-5 text-emerald-300 mx-auto mb-1" />
                              <span className="text-xs text-white font-medium block">
                                I-click para mag-attach ng litrato ng unit (JPG, PNG)
                              </span>
                              <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Message / Symptoms */}
                    <div>
                      <label className="block text-xs font-semibold text-white/90 mb-1.5">
                        Notes / Karagdagang Detalye
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Halimbawa: Hindi lumalamig ang ref, o kailangan ng bracket mounting sa second floor..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full bg-white/15 border border-white/25 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-extrabold text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-brand-green-600" />
                            <span>Submitting Service Request...</span>
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
