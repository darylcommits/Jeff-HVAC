import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Award, ShieldCheck, Mail, Phone, X } from 'lucide-react';

const TEAM = [
  {
    name: 'Matthew Lewis',
    role: 'Support Manager',
    bio: 'Oversees dispatch response, client communications, and 24/7 emergency coordination with over 10 years in HVAC client operations.',
    certifications: ['NATE Certified Operations', 'BMS Controls Specialist'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Bipasa Sarkar',
    role: 'HVAC Service Engineer',
    bio: 'Specialist in multi-split VRF variable refrigerant systems, airflow computational modeling, and precision chiller acoustics.',
    certifications: ['Master Mechanical Engineer', 'ASHRAE Member'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'James Carter',
    role: 'Master AC Technician',
    bio: 'Lead field specialist diagnosing complex refrigerant chemical balances, compressor motor rewindings, and precision electrical micro-switches.',
    certifications: ['EPA Universal Section 608', 'Inverter Master Tech'],
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80',
  },
];

export default function Team({ onJoinTeam }) {
  const [activeMember, setActiveMember] = useState(null);

  return (
    <section id="team" className="py-20 md:py-28 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-green-50 text-brand-green-600 border border-brand-green-200/60 mb-3">
              Meet With Our Technician
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Our Skilled Team
            </h2>
          </div>
          <div>
            <button
              onClick={onJoinTeam}
              className="px-6 py-3 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold text-sm shadow-md transition-all duration-200"
            >
              Join Our Team
            </button>
          </div>
        </div>

        {/* Team Cards Grid (Exact matching frame 24) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              onClick={() => setActiveMember(member)}
              className="relative h-[420px] rounded-3xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 group cursor-pointer"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Plus button on top left (Exact match from video) */}
              <div className="absolute top-5 left-5 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-slate-700 flex items-center justify-center shadow-md group-hover:bg-brand-green-500 group-hover:text-white transition-colors duration-300">
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Bottom Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-0.5">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-emerald-300">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Member Details Modal */}
      <AnimatePresence>
        {activeMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 p-6 sm:p-8 relative"
            >
              <button
                onClick={() => setActiveMember(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                  <img
                    src={activeMember.image}
                    alt={activeMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{activeMember.name}</h3>
                  <p className="text-sm font-semibold text-brand-green-600">{activeMember.role}</p>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {activeMember.bio}
              </p>

              <div className="space-y-2 mb-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Certifications:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeMember.certifications.map((c, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-brand-green-50 text-brand-green-700 text-xs font-semibold border border-brand-green-200/60 flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{c}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveMember(null)}
                  className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
