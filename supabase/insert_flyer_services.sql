-- ==============================================================================
-- JEFF AIR CONDITION & REFRIGERATION - INSERT OFFICIAL FLYER DATA
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor -> Run)
-- ==============================================================================

-- 1. CLEAR OLD TEMPLATE SERVICES
DELETE FROM public.services;

-- 2. INSERT ALL 11 OFFICIAL SERVICES FROM FLYER (STRICTLY NO PRICES)
INSERT INTO public.services (
    title,
    slug,
    short_description,
    full_description,
    icon_name,
    image_url,
    features,
    display_order,
    is_published
) VALUES
(
    'Brand-New AC Units & Expert Installation',
    'brand-new-ac-installation',
    'Free Installation and Delivery on brand-new Split Type, Window Type, 2-Way & 4-Way Cassette units.',
    'Authorized dealer supply of 100% authentic brand-new air conditioning units. Includes complimentary professional delivery, mounting, electrical piping, and vacuum testing with manufacturer warranties.',
    'Wind',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Free Delivery & Installation', 'Window, Split & Cassette Types', 'Official Manufacturer Warranty', 'Certified Dealer Units'],
    1,
    true
),
(
    'AC Installation',
    'ac-installation',
    'Expert residential and commercial AC mounting, piping connection, and electrical safety wiring.',
    'Professional setup of split systems, multi-split inverters, window units, and ceiling cassettes compliant with all manufacturer warranty standards.',
    'Wrench',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Heavy-Duty Bracket Anchoring', 'Copper Tubing Flare Connection', 'Circuit Breaker Load Verification', 'Vibration Damping'],
    2,
    true
),
(
    'Deep-Clean AC Cleaning',
    'deep-clean-ac-cleaning',
    'High-pressure coil wash, blower wheel sanitization, and drain flush to eliminate mold and restore ice-cold airflow.',
    'Complete breakdown sanitization using biodegradable anti-bacterial solution, cleaning condenser coils, blower wheel, drip pan, and high-efficiency filters.',
    'Sparkles',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Deep Evaporator Jet Flush', 'Blower Wheel Disinfection', 'Drain Pan De-clogging', 'Anti-Microbial Treatment'],
    3,
    true
),
(
    'AC Dismantle & Re-installation',
    'ac-dismantle-reinstallation',
    'Safe Freon pump-down, delicate uninstallation, system relocation, and re-mounting with zero gas leakage.',
    'Relocating your home or office? Our certified technicians pump down and preserve all refrigerant, carefully dismantle copper runs, and professionally reinstall at your new location.',
    'Wrench',
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Refrigerant Pump-Down Preservation', 'Gentle Coil & Fin Handling', 'Relocation Re-piping', 'Pressure Vacuum Test'],
    4,
    true
),
(
    'AC & Refrigerator Repair',
    'ac-refrigerator-repair',
    'Accurate troubleshooting and OEM component repair for cooling loss, electrical failure, and abnormal noise.',
    'Certified repair for non-cooling air conditioners, domestic refrigerators, two-door inverters, and commercial chillers. Rapid diagnosis of faulty compressors, thermistors, and control boards.',
    'Cpu',
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Inverter PCB Diagnostics', 'Compressor Starting Relay Fix', 'Defrost Timer Calibration', 'Genuine OEM Replacement Parts'],
    5,
    true
),
(
    'AC & Refrigerator System Reprocessing',
    'ac-refrigerator-system-reprocessing',
    'Full nitrogen pressure testing, capillary cleaning, micro-leak welding, and high-vacuum dehumidification.',
    'Total refrigeration cycle overhaul when systems suffer severe contamination, moisture ingress, or clogged expansion valves. Restores factory pressure levels and cooling longevity.',
    'Fan',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Nitrogen Flushing at 250 PSI', 'Capillary Tube Unblocking', 'Filter Drier Replacement', 'Deep Micron Vacuum Hold'],
    6,
    true
),
(
    'Charging Freon / Freon Charging',
    'charging-freon',
    'Precision electronic scale refrigerant charging with R32, R410A, and R134A to factory specs.',
    'Refrigerant leak pinpointing followed by calibrated pressure recharging. Avoid high power consumption and compressor overheating caused by low Freon levels.',
    'Snowflake',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Digital Manifold Gauge Accuracy', 'Weight-Calibrated Refrigerant Fill', 'High & Low Side Pressure Test', 'Eco R32 & R410A Safe'],
    7,
    true
),
(
    'AC Maintenance',
    'ac-maintenance',
    'Routine preventative servicing program to extend equipment life and maintain maximum cooling efficiency.',
    'Scheduled multi-point maintenance covering current draw check, condenser coil brushing, sensor adjustment, and air filter maintenance for homes and commercial establishments.',
    'Wrench',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Electrical Voltage & Amp Inspection', 'Coil Heat Exchange Optimization', 'Motor Lubrication & Balancing', 'Comprehensive Service Report'],
    8,
    true
),
(
    'AC Check-up & System Check-up',
    'ac-system-check-up',
    'Thorough on-site evaluation of temperature delta, sensor accuracy, electrical contacts, and thermal efficiency.',
    'Detailed diagnostic health report for existing cooling units before peak summer or heavy usage. Detect hidden micro-leaks and faulty capacitors before costly breakdowns happen.',
    'Cpu',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Delta-T Thermal Imaging Check', 'Starting & Running Capacitor Test', 'Thermostat Cycle Accuracy', 'Refrigerant Pressure Gauge Reading'],
    9,
    true
),
(
    'Washing Machine Check-up & Repair',
    'washing-machine-repair',
    'Expert repair for top-load and front-load washing machines, spin dryers, motor belts, and control panels.',
    'Comprehensive diagnostic and repair service for washing machines. Troubleshoot drainage errors, motor vibration, belt slip, and electronic board faults.',
    'Fan',
    'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Motor & Drive Belt Inspection', 'Drain Pump Clearing', 'PCB Motherboard Repair', 'Spin Cycle Balancing'],
    10,
    true
),
(
    'Washing Machine Deep Cleaning',
    'washing-machine-deep-cleaning',
    'Tub disassembly cleaning that removes hidden dirt, bad odors, and mold build-up behind the stainless steel drum.',
    'Specialized deep-clean sanitation disassembling the inner tub to eliminate accumulated detergent sludge, mildew, and stubborn mold, restoring fresh clean wash cycles.',
    'Sparkles',
    'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1200&q=80',
    ARRAY['Tub Disassembly Sanitation', 'Odor & Sludge Elimination', 'Mold & Mildew Removal', 'Inner & Outer Drum Pressure Flush'],
    11,
    true
);

-- 3. UPDATE SITE SETTINGS WITH OFFICIAL BRANCH LOCATIONS AND HOTLINES
INSERT INTO public.site_settings (
    id,
    company_name,
    tagline,
    phone,
    email,
    address,
    hours,
    social_links
) VALUES (
    'main',
    'Jeff Air Condition & Refrigeration',
    'Maintenance Service and Dealer',
    '0977 699 1662 / 0915 971 7470',
    'service@jeffhvac.com',
    'San Bartolome, Rosales, Pangasinan / Apalit, Pampanga',
    'Mon - Sun: 8:00 AM - 7:00 PM / Emergency 24/7',
    jsonb_build_object(
        'facebook_pangasinan', 'https://facebook.com/jeffairconpangasinan',
        'facebook_apalit', 'https://facebook.com/jeffairconapalit',
        'hotline_rosales', '0977 699 1662 / 0949 569 0281',
        'hotline_apalit', '0915 971 7470 / 0969 223 5507'
    )
)
ON CONFLICT (id) DO UPDATE SET
    company_name = EXCLUDED.company_name,
    tagline = EXCLUDED.tagline,
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    address = EXCLUDED.address,
    hours = EXCLUDED.hours,
    social_links = EXCLUDED.social_links,
    updated_at = NOW();

-- 4. ENSURE ROW LEVEL SECURITY ALLOWS PUBLIC TO READ SERVICES & SETTINGS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read-only access" ON public.services;
CREATE POLICY "Allow public read-only access" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin full access" ON public.services;
CREATE POLICY "Allow admin full access" ON public.services FOR ALL USING (true);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to settings" ON public.site_settings;
CREATE POLICY "Allow public read access to settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin update access to settings" ON public.site_settings;
CREATE POLICY "Allow admin update access to settings" ON public.site_settings FOR ALL USING (true);

-- 5. VERIFY INSERTION COUNT
SELECT count(*) AS total_services FROM public.services;
