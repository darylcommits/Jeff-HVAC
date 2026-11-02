-- SUPABASE POSTGRESQL SCHEMA FOR JEFF AIR CONDITION & REFRIGERATION
-- Run this in your Supabase SQL Editor to set up the entire backend

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    icon_name VARCHAR(100) DEFAULT 'Wrench',
    image_url TEXT NOT NULL,
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_published BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    thumbnail_url TEXT NOT NULL,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    scope_details TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_published BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    client_role VARCHAR(255) DEFAULT 'Homeowner',
    company_name VARCHAR(255),
    rating INT DEFAULT 5,
    comment TEXT NOT NULL,
    avatar_url TEXT,
    is_published BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    read_time VARCHAR(50) DEFAULT '4 Min Read',
    featured_image TEXT NOT NULL,
    author_name VARCHAR(255) DEFAULT 'Jeff Martinez',
    category VARCHAR(100) DEFAULT 'Maintenance',
    is_published BOOLEAN DEFAULT true,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    display_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CONTACT INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    service_requested VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new', -- new, contacted, in_progress, resolved
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
    company_name VARCHAR(255) DEFAULT 'Jeff Air Condition & Refrigeration',
    tagline VARCHAR(255) DEFAULT 'Digital AC Solutions For Tomorrow',
    phone VARCHAR(100) DEFAULT '+1 (800) 533-3482',
    email VARCHAR(255) DEFAULT 'service@jeffhvac.com',
    address VARCHAR(255) DEFAULT '350 Fifth Avenue, Suite 4800, New York, NY 10118',
    hours VARCHAR(255) DEFAULT 'Mon - Sat: 8:00 AM - 7:00 PM / Emergency 24/7',
    social_links JSONB DEFAULT '{"facebook": "#", "twitter": "#", "instagram": "#", "linkedin": "#"}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read published services, projects, testimonials, blogs, faqs, settings
CREATE POLICY "Public can view published services" ON public.services FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published blog_posts" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view published faqs" ON public.faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);

-- Public can insert contact inquiries
CREATE POLICY "Public can submit contact inquiries" ON public.contact_inquiries FOR INSERT WITH CHECK (true);

-- Authenticated admin has full access to all tables
CREATE POLICY "Admins full access services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access blog_posts" ON public.blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access faqs" ON public.faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access contact_inquiries" ON public.contact_inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins full access site_settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- 10. SEED INITIAL DATA
INSERT INTO public.site_settings (id, company_name, tagline, phone, email, address, hours)
VALUES (
    'main',
    'Jeff Air Condition & Refrigeration',
    'Maintenance Service and Dealer',
    '0977 699 1662 / 0915 971 7470',
    'service@jeffhvac.com',
    'San Bartolome, Rosales, Pangasinan / Apalit, Pampanga',
    'Mon - Sun: 8:00 AM - 7:00 PM / Emergency 24/7'
) ON CONFLICT (id) DO UPDATE SET
    phone = EXCLUDED.phone,
    address = EXCLUDED.address,
    tagline = EXCLUDED.tagline;

-- Seed Services from Official Flyer
INSERT INTO public.services (title, slug, short_description, full_description, icon_name, image_url, features, display_order)
VALUES 
(
    'Brand-New AC Units & Expert Installation',
    'brand-new-ac-installation',
    'Free Installation and Delivery on brand-new Split Type, Window Type, 2-Way & 4-Way Cassette units.',
    'Authorized dealer supply of 100% authentic brand-new air conditioning units. Includes complimentary professional delivery, mounting, electrical piping, and vacuum testing with manufacturer warranties.',
    'Wind',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Free Delivery & Installation', 'Window, Split & Cassette Types', 'Official Manufacturer Warranty', 'Certified Dealer Units'],
    1
),
(
    'AC Installation',
    'ac-installation',
    'Expert residential and commercial AC mounting, piping connection, and electrical safety wiring.',
    'Professional setup of split systems, multi-split inverters, window units, and ceiling cassettes compliant with all manufacturer warranty standards.',
    'Wrench',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Heavy-Duty Bracket Anchoring', 'Copper Tubing Flare Connection', 'Circuit Breaker Load Verification', 'Vibration Damping'],
    2
),
(
    'Deep-Clean AC Cleaning',
    'deep-clean-ac-cleaning',
    'High-pressure coil wash, blower wheel sanitization, and drain flush to eliminate mold and restore ice-cold airflow.',
    'Complete breakdown sanitization using biodegradable anti-bacterial solution, cleaning condenser coils, blower wheel, drip pan, and high-efficiency filters.',
    'Sparkles',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Deep Evaporator Jet Flush', 'Blower Wheel Disinfection', 'Drain Pan De-clogging', 'Anti-Microbial Treatment'],
    3
),
(
    'AC Dismantle & Re-installation',
    'ac-dismantle-reinstallation',
    'Safe Freon pump-down, delicate uninstallation, system relocation, and re-mounting with zero gas leakage.',
    'Relocating your home or office? Our certified technicians pump down and preserve all refrigerant, carefully dismantle copper runs, and professionally reinstall at your new location.',
    'Wrench',
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Refrigerant Pump-Down Preservation', 'Gentle Coil & Fin Handling', 'Relocation Re-piping', 'Pressure Vacuum Test'],
    4
),
(
    'AC & Refrigerator Repair',
    'ac-refrigerator-repair',
    'Accurate troubleshooting and OEM component repair for cooling loss, electrical failure, and abnormal noise.',
    'Certified repair for non-cooling air conditioners, domestic refrigerators, two-door inverters, and commercial chillers. Rapid diagnosis of faulty compressors, thermistors, and control boards.',
    'Cpu',
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Inverter PCB Diagnostics', 'Compressor Starting Relay Fix', 'Defrost Timer Calibration', 'Genuine OEM Replacement Parts'],
    5
),
(
    'AC & Refrigerator System Reprocessing',
    'ac-refrigerator-system-reprocessing',
    'Full nitrogen pressure testing, capillary cleaning, micro-leak welding, and high-vacuum dehumidification.',
    'Total refrigeration cycle overhaul when systems suffer severe contamination, moisture ingress, or clogged expansion valves. Restores factory pressure levels and cooling longevity.',
    'Fan',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Nitrogen Flushing at 250 PSI', 'Capillary Tube Unblocking', 'Filter Drier Replacement', 'Deep Micron Vacuum Hold'],
    6
),
(
    'Charging Freon / Freon Charging',
    'charging-freon',
    'Precision electronic scale refrigerant charging with R32, R410A, and R134A to factory specs.',
    'Refrigerant leak pinpointing followed by calibrated pressure recharging. Avoid high power consumption and compressor overheating caused by low Freon levels.',
    'Snowflake',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Digital Manifold Gauge Accuracy', 'Weight-Calibrated Refrigerant Fill', 'High & Low Side Pressure Test', 'Eco R32 & R410A Safe'],
    7
),
(
    'AC Maintenance',
    'ac-maintenance',
    'Routine preventative servicing program to extend equipment life and maintain maximum cooling efficiency.',
    'Scheduled multi-point maintenance covering current draw check, condenser coil brushing, sensor adjustment, and air filter maintenance for homes and commercial establishments.',
    'Wrench',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Electrical Voltage & Amp Inspection', 'Coil Heat Exchange Optimization', 'Motor Lubrication & Balancing', 'Comprehensive Service Report'],
    8
),
(
    'AC Check-up & System Check-up',
    'ac-system-check-up',
    'Thorough on-site evaluation of temperature delta, sensor accuracy, electrical contacts, and thermal efficiency.',
    'Detailed diagnostic health report for existing cooling units before peak summer or heavy usage. Detect hidden micro-leaks and faulty capacitors before costly breakdowns happen.',
    'Cpu',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Delta-T Thermal Imaging Check', 'Starting & Running Capacitor Test', 'Thermostat Cycle Accuracy', 'Refrigerant Pressure Gauge Reading'],
    9
),
(
    'Washing Machine Check-up & Repair',
    'washing-machine-repair',
    'Expert repair for top-load and front-load washing machines, spin dryers, motor belts, and control panels.',
    'Authorized service technicians resolving draining issues, spin cycle failure, severe shaking, error codes, and electrical motherboard repairs on all major brands.',
    'Wrench',
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Drive Motor & Belt Replacement', 'Drain Pump & Solenoid Repair', 'Electronic Control Board Diagnosis', 'Drum Suspension Balancing'],
    10
),
(
    'Washing Machine Deep Cleaning',
    'washing-machine-deep-cleaning',
    'Tub disassembly to remove hidden dirt, stubborn mildew, bad odors, and mold build-up from inner drums.',
    'Over time, detergent scum and mold accumulate behind the stainless steel wash drum, causing foul odors on clothing. We dismantle the tub and pressure-wash every layer with sanitizing foam.',
    'Sparkles',
    'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Complete Tub Disassembly Wash', 'Mold & Slime Bio-Removal', 'Filter & Lint Trap Descaling', 'Odor-Free High-Pressure Steam Sanitization'],
    11
) ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    full_description = EXCLUDED.full_description,
    features = EXCLUDED.features;

-- Seed Projects
INSERT INTO public.projects (title, slug, client_name, duration, category, description, thumbnail_url, scope_details, display_order)
VALUES
(
    'Quick AC Fix & Coil Restoration',
    'quick-ac-fix',
    'Liana Carter',
    '4 Days',
    'Residential Split System',
    'Complete evaporator restoration, micro-channel leak welding, and smart inverter calibration for a modern apartment.',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Coil Micro-Leak Welding', 'R-410A Safe Eco-Recharge', 'Digital Smart Thermostat Sync', 'Acoustic Soundproofing'],
    1
),
(
    'High-Rise Penthouse Multi-Zone VRF',
    'high-rise-vrf',
    'Sterling Residences',
    '6 Days',
    'Commercial Luxury',
    'Installation of 8-zone concealed ceiling ducted VRF cooling with individual digital climate zoning and ultra-silent operation.',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Concealed Ceiling Units', 'Master BMS Automation Integration', 'Energy Efficiency +38%', 'Pressure Tested at 600 PSI'],
    2
),
(
    'Commercial Cold Room & Chiller System',
    'commercial-cold-room',
    'Metro Gourmet Market',
    '5 Days',
    'Refrigeration Engineering',
    'Engineered dual-compressor redundant walk-in cold room maintaining precision -18C cold storage with real-time temperature alerts.',
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Dual Condenser Backup', 'IoT Cellular Temp Monitor', 'Food-Grade Stainless Ducting', 'Zero Downtime Commissioning'],
    3
);

-- Seed Testimonials
INSERT INTO public.testimonials (client_name, client_role, company_name, rating, comment, avatar_url, display_order)
VALUES
(
    'Marcus Sterling',
    'Facility Director',
    'Apex Tower Corp',
    5,
    'Jeff Air Condition transformed our entire building cooling system. Prompt dispatch, crystal-clear communication, and our energy bills dropped by 34% within two months.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    1
),
(
    'Elena Rostova',
    'Residential Property Owner',
    'Private Villa',
    5,
    'The technicians arrived right on time in pristine uniforms. They diagnosed a tricky refrigerant issue that two previous companies failed to spot. Truly top tier!',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    2
),
(
    'David Chen',
    'Operations Manager',
    'Bistro Nouveau',
    5,
    'When our commercial walk-in cooler went down right before a busy weekend, Jeff HVAC responded in under 45 minutes and saved tens of thousands in stock.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    3
);

-- Seed Blog Posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, read_time, featured_image, author_name, category)
VALUES
(
    'Quick and Reliable AC Repair Technicians: What to Expect',
    'quick-and-reliable-ac-repair',
    'Air conditioning maintenance checklist that helps keep your AC running at peak efficiency all summer long.',
    'Modern air conditioning systems require sophisticated micro-calibrations. Regular preventative maintenance reduces wear on the compressor, keeps coils free of heat-trapping debris, and protects indoor air purity.',
    '3 Min Read',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    'Jeff Martinez',
    'Maintenance'
),
(
    'Deep Air Conditioner Cleaning Service & Health Benefits',
    'deep-air-conditioner-cleaning',
    'Scheduled servicing, priority support, and performance checks to prevent mold spores and maximize airflow velocity.',
    'When indoor moisture gathers inside your fan blower wheel and drip tray, biological buildup can quickly spread throughout living spaces. Professional chemical wash and steam sanitization restore pristine airflow.',
    '4 Min Read',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
    'Matthew Lewis',
    'Air Quality'
);

-- Seed FAQs
INSERT INTO public.faqs (question, answer, category, display_order)
VALUES
(
    'How often should I service my residential or commercial AC?',
    'We recommend comprehensive maintenance twice a year—spring for cooling and autumn for heating/refrigeration. High-traffic commercial systems benefit from quarterly inspections.',
    'Maintenance',
    1
),
(
    'What are the warning signs that my AC unit needs urgent inspection?',
    'Unusual rattling or buzzing sounds, weak airflow, warm air blowing in cool mode, ice forming on the condenser pipes, or sudden spikes in your monthly electricity usage.',
    'Diagnostics',
    2
),
(
    'Do you offer emergency response for commercial refrigeration?',
    'Yes, our certified rapid-response team provides round-the-clock emergency diagnostics and repair for restaurants, cold storage facilities, and healthcare facilities.',
    'Emergency',
    3
),
(
    'Are your technicians certified and insured?',
    'All Jeff Air Condition & Refrigeration technicians hold EPA universal certifications, factory manufacturer credentials, and comprehensive liability insurance.',
    'Company',
    4
);
