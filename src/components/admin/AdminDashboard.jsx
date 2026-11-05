import React, { useState, useEffect, useRef } from 'react';
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
  X,
  ExternalLink,
  Search,
  CheckCircle2,
  Eye,
  EyeOff,
  Save,
  Loader2,
  Upload,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Phone,
  Mail,
  CheckCheck
} from 'lucide-react';
import { api, isSupabaseConfigured, supabase } from '../../lib/supabase';

// Reusable Direct Image Uploader Component
function ImageUploader({ label, value, onChange }) {
  const fileInputRef = useRef(null);
  const [useUrlMode, setUseUrlMode] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('File size exceeds 8MB. Please select a smaller photo.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300">{label}</label>
        <button
          type="button"
          onClick={() => setUseUrlMode(!useUrlMode)}
          className="text-[10px] text-emerald-400 hover:underline"
        >
          {useUrlMode ? 'Switch to Direct File Upload' : 'Or paste URL'}
        </button>
      </div>

      {useUrlMode ? (
        <input
          type="url"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500"
        />
      ) : (
        <div>
          {value ? (
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 p-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={value}
                  alt="Uploaded preview"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-600 shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Image Attached</span>
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate max-w-[200px]">
                    Direct upload ready
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-[11px] font-semibold text-white transition-colors"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-brand-green-500 rounded-2xl p-5 text-center cursor-pointer bg-slate-800/50 hover:bg-slate-800 transition-all group"
            >
              <Upload className="w-6 h-6 text-slate-400 group-hover:text-brand-green-400 mx-auto mb-1.5 transition-colors" />
              <span className="text-xs text-slate-200 font-semibold block">
                Click to upload image file from device
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                PNG, JPG, WEBP (Direct file upload, not thumbnail)
              </span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

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

  // Inquiry Detailed View Modal & Filters
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');
  const [inquirySearch, setInquirySearch] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  const showNotification = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 3500);
  };

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
    if (typeof window !== 'undefined' && window.location.pathname.toLowerCase() !== '/admin') {
      window.history.replaceState({}, '', '/admin');
    }
  }, []);

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
      setTimeout(() => {
        setIsAuthenticated(true);
        localStorage.setItem('jeff_admin_auth', 'true');
        setAuthLoading(false);
      }, 350);
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
        showNotification('Service saved successfully!');
      } else if (modalType === 'project') {
        await api.saveProject(item);
        showNotification('Project saved successfully!');
      } else if (modalType === 'testimonial') {
        await api.saveTestimonial(item);
        showNotification('Testimonial saved successfully!');
      } else if (modalType === 'blog') {
        await api.saveBlog(item);
        showNotification('Article saved successfully!');
      } else if (modalType === 'faq') {
        await api.saveFaq(item);
        showNotification('FAQ saved successfully!');
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
      showNotification('Service deleted.');
      loadAdminData();
    }
  };

  const handleTogglePublishService = async (service) => {
    await api.saveService({ ...service, is_published: !service.is_published });
    showNotification(`Service ${service.is_published ? 'unpublished' : 'published'}.`);
    loadAdminData();
  };

  // Handlers for Projects
  const handleDeleteProject = async (id) => {
    if (confirm('Delete this project?')) {
      await api.deleteProject(id);
      showNotification('Project deleted.');
      loadAdminData();
    }
  };

  // Handlers for Inquiries - Instant State Update & Persistence
  const handleUpdateInquiryStatus = async (id, newStatus) => {
    // Instant optimistic update
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
    }

    try {
      await api.updateInquiryStatus(id, newStatus);
      showNotification(`Inquiry updated to "${newStatus.toUpperCase()}".`);
    } catch (err) {
      console.error(err);
      alert('Error updating status.');
      loadAdminData();
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (confirm('Are you sure you want to delete this inquiry record?')) {
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
      await api.deleteInquiry(id);
      showNotification('Inquiry deleted.');
    }
  };

  // Handlers for Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await api.saveSettings(settings);
    showNotification('Company website settings updated!');
  };

  // Filtered inquiries list
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter =
      inquiryStatusFilter === 'all' || inq.status === inquiryStatusFilter;
    const q = inquirySearch.toLowerCase();
    const matchesSearch =
      !q ||
      inq.full_name?.toLowerCase().includes(q) ||
      inq.phone?.toLowerCase().includes(q) ||
      inq.address?.toLowerCase().includes(q) ||
      inq.service_requested?.toLowerCase().includes(q) ||
      inq.message?.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-green-500 mx-auto mb-3 shadow-lg">
              <img src="/logo.jpg" alt="Jeff HVAC" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-extrabold text-white leading-snug">
              <span className="text-brand-green-400 font-black">JE</span>
              <span className="text-brand-red-500 font-black">FF</span> Air-condition and Refrigeration Maintenance Services
            </h2>
            <p className="text-xs text-brand-green-400 font-semibold uppercase tracking-wider mt-1">
              Admin Content Management System
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {isSupabaseConfigured
                ? 'Connected to live Supabase Backend'
                : 'Local Admin Mode Active'}
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
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
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
      {/* Toast Notification */}
      {actionNotice && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-white px-4 py-2.5 rounded-xl shadow-xl font-bold text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top duration-200">
          <CheckCheck className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-green-500">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h1 className="font-extrabold text-xs tracking-tight text-white leading-tight">
                <span className="text-brand-green-400 font-black">JE</span>
                <span className="text-brand-red-500 font-black">FF</span> Air-condition & Ref
              </h1>
              <span className="text-[9.5px] text-emerald-400 uppercase font-semibold block">
                Maintenance Services CMS
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'services', label: 'Services Manager', icon: Wrench, count: services.length },
            { id: 'projects', label: 'Projects & Gallery', icon: FolderGit2, count: projects.length },
            {
              id: 'inquiries',
              label: 'Contact Inquiries',
              icon: Inbox,
              count: inquiries.filter((i) => i.status === 'new').length,
              badge: true,
            },
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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 text-xs font-medium transition-colors cursor-pointer"
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
            {/* ================= TAB: OVERVIEW ================= */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Dashboard Overview</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Real-time metrics, website content status, and customer service bookings.
                  </p>
                </div>

                {/* Metric Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div
                    onClick={() => setActiveTab('services')}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer"
                  >
                    <span className="text-xs text-slate-400 font-medium">Published Services</span>
                    <div className="text-3xl font-extrabold text-white mt-1">
                      {services.filter((s) => s.is_published).length}
                    </div>
                  </div>
                  <div
                    onClick={() => setActiveTab('projects')}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer"
                  >
                    <span className="text-xs text-slate-400 font-medium">Showcase Projects</span>
                    <div className="text-3xl font-extrabold text-white mt-1">
                      {projects.length}
                    </div>
                  </div>
                  <div
                    onClick={() => setActiveTab('inquiries')}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer"
                  >
                    <span className="text-xs text-slate-400 font-medium">New Inquiries</span>
                    <div className="text-3xl font-extrabold text-emerald-400 mt-1">
                      {inquiries.filter((i) => i.status === 'new').length}
                    </div>
                  </div>
                  <div
                    onClick={() => setActiveTab('testimonials')}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors cursor-pointer"
                  >
                    <span className="text-xs text-slate-400 font-medium">Testimonials</span>
                    <div className="text-3xl font-extrabold text-white mt-1">
                      {testimonials.length}
                    </div>
                  </div>
                </div>

                {/* Recent Inquiries List */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white text-sm">Recent Contact & Booking Submissions</h3>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs text-brand-green-400 hover:underline cursor-pointer"
                    >
                      View All Inquiries →
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <p className="text-xs text-slate-500 py-4 text-center">No inquiries yet.</p>
                  ) : (
                    <div className="divide-y divide-slate-800">
                      {inquiries.slice(0, 5).map((inq) => (
                        <div
                          key={inq.id}
                          className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/40 p-2 rounded-xl transition-colors cursor-pointer"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-white text-xs">{inq.full_name}</span>
                              <span className="text-[10px] text-slate-400 font-mono">{inq.phone}</span>
                              <span
                                className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                                  inq.status === 'new'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : inq.status === 'contacted'
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : inq.status === 'in_progress'
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {inq.status?.toUpperCase() || 'NEW'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 truncate max-w-lg mt-0.5">
                              <strong className="text-slate-300">{inq.service_requested}:</strong>{' '}
                              {inq.address ? `[${inq.address}] ` : ''}
                              {inq.message}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                            <span className="text-[10px] text-slate-500 whitespace-nowrap">
                              {new Date(inq.created_at).toLocaleDateString()}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedInquiry(inq);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ================= TAB: SERVICES ================= */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">Services Management</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Manage all 13 HVAC cooling, repair, and brand-new installation services.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingItem({
                        title: '',
                        slug: '',
                        short_description: '',
                        full_description: '',
                        icon_name: 'Wrench',
                        image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
                        features: ['24/7 Rapid Response', 'Certified Diagnostic Equipment', '1-Year Labor Warranty'],
                        is_published: true,
                        display_order: services.length + 1,
                      });
                      setModalType('service');
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
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
                        <div className="h-40 rounded-xl overflow-hidden mb-4 bg-slate-800 relative">
                          <img
                            src={service.image_url}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-white text-base leading-snug">{service.title}</h3>
                          <button
                            onClick={() => handleTogglePublishService(service)}
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0 ${
                              service.is_published
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            {service.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                            <span>{service.is_published ? 'Published' : 'Draft'}</span>
                          </button>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-3 mb-4">
                          {service.short_description}
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                        <button
                          onClick={() => {
                            setEditingItem({ ...service });
                            setModalType('service');
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB: PROJECTS & INSTALLATIONS ================= */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">Projects & Installations</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Manage project showcase cards (Locations included, strictly no prices).
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingItem({
                        title: '',
                        slug: '',
                        client_name: '',
                        location: 'Rosales, Pangasinan',
                        duration: '3 Days',
                        category: 'Residential',
                        description: '',
                        thumbnail_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
                        scope_details: ['Precision Inverter Installation', 'Acoustic Soundproofing'],
                        is_published: true,
                        display_order: projects.length + 1,
                      });
                      setModalType('project');
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs transition-colors cursor-pointer shadow-md"
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
                        <div className="h-44 rounded-xl overflow-hidden mb-4 bg-slate-800 relative">
                          <img
                            src={proj.thumbnail_url}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                          />
                          {proj.location && (
                            <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{proj.location}</span>
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-white text-base mb-1">{proj.title}</h3>
                        <div className="text-[11px] text-slate-400 mb-2 flex items-center gap-2 flex-wrap">
                          <span>Client: {proj.client_name}</span>
                          <span>•</span>
                          <span>Duration: {proj.duration}</span>
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
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB: CONTACT & BOOKING INQUIRIES ================= */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">Contact & Booking Inquiries</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Manage service bookings, addresses, attached unit photos, and technician dispatch status.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {['all', 'new', 'contacted', 'in_progress', 'resolved'].map((st) => (
                      <button
                        key={st}
                        onClick={() => setInquiryStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${
                          inquiryStatusFilter === st
                            ? 'bg-brand-green-500 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by customer name, phone, address, or service..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500"
                  />
                </div>

                {/* Inquiries List */}
                <div className="space-y-4">
                  {filteredInquiries.length === 0 ? (
                    <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-500 text-xs">
                      No matching inquiries found.
                    </div>
                  ) : (
                    filteredInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                      >
                        <div className="space-y-1.5 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-extrabold text-white text-sm">{inq.full_name}</h4>
                            <span
                              className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                                inq.status === 'new'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                  : inq.status === 'contacted'
                                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                                  : inq.status === 'in_progress'
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {inq.status?.toUpperCase() || 'NEW'}
                            </span>

                            {inq.has_ocular_visit && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                🔍 Ocular Visit Requested
                              </span>
                            )}
                            {inq.unit_image && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                                <ImageIcon className="w-3 h-3" />
                                <span>Unit Photo Attached</span>
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-slate-400 flex items-center gap-4 flex-wrap">
                            <span className="flex items-center gap-1 text-slate-300">
                              <Phone className="w-3 h-3 text-emerald-400" />
                              <a href={`tel:${inq.phone}`} className="hover:underline font-mono font-bold">
                                {inq.phone}
                              </a>
                            </span>
                            {inq.address && (
                              <span className="flex items-center gap-1 text-slate-300">
                                <MapPin className="w-3 h-3 text-emerald-400" />
                                <span>{inq.address}</span>
                              </span>
                            )}
                            <span className="text-emerald-400 font-semibold">
                              🔧 {inq.service_requested}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 pt-1 line-clamp-2">
                            {inq.landmark && <strong className="text-slate-400">[Landmark: {inq.landmark}] </strong>}
                            {inq.preferred_time && <span className="text-slate-400">[Time: {inq.preferred_time}] </span>}
                            {inq.message}
                          </p>
                        </div>

                        {/* Status Dropdown & Action Buttons */}
                        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            View Details
                          </button>

                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-green-500 cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>

                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ================= TAB: TESTIMONIALS ================= */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">Testimonials Management</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Manage real person Filipino Taglish reviews and upload client photos.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingItem({
                        client_name: '',
                        client_role: 'Homeowner, Rosales, Pangasinan',
                        company_name: '',
                        rating: 5,
                        comment: '',
                        avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
                        is_published: true,
                      });
                      setModalType('testimonial');
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Testimonial</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((t) => (
                    <div
                      key={t.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 border border-slate-700 shrink-0">
                            <img
                              src={t.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'}
                              alt={t.client_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm">{t.client_name}</h4>
                            <span className="text-[11px] text-slate-400 block">
                              {t.client_role} {t.company_name ? `• ${t.company_name}` : ''}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-amber-400 mb-2">
                          {[...Array(t.rating || 5)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>

                        <p className="text-xs text-slate-300 italic mb-4 leading-relaxed">
                          "{t.comment}"
                        </p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                        <button
                          onClick={() => {
                            setEditingItem({ ...t });
                            setModalType('testimonial');
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Delete testimonial?')) {
                              await api.deleteTestimonial(t.id);
                              showNotification('Testimonial deleted.');
                              loadAdminData();
                            }
                          }}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB: BLOGS & ARTICLES ================= */}
            {activeTab === 'blogs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">Articles & News</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Publish HVAC technical maintenance articles with dates and full photo uploads.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingItem({
                        title: '',
                        slug: '',
                        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                        excerpt: '',
                        content: '',
                        read_time: '4 Min Read',
                        featured_image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
                        author_name: 'Jeff Rivera (CEO)',
                        category: 'Maintenance',
                        is_published: true,
                        published_at: new Date().toISOString(),
                      });
                      setModalType('blog');
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Article</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogs.map((b) => (
                    <div
                      key={b.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-44 rounded-xl overflow-hidden mb-3 bg-slate-800 relative">
                          <img
                            src={b.featured_image}
                            alt={b.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-brand-green-400" />
                            <span>{b.date || (b.published_at ? new Date(b.published_at).toLocaleDateString() : 'Recent')}</span>
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-brand-green-400 uppercase tracking-wider block mb-1">
                          {b.category} • {b.read_time}
                        </span>
                        <h3 className="font-bold text-white text-base mb-2 leading-snug">{b.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2">{b.excerpt}</p>
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800 mt-4">
                        <button
                          onClick={() => {
                            setEditingItem({ ...b });
                            setModalType('blog');
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Delete article?')) {
                              await api.deleteBlog(b.id);
                              showNotification('Article deleted.');
                              loadAdminData();
                            }
                          }}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB: FAQS ================= */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
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
                        is_published: true,
                      });
                      setModalType('faq');
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add FAQ</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-sm mb-1">{faq.question}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingItem({ ...faq });
                            setModalType('faq');
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm('Delete FAQ?')) {
                              await api.deleteFaq(faq.id);
                              showNotification('FAQ deleted.');
                              loadAdminData();
                            }
                          }}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB: SETTINGS ================= */}
            {activeTab === 'settings' && (
              <div className="max-w-2xl space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Company & Website Settings</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Update official email, phone numbers, branch addresses, and operating hours.
                  </p>
                </div>

                <form
                  onSubmit={handleSaveSettings}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4"
                >
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
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Official Email Address (Primary)
                    </label>
                    <input
                      type="email"
                      value={settings.email || 'riverajeffrrey421@gmail.com'}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Main Operations Phone Number
                    </label>
                    <input
                      type="text"
                      value={settings.phone || '0924 375 0879 / 0977 699 1662'}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Official Branches & Addresses
                    </label>
                    <input
                      type="text"
                      value={settings.address || 'San Bartolome, Rosales, Pangasinan / Apalit, Pampanga'}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Hours of Operation</label>
                    <input
                      type="text"
                      value={settings.hours || 'Mon - Sun: 8:00 AM - 5:00 PM / Emergency 24/7'}
                      onChange={(e) => setSettings({ ...settings, hours: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>

                  {/* Pangasinan Staff Contacts Info */}
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 space-y-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                      Pangasinan Branch Staff Hotlines (Official Display):
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1 font-mono">
                      <li>• <strong>Jeff "CEO"</strong>: 0977 699 1662</li>
                      <li>• <strong>Gian (Nav)</strong>: 0924 375 0879</li>
                      <li>• <strong>MJ</strong>: 0927 045 1215</li>
                      <li>• <strong>Kristle</strong>: 0949 569 0281</li>
                      <li>• <strong>Ailyn</strong>: 0914 375 607</li>
                    </ul>
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

      {/* ================= MODAL: INQUIRY FULL DETAILS ================= */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative text-white">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-green-500/20 text-emerald-400 border border-brand-green-500/30">
                Inquiry Full Details
              </span>
              <span className="text-xs text-slate-400">ID: {selectedInquiry.id}</span>
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-6">
              {selectedInquiry.full_name}
            </h3>

            <div className="space-y-4">
              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone Number</span>
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="text-emerald-400 font-mono font-bold text-sm hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedInquiry.phone}</span>
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Address</span>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-slate-200 text-xs hover:underline flex items-center gap-1.5 mt-0.5 break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedInquiry.email || 'None provided'}</span>
                  </a>
                </div>
              </div>

              {/* Complete Address & Landmark */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Complete Address / Tirahan</span>
                  <p className="text-xs text-slate-100 font-semibold mt-0.5">
                    {selectedInquiry.address || 'None specified'}
                  </p>
                </div>
                {selectedInquiry.landmark && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Landmark</span>
                    <p className="text-xs text-amber-300 mt-0.5">
                      📍 {selectedInquiry.landmark}
                    </p>
                  </div>
                )}
              </div>

              {/* Service Requested & Schedule */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-800/60 border border-slate-700 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Service Requested</span>
                  <span className="font-bold text-emerald-400 block mt-0.5">
                    {selectedInquiry.service_requested}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Preferred Date</span>
                  <span className="text-slate-200 block mt-0.5">
                    {selectedInquiry.preferred_date || 'ASAP'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Time Window (8AM-5PM)</span>
                  <span className="text-slate-200 font-semibold block mt-0.5">
                    {selectedInquiry.preferred_time || '8:00 AM - 5:00 PM'}
                  </span>
                </div>
              </div>

              {/* Dynamic Service Attributes */}
              {(selectedInquiry.has_ocular_visit || selectedInquiry.unit_status || selectedInquiry.unit_brand) && (
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Special Service Specifications
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedInquiry.has_ocular_visit && (
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                        ✓ Ocular Visit / Site Survey Requested
                      </span>
                    )}
                    {selectedInquiry.unit_status && (
                      <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        Unit Option: <strong>{selectedInquiry.unit_status}</strong>
                      </span>
                    )}
                    {selectedInquiry.unit_brand && (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Brand: <strong>{selectedInquiry.unit_brand}</strong>
                      </span>
                    )}
                    {selectedInquiry.unit_years && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Age: <strong>{selectedInquiry.unit_years}</strong>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Attached Picture of Unit */}
              {selectedInquiry.unit_image && (
                <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Customer Attached Unit Photo</span>
                  </span>
                  <div className="rounded-xl overflow-hidden max-h-72 border border-slate-700 bg-black/50 flex items-center justify-center">
                    <img
                      src={selectedInquiry.unit_image}
                      alt="Customer attached unit"
                      className="max-h-72 w-auto object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Customer Message / Symptoms
                </span>
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message || 'No additional notes provided.'}
                </p>
              </div>

              {/* Status Update & Actions */}
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Current Dispatch Status
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    {['new', 'contacted', 'in_progress', 'resolved'].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateInquiryStatus(selectedInquiry.id, st)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                          selectedInquiry.status === st
                            ? 'bg-brand-green-500 text-white'
                            : 'bg-slate-700 text-slate-300 hover:text-white'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                  className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold transition-colors cursor-pointer self-start sm:self-center"
                >
                  Delete Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDITING / ADDING MODAL WITH DIRECT IMAGE UPLOADER ================= */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-6">
              {editingItem.id ? 'Edit' : 'Create'} {modalType.toUpperCase()}
            </h3>

            <form onSubmit={handleSaveModal} className="space-y-4">
              {/* SERVICE MODAL */}
              {modalType === 'service' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Service Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.title}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Short Description *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.short_description}
                      onChange={(e) => setEditingItem({ ...editingItem, short_description: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>

                  {/* Direct Image Upload */}
                  <ImageUploader
                    label="Service Image (Full Upload, not thumbnail)"
                    value={editingItem.image_url}
                    onChange={(url) => setEditingItem({ ...editingItem, image_url: url })}
                  />

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Description
                    </label>
                    <textarea
                      rows={3}
                      value={editingItem.full_description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, full_description: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </>
              )}

              {/* PROJECT MODAL */}
              {modalType === 'project' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Project Title *
                    </label>
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
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Client Name
                      </label>
                      <input
                        type="text"
                        value={editingItem.client_name || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, client_name: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Project Location *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Rosales, Pangasinan"
                        value={editingItem.location || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Duration / Time
                      </label>
                      <input
                        type="text"
                        value={editingItem.duration || '3 Days'}
                        onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={editingItem.category || 'Residential'}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Direct Image Upload for Project */}
                  <ImageUploader
                    label="Project Photo (Full Upload, not thumbnail)"
                    value={editingItem.thumbnail_url}
                    onChange={(url) => setEditingItem({ ...editingItem, thumbnail_url: url })}
                  />

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Project Description
                    </label>
                    <textarea
                      rows={2}
                      value={editingItem.description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </>
              )}

              {/* TESTIMONIAL MODAL */}
              {modalType === 'testimonial' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Hal. Rowena Mendoza"
                      value={editingItem.client_name}
                      onChange={(e) => setEditingItem({ ...editingItem, client_name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Client Role & Town / City
                      </label>
                      <input
                        type="text"
                        placeholder="Homeowner, Rosales"
                        value={editingItem.client_role || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, client_role: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Rating (Stars)
                      </label>
                      <select
                        value={editingItem.rating || 5}
                        onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white cursor-pointer"
                      >
                        <option value={5}>★★★★★ (5 Stars)</option>
                        <option value={4}>★★★★☆ (4 Stars)</option>
                        <option value={3}>★★★☆☆ (3 Stars)</option>
                      </select>
                    </div>
                  </div>

                  {/* Direct Image Upload for Avatar */}
                  <ImageUploader
                    label="Customer Photo / Avatar (Upload full image)"
                    value={editingItem.avatar_url}
                    onChange={(url) => setEditingItem({ ...editingItem, avatar_url: url })}
                  />

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Filipino Taglish Comment / Feedback *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Hal: Sobrang bilis ng responde nila Jeff! Malamig na ulit aircon namin..."
                      value={editingItem.comment}
                      onChange={(e) => setEditingItem({ ...editingItem, comment: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </>
              )}

              {/* BLOG MODAL */}
              {modalType === 'blog' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Article Title *
                    </label>
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
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Article Date (e.g. Nov 04, 2026) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nov 04, 2026"
                        value={editingItem.date || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={editingItem.author_name || 'Jeff Rivera (CEO)'}
                        onChange={(e) => setEditingItem({ ...editingItem, author_name: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Direct Image Upload for Article */}
                  <ImageUploader
                    label="Featured Article Image (Full Upload, not thumbnail)"
                    value={editingItem.featured_image}
                    onChange={(url) => setEditingItem({ ...editingItem, featured_image: url })}
                  />

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Excerpt / Summary *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={editingItem.excerpt}
                      onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Article Content
                    </label>
                    <textarea
                      rows={4}
                      value={editingItem.content || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                </>
              )}

              {/* FAQ MODAL */}
              {modalType === 'faq' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Question *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingItem.question}
                      onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Answer *
                    </label>
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
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs cursor-pointer shadow-md"
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
