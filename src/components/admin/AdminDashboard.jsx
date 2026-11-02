import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Wrench,
  FolderGit2,
  MessageSquareQuote,
  FileText,
  HelpCircle,
  Inbox,
  Settings,
  LogOut,
  ArrowLeft,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Save,
  Loader2
} from 'lucide-react';
import { api, isSupabaseConfigured, supabase } from '../../lib/supabase';

export default function AdminDashboard({ onExitAdmin }) {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('jeff_admin_auth') === 'true' || window.location.hash.includes('demo');
  });
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview');

  // Data states
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  // Modals & Editing states
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'service', 'project', 'testimonial', 'blog', 'faq'

  // Load all admin data
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [s, p, t, b, f, inq, sett] = await Promise.all([
        api.getAllServicesAdmin(),
        api.getAllProjectsAdmin(),
        api.getAllTestimonialsAdmin(),
        api.getAllBlogsAdmin(),
        api.getAllFaqsAdmin(),
        api.getInquiries(),
        api.getSettings()
      ]);
      setServices(s || []);
      setProjects(p || []);
      setTestimonials(t || []);
      setBlogs(b || []);
      setFaqs(f || []);
      setInquiries(inq || []);
      setSettings(sett || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated]);

  // Auth handlers
  const handleLogin = async (e) => {
    e?.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail,
          password: authPassword,
        });
        if (error) throw error;
        setIsAuthenticated(true);
        localStorage.setItem('jeff_admin_auth', 'true');
      } catch (err) {
        setAuthError(err.message || 'Authentication failed. Please verify credentials.');
      } finally {
        setAuthLoading(false);
      }
    } else {
      // Local authentication demo mode
      setTimeout(() => {
        setIsAuthenticated(true);
        localStorage.setItem('jeff_admin_auth', 'true');
        setAuthLoading(false);
      }, 400);
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('jeff_admin_auth');
    setIsAuthenticated(false);
  };

  // Generic Save for Modal forms
  const handleSaveModal = async (e) => {
    e.preventDefault();
    const item = { ...editingItem };

    try {
      if (modalType === 'service') {
        await api.saveService(item);
      } else if (modalType === 'project') {
        await api.saveProject(item);
      } else if (modalType === 'testimonial') {
        await api.saveTestimonial(item);
      } else if (modalType === 'blog') {
        await api.saveBlog(item);
      } else if (modalType === 'faq') {
        await api.saveFaq(item);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      await loadAdminData();
    } catch (err) {
      console.error(err);
      alert('Error saving record.');
    }
  };

  // Handlers for Services
  const handleDeleteService = async (id) => {
    if (confirm('Delete this service?')) {
      await api.deleteService(id);
      loadAdminData();
    }
  };

  const handleTogglePublishService = async (service) => {
    await api.saveService({ ...service, is_published: !service.is_published });
    loadAdminData();
  };

  // Handlers for Projects
  const handleDeleteProject = async (id) => {
    if (confirm('Delete this project?')) {
      await api.deleteProject(id);
      loadAdminData();
    }
  };

  // Handlers for Inquiries
  const handleUpdateInquiryStatus = async (id, status) => {
    await api.updateInquiryStatus(id, status);
    loadAdminData();
  };

  const handleDeleteInquiry = async (id) => {
    if (confirm('Delete inquiry record?')) {
      await api.deleteInquiry(id);
      loadAdminData();
    }
  };

  // Handlers for Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await api.saveSettings(settings);
    alert('Settings successfully updated!');
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-green-500 mx-auto mb-3 shadow-lg">
              <img src="/logo.jpg" alt="Jeff HVAC" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Jeff HVAC Admin CMS</h2>
            <p className="text-xs text-slate-400 mt-1">
              {isSupabaseConfigured
                ? 'Connected to live Supabase Backend'
                : 'Local Admin Simulator Mode Active'}
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@jeffhvac.com"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-green-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-green-500"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Log In To Dashboard</span>
              )}
            </button>
          </form>

          {/* Instant Demo Helper */}
          <div className="mt-6 pt-6 border-t border-slate-700/80 text-center">
            <button
              onClick={() => {
                setAuthEmail('admin@jeffhvac.com');
                setAuthPassword('JeffAdmin2026!');
                handleLogin();
              }}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
            >
              ⚡ Click here for Instant 1-Click Admin Access
            </button>
            <div className="mt-4">
              <button
                onClick={onExitAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Website</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-green-500">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-tight text-white">JEFF HVAC CMS</h1>
              <span className="text-[10px] text-emerald-400 uppercase font-semibold">Admin Active</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'services', label: 'Services Manager', icon: Wrench, count: services.length },
            { id: 'projects', label: 'Projects & Gallery', icon: FolderGit2, count: projects.length },
            { id: 'inquiries', label: 'Contact Inquiries', icon: Inbox, count: inquiries.filter(i => i.status === 'new').length, badge: true },
            { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, count: testimonials.length },
            { id: 'blogs', label: 'Blog & Articles', icon: FileText, count: blogs.length },
            { id: 'faqs', label: 'FAQs Manager', icon: HelpCircle, count: faqs.length },
            { id: 'settings', label: 'Website Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-green-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      tab.badge && tab.count > 0
                        ? 'bg-brand-red-500 text-white animate-pulse'
                        : isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer controls */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 text-xs font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-brand-green-500 animate-spin" />
          </div>
        ) : (
          <>
            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Dashboard Overview</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Real-time metrics, website content status, and recent customer submissions.
                  </p>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <span className="text-xs text-slate-400 font-medium">Published Services</span>
                    <div className="text-3xl font-extrabold text-white mt-1">
                      {services.filter(s => s.is_published).length}
                    </div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <span className="text-xs text-slate-400 font-medium">Featured Projects</span>
                    <div className="text-3xl font-extrabold text-white mt-1">
                      {projects.filter(p => p.is_published).length}
                    </div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <span className="text-xs text-slate-400 font-medium">New Inquiries</span>
                    <div className="text-3xl font-extrabold text-brand-green-400 mt-1">
                      {inquiries.filter(i => i.status === 'new').length}
                    </div>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <span className="text-xs text-slate-400 font-medium">Testimonials</span>
                    <div className="text-3xl font-extrabold text-white mt-1">
                      {testimonials.length}
                    </div>
                  </div>
                </div>

                {/* Recent Inquiries List */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white text-sm">Recent Contact Submissions</h3>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs text-brand-green-400 hover:underline"
                    >
                      View All Inquiries →
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <p className="text-xs text-slate-500 py-4 text-center">No inquiries yet.</p>
                  ) : (
                    <div className="divide-y divide-slate-800">
                      {inquiries.slice(0, 5).map((inq) => (
                        <div key={inq.id} className="py-3 flex items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs">{inq.full_name}</span>
                              <span className="text-[10px] text-slate-400">{inq.phone}</span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  inq.status === 'new'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {inq.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 truncate max-w-md mt-0.5">
                              <strong className="text-slate-300">{inq.service_requested}:</strong> {inq.message}
                            </p>
                          </div>
                          <span className="text-[10px] text-slate-500 whitespace-nowrap">
                            {new Date(inq.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB: SERVICES */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">Services Management</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Add, edit, and publish HVAC cooling & repair services.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingItem({
                        title: '',
                        slug: '',
                        short_description: '',
                        full_description: '',
                        icon_name: 'Cpu',
                        image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
                        features: ['24/7 Rapid Response', 'Certified Diagnostic Equipment'],
                        is_published: true,
                        display_order: services.length + 1
                      });
                      setModalType('service');
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-36 rounded-xl overflow-hidden mb-4 bg-slate-800">
                          <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-white text-base">{service.title}</h3>
                          <button
                            onClick={() => handleTogglePublishService(service)}
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                              service.is_published
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {service.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{service.is_published ? 'Published' : 'Draft'}</span>
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 mb-4">{service.short_description}</p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                        <button
                          onClick={() => {
                            setEditingItem({ ...service });
                            setModalType('service');
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">Projects & Installations</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Manage showcase projects (Strictly no pricing).
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingItem({
                        title: '',
                        slug: '',
                        client_name: '',
                        duration: '3 Days',
                        category: 'Residential',
                        description: '',
                        thumbnail_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
                        scope_details: ['Precision Inverter Installation', 'Acoustic Soundproofing'],
                        is_published: true,
                        display_order: projects.length + 1
                      });
                      setModalType('project');
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-40 rounded-xl overflow-hidden mb-4 bg-slate-800">
                          <img src={proj.thumbnail_url} alt={proj.title} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-bold text-white text-base mb-1">{proj.title}</h3>
                        <div className="text-[11px] text-slate-400 mb-2">
                          Client: {proj.client_name} • Duration: {proj.duration}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 mb-4">{proj.description}</p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                        <button
                          onClick={() => {
                            setEditingItem({ ...proj });
                            setModalType('project');
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: INQUIRIES */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Contact & Booking Inquiries</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage incoming service requests and dispatch status.
                  </p>
                </div>

                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{inq.full_name}</h4>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              inq.status === 'new'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : inq.status === 'contacted'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {inq.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-4">
                          <span>📧 {inq.email}</span>
                          <span>📞 {inq.phone}</span>
                          <span>🔧 {inq.service_requested}</span>
                        </div>
                        <p className="text-xs text-slate-300 pt-2">{inq.message}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                          className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">Testimonials Management</h2>
                    <p className="text-xs text-slate-400 mt-1">Manage client reviews and feedback.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingItem({
                        client_name: '',
                        client_role: 'Homeowner',
                        company_name: '',
                        rating: 5,
                        comment: '',
                        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                        is_published: true
                      });
                      setModalType('testimonial');
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Testimonial</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((t) => (
                    <div key={t.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-amber-400 mb-2">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                        <p className="text-xs text-slate-300 italic mb-4">"{t.comment}"</p>
                        <h4 className="font-bold text-white text-sm">{t.client_name}</h4>
                        <span className="text-[11px] text-slate-400">{t.client_role} {t.company_name ? `• ${t.company_name}` : ''}</span>
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800 mt-4">
                        <button
                          onClick={() => {
                            setEditingItem({ ...t });
                            setModalType('testimonial');
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Delete testimonial?')) {
                              await api.deleteTestimonial(t.id);
                              loadAdminData();
                            }
                          }}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: BLOGS */}
            {activeTab === 'blogs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">Articles & News</h2>
                    <p className="text-xs text-slate-400 mt-1">Publish HVAC maintenance guides and technical news.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingItem({
                        title: '',
                        slug: '',
                        excerpt: '',
                        content: '',
                        read_time: '4 Min Read',
                        featured_image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
                        author_name: 'Jeff Martinez',
                        category: 'Maintenance',
                        is_published: true
                      });
                      setModalType('blog');
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Article</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogs.map((b) => (
                    <div key={b.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                      <div>
                        <div className="h-44 rounded-xl overflow-hidden mb-3 bg-slate-800">
                          <img src={b.featured_image} alt={b.title} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[10px] font-bold text-brand-green-400 uppercase tracking-wider block mb-1">
                          {b.category} • {b.read_time}
                        </span>
                        <h3 className="font-bold text-white text-base mb-2">{b.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2">{b.excerpt}</p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800 mt-4">
                        <button
                          onClick={() => {
                            setEditingItem({ ...b });
                            setModalType('blog');
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Delete article?')) {
                              await api.deleteBlog(b.id);
                              loadAdminData();
                            }
                          }}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: FAQS */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">FAQs Management</h2>
                    <p className="text-xs text-slate-400 mt-1">Manage public frequently asked questions.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingItem({
                        question: '',
                        answer: '',
                        category: 'General',
                        is_published: true
                      });
                      setModalType('faq');
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add FAQ</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-white text-sm mb-1">{faq.question}</h4>
                        <p className="text-xs text-slate-400">{faq.answer}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingItem({ ...faq });
                            setModalType('faq');
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Delete FAQ?')) {
                              await api.deleteFaq(faq.id);
                              loadAdminData();
                            }
                          }}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Company & Website Settings</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Update phone, address, operating hours, and contact details.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={settings.company_name || ''}
                      onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Main Phone Number</label>
                    <input
                      type="text"
                      value={settings.phone || ''}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email</label>
                    <input
                      type="email"
                      value={settings.email || ''}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Office Address</label>
                    <input
                      type="text"
                      value={settings.address || ''}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hours of Operation</label>
                    <input
                      type="text"
                      value={settings.hours || ''}
                      onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Website Settings</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </main>

      {/* EDITING / ADDING MODAL */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-6">
              {editingItem.id ? 'Edit' : 'Create'} {modalType.toUpperCase()}
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-4">
              {/* Dynamic form inputs based on modalType */}
              {modalType === 'service' && (
                <>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Service Title *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Short Description *</label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.short_description}
                      onChange={(e) => setEditingItem({ ...editingItem, short_description: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Image URL</label>
                    <input
                      type="url"
                      value={editingItem.image_url}
                      onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </>
              )}

              {modalType === 'project' && (
                <>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Client Name</label>
                      <input
                        type="text"
                        value={editingItem.client_name}
                        onChange={(e) => setEditingItem({ ...editingItem, client_name: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Duration / Time</label>
                      <input
                        type="text"
                        value={editingItem.duration}
                        onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Thumbnail URL</label>
                    <input
                      type="url"
                      value={editingItem.thumbnail_url}
                      onChange={(e) => setEditingItem({ ...editingItem, thumbnail_url: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </>
              )}

              {modalType === 'testimonial' && (
                <>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Client Name *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.client_name}
                      onChange={(e) => setEditingItem({ ...editingItem, client_name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Client Role / Company</label>
                    <input
                      type="text"
                      value={editingItem.client_role}
                      onChange={(e) => setEditingItem({ ...editingItem, client_role: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Comment *</label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.comment}
                      onChange={(e) => setEditingItem({ ...editingItem, comment: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </>
              )}

              {modalType === 'blog' && (
                <>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Article Title *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Excerpt *</label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.excerpt}
                      onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Content</label>
                    <textarea
                      rows={4}
                      value={editingItem.content}
                      onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </>
              )}

              {modalType === 'faq' && (
                <>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Question *</label>
                    <input
                      type="text"
                      required
                      value={editingItem.question}
                      onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Answer *</label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.answer}
                      onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
