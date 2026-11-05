import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-anon-key')
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial rich seed data for offline / preview / initial load
const INITIAL_DATA = {
  settings: {
    id: 'main',
    company_name: 'Jeff Air-condition and Refrigeration Maintenance Services',
    tagline: 'Maintenance Service and Dealer',
    phone: '0924 375 0879 / 0977 699 1662',
    email: 'riverajeffrrey421@gmail.com',
    address: 'San Bartolome, Rosales, Pangasinan / Apalit, Pampanga',
    hours: 'Mon - Sun: 8:00 AM - 5:00 PM / Emergency 24/7',
    branches: [
      {
        name: 'Pangasinan Branch',
        address: 'San Bartolome, Rosales, Pangasinan',
        hotlines: ['0924 375 0879', '0977 699 1662', '0927 045 1215', '0949 569 0281', '0914 375 607'],
        staff: [
          { name: 'Jeff "CEO"', phone: '0977 699 1662', role: 'CEO / General Manager' },
          { name: 'Gian', phone: '0924 375 0879', role: 'Main Operations Hotline (Nav)' },
          { name: 'MJ', phone: '0927 045 1215', role: 'Service Coordinator' },
          { name: 'Kristle', phone: '0949 569 0281', role: 'Customer Support' },
          { name: 'Ailyn', phone: '0914 375 607', role: 'Dispatch Support' },
        ],
        facebook: 'https://facebook.com/jeffairconpangasinan'
      },
      {
        name: 'Apalit Branch',
        address: 'Apalit, Pampanga',
        hotlines: ['0915 971 7470', '0969 223 5507'],
        staff: [
          { name: 'Apalit Dispatch Desk', phone: '0915 971 7470', role: 'Branch Hotline' },
          { name: 'Pampanga Field Dispatch', phone: '0969 223 5507', role: 'Field Operations' }
        ],
        facebook: 'https://facebook.com/jeffairconapalit'
      }
    ],
    warranties: [
      { title: '1 Year Warranty', desc: 'Maintenance and Labor Guarantee' },
      { title: '1-3 Years Warranty', desc: 'On PCB or Board of Unit (Selected Brands)' },
      { title: 'Up to 10 Years Warranty', desc: 'On Compressor (Selected Aircon Brands)' }
    ],
    payment_methods: [
      { name: 'Cash on Delivery (COD)', code: 'COD' },
      { name: 'Bank Transfer', code: 'BANK' },
      { name: 'GCash', code: 'GCASH' },
      { name: 'Credit Card Straight Payment', code: 'CARD' }
    ],
    social_links: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com'
    }
  },
  services: [
    {
      id: 'srv-1',
      title: 'Brand-New AC Units & Expert Installation',
      slug: 'brand-new-ac-installation',
      short_description: 'Free Installation & Delivery on brand-new Split Type, Window Type, 2-Way & 4-Way Cassette units with complimentary Ocular Visit or Survey.',
      full_description: 'Authorized dealer supply of 100% authentic brand-new air conditioning units from top brands (Fujidenzo, Whirlpool, Maytag, Tecnogas, CHiQ, Daikin, Midea, Kolin, Carrier, and more). Includes FREE Delivery & Expert Installation, complimentary Ocular Visit or Survey before installation, plus 1 to 3 Years Warranty on PCB or board of unit for selected brands and up to 10 years compressor warranty.',
      icon_name: 'Wind',
      image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      features: ['FREE Delivery & Expert Installation', 'Complimentary Ocular Visit or Survey', '1-3 Years Warranty on PCB / Board (Selected Brands)', 'Split, Window, 2-Way & 4-Way Cassette Units'],
      is_published: true,
      display_order: 1
    },
    {
      id: 'srv-2',
      title: 'AC Installation',
      slug: 'ac-installation',
      short_description: 'Expert residential and commercial AC mounting, piping, and wiring. Pwedeng may sariling unit na kayo o bibili pa lang sa amin.',
      full_description: 'Professional setup of split systems, multi-split inverters, window units, and ceiling cassettes compliant with all manufacturer warranty standards. Available whether you already have a purchased unit ("May unit na") or need to purchase one from Jeff HVAC ("Wala pa / Bibili pa").',
      icon_name: 'Wrench',
      image_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
      features: ['Option: May Unit Na o Wala Pa', 'Heavy-Duty Bracket Anchoring', 'Copper Tubing Flare Connection', 'Deep Micron Vacuum & Pressure Test'],
      is_published: true,
      display_order: 2
    },
    {
      id: 'srv-3',
      title: 'Deep-Clean AC Cleaning',
      slug: 'deep-clean-ac-cleaning',
      short_description: 'High-pressure coil wash, blower wheel sanitization, and drain flush to eliminate mold and restore ice-cold airflow.',
      full_description: 'Complete breakdown sanitization using biodegradable anti-bacterial solution, cleaning condenser coils, blower wheel, drip pan, and high-efficiency filters.',
      icon_name: 'Sparkles',
      image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      features: ['Deep Evaporator Jet Flush', 'Blower Wheel Disinfection', 'Drain Pan De-clogging', 'Anti-Microbial Treatment'],
      is_published: true,
      display_order: 3
    },
    {
      id: 'srv-4',
      title: 'AC Dismantle & Re-installation',
      slug: 'ac-dismantle-reinstallation',
      short_description: 'Safe Freon pump-down, delicate uninstallation, system relocation, and re-mounting with zero gas leakage.',
      full_description: 'Relocating your home or office? Our certified technicians pump down and preserve all refrigerant, carefully dismantle copper runs, and professionally reinstall at your new location.',
      icon_name: 'Wrench',
      image_url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
      features: ['Refrigerant Pump-Down Preservation', 'Gentle Coil & Fin Handling', 'Relocation Re-piping', 'Pressure Vacuum Test'],
      is_published: true,
      display_order: 4
    },
    {
      id: 'srv-5',
      title: 'AC & Refrigerator Repair',
      slug: 'ac-refrigerator-repair',
      short_description: 'Accurate troubleshooting and OEM component repair for cooling loss, electrical failure, and abnormal noise.',
      full_description: 'Certified repair for non-cooling air conditioners, domestic refrigerators, two-door inverters, and commercial chillers. Rapid diagnosis of faulty compressors, thermistors, and control boards.',
      icon_name: 'Cpu',
      image_url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80',
      features: ['Inverter PCB Diagnostics', 'Compressor Starting Relay Fix', 'Defrost Timer Calibration', 'Genuine OEM Replacement Parts'],
      is_published: true,
      display_order: 5
    },
    {
      id: 'srv-6',
      title: 'AC & Refrigerator System Reprocessing',
      slug: 'ac-refrigerator-system-reprocessing',
      short_description: 'Full nitrogen pressure testing, capillary cleaning, micro-leak welding, and high-vacuum dehumidification.',
      full_description: 'Total refrigeration cycle overhaul when systems suffer severe contamination, moisture ingress, or clogged expansion valves. Restores factory pressure levels and cooling longevity.',
      icon_name: 'Fan',
      image_url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      features: ['Nitrogen Flushing at 250 PSI', 'Capillary Tube Unblocking', 'Filter Drier Replacement', 'Deep Micron Vacuum Hold'],
      is_published: true,
      display_order: 6
    },
    {
      id: 'srv-7',
      title: 'Charging Freon / Freon Charging',
      slug: 'charging-freon',
      short_description: 'Precision electronic scale refrigerant charging with R32, R410A, and R134A to factory specs.',
      full_description: 'Refrigerant leak pinpointing followed by calibrated pressure recharging. Avoid high power consumption and compressor overheating caused by low Freon levels.',
      icon_name: 'Snowflake',
      image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      features: ['Digital Manifold Gauge Accuracy', 'Weight-Calibrated Refrigerant Fill', 'High & Low Side Pressure Test', 'Eco R32 & R410A Safe'],
      is_published: true,
      display_order: 7
    },
    {
      id: 'srv-8',
      title: 'AC Maintenance',
      slug: 'ac-maintenance',
      short_description: 'Routine preventative servicing program to extend equipment life and maintain maximum cooling efficiency.',
      full_description: 'Scheduled multi-point maintenance covering current draw check, condenser coil brushing, sensor adjustment, and air filter maintenance for homes and commercial establishments.',
      icon_name: 'Wrench',
      image_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
      features: ['Electrical Voltage & Amp Inspection', 'Coil Heat Exchange Optimization', 'Motor Lubrication & Balancing', 'Comprehensive Service Report'],
      is_published: true,
      display_order: 8
    },
    {
      id: 'srv-9',
      title: 'AC Check-up & System Check-up',
      slug: 'ac-system-check-up',
      short_description: 'Thorough on-site evaluation of temperature delta, sensor accuracy, electrical contacts, and thermal efficiency.',
      full_description: 'Detailed diagnostic health report for existing cooling units before peak summer or heavy usage. Detect hidden micro-leaks and faulty capacitors before costly breakdowns happen.',
      icon_name: 'Cpu',
      image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      features: ['Delta-T Thermal Imaging Check', 'Starting & Running Capacitor Test', 'Thermostat Cycle Accuracy', 'Refrigerant Pressure Gauge Reading'],
      is_published: true,
      display_order: 9
    },
    {
      id: 'srv-10',
      title: 'Washing Machine Check-up & Repair',
      slug: 'washing-machine-repair',
      short_description: 'Expert repair for top-load and front-load washing machines, spin dryers, motor belts, and control panels.',
      full_description: 'Authorized service technicians resolving draining issues, spin cycle failure, severe shaking, error codes, and electrical motherboard repairs on all major brands.',
      icon_name: 'Wrench',
      image_url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80',
      features: ['Drive Motor & Belt Replacement', 'Drain Pump & Solenoid Repair', 'Electronic Control Board Diagnosis', 'Drum Suspension Balancing'],
      is_published: true,
      display_order: 10
    },
    {
      id: 'srv-11',
      title: 'Washing Machine Deep Cleaning',
      slug: 'washing-machine-deep-cleaning',
      short_description: 'Tub disassembly to remove hidden dirt, stubborn mildew, bad odors, and mold build-up from inner drums.',
      full_description: 'Over time, detergent scum and mold accumulate behind the stainless steel wash drum, causing foul odors on clothing. We dismantle the tub and pressure-wash every layer with sanitizing foam.',
      icon_name: 'Sparkles',
      image_url: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80',
      features: ['Complete Tub Disassembly Wash', 'Mold & Slime Bio-Removal', 'Filter & Lint Trap Descaling', 'Odor-Free High-Pressure Steam Sanitization'],
      is_published: true,
      display_order: 11
    },
    {
      id: 'srv-12',
      title: 'Unit Pull Out of AC or Ref',
      slug: 'unit-pull-out-ac-or-ref',
      short_description: 'Safe on-site uninstallation, secure vehicle transport, comprehensive workshop overhaul, and guaranteed re-installation with brand and age assessment.',
      full_description: 'Specialized unit pull-out service for air conditioners and refrigerators requiring intensive workshop repairs, internal evaporator leak braze welding, sealed system chemical flush, or major compressor overhaul. Simply specify the brand of unit, how many years in service, and attach a picture of the unit for accurate technician assessment.',
      icon_name: 'Truck',
      image_url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80',
      features: ['Safe Refrigerant Pump-Down', 'Unit Brand & Age Diagnostics', 'Photo Attachment Assessment', 'Workshop Overhaul & Re-installation'],
      is_published: true,
      display_order: 12
    },
    {
      id: 'srv-13',
      title: 'Parts Replacement',
      slug: 'parts-replacement',
      short_description: 'Genuine OEM replacement for PCB inverter control boards, fan motors, run capacitors, compressors, and thermostat sensors with 1-3 years warranty on PCB.',
      full_description: 'Authorized sourcing and precision replacement of genuine OEM inverter boards, main PCB assemblies, evaporator blower motors, condenser fans, starting capacitors, and magnetic contactors. Guaranteed authentic parts with 1 to 3 years warranty on PCB or board of unit for selected brands.',
      icon_name: 'Cpu',
      image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      features: ['1-3 Years Warranty on PCB Board (Selected Brands)', '100% Genuine OEM Replacement Parts', 'Inverter Control Board Troubleshooting', 'Safe High-Voltage Calibration'],
      is_published: true,
      display_order: 13
    }
  ],
  projects: [
    {
      id: 'prj-1',
      title: 'Quick AC Fix & Evaporator Rebuild',
      slug: 'quick-ac-fix',
      client_name: 'Liana Carter',
      location: 'Rosales, Pangasinan',
      duration: '4 Days',
      category: 'Residential Split System',
      description: 'Complete evaporator coil restoration, micro-channel leak welding, and smart inverter calibration for a modern high-floor apartment.',
      thumbnail_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      scope_details: ['Coil Micro-Leak Welding', 'R-410A Eco-Recharge', 'Digital Smart Thermostat Sync', 'Acoustic Soundproofing'],
      is_published: true,
      display_order: 1
    },
    {
      id: 'prj-2',
      title: 'High-Rise Multi-Zone VRF System',
      slug: 'high-rise-vrf',
      client_name: 'Sterling Residences',
      location: 'Dagupan City, Pangasinan',
      duration: '6 Days',
      category: 'Commercial Luxury',
      description: 'Installation of 8-zone concealed ceiling ducted VRF cooling with individual digital climate zoning and ultra-silent operation.',
      thumbnail_url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
      scope_details: ['Concealed Ceiling Units', 'Master BMS Automation Integration', 'Energy Efficiency +38%', 'Pressure Tested at 600 PSI'],
      is_published: true,
      display_order: 2
    },
    {
      id: 'prj-3',
      title: 'Commercial Cold Room & Chiller System',
      slug: 'commercial-cold-room',
      client_name: 'Metro Gourmet Market',
      location: 'Urdaneta City, Pangasinan',
      duration: '5 Days',
      category: 'Refrigeration Engineering',
      description: 'Engineered dual-compressor redundant walk-in cold room maintaining precision -18°C cold storage with real-time temperature alerts.',
      thumbnail_url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=1200&q=80',
      scope_details: ['Dual Condenser Backup', 'IoT Cellular Temp Monitor', 'Food-Grade Stainless Ducting', 'Zero Downtime Commissioning'],
      is_published: true,
      display_order: 3
    },
    {
      id: 'prj-4',
      title: '4-Way Cassette Inverter Multi-Installation',
      slug: 'cassette-inverter-installation',
      client_name: 'Golden Crest Plaza',
      location: 'Apalit, Pampanga',
      duration: '3 Days',
      category: 'Commercial Air Conditioning',
      description: 'Full commercial installation of five 4-way cassette inverter units with complimentary ocular survey, customized drainage lines, and high-efficiency refrigerant charge.',
      thumbnail_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      scope_details: ['Ocular Survey & Airflow Analysis', 'Ceiling Suspension Brackets', '1-3 Yrs PCB Warranty Included', 'Complete Vacuum Commissioning'],
      is_published: true,
      display_order: 4
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      client_name: 'Rowena Mendoza',
      client_role: 'Homeowner, Rosales',
      company_name: 'San Bartolome Residence',
      rating: 5,
      comment: 'Sobrang bilis ng responde nila Jeff! Nung nasira yung inverter split type namin tanghaling tapat, within 1 hour dumating agad sila Gian at MJ. Malamig na ulit ang kwarto at napakalinis nilang gumawa, walang kalat.',
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      is_published: true
    },
    {
      id: 'test-2',
      client_name: 'Engr. Danilo Soriano',
      client_role: 'Business Owner, Dagupan City',
      company_name: 'Soriano Cold Storage & Meats',
      rating: 5,
      comment: 'Nagpa-unit pull out kami ng commercial chiller at inverter ref para sa system reprocessing. Akala ko aabutin ng weeks, pero in 3 days naibalik agad na parang bago. Transparent din sa pinalitang pyesa at may warranty pa sa board!',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      is_published: true
    },
    {
      id: 'test-3',
      client_name: 'Karmela Dizon',
      client_role: 'Restaurant Manager, Urdaneta',
      company_name: 'Cafe Kusina Urdaneta',
      rating: 5,
      comment: 'Dito kami bumili ng brand-new Daikin inverter ACs para sa cafe. Legit yung FREE delivery and installation, at nag-ocular survey muna bago ikabit! Plus may 1-3 years warranty pa sa PCB board. Super recommended!',
      avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      is_published: true
    },
    {
      id: 'test-4',
      client_name: 'Ramon Gutierrez',
      client_role: 'Apartment Owner, Apalit',
      company_name: 'Gutierrez Apartments',
      rating: 5,
      comment: 'Yung washing machine namin na ayaw mag-spin at maingay, naayos nila on the spot yung motherboard at motor. Napakabait ni Kristle sa customer support at magalang lahat ng technicians.',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      is_published: true
    }
  ],
  blog_posts: [
    {
      id: 'blg-1',
      title: 'Quick and Reliable AC Repair Technicians: What to Expect',
      slug: 'quick-and-reliable-ac-repair',
      date: 'Nov 02, 2026',
      excerpt: 'Air conditioning maintenance checklist that helps keep your AC running ice-cold all summer long with lower electricity consumption.',
      content: 'Modern inverter air conditioning systems require sophisticated micro-calibrations. Regular preventative maintenance reduces wear on the compressor, keeps coils free of heat-trapping debris, and protects indoor air purity.',
      read_time: '3 Min Read',
      featured_image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      author_name: 'Jeff Rivera (CEO)',
      category: 'Maintenance',
      is_published: true,
      published_at: '2026-11-02T08:00:00.000Z'
    },
    {
      id: 'blg-2',
      title: 'Deep Air Conditioner Cleaning Service & Health Benefits',
      slug: 'deep-air-conditioner-cleaning',
      date: 'Oct 24, 2026',
      excerpt: 'Scheduled servicing, priority support, and performance checks to prevent mold spores and maximize airflow velocity.',
      content: 'When indoor moisture gathers inside your fan blower wheel and drip tray, biological buildup can quickly spread throughout living spaces. Professional chemical wash and steam sanitization restore pristine airflow.',
      read_time: '4 Min Read',
      featured_image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80',
      author_name: 'Gian Rivera',
      category: 'Air Quality',
      is_published: true,
      published_at: '2026-10-24T09:30:00.000Z'
    },
    {
      id: 'blg-3',
      title: 'Why Genuine PCB Board Replacement Matters for Inverter Air Conditioners',
      slug: 'genuine-pcb-board-replacement',
      date: 'Oct 15, 2026',
      excerpt: 'Protect your inverter compressor with authentic OEM PCB replacement parts backed by 1 to 3 years warranty.',
      content: 'Inverter air conditioners rely heavily on high-precision Power Control Boards (PCB) to govern DC inverter compressor frequencies. Using imitation or uncalibrated circuit boards leads to frequent error codes and compressor burnout. Jeff HVAC provides genuine OEM PCB replacements with 1-3 years warranty on selected brands.',
      read_time: '5 Min Read',
      featured_image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      author_name: 'Jeff Rivera (CEO)',
      category: 'Parts & Electronics',
      is_published: true,
      published_at: '2026-10-15T10:15:00.000Z'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'How often should I service my residential or commercial AC?',
      answer: 'We recommend comprehensive cleaning and check-up twice a year for residential units, and quarterly for commercial units. Regular cleaning keeps your air clean and reduces electricity bills by up to 30%.',
      category: 'Maintenance',
      is_published: true
    },
    {
      id: 'faq-2',
      question: 'Ano po ang coverage ng Free Installation at Delivery?',
      answer: 'Lahat ng brand-new air conditioning units na bibilhin sa Jeff HVAC (Split Type, Window Type, 2-Way & 4-Way Cassette) ay may kasamang FREE standard installation, delivery sa inyong bahay o business, at complimentary Ocular Visit or Site Survey.',
      category: 'Warranty & Sales',
      is_published: true
    },
    {
      id: 'faq-3',
      question: 'May warranty po ba ang PCB o motherboard ng inverter unit?',
      answer: 'Opo! Nagbibigay ang Jeff HVAC ng 1 hanggang 3 Taong Warranty sa PCB o board ng unit para sa mga piling authorized brands, bukod pa sa 1 Taong labor warranty at hanggang 10 taong compressor warranty.',
      category: 'Warranty & Sales',
      is_published: true
    },
    {
      id: 'faq-4',
      question: 'Ano ang gagawin kapag kailangan ng Unit Pull Out ng AC o Ref?',
      answer: 'Madali lang po! I-fill out ang aming booking form kasama ang brand ng inyong unit, ilang years na ito ginagamit, at mag-attach ng picture ng unit. Susuriin ito ng aming dispatch bago ang maingat na pull-out para sa workshop overhaul.',
      category: 'Services',
      is_published: true
    }
  ],
  inquiries: [
    {
      id: 'inq-1',
      full_name: 'Elena Dela Cruz',
      email: 'elena.delacruz@example.com',
      phone: '0917 889 1234',
      address: 'Brgy. Carmen, Rosales, Pangasinan',
      landmark: 'Near Carmen Elementary School, green gate',
      preferred_date: '2026-11-06',
      preferred_time: '8:00 AM - 10:00 AM',
      service_requested: 'Brand-New AC Units & Expert Installation',
      has_ocular_visit: true,
      unit_status: 'Wala pa (Bibili pa sa Jeff HVAC)',
      unit_brand: 'Daikin',
      unit_years: '',
      unit_image: '',
      message: 'Need 1.5HP Inverter Split Type for master bedroom. Requesting ocular visit first to measure piping.',
      status: 'new',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
      id: 'inq-2',
      full_name: 'Mark Anthony Bautista',
      email: 'mark.bautista@example.com',
      phone: '0928 456 7890',
      address: 'Poblacion, Urdaneta City, Pangasinan',
      landmark: 'Beside Shell Station, 2nd Floor Commercial Bldg',
      preferred_date: '2026-11-07',
      preferred_time: '1:00 PM - 3:00 PM',
      service_requested: 'Unit Pull Out of AC or Ref',
      has_ocular_visit: false,
      unit_status: 'May unit na',
      unit_brand: 'Fujidenzo',
      unit_years: '3 - 5 Years',
      unit_image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80',
      message: 'Two-door inverter refrigerator not cooling properly, compressor clicks and stops. Need pull out and repair.',
      status: 'contacted',
      created_at: new Date(Date.now() - 3600000 * 18).toISOString()
    }
  ]
};

function getLocal(key, fallback) {
  try {
    const item = localStorage.getItem(`jeff_hvac_v3_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal(key, value) {
  try {
    localStorage.setItem(`jeff_hvac_v3_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('Local storage error', e);
  }
}

export const INITIAL_SERVICES = INITIAL_DATA.services;
export const INITIAL_SETTINGS = INITIAL_DATA.settings;
export const INITIAL_PROJECTS = INITIAL_DATA.projects;
export const INITIAL_TESTIMONIALS = INITIAL_DATA.testimonials;
export const INITIAL_BLOGS = INITIAL_DATA.blog_posts;
export const INITIAL_FAQS = INITIAL_DATA.faqs;

// Unified Data API (works seamlessly with Supabase OR offline local fallback)
export const api = {
  // SERVICES
  async getServices() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage', err);
      }
    }
    return getLocal('services', INITIAL_DATA.services).filter(s => s.is_published);
  },

  async getAllServicesAdmin() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local storage', err);
      }
    }
    return getLocal('services', INITIAL_DATA.services);
  },

  async saveService(service) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('services').upsert(service).select();
        if (!error) return data;
      } catch (err) {
        console.warn('Supabase upsert failed', err);
      }
    }
    const current = getLocal('services', INITIAL_DATA.services);
    let updated;
    if (service.id) {
      updated = current.map(s => s.id === service.id ? { ...s, ...service } : s);
    } else {
      updated = [...current, { ...service, id: `srv-${Date.now()}` }];
    }
    setLocal('services', updated);
    return updated;
  },

  async deleteService(id) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('services').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete failed', err);
      }
    }
    const current = getLocal('services', INITIAL_DATA.services).filter(s => s.id !== id);
    setLocal('services', current);
    return true;
  },

  // PROJECTS
  async getProjects() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true });
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase projects fetch failed', err);
      }
    }
    return getLocal('projects', INITIAL_DATA.projects).filter(p => p.is_published);
  },

  async getAllProjectsAdmin() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase projects fetch failed', err);
      }
    }
    return getLocal('projects', INITIAL_DATA.projects);
  },

  async saveProject(project) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('projects').upsert(project).select();
        if (!error) return data;
      } catch (err) {
        console.warn('Supabase project upsert failed', err);
      }
    }
    const current = getLocal('projects', INITIAL_DATA.projects);
    let updated;
    if (project.id) {
      updated = current.map(p => p.id === project.id ? { ...p, ...project } : p);
    } else {
      updated = [...current, { ...project, id: `prj-${Date.now()}` }];
    }
    setLocal('projects', updated);
    return updated;
  },

  async deleteProject(id) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete failed', err);
      }
    }
    const current = getLocal('projects', INITIAL_DATA.projects).filter(p => p.id !== id);
    setLocal('projects', current);
    return true;
  },

  // TESTIMONIALS
  async getTestimonials() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .eq('is_published', true);
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase testimonials error', err);
      }
    }
    return getLocal('testimonials', INITIAL_DATA.testimonials).filter(t => t.is_published);
  },

  async getAllTestimonialsAdmin() {
    return getLocal('testimonials', INITIAL_DATA.testimonials);
  },

  async saveTestimonial(testimonial) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('testimonials').upsert(testimonial).select();
        if (!error && data) {
          // Keep local sync
        }
      } catch (err) {
        console.warn('Supabase testimonial upsert failed', err);
      }
    }
    const current = getLocal('testimonials', INITIAL_DATA.testimonials);
    let updated;
    if (testimonial.id) {
      updated = current.map(t => t.id === testimonial.id ? { ...t, ...testimonial } : t);
    } else {
      updated = [...current, { ...testimonial, id: `test-${Date.now()}` }];
    }
    setLocal('testimonials', updated);
    return updated;
  },

  async deleteTestimonial(id) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('testimonials').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase testimonial delete error', err);
      }
    }
    const current = getLocal('testimonials', INITIAL_DATA.testimonials).filter(t => t.id !== id);
    setLocal('testimonials', current);
    return true;
  },

  // BLOGS
  async getBlogs() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true);
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase blogs error', err);
      }
    }
    return getLocal('blog_posts', INITIAL_DATA.blog_posts).filter(b => b.is_published);
  },

  async getAllBlogsAdmin() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase admin blogs error', err);
      }
    }
    return getLocal('blog_posts', INITIAL_DATA.blog_posts);
  },

  async saveBlog(blog) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('blog_posts').upsert(blog);
      } catch (err) {
        console.warn('Supabase blog save error', err);
      }
    }
    const current = getLocal('blog_posts', INITIAL_DATA.blog_posts);
    let updated;
    if (blog.id) {
      updated = current.map(b => b.id === blog.id ? { ...b, ...blog } : b);
    } else {
      updated = [...current, { ...blog, id: `blg-${Date.now()}` }];
    }
    setLocal('blog_posts', updated);
    return updated;
  },

  async deleteBlog(id) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('blog_posts').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase blog delete error', err);
      }
    }
    const current = getLocal('blog_posts', INITIAL_DATA.blog_posts).filter(b => b.id !== id);
    setLocal('blog_posts', current);
    return true;
  },

  // FAQS
  async getFaqs() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('faqs').select('*').eq('is_published', true);
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase faqs error', err);
      }
    }
    return getLocal('faqs', INITIAL_DATA.faqs).filter(f => f.is_published);
  },

  async getAllFaqsAdmin() {
    return getLocal('faqs', INITIAL_DATA.faqs);
  },

  async saveFaq(faq) {
    const current = getLocal('faqs', INITIAL_DATA.faqs);
    let updated;
    if (faq.id) {
      updated = current.map(f => f.id === faq.id ? { ...f, ...faq } : f);
    } else {
      updated = [...current, { ...faq, id: `faq-${Date.now()}` }];
    }
    setLocal('faqs', updated);
    return updated;
  },

  async deleteFaq(id) {
    const current = getLocal('faqs', INITIAL_DATA.faqs).filter(f => f.id !== id);
    setLocal('faqs', current);
    return true;
  },

  // CONTACT INQUIRIES
  async submitInquiry(inquiry) {
    const payload = {
      ...inquiry,
      status: 'new',
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('contact_inquiries').insert([payload]);
        if (!error) return { success: true, data };
      } catch (err) {
        console.warn('Supabase insert inquiry failed', err);
      }
    }

    const current = getLocal('inquiries', INITIAL_DATA.inquiries);
    const updated = [{ ...payload, id: `inq-${Date.now()}` }, ...current];
    setLocal('inquiries', updated);
    return { success: true, data: payload };
  },

  async getInquiries() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('contact_inquiries')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase inquiries fetch error', err);
      }
    }
    return getLocal('inquiries', INITIAL_DATA.inquiries);
  },

  async updateInquiryStatus(id, status) {
    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('contact_inquiries')
          .update({ status })
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase update inquiry error', err);
      }
    }
    const current = getLocal('inquiries', INITIAL_DATA.inquiries);
    const updated = current.map(i => i.id === id ? { ...i, status } : i);
    setLocal('inquiries', updated);
    return true;
  },

  async deleteInquiry(id) {
    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('contact_inquiries')
          .delete()
          .eq('id', id);
      } catch (err) {
        console.warn('Supabase delete inquiry error', err);
      }
    }
    const current = getLocal('inquiries', INITIAL_DATA.inquiries).filter(i => i.id !== id);
    setLocal('inquiries', current);
    return true;
  },

  // SETTINGS
  async getSettings() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 'main')
          .single();
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase settings fetch error', err);
      }
    }
    return getLocal('settings', INITIAL_DATA.settings);
  },

  async saveSettings(settings) {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('site_settings').upsert({ ...settings, id: 'main' });
      } catch (err) {
        console.warn('Supabase settings update error', err);
      }
    }
    setLocal('settings', settings);
    return settings;
  }
};
