import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import AppliancePurchasesCarousel from './components/sections/AppliancePurchasesCarousel';
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

function checkIsAdminRoute() {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hash = window.location.hash.toLowerCase().replace(/\/+$/, '');
  return path === '/admin' || hash === '#admin' || hash === '#/admin' || hash.startsWith('#admin');
}

export default function App() {
  const [currentView, setCurrentView] = useState(() => (checkIsAdminRoute() ? 'admin' : 'public')); // 'public' | 'admin'
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

    // URL route listener: /admin or #admin
    const handleRouteChange = () => {
      if (checkIsAdminRoute()) {
        setCurrentView('admin');
      } else {
        setCurrentView('public');
      }
    };
    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
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
          if (window.location.pathname.toLowerCase().startsWith('/admin')) {
            window.history.pushState({}, '', '/');
          }
          if (window.location.hash.startsWith('#admin')) {
            window.history.pushState({}, '', window.location.pathname || '/');
          }
          fetchData();
        }}
      />
    );
  }

  // PUBLIC WEBSITE VIEW
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-brand-green-500 selection:text-white relative overflow-x-hidden">
      {/* Premium Floating Header */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Animated Hero with 3D AC Unit */}
        <Hero
          onGetStarted={() => handleOpenBooking()}
          onLearnMore={handleScrollToServices}
        />

        {/* Carousel of Purchased Appliances Below Home */}
        <AppliancePurchasesCarousel
          onInquireAppliance={(title) => handleOpenBooking(title)}
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


    </div>
  );
}
