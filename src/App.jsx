import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import MarqueeTicker from './components/sections/MarqueeTicker';
import BrandLogosMarquee from './components/common/BrandLogos';
import AboutBento from './components/sections/AboutBento';
import Services from './components/sections/Services';
import TrustAndBranches from './components/sections/TrustAndBranches';
import Projects from './components/sections/Projects';
import Process from './components/sections/Process';
import Testimonials from './components/sections/Testimonials';
import Faq from './components/sections/Faq';
import CtaBanner from './components/sections/CtaBanner';
import Blog from './components/sections/Blog';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import BookingModal from './components/common/BookingModal';
import AdminDashboard from './components/admin/AdminDashboard';
import {
  api,
  INITIAL_SERVICES,
  INITIAL_PROJECTS,
  INITIAL_TESTIMONIALS,
  INITIAL_BLOGS,
  INITIAL_FAQS,
  INITIAL_SETTINGS
} from './lib/supabase';
import { Shield } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('public'); // 'public' | 'admin'
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [testimonials, setTestimonials] = useState(INITIAL_TESTIMONIALS);
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');

  // Fetch website data
  const fetchData = async () => {
    try {
      const [srv, prj, test, blg, faq, sett] = await Promise.all([
        api.getServices(),
        api.getProjects(),
        api.getTestimonials(),
        api.getBlogs(),
        api.getFaqs(),
        api.getSettings(),
      ]);
      setServices(srv || []);
      setProjects(prj || []);
      setTestimonials(test || []);
      setBlogs(blg || []);
      setFaqs(faq || []);
      setSettings(sett || {});
    } catch (err) {
      console.error('Failed to load initial site data', err);
    }
  };

  useEffect(() => {
    fetchData();

    // Listen to hash changes e.g. #admin or #admin-demo
    const handleHash = () => {
      if (window.location.hash.startsWith('#admin')) {
        setCurrentView('admin');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenBooking = (serviceName = '') => {
    setSelectedServiceForBooking(serviceName);
    setIsBookingOpen(true);
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Switch to Admin view
  if (currentView === 'admin') {
    return (
      <AdminDashboard
        onExitAdmin={() => {
          setCurrentView('public');
          window.location.hash = '';
          fetchData(); // Refresh data on exit
        }}
      />
    );
  }

  // PUBLIC WEBSITE VIEW
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-brand-green-500 selection:text-white relative overflow-x-hidden">
      {/* Premium Floating Header */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setCurrentView('admin')}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Animated Hero with 3D AC Unit */}
        <Hero
          onGetStarted={() => handleOpenBooking()}
          onLearnMore={handleScrollToServices}
        />

        {/* Ticker / Marquee Banner */}
        <MarqueeTicker />

        {/* 15 Authorized Dealer Brands We Offer (From official flyer) */}
        <BrandLogosMarquee />

        {/* About Bento Grid ("Get Fast & Reliable AC Service") */}
        <AboutBento onLearnMore={handleScrollToContact} />

        {/* Which Services Provide (All 11 Official Flyer Services) */}
        <Services
          services={services}
          onBookService={(name) => handleOpenBooking(name)}
        />

        {/* Warranty Guarantees, Free Delivery & Installation, Official Branches, Payments */}
        <TrustAndBranches
          onBookService={(name) => handleOpenBooking(name)}
        />

        {/* Speaks Everything (Projects Showcase - NO PRICES) */}
        <Projects
          projects={projects}
          onConsultation={handleScrollToContact}
        />

        {/* Our Working Process (Interactive Timeline) */}
        <Process onRequestService={() => handleOpenBooking()} />

        {/* Testimonials */}
        <Testimonials testimonials={testimonials} />

        {/* Call to Action Banner */}
        <CtaBanner
          onBookServices={() => handleOpenBooking()}
          onGetQuote={handleScrollToContact}
        />

        {/* Latest Blog & News */}
        <Blog blogs={blogs} />

        {/* Frequently Asked Questions */}
        <Faq faqs={faqs} />

        {/* Contact Form ("Let's Connect with Us Now") */}
        <Contact
          services={services}
          preselectedService={selectedServiceForBooking}
        />
      </main>

      {/* Premium Footer with giant brand watermark */}
      <Footer onBookSchedule={() => handleOpenBooking()} />

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        defaultService={selectedServiceForBooking}
      />

      {/* Subtle Floating Admin Portal Pill (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 hidden sm:block">
        <button
          onClick={() => setCurrentView('admin')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold shadow-xl border border-slate-700/80 backdrop-blur-md transition-all duration-200 hover:scale-105 group"
        >
          <div className="w-2 h-2 rounded-full bg-brand-green-400 group-hover:animate-ping" />
          <Shield className="w-3.5 h-3.5 text-slate-300" />
          <span>Admin CMS</span>
        </button>
      </div>
    </div>
  );
}
