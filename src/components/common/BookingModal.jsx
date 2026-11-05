import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, Loader2, Upload, FileCheck, Mail, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../lib/supabase';

export default function BookingModal({ isOpen, onClose, services = [], defaultService = '' }) {
  const [formData, setFormData] = useState({
    service_requested: defaultService || (services[0]?.title || 'Brand-New AC Units & Expert Installation'),
    full_name: '',
    email: '',
    phone: '',
    address: '',
    landmark: '',
    preferred_date: '',
    preferred_time: '8:00 AM - 10:00 AM',
    has_ocular_visit: false,
    unit_status: 'May unit na (Ready for installation)',
    unit_brand: '',
    unit_years: '1 - 2 Years',
    unit_image: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const fileInputRef = useRef(null);

  React.useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service_requested: defaultService }));
    }
  }, [defaultService]);

  if (!isOpen) return null;

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

  const isBrandNew = formData.service_requested.toLowerCase().includes('brand-new') ||
    formData.service_requested.toLowerCase().includes('sales');

  const isInstallation = formData.service_requested.toLowerCase().includes('installation') &&
    !formData.service_requested.toLowerCase().includes('brand-new');

  const isPullOutOrRepair = formData.service_requested.toLowerCase().includes('pull out') ||
    formData.service_requested.toLowerCase().includes('repair') ||
    formData.service_requested.toLowerCase().includes('reprocessing') ||
    formData.service_requested.toLowerCase().includes('parts replacement');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        email: formData.email || 'riverajeffrrey421@gmail.com',
      };

      const res = await api.submitInquiry(payload);
      setSubmittedData(res?.data || payload);
      setSuccess(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#00873E', '#22C55E', '#38BDF8', '#E51A24'],
      });
    } catch (err) {
      console.error(err);
      alert('Error submitting booking. Please call our hotline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {success ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-mono font-bold mb-3 border border-slate-200">
              <span>Tracking Ref:</span>
              <span className="text-emerald-700 font-extrabold">#{submittedData?.id?.toUpperCase() || 'INQ-SUCCESS'}</span>
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
              Appointment Received by Admin!
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm mb-4 max-w-sm mx-auto leading-relaxed">
              Maraming salamat <strong>{submittedData?.full_name}</strong>! Na-save na po sa Jeff HVAC Dispatch System ang inyong appointment para sa <strong>{submittedData?.service_requested}</strong>.
            </p>

            {/* Direct Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 mb-6 max-w-sm mx-auto">
              <a
                href={`mailto:riverajeffrrey421@gmail.com?subject=Booking Request: ${encodeURIComponent(submittedData?.service_requested || '')} - ${encodeURIComponent(submittedData?.full_name || '')}&body=Customer: ${encodeURIComponent(submittedData?.full_name || '')}%0D%0APhone: ${encodeURIComponent(submittedData?.phone || '')}%0D%0AAddress: ${encodeURIComponent(submittedData?.address || '')}%0D%0AService: ${encodeURIComponent(submittedData?.service_requested || '')}%0D%0APreferred Window: ${encodeURIComponent(submittedData?.preferred_time || '')}`}
                className="w-full sm:w-auto px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>Send Copy to Email</span>
              </a>

              <a
                href={`sms:09243750879?body=Hi Gian (Jeff HVAC), nag-book po ako ng appointment para sa ${encodeURIComponent(submittedData?.service_requested || '')}. Name: ${encodeURIComponent(submittedData?.full_name || '')}, Contact: ${encodeURIComponent(submittedData?.phone || '')}`}
                className="w-full sm:w-auto px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>SMS Gian (0924 375 0879)</span>
              </a>
            </div>

            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-xs shadow-md hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Done / Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-brand-green-500" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-green-600">
                Direct Dispatch Request
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mb-1">
              Book Air-condition & Ref Service
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Time Window: <strong>8:00 AM - 5:00 PM only</strong> • Free Installation & Delivery on Brand-New Units
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Service *
                </label>
                <select
                  value={formData.service_requested}
                  onChange={(e) =>
                    setFormData({ ...formData, service_requested: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green-500 cursor-pointer"
                >
                  {services.map((s) => (
                    <option key={s.id || s.title} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name / Pangalan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Juan Dela Cruz"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Details (Phone) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="09XX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green-500"
                  />
                </div>
              </div>

              {/* Complete Address & Landmark */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green-500"
                  />
                </div>
              </div>

              {/* Preferred Date & Time Window (8AM - 5PM ONLY) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.preferred_date}
                    onChange={(e) =>
                      setFormData({ ...formData, preferred_date: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Time Window *</span>
                    <span className="text-[10px] text-brand-green-600 font-bold">8:00 AM - 5:00 PM only</span>
                  </label>
                  <select
                    value={formData.preferred_time}
                    onChange={(e) =>
                      setFormData({ ...formData, preferred_time: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green-500 cursor-pointer"
                  >
                    <option value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                    <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                    <option value="Whole Day (8:00 AM - 5:00 PM)">Whole Day (8:00 AM - 5:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* DYNAMIC: Brand New AC Ocular Visit */}
              {isBrandNew && (
                <div className="p-3 rounded-xl bg-brand-green-50 border border-brand-green-200">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.has_ocular_visit}
                      onChange={(e) => setFormData({ ...formData, has_ocular_visit: e.target.checked })}
                      className="w-4 h-4 mt-0.5 text-brand-green-600"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        Complimentary Ocular Visit or Survey
                      </span>
                      <span className="text-[11px] text-slate-600">
                        Puntahan muna ng technician ang inyong bahay upang suriin ang tamang HP size at piping layout.
                      </span>
                    </div>
                  </label>
                </div>
              )}

              {/* DYNAMIC: AC Installation Option of Unit */}
              {isInstallation && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-xs font-bold text-slate-800 block">
                    May unit na po ba kayo o bibili pa lang sa amin?
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-1.5 p-1.5 bg-white rounded-lg border border-slate-200 cursor-pointer">
                      <input
                        type="radio"
                        name="modal_unit_status"
                        value="May unit na (Ready for installation)"
                        checked={formData.unit_status === 'May unit na (Ready for installation)'}
                        onChange={(e) => setFormData({ ...formData, unit_status: e.target.value })}
                      />
                      <span>May unit na</span>
                    </label>
                    <label className="flex items-center gap-1.5 p-1.5 bg-white rounded-lg border border-slate-200 cursor-pointer">
                      <input
                        type="radio"
                        name="modal_unit_status"
                        value="Wala pa (Bibili pa sa Jeff HVAC)"
                        checked={formData.unit_status === 'Wala pa (Bibili pa sa Jeff HVAC)'}
                        onChange={(e) => setFormData({ ...formData, unit_status: e.target.value })}
                      />
                      <span>Wala pa (Bibili pa)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* DYNAMIC: Unit Pull Out Details */}
              {isPullOutOrRepair && (
                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2.5">
                  <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                    Unit Pull Out / Repair Details
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                        Brand ng Unit (e.g. Carrier, Kolin, Daikin)
                      </label>
                      <input
                        type="text"
                        placeholder="Hal. Fujidenzo, Whirlpool"
                        value={formData.unit_brand}
                        onChange={(e) => setFormData({ ...formData, unit_brand: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                        Ilang Taon / Years na ang Unit?
                      </label>
                      <select
                        value={formData.unit_years}
                        onChange={(e) => setFormData({ ...formData, unit_years: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 cursor-pointer"
                      >
                        <option value="Bago pa (< 1 Year)">Bago pa (&lt; 1 Year)</option>
                        <option value="1 - 2 Years">1 - 2 Years</option>
                        <option value="3 - 5 Years">3 - 5 Years</option>
                        <option value="Higit 5 Taon (5+ Years)">Higit 5 Taon (5+ Years)</option>
                        <option value="Hindi Sigurado">Hindi Sigurado</option>
                      </select>
                    </div>
                  </div>

                  {/* Picture Attachment */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Picture Attachment ng Unit (Litrato ng unit o serial plate)
                    </label>
                    {formData.unit_image ? (
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-emerald-300">
                        <div className="flex items-center gap-2">
                          <img
                            src={formData.unit_image}
                            alt="Unit"
                            className="w-10 h-10 object-cover rounded-lg border border-slate-200"
                          />
                          <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>Photo Attached</span>
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, unit_image: '' })}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2.5 border border-dashed border-slate-300 rounded-xl text-center cursor-pointer hover:bg-white transition-colors"
                      >
                        <Upload className="w-4 h-4 text-brand-green-600 mx-auto mb-0.5" />
                        <span className="text-[11px] text-slate-600 font-medium">
                          Click to attach picture of unit (JPG, PNG)
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

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notes / Symptoms
                </label>
                <textarea
                  rows={2}
                  placeholder="Halimbawa: Lukewarm air, maingay na motor, o kailangan ng bracket mounting..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-green-500 resize-none"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Scheduling...</span>
                    </>
                  ) : (
                    <span>Confirm Booking Request</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
