import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, CheckCircle2, ChevronRight, X, ArrowUpRight } from 'lucide-react';

export default function Projects({ projects = [], onConsultation }) {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-brand-green-50 text-brand-green-600 border border-brand-green-200/60 mb-3">
              Our Statistics State
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Speaks Everything
            </h2>
          </motion.div>
        </div>

        {/* Projects Horizontal Grid / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-100">
                <img
                  src={project.thumbnail_url}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Floating Overlay Card (Matching frame 18) */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/60">
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2.5 truncate group-hover:text-brand-green-600 transition-colors">
                    {project.title}
                  </h3>

                  {/* Badges: Strictly NO PRICES, as required */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-brand-green-50 text-brand-green-700 border border-brand-green-200">
                      <Clock className="w-3 h-3" />
                      <span>Time: {project.duration}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                      <User className="w-3 h-3" />
                      <span>Client: {project.client_name}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 ml-auto">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onConsultation()}
            className="px-8 py-3.5 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200"
          >
            More Projects
          </button>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 relative"
            >
              <div className="relative h-60 sm:h-72 overflow-hidden">
                <img
                  src={selectedProject.thumbnail_url}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="px-3 py-1 rounded-full bg-brand-green-500 text-xs font-bold uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold mt-1 text-white">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100 text-xs sm:text-sm text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Client</span>
                    <span className="font-semibold text-slate-800">{selectedProject.client_name}</span>
                  </div>
                  <div className="border-l border-slate-200 pl-4">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Turnaround</span>
                    <span className="font-semibold text-slate-800">{selectedProject.duration}</span>
                  </div>
                  <div className="border-l border-slate-200 pl-4">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
                    <span className="font-semibold text-brand-green-600">{selectedProject.category}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {selectedProject.scope_details && selectedProject.scope_details.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                      Technical Scope & Execution:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProject.scope_details.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-brand-green-500 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 rounded-full text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      onConsultation();
                    }}
                    className="px-6 py-2.5 rounded-full bg-brand-green-500 hover:bg-brand-green-600 text-white font-semibold text-sm shadow-md transition-colors"
                  >
                    Request Similar Installation
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
