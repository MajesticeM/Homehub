export const PROPERTIES = [
  // 1. TEMBISA - Clayville East Family Home
  {
    id: 'p1',
    title: 'Modern 3-Bedroom Freestanding Family Home',
    type: 'House',
    category: 'house',
    mode: 'rent',
    price: 980000,
    priceMonthly: 7800,
    deposit: 7800,
    location: 'Tembisa, Gauteng',
    address: '24 Milkwood Crescent, Clayville East, Tembisa, 1666',
    neighborhood: 'Clayville East',
    coordinates: { lat: -25.9815, lng: 28.2321 },
    distanceKm: 1.2,
    beds: 3,
    baths: 2,
    sqft: 220,
    yearBuilt: 2021,
    garage: 2,
    parking: 2,
    availableFrom: 'Immediately',
    prepaidElectricity: true,
    petFriendly: true,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: true,
    verified: true,
    proximity: {
      mall: 'Clayville Shopping Centre (1.1 km) & Tembisa Mall (4.2 km)',
      taxiRank: 'Clayville Taxi Rank (3 mins walk) & Midrand links',
      hospital: 'Clayville Clinic (900m) & Tembisa Hospital (10 mins)',
      workOrSchool: 'Midrand Corporate Parks via Olifantsfontein Rd (12 mins)'
    },
    landmarks: [
      'Clayville Shopping Centre (1.1 km)',
      'Phomolong / Midrand Taxi Rank (3 mins)',
      'Midrand Corporate Parks via Olifantsfontein Rd (12 mins)',
      'Tembisa Mall (4.2 km)'
    ],
    amenities: [
      'Fully Paved Yard & Automated Double Gate',
      'Modern Fitted Kitchen with Granite Tops',
      'Master Bedroom with En-Suite Bath',
      'Solar Geyser Installed (Saves Electricity)',
      'Separate Prepaid Electricity Meter'
    ],
    description:
      'Stunning modern 3-bedroom family home in Clayville East, Tembisa. Quick commute to Midrand commercial parks, Olifantsfontein industrial zone, and retail centres. Features a spacious open-plan lounge, ultra-modern kitchen, and secure lock-up double carport.',
    agent: {
      name: 'Kagiso Mthethwa',
      agency: 'Real Estate Services (Tembisa & Clayville)',
      agencyOrigin: 'Based at Clayville Shopping Centre, Tembisa',
      agencyHighlight: '7+ years local track record with 250+ verified rentals in Tembisa and Clayville',
      role: 'Clayville Area Property Manager',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      phone: '+27 82 459 1082',
      whatsapp: '+27824591082',
      email: 'kagiso.m@propertyhub.co.za',
      rating: 4.95,
      reviewsCount: 42,
      responseTime: 'Replies in < 15 mins',
      bio: 'Senior property consultant for Clayville and Olifantsfontein. Meets tenants on-site for immediate viewings.',
      reviews: [
        {
          id: 'r-k1',
          author: 'Kabelo Molefe',
          rating: 5,
          date: '1 week ago',
          comment: 'Kagiso was honest and transparent. Clayville East home was exactly as shown in photos.'
        },
        {
          id: 'r-k2',
          author: 'Zandile Khanyile',
          rating: 4.9,
          date: '3 weeks ago',
          comment: 'Very professional agent. Handled lease agreement quickly and gave keys on the 1st without hassle.'
        }
      ]
    },
    hoa: 0,
    propertyTaxRate: 1.1
  },

  // 2. TEMBISA - Neat En-Suite Bachelor Room
  {
    id: 'p2',
    title: 'Neat En-Suite Bachelor Room with Prepaid Meter',
    type: 'Room to Rent',
    category: 'room',
    mode: 'rent',
    price: 180000,
    priceMonthly: 2200,
    deposit: 2200,
    location: 'Tembisa, Gauteng',
    address: 'Block 4, Winnie Mandela Park, Tembisa, 1632',
    neighborhood: 'Winnie Mandela',
    coordinates: { lat: -25.9928, lng: 28.2145 },
    distanceKm: 0.8,
    beds: 1,
    baths: 1,
    sqft: 35,
    yearBuilt: 2022,
    garage: 1,
    parking: 1,
    availableFrom: 'Immediately',
    prepaidElectricity: true,
    petFriendly: false,
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: false,
    verified: true,
    proximity: {
      mall: 'Tembisa Plaza (1.8 km) & Tembisa Mall (3.5 km)',
      taxiRank: 'Phomolong Taxi Rank & Winnie Mandela Rank (5 mins walk)',
      hospital: 'Tembisa Tertiary Hospital (3.1 km)',
      workOrSchool: 'Midrand Gautrain Link via taxi (15 mins)'
    },
    landmarks: [
      'Phomolong Taxi Rank (5 mins walk)',
      'Tembisa Tertiary Hospital (3.1 km)',
      'Midrand Gautrain Link (15 mins)',
      'Tembisa Mall (3.5 km)'
    ],
    amenities: [
      'Private Inside Bathroom (Hot Shower, Toilet & Basin)',
      'Own Prepaid Electricity Meter',
      'Glossy Tiles & PVC Ceiling',
      'High Perimeter Wall & Locked Gate at Night',
      'Quiet Yard with Paved Parking'
    ],
    description:
      'Immaculate en-suite bachelor room in Winnie Mandela, Tembisa. Equipped with private hot shower and toilet inside, tiled floor, burglar bars, and parking space. Peaceful and well-managed yard near local shopping complexes, taxi ranks, and transit routes into Midrand.',
    agent: {
      name: 'Nokuthula Dladla',
      agency: 'Real Estate Services (Tembisa & Clayville)',
      agencyOrigin: 'Based at Clayville Shopping Centre, Tembisa',
      agencyHighlight: '7+ years local track record with 250+ verified rentals in Tembisa and Clayville',
      role: 'Dedicated Rental Host & Specialist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      phone: '+27 73 891 4420',
      whatsapp: '+27738914420',
      email: 'nokuthula@tembisarentals.co.za',
      rating: 4.92,
      reviewsCount: 38,
      responseTime: 'Replies in < 10 mins',
      bio: 'Local Tembisa leasing host with 6+ years experience. Specializes in Winnie Mandela and Phomolong bachelor rooms.',
      reviews: [
        {
          id: 'r-n1',
          author: 'Nomsa Sithole',
          rating: 5,
          date: '2 days ago',
          comment: 'Nokuthula was super helpful! I called on Monday, viewed the room same day, and moved in Wednesday. Hot shower works great.'
        },
        {
          id: 'r-n2',
          author: 'Siphamandla Dube',
          rating: 4.9,
          date: '2 weeks ago',
          comment: 'Safe yard with locking gates. Nokuthula tested prepaid electricity before handing over keys.'
        }
      ]
    },
    hoa: 0,
    propertyTaxRate: 1.0
  },

  // 3. MIDRAND - Luxury Waterfall City Apartment (Near PwC Tower & Mall of Africa)
  {
    id: 'p3',
    title: 'Luxury 2-Bed Polofields Waterfall Apartment near PwC Tower',
    type: 'Apartment',
    category: 'apartment',
    mode: 'rent',
    price: 2150000,
    priceMonthly: 14500,
    deposit: 14500,
    location: 'Midrand, Gauteng',
    address: 'Polofields Drive, Waterfall City, Midrand, 1685',
    neighborhood: 'Waterfall City',
    coordinates: { lat: -26.0125, lng: 28.1182 },
    distanceKm: 0.9,
    beds: 2,
    baths: 2,
    sqft: 118,
    yearBuilt: 2022,
    garage: 2,
    parking: 2,
    availableFrom: 'Immediately',
    prepaidElectricity: false,
    petFriendly: true,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: true,
    verified: true,
    proximity: {
      mall: 'Mall of Africa (1.2 km / 3 mins)',
      taxiRank: 'Midrand Gautrain Station (6 mins) & Waterfall Shuttle',
      hospital: 'Netcare Waterfall City Hospital (1.8 km)',
      workOrSchool: 'PwC Tower (0.9 km / 4 mins) & Deloitte Campus (1.5 km)'
    },
    landmarks: [
      'PwC Tower Waterfall (4 mins / 0.9 km)',
      'Mall of Africa (1.2 km)',
      'Deloitte Waterfall Campus (1.5 km)',
      'Netcare Waterfall City Hospital (1.8 km)',
      'Gautrain Midrand Station (6 mins drive)'
    ],
    amenities: [
      'Walk to PwC Tower & Mall of Africa',
      'Signature Lifestyle Centre (Gym, Pool, Spa, Squash)',
      'Integrated SMEG Kitchen Appliances (Fridge, Washer, Dishwasher)',
      '24/7 Biometric Guarded Security',
      'Covered Patio with Gas Braai'
    ],
    description:
      'High-end 2-bedroom, 2-bathroom ground floor apartment in Waterfall City, Midrand. Located less than 4 minutes from PwC Tower, Mall of Africa, and the Deloitte campus. Ideal for corporate professionals relocating to Midrand.',
    agent: {
      name: 'Thabo Mokoena',
      agency: 'Waterfall & Midrand Elite Realty',
      agencyOrigin: 'Based at Waterfall Circle, Waterfall City, Midrand',
      agencyHighlight: 'Specializing in corporate relocations and secure lifestyle apartments near PwC & Mall of Africa',
      role: 'Corporate Relocation & Leasing Agent',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      phone: '+27 84 312 9980',
      whatsapp: '+27843129980',
      email: 'thabo@midrandproperties.co.za',
      rating: 4.98,
      reviewsCount: 76,
      responseTime: 'Replies in < 15 mins',
      bio: 'Waterfall City specialist handling executive apartments and corporate leases. 8+ years experience.',
      reviews: [
        {
          id: 'r-t1',
          author: 'Lindiwe Dlamini',
          rating: 5,
          date: '3 days ago',
          comment: 'Thabo provided exceptional service. Handled the lease seamlessly for my corporate relocation.'
        }
      ]
    },
    hoa: 1450,
    propertyTaxRate: 1.2
  },

  // 4. MIDRAND - Carlswald 1-Bedroom Loft / Apartment
  {
    id: 'p4',
    title: 'Modern Executive 1-Bedroom Loft in Carlswald near PwC & N1',
    type: 'Apartment',
    category: 'apartment',
    mode: 'rent',
    price: 890000,
    priceMonthly: 7500,
    deposit: 7500,
    location: 'Midrand, Gauteng',
    address: '82 Tamboti Road, Carlswald, Midrand, 1684',
    neighborhood: 'Carlswald',
    coordinates: { lat: -25.9842, lng: 28.1245 },
    distanceKm: 1.5,
    beds: 1,
    baths: 1,
    sqft: 68,
    yearBuilt: 2020,
    garage: 1,
    parking: 1,
    availableFrom: 'Immediately',
    prepaidElectricity: true,
    petFriendly: false,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: true,
    verified: true,
    proximity: {
      mall: 'Carlswald Lifestyle Shopping Centre (2 mins walk) & San Ridge Square',
      taxiRank: 'New Road Minibus Route (2 mins) & Gautrain Bus Stop',
      hospital: 'Mediclinic Midrand (3.2 km)',
      workOrSchool: 'PwC Tower / Waterfall City (6 mins) & Vodacom HQ (4 km)'
    },
    landmarks: [
      'PwC Tower / Waterfall City (6 mins / 3.8 km)',
      'Carlswald Lifestyle Shopping Centre (2 mins walk)',
      'Vodacom Corporate Park (4.2 km)',
      'N1 Allandale Offramp (5 mins)'
    ],
    amenities: [
      'Clubhouse & Swimming Pool',
      'Covered Parking & 24hr Guardhouse',
      'High-Speed Fibre Optic Internet',
      'Private Balcony with Sunset Views',
      'Walk to Carlswald Lifestyle Shopping Centre'
    ],
    description:
      'Chic executive 1-bedroom loft apartment in Carlswald, Midrand. Convenient 6-minute drive to PwC Tower in Waterfall City, Mall of Africa, and Vodacom HQ. Features an open-plan granite kitchen, high ceiling lounge flowing onto a scenic balcony, and top-tier security.',
    agent: {
      name: 'Lerato Sithole',
      agency: 'Carlswald Living Rentals',
      agencyOrigin: 'Based at Carlswald Lifestyle Centre, Midrand',
      agencyHighlight: 'Executive lofts, garden cottages and family houses in Carlswald, Noordwyk & Crowthorne',
      role: 'Carlswald Area Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      phone: '+27 71 654 2210',
      whatsapp: '+27716542210',
      email: 'lerato@carlswaldliving.co.za',
      rating: 4.88,
      reviewsCount: 29,
      responseTime: 'Replies in < 10 mins',
      bio: 'Manages top-tier rental units across Carlswald and Halfway Gardens.',
      reviews: [
        {
          id: 'r-l1',
          author: 'Tshepo Ndlovu',
          rating: 5,
          date: '4 days ago',
          comment: 'Lerato showed me the loft within 2 hours of sending a WhatsApp. Complex pool and security are top notch.'
        }
      ]
    },
    hoa: 820,
    propertyTaxRate: 1.1
  },

  // 5. TEMBISA - Phomolong Private Backroom / Bachelor
  {
    id: 'p5',
    title: 'Spacious Bachelor Flat with Fitted Kitchenette in Phomolong',
    type: 'Room to Rent',
    category: 'room',
    mode: 'rent',
    price: 220000,
    priceMonthly: 2800,
    deposit: 1500,
    location: 'Tembisa, Gauteng',
    address: '15 Mvelase Street, Phomolong, Tembisa, 1632',
    neighborhood: 'Phomolong',
    coordinates: { lat: -26.0084, lng: 28.2198 },
    distanceKm: 0.5,
    beds: 1,
    baths: 1,
    sqft: 42,
    yearBuilt: 2023,
    garage: 1,
    parking: 1,
    availableFrom: 'Immediately',
    prepaidElectricity: true,
    petFriendly: false,
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    virtualTour: false,
    verified: true,
    proximity: {
      mall: 'Tembisa Mall (3.5 km) & Phomolong Centre',
      taxiRank: 'Phomolong Metrorail Station & Taxi Rank (350m / 4 mins walk)',
      hospital: 'Tembisa Tertiary Hospital (2.8 km)',
      workOrSchool: 'Midrand Industrial Corridors (15 mins taxi)'
    },
    landmarks: [
      'Phomolong Metrorail Station (350m)',
      'Tembisa Mall (3.5 km)',
      'Midrand Industrial Corridors (15 mins)'
    ],
    amenities: [
      'Fitted Kitchen Sink & Lower Cupboards',
      'En-Suite Bathroom with Hot Shower',
      'Full Porcelain Tiles',
      'Secure High Gates & Night Floodlights',
      'Prepaid Meter'
    ],
    description:
      'Newly built self-contained bachelor flat in Phomolong, Tembisa. Features modern ceiling design, shiny porcelain tiles, fitted kitchen cupboards, and own clean bathroom. Located in a quiet yard just 2 minutes from transport routes into Midrand and Kempton Park.',
    agent: {
      name: 'Vusi Ndaba',
      agency: 'Kasi Living Rooms & Flats',
      agencyOrigin: 'Based in Phomolong, Tembisa',
      agencyHighlight: 'Affordable verified bachelor rooms with private hot showers and prepaid meters across Tembisa',
      role: 'Phomolong Leasing Coordinator',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
      phone: '+27 83 229 8812',
      whatsapp: '+27832298812',
      email: 'vusi@tembisafurnished.co.za',
      rating: 4.96,
      reviewsCount: 51,
      responseTime: 'Replies in < 5 mins',
      bio: 'Manages over 40 vetted bachelor units across Phomolong and Hospital View.',
      reviews: [
        {
          id: 'r-v1',
          author: 'Refilwe Moloi',
          rating: 5,
          date: '2 weeks ago',
          comment: 'Mr Vusi is very polite and always reachable on WhatsApp. Best room in Phomolong.'
        }
      ]
    },
    hoa: 0,
    propertyTaxRate: 1.0
  },

  // 6. MIDRAND - Vorna Valley Room to Rent (Minutes to PwC Tower & Mall of Africa)
  {
    id: 'p6',
    title: 'Furnished Private Room in Vorna Valley — 5 Mins to PwC & Mall of Africa',
    type: 'Room to Rent',
    category: 'room',
    mode: 'rent',
    price: 350000,
    priceMonthly: 3800,
    deposit: 2000,
    location: 'Midrand, Gauteng',
    address: 'Berger Road, Vorna Valley, Midrand, 1686',
    neighborhood: 'Vorna Valley',
    coordinates: { lat: -26.0021, lng: 28.1287 },
    distanceKm: 1.1,
    beds: 1,
    baths: 1,
    sqft: 40,
    yearBuilt: 2019,
    garage: 1,
    parking: 1,
    availableFrom: 'Immediately',
    prepaidElectricity: false,
    petFriendly: false,
    images: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    virtualTour: false,
    verified: true,
    proximity: {
      mall: 'Mall of Africa (1.1 km / 3 mins) & Vorna Valley Spar',
      taxiRank: 'Midrand Gautrain Station (5 mins) & Allandale Taxi Route',
      hospital: 'Netcare Waterfall City Hospital (2.0 km)',
      workOrSchool: 'PwC Tower Waterfall (1.8 km / 4 mins) & Deloitte (2.0 km)'
    },
    landmarks: [
      'PwC Tower Waterfall (4 mins / 1.8 km)',
      'Mall of Africa (1.1 km)',
      'Deloitte Waterfall (2.0 km)',
      'Vodacom Corporate Park (2.4 km)',
      'Midrand Gautrain Station (5 mins)'
    ],
    amenities: [
      'Walk to Mall of Africa & PwC Precinct',
      'Includes Water & Uncapped Fibre WiFi',
      'Shared Fully Equipped Modern Kitchen',
      'Swimming Pool in Complex',
      'Covered Parking Bay'
    ],
    description:
      'Bright, secure furnished room in a gated Vorna Valley townhouse, Midrand. Highly popular with corporate interns and professionals relocating to work at PwC Tower, Deloitte, or Vodacom. Rent includes fast unlimited Wi-Fi, water, covered parking, and communal pool.',
    agent: {
      name: 'Sipho Khumalo',
      agency: 'Waterfall & Midrand Elite Realty',
      agencyOrigin: 'Based at Waterfall Circle, Waterfall City, Midrand',
      agencyHighlight: 'Specializing in corporate relocations and secure lifestyle apartments near PwC & Mall of Africa',
      role: 'Vorna Valley Property Manager',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=80',
      phone: '+27 82 990 1234',
      whatsapp: '+27829901234',
      email: 'sipho@midrandrooms.co.za',
      rating: 4.9,
      reviewsCount: 19,
      responseTime: 'Replies in < 10 mins',
      bio: 'Vorna Valley resident managing townhouse rooms and shared apartments.',
      reviews: [
        {
          id: 'r-s1',
          author: 'Dikeledi Radebe',
          rating: 5,
          date: '1 month ago',
          comment: 'Sipho was very accommodating with move-in times and showed me the swimming pool and wifi setup.'
        }
      ]
    },
    hoa: 0,
    propertyTaxRate: 1.0
  },

  // 7. MIDRAND - Noordwyk 3-Bedroom Freehold Home
  {
    id: 'p7',
    title: 'Charming 3-Bedroom Standalone House with Private Garden in Noordwyk',
    type: 'House',
    category: 'house',
    mode: 'rent',
    price: 1650000,
    priceMonthly: 12500,
    deposit: 12500,
    location: 'Midrand, Gauteng',
    address: 'Lever Road, Noordwyk, Midrand, 1687',
    neighborhood: 'Noordwyk',
    coordinates: { lat: -25.9684, lng: 28.1342 },
    distanceKm: 2.4,
    beds: 3,
    baths: 2,
    sqft: 185,
    yearBuilt: 2018,
    garage: 2,
    parking: 2,
    availableFrom: '1st Next Month',
    prepaidElectricity: true,
    petFriendly: true,
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: true,
    verified: true,
    proximity: {
      mall: 'San Ridge Square (1.5 km) & Carlswald Shopping (1.8 km)',
      taxiRank: 'Lever Road Taxi Route (1 min) & Gautrain Midrand Station (4.8 km)',
      hospital: 'Midrand Medical Centre (2.5 km)',
      workOrSchool: 'Vodacom Corporate Park (3.5 km) & PwC Tower (7 mins)'
    },
    landmarks: [
      'Vodacom Corporate Park (3.5 km)',
      'PwC Tower Waterfall (7 mins / 5.2 km)',
      'Gautrain Midrand Station (4.8 km)',
      'San Ridge Square & Carlswald Shopping (1.5 km)'
    ],
    amenities: [
      'Lush Pet-Friendly Private Lawn',
      'Double Automated Lock-Up Garage',
      'Solar Backup Inverter System',
      'Built-in Braai Entertainment Area',
      'Close to Midrand Primary & High Schools'
    ],
    description:
      'Beautiful freestanding 3-bedroom family house in Noordwyk, Midrand. Easy 7-minute commute to PwC Tower, Vodacom Campus, and Gautrain Midrand Station. Boasts a modern open kitchen with scullery, master bedroom with en-suite bath, sunny private garden, and a hybrid solar inverter.',
    agent: {
      name: 'Ayanda Zwane',
      agency: 'Carlswald Living Rentals',
      agencyOrigin: 'Based at Carlswald Lifestyle Centre, Midrand',
      agencyHighlight: 'Executive lofts, garden cottages and family houses in Carlswald, Noordwyk & Crowthorne',
      role: 'Family Home & Lease Consultant',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      phone: '+27 76 102 3344',
      whatsapp: '+27761023344',
      email: 'ayanda@noordwykhomes.co.za',
      rating: 4.97,
      reviewsCount: 64,
      responseTime: 'Replies in < 15 mins',
      bio: 'Specialist in freestanding houses in Noordwyk and Sagewood.',
      reviews: [
        {
          id: 'r-a1',
          author: 'Palesa Masango',
          rating: 5,
          date: '1 week ago',
          comment: 'Ayanda helped our family secure this home in Noordwyk. The pet-friendly garden and inverter are fantastic.'
        }
      ]
    },
    hoa: 350,
    propertyTaxRate: 1.1
  },

  // 8. TEMBISA - Birch Acres / Tembisa 2-Bed Garden House
  {
    id: 'p8',
    title: 'Spacious 2-Bedroom Cottage with Carport in Birch Acres Border',
    type: 'House',
    category: 'house',
    mode: 'rent',
    price: 650000,
    priceMonthly: 3950,
    deposit: 3950,
    location: 'Tembisa, Gauteng',
    address: '88 Kwartel Road, Birch Acres Border, Tembisa, 1630',
    neighborhood: 'Birch Acres',
    coordinates: { lat: -26.0215, lng: 28.2045 },
    distanceKm: 1.9,
    beds: 2,
    baths: 1,
    sqft: 65,
    yearBuilt: 2020,
    garage: 1,
    parking: 1,
    availableFrom: 'Immediately',
    prepaidElectricity: true,
    petFriendly: false,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: false,
    verified: true,
    proximity: {
      mall: 'Birch Acres Mall (1.4 km) & Tembisa Mall (3.8 km)',
      taxiRank: 'Birch Acres Taxi Rank (4 mins walk)',
      hospital: 'Kempton Park Hospital (12 mins)',
      workOrSchool: 'OR Tambo Airport & Allandale Corridors (14 mins)'
    },
    landmarks: [
      'Birch Acres Mall (1.4 km)',
      'OR Tambo International Airport (14 mins)',
      'Midrand Business Hub via Allandale (15 mins)'
    ],
    amenities: [
      'Own Private Entrance & Covered Carport',
      'Fitted Cupboards in Both Bedrooms',
      'Prepaid Electricity Meter',
      'Electric Perimeter Fence',
      'Close to Birch Acres Mall'
    ],
    description:
      'Neat and private 2-bedroom garden cottage on a secure residential property. Offers tiled floors, built-in kitchen sink, full bathroom with bathtub, and private carport parking.',
    agent: {
      name: 'Kagiso Mthethwa',
      agency: 'Real Estate Services (Tembisa & Clayville)',
      agencyOrigin: 'Based at Clayville Shopping Centre, Tembisa',
      agencyHighlight: '7+ years local track record with 250+ verified rentals in Tembisa and Clayville',
      role: 'Senior Rental Agent',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      phone: '+27 82 459 1082',
      whatsapp: '+27824591082',
      email: 'kagiso.m@propertyhub.co.za',
      rating: 4.95,
      reviewsCount: 42,
      responseTime: 'Replies in < 15 mins',
      bio: 'Senior rental agent for Tembisa and Birch Acres border. 7+ years assisting tenants.',
      reviews: [
        {
          id: 'r-k3',
          author: 'Sipho Cele',
          rating: 5,
          date: '5 days ago',
          comment: 'Very straightforward rental process. Handed over remote and keys promptly.'
        }
      ]
    },
    hoa: 0,
    propertyTaxRate: 1.1
  },

  // 9. TEMBISA - Hospital View Budget Room
  {
    id: 'p9',
    title: 'Clean Budget Bachelor Room near Tembisa Hospital',
    type: 'Room to Rent',
    category: 'room',
    mode: 'rent',
    price: 190000,
    priceMonthly: 1900,
    deposit: 1000,
    location: 'Tembisa, Gauteng',
    address: '42 Ndlovu Way, Hospital View, Tembisa, 1632',
    neighborhood: 'Hospital View',
    coordinates: { lat: -25.9982, lng: 28.225 },
    distanceKm: 0.9,
    beds: 1,
    baths: 1,
    sqft: 28,
    yearBuilt: 2022,
    garage: 0,
    parking: 1,
    availableFrom: 'Immediately',
    prepaidElectricity: true,
    petFriendly: false,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    virtualTour: false,
    verified: true,
    proximity: {
      mall: 'Tembisa Plaza (2.0 km) & Phomolong Centre',
      taxiRank: 'Andrew Mapheto Taxi Route (2 mins walk)',
      hospital: 'Tembisa Tertiary Hospital (8 mins walk / 600m)',
      workOrSchool: 'Phomolong Metrorail & Kempton Park links'
    },
    landmarks: [
      'Tembisa Tertiary Hospital (8 mins walk)',
      'Andrew Mapheto Drive Taxis (2 mins)',
      'Tembisa Plaza (2.0 km)'
    ],
    amenities: [
      'Private Shower & Toilet En-Suite',
      'Prepaid Meter Installed',
      'Tiled Floor & Burglar Gates',
      'Safe Yard with Night Floodlights'
    ],
    description:
      'Affordable bachelor room in Hospital View, ideal for hospital staff or commuters. Clean, secure, private en-suite bathroom, and ready for immediate occupation.',
    agent: {
      name: 'Vusi Ndaba',
      agency: 'Kasi Living Rooms & Flats',
      agencyOrigin: 'Based in Phomolong, Tembisa',
      agencyHighlight: 'Affordable verified bachelor rooms with private hot showers and prepaid meters across Tembisa',
      role: 'Phomolong Leasing Coordinator',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
      phone: '+27 83 229 8812',
      whatsapp: '+27832298812',
      email: 'vusi@tembisafurnished.co.za',
      rating: 4.96,
      reviewsCount: 51,
      responseTime: 'Replies in < 5 mins',
      bio: 'Manages over 40 vetted bachelor units across Phomolong and Hospital View.',
      reviews: [
        {
          id: 'r-v2',
          author: 'Siphamandla Dube',
          rating: 5,
          date: '1 week ago',
          comment: 'Very quiet and secure yard. Vusi was quick with WhatsApp replies.'
        }
      ]
    },
  },

  // 10. TEMBISA - Clayville East 2-Bedroom Security Apartment
  {
    id: 'p10',
    title: 'Modern 2-Bedroom Security Complex Apartment in Clayville East',
    type: 'Apartment',
    category: 'apartment',
    mode: 'rent',
    price: 680000,
    priceMonthly: 4100,
    deposit: 4100,
    location: 'Tembisa, Gauteng',
    address: '12 Aloe Ridge Way, Clayville East, Tembisa, 1666',
    neighborhood: 'Clayville East',
    coordinates: { lat: -25.9835, lng: 28.2295 },
    distanceKm: 1.4,
    beds: 2,
    baths: 1,
    sqft: 62,
    yearBuilt: 2022,
    garage: 1,
    parking: 1,
    availableFrom: 'Immediately',
    prepaidElectricity: true,
    petFriendly: true,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: true,
    verified: true,
    proximity: {
      mall: 'Clayville Shopping Centre (800m) & Tembisa Mall (4.0 km)',
      taxiRank: 'Clayville Rank & Midrand Taxi Links (3 mins walk)',
      hospital: 'Clayville Clinic (600m)',
      workOrSchool: 'Midrand Corporate Parks via Olifantsfontein (10 mins)'
    },
    landmarks: [
      'Clayville Shopping Centre (800m)',
      'Olifantsfontein Commercial Park (8 mins)',
      'Midrand Corporate Corridors (10 mins)'
    ],
    amenities: [
      '24/7 Guardhouse & Fingerprint Access',
      'Covered Carport + Ample Visitor Parking',
      'Built-in Bedroom Wardrobes in Both Rooms',
      'Separate Prepaid Electricity & Water Meter',
      'High-Speed Fibre WiFi Ready'
    ],
    description:
      'Immaculate 2-bedroom apartment in a secure, family-friendly estate in Clayville East, Tembisa. Features full bathroom, contemporary fitted kitchen with stove & oven, sunny lounge with sliding door, and 24-hour guarded gate with biometric access.',
    agent: {
      name: 'Kagiso Mthethwa',
      agency: 'Real Estate Services (Tembisa & Clayville)',
      agencyOrigin: 'Based at Clayville Shopping Centre, Tembisa',
      agencyHighlight: '7+ years local track record with 250+ verified rentals in Tembisa and Clayville',
      role: 'Clayville Area Property Manager',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      phone: '+27 82 459 1082',
      whatsapp: '+27824591082',
      email: 'kagiso.m@propertyhub.co.za',
      rating: 4.95,
      reviewsCount: 42,
      responseTime: 'Replies in < 15 mins',
      bio: 'Senior property consultant for Clayville and Olifantsfontein. Meets tenants on-site for immediate viewings.',
      reviews: [
        {
          id: 'r-k4',
          author: 'Mpho Dlamini',
          rating: 5,
          date: '3 days ago',
          comment: 'Very quiet and secure complex. Fibre was already active when I moved in.'
        }
      ]
    },
    hoa: 450,
    propertyTaxRate: 1.1
  },

  // 11. MIDRAND - Carlswald 2-Bedroom Townhouse
  {
    id: 'p11',
    title: 'Modern 2-Bedroom Garden Townhouse near Carlswald & San Ridge',
    type: 'Townhouse',
    category: 'townhouse',
    mode: 'rent',
    price: 1350000,
    priceMonthly: 8900,
    deposit: 8900,
    location: 'Midrand, Gauteng',
    address: '45 Springfield Road, Carlswald, Midrand, 1684',
    neighborhood: 'Carlswald',
    coordinates: { lat: -25.9865, lng: 28.1215 },
    distanceKm: 1.8,
    beds: 2,
    baths: 2,
    sqft: 95,
    yearBuilt: 2021,
    garage: 1,
    parking: 2,
    availableFrom: 'Immediately',
    prepaidElectricity: true,
    petFriendly: true,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    virtualTour: true,
    verified: true,
    proximity: {
      mall: 'Carlswald Lifestyle Shopping (1.2 km) & San Ridge Square',
      taxiRank: 'New Road Minibus Route (2 mins) & Gautrain Bus Stop',
      hospital: 'Mediclinic Midrand (3.0 km)',
      workOrSchool: 'PwC Tower Waterfall (6 mins) & Vodacom Campus (4 km)'
    },
    landmarks: [
      'Carlswald Lifestyle Shopping (1.2 km)',
      'PwC Tower Waterfall (6 mins)',
      'San Ridge Square (1.4 km)'
    ],
    amenities: [
      'Private Pet-Friendly Garden',
      'Swimming Pool & Clubhouse in Complex',
      '2 Full Bathrooms (Main En-Suite)',
      'Covered Carport + Garage',
      '24/7 Security Patrols'
    ],
    description:
      'Spacious 2-bedroom, 2-bathroom duplex townhouse in Carlswald, Midrand. Short 6-minute drive to PwC Tower and Mall of Africa. Features private walled garden, granite kitchen, and pool in complex.',
    agent: {
      name: 'Lerato Sithole',
      agency: 'Carlswald Living Rentals',
      agencyOrigin: 'Based at Carlswald Lifestyle Centre, Midrand',
      agencyHighlight: 'Executive lofts, garden cottages and family houses in Carlswald, Noordwyk & Crowthorne',
      role: 'Carlswald Area Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      phone: '+27 71 654 2210',
      whatsapp: '+27716542210',
      email: 'lerato@carlswaldliving.co.za',
      rating: 4.88,
      reviewsCount: 29,
      responseTime: 'Replies in < 10 mins',
      bio: 'Manages top-tier rental units across Carlswald and Halfway Gardens.',
      reviews: [
        {
          id: 'r-l2',
          author: 'Siphiwe Zulu',
          rating: 5,
          date: '5 days ago',
          comment: 'Outstanding townhouse in Carlswald. Garden is perfect for small pets.'
        }
      ]
    },
    hoa: 980,
    propertyTaxRate: 1.1
  }
];

export const CITIES = [
  'All Areas',
  'Tembisa',
  'Midrand',
  'Clayville',
  'Phomolong',
  'Winnie Mandela',
  'Carlswald',
  'Waterfall City',
  'Vorna Valley',
  'Noordwyk',
  'Birch Acres'
];
