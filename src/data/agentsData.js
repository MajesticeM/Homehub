// Curated Agencies and Real Estate Agents for Rooms & Houses to Rent
// Focused on Tembisa, Midrand, and surrounding Gauteng suburbs

export const INITIAL_AGENTS = [
  {
    id: 'agent-res-tembisa',
    name: 'Real Estate Services (Tembisa & Clayville)',
    shortName: 'Real Estate Services',
    agencyType: 'Full-Service Real Estate Agency',
    tagline: 'Leading rental agency for verified houses & bachelor rooms across Tembisa',
    badge: 'Premier Agency',
    verified: true,
    rating: 4.92,
    reviewsCount: 38,
    responseTime: '< 15 mins',
    ppraNumber: 'PPRA Reg #2024/49102',
    established: '2017',
    primaryArea: 'Tembisa',
    operatingAreas: ['Tembisa', 'Clayville', 'Clayville East', 'Winnie Mandela', 'Birch Acres'],
    logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=256&q=80',
    coverImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
    phone: '+27 82 459 1082',
    whatsapp: '+27824591082',
    email: 'rentals@realestateservices-tembisa.co.za',
    officeAddress: 'Shop 14, Clayville Shopping Centre, Industry Rd, Tembisa',
    description:
      'Real Estate Services is the highest rated rental agency in Tembisa. We specialize in standalone family houses to rent and modern walled bachelor rooms with prepaid meters. All properties are physically inspected and leases are handled with zero hidden fees.',
    reviews: [
      {
        id: 'rev-res-1',
        author: 'Nomsa Sithole',
        rating: 5,
        date: '2 days ago',
        verifiedTenant: true,
        propertyTitle: 'Neat En-Suite Bachelor Room with Prepaid Meter',
        comment:
          'Nokuthula was super helpful! I called on Monday, viewed the bachelor room in Winnie Mandela the same afternoon, and signed the lease on Wednesday. The hot shower and prepaid electricity work perfectly.'
      },
      {
        id: 'rev-res-2',
        author: 'Kabelo Molefe',
        rating: 5,
        date: '1 week ago',
        verifiedTenant: true,
        propertyTitle: 'Modern 3-Bedroom Freestanding Family Home',
        comment:
          'Kagiso was honest and transparent throughout the entire process. No fake photos or double bookings. Clayville East home was exactly as shown.'
      },
      {
        id: 'rev-res-3',
        author: 'Zandile Khanyile',
        rating: 4.8,
        date: '3 weeks ago',
        verifiedTenant: true,
        propertyTitle: 'Spacious 2-Bedroom Cottage with Carport',
        comment:
          'Friendly agency with quick responses on WhatsApp. Helped negotiate the deposit payment in two installments. Very peaceful neighborhood.'
      }
    ],
    properties: [
      {
        id: 'prop-res-1',
        title: 'Neat En-Suite Bachelor Room with Prepaid Meter',
        type: 'Room to Rent',
        category: 'room',
        priceMonthly: 2200,
        deposit: 2200,
        location: 'Tembisa, Gauteng',
        neighborhood: 'Winnie Mandela',
        address: 'Block 4, Winnie Mandela Park, Tembisa, 1632',
        coordinates: { lat: -25.9928, lng: 28.2145 },
        beds: 1,
        baths: 1,
        sqm: 35,
        parking: 1,
        availableFrom: 'Immediately',
        prepaidElectricity: true,
        petFriendly: false,
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
          'Inside Private Bathroom (Hot Shower, Toilet & Basin)',
          'Prepaid Electricity Meter Installed',
          'Tiled Floor & PVC Ceiling',
          'High Perimeter Wall with Lockable Gate',
          'Paved Parking Bay'
        ],
        landmarks: [
          'Phomolong Taxi Rank (5 mins walk)',
          'Tembisa Tertiary Hospital (3.1 km)',
          'Midrand Gautrain Link via taxi (15 mins)'
        ],
        description:
          'Immaculate en-suite bachelor room in Winnie Mandela, Tembisa. Equipped with private hot shower and toilet inside, tiled floor, burglar bars, and parking space. Peaceful and well-managed yard near local shopping complexes, taxi ranks, and transit routes into Midrand.',
        assignedPerson: {
          name: 'Nokuthula Dladla',
          role: 'Rental Specialist & Property Host',
          phone: '+27 73 891 4420',
          whatsapp: '+27738914420',
          email: 'nokuthula@realestateservices-tembisa.co.za',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
          responseTime: 'Replies in < 10 mins',
          bio: 'Local Tembisa leasing host with 6+ years experience. Specializes in Winnie Mandela and Phomolong rentals. Meets tenants on-site for immediate viewings.'
        }
      },
      {
        id: 'prop-res-2',
        title: 'Modern 3-Bedroom Freestanding Family Home to Rent',
        type: 'House to Rent',
        category: 'house',
        priceMonthly: 7800,
        deposit: 7800,
        location: 'Tembisa, Gauteng',
        neighborhood: 'Clayville East',
        address: '24 Milkwood Crescent, Clayville East, Tembisa, 1666',
        coordinates: { lat: -25.9815, lng: 28.2321 },
        beds: 3,
        baths: 2,
        sqm: 160,
        parking: 2,
        availableFrom: '1st Next Month',
        prepaidElectricity: true,
        petFriendly: true,
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
          'Automated Double Gate & Paved Driveway',
          'Modern Fitted Kitchen with Granite Tops',
          'Master Bedroom with En-Suite Bathroom',
          'Solar Geyser Installed (Saves Electricity)',
          'Prepaid Electricity Meter'
        ],
        landmarks: [
          'Clayville Shopping Centre (1.1 km)',
          'Midrand Corporate Parks via Olifantsfontein Rd (12 mins)',
          'Tembisa Mall (4.2 km)'
        ],
        description:
          'Stunning modern 3-bedroom freestanding home in Clayville East. Features a spacious open-plan lounge, fitted kitchen with built-in cupboards, modern bathrooms, and a secure lock-up double carport. Ideal for working families commuting to Midrand or Kempton Park.',
        assignedPerson: {
          name: 'Kagiso Mthethwa',
          role: 'Clayville Area Property Manager',
          phone: '+27 82 459 1082',
          whatsapp: '+27824591082',
          email: 'kagiso.m@realestateservices-tembisa.co.za',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
          responseTime: 'Replies in < 15 mins',
          bio: 'Senior rental agent for Clayville and Olifantsfontein area. Handles all tenant vetting, lease signings, and maintenance inspections.'
        }
      },
      {
        id: 'prop-res-3',
        title: 'Spacious 2-Bedroom Cottage with Carport',
        type: 'House to Rent',
        category: 'house',
        priceMonthly: 4600,
        deposit: 4600,
        location: 'Tembisa, Gauteng',
        neighborhood: 'Birch Acres / Tembisa',
        address: '88 Kwartel Road, Birch Acres Border, Tembisa, 1630',
        coordinates: { lat: -26.0215, lng: 28.2045 },
        beds: 2,
        baths: 1,
        sqm: 65,
        parking: 1,
        availableFrom: 'Immediately',
        prepaidElectricity: true,
        petFriendly: false,
        featured: false,
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
          'Own Private Entrance & Covered Carport',
          'Fitted Cupboards in Both Bedrooms',
          'Prepaid Electricity Meter',
          'Electric Perimeter Fence',
          'Close to Birch Acres Mall'
        ],
        landmarks: [
          'Birch Acres Mall (1.4 km)',
          'Tembisa Mall (3.8 km)',
          'R21 & Allandale Rd Links (10 mins)'
        ],
        description:
          'Neat and private 2-bedroom garden cottage on a secure residential property. Offers tiled floors, built-in kitchen sink, full bathroom with bathtub, and private carport parking.',
        assignedPerson: {
          name: 'Nokuthula Dladla',
          role: 'Rental Specialist & Property Host',
          phone: '+27 73 891 4420',
          whatsapp: '+27738914420',
          email: 'nokuthula@realestateservices-tembisa.co.za',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
          responseTime: 'Replies in < 10 mins',
          bio: 'Local Tembisa leasing host with 6+ years experience. Available 7 days a week for viewings.'
        }
      }
    ]
  },

  {
    id: 'agent-kasi-living',
    name: 'Kasi Living Rooms & Bachelor Flats',
    shortName: 'Kasi Living Rentals',
    agencyType: 'Township Rental & Room Specialist',
    tagline: 'Affordable, secure bachelor rooms & backrooms across Phomolong & Tembisa',
    badge: 'Kasi Verified',
    verified: true,
    rating: 4.88,
    reviewsCount: 52,
    responseTime: '< 10 mins',
    ppraNumber: 'PPRA Reg #2023/18274',
    established: '2019',
    primaryArea: 'Tembisa',
    operatingAreas: ['Tembisa', 'Phomolong', 'Hospital View', 'Moriting', 'Winnie Mandela'],
    logo: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=256&q=80',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    phone: '+27 83 229 8812',
    whatsapp: '+27832298812',
    email: 'info@kasiliving.co.za',
    officeAddress: 'Corner Brian Mazibuko & Andrew Mapheto Dr, Tembisa',
    description:
      'Kasi Living connects students, young workers, and newcomers with safe, vetted bachelor rooms and flats to rent in Tembisa. Every room is verified for water, security, and private bathroom access.',
    reviews: [
      {
        id: 'rev-kl-1',
        author: 'Siphamandla Dube',
        rating: 5,
        date: '5 days ago',
        verifiedTenant: true,
        propertyTitle: 'Spacious Bachelor Flat with Fitted Kitchenette',
        comment:
          'Mr Vusi Ndaba was so welcoming. He showed me the yard, tested the hot water, and introduced me to the caretaker. Very safe yard with locked gates at night.'
      },
      {
        id: 'rev-kl-2',
        author: 'Refilwe Moloi',
        rating: 5,
        date: '2 weeks ago',
        verifiedTenant: true,
        propertyTitle: 'Private Furnished En-Suite Room',
        comment:
          'Best place to find clean rooms in Phomolong without dealing with unreliable middle-men. No registration fee to view.'
      },
      {
        id: 'rev-kl-3',
        author: 'Bongani Mkhize',
        rating: 4.7,
        date: '1 month ago',
        verifiedTenant: true,
        propertyTitle: 'Self-Contained 1-Bed Room near Hospital',
        comment:
          'Quiet yard with working prepaid meter. Walking distance to taxis. Vusi responded within 5 minutes on WhatsApp.'
      }
    ],
    properties: [
      {
        id: 'prop-kl-1',
        title: 'Spacious Bachelor Flat with Fitted Kitchenette in Phomolong',
        type: 'Room to Rent',
        category: 'room',
        priceMonthly: 2800,
        deposit: 1500,
        location: 'Tembisa, Gauteng',
        neighborhood: 'Phomolong',
        address: '15 Mvelase Street, Phomolong, Tembisa, 1632',
        coordinates: { lat: -26.0084, lng: 28.2198 },
        beds: 1,
        baths: 1,
        sqm: 42,
        parking: 1,
        availableFrom: 'Immediately',
        prepaidElectricity: true,
        petFriendly: false,
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
          'Fitted Kitchen Sink & Lower Cupboards',
          'En-Suite Bathroom with Hot Shower & Toilet',
          'Glossy Porcelain Tiles Throughout',
          'High Security Wall & Electric Gate',
          'Separate Prepaid Electricity Box'
        ],
        landmarks: [
          'Phomolong Metrorail Station (350m)',
          'Tembisa Mall (3.5 km)',
          'Midrand Industrial Corridors (15 mins)'
        ],
        description:
          'Newly built self-contained bachelor flat in Phomolong, Tembisa. Features modern ceiling design, shiny porcelain tiles, fitted kitchen cupboards, and own clean bathroom. Located in a quiet yard just 2 minutes from transport routes into Midrand and Kempton Park.',
        assignedPerson: {
          name: 'Vusi Ndaba',
          role: 'Phomolong Leasing Coordinator',
          phone: '+27 83 229 8812',
          whatsapp: '+27832298812',
          email: 'vusi@kasiliving.co.za',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
          responseTime: 'Replies in < 5 mins',
          bio: 'Born and raised in Phomolong. Manages over 40 vetted bachelor units. Known for rapid WhatsApp replies and friendly viewings.'
        }
      },
      {
        id: 'prop-kl-2',
        title: 'Single Budget Bachelor Room with Own Shower',
        type: 'Room to Rent',
        category: 'room',
        priceMonthly: 1900,
        deposit: 1000,
        location: 'Tembisa, Gauteng',
        neighborhood: 'Hospital View',
        address: '42 Ndlovu Way, Hospital View, Tembisa, 1632',
        coordinates: { lat: -25.9982, lng: 28.225 },
        beds: 1,
        baths: 1,
        sqm: 28,
        parking: 0,
        availableFrom: 'Immediately',
        prepaidElectricity: true,
        petFriendly: false,
        featured: false,
        images: [
          'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
          'Private Shower & Toilet',
          'Tiled Floor & Burglar Gates',
          'Prepaid Electricity',
          'Safe Yard with Night Floodlights',
          'Walking distance to Tembisa Hospital'
        ],
        landmarks: [
          'Tembisa Tertiary Hospital (8 mins walk)',
          'Andrew Mapheto Drive Taxis (2 mins)',
          'Tembisa Plaza (2.0 km)'
        ],
        description:
          'Affordable bachelor room in Hospital View, ideal for hospital staff or commuters. Clean, secure, private en-suite bathroom, and ready for immediate occupation.',
        assignedPerson: {
          name: 'Vusi Ndaba',
          role: 'Phomolong Leasing Coordinator',
          phone: '+27 83 229 8812',
          whatsapp: '+27832298812',
          email: 'vusi@kasiliving.co.za',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80',
          responseTime: 'Replies in < 5 mins',
          bio: 'Phomolong and Hospital View area specialist. Call or WhatsApp anytime for viewing.'
        }
      }
    ]
  },

  {
    id: 'agent-waterfall-realty',
    name: 'Waterfall & Midrand Elite Realty',
    shortName: 'Waterfall Elite Realty',
    agencyType: 'Executive Property & Apartment Agency',
    tagline: 'Premium apartments & houses to rent in Waterfall City, Carlswald & Vorna Valley',
    badge: 'Luxury Specialist',
    verified: true,
    rating: 4.96,
    reviewsCount: 64,
    responseTime: '< 20 mins',
    ppraNumber: 'PPRA Reg #2022/99031',
    established: '2016',
    primaryArea: 'Midrand',
    operatingAreas: ['Midrand', 'Waterfall City', 'Carlswald', 'Vorna Valley', 'Noordwyk'],
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=256&q=80',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    phone: '+27 84 312 9980',
    whatsapp: '+27843129980',
    email: 'waterfall@elitemidrand.co.za',
    officeAddress: 'Level 2, Waterfall Circle, Waterfall City, Midrand',
    description:
      'Premier agency servicing young professionals and families relocating to Midrand. We manage modern lifestyle apartments near PwC Tower, Mall of Africa, and Carlswald.',
    reviews: [
      {
        id: 'rev-we-1',
        author: 'Lindiwe Dlamini',
        rating: 5,
        date: '3 days ago',
        verifiedTenant: true,
        propertyTitle: 'Luxury 2-Bed Polofields Waterfall Apartment near PwC Tower',
        comment:
          'Thabo Mokoena provided exceptional service. He arranged a virtual video tour first, then accommodated my move-in on a Sunday. The apartment near Mall of Africa is stunning.'
      },
      {
        id: 'rev-we-2',
        author: 'Marcus Van Der Merwe',
        rating: 5,
        date: '2 weeks ago',
        verifiedTenant: true,
        propertyTitle: 'Modern Executive 1-Bedroom Loft in Carlswald',
        comment:
          'Lerato handled the lease agreement flawlessly. High quality finishes, fast fibre connectivity, and seamless biometric access.'
      },
      {
        id: 'rev-we-3',
        author: 'Dikeledi Radebe',
        rating: 4.9,
        date: '1 month ago',
        verifiedTenant: true,
        propertyTitle: 'Furnished Private Room in Vorna Valley',
        comment:
          'Very professional agency. Handed over spotless keys and inventory checklist was very clear. 5 minutes from PwC Tower.'
      }
    ],
    properties: [
      {
        id: 'prop-we-1',
        title: 'Luxury 2-Bed Polofields Waterfall Apartment near PwC Tower',
        type: 'House to Rent',
        category: 'house',
        priceMonthly: 14500,
        deposit: 14500,
        location: 'Midrand, Gauteng',
        neighborhood: 'Waterfall City',
        address: 'Polofields Drive, Waterfall City, Midrand, 1685',
        coordinates: { lat: -26.0125, lng: 28.1182 },
        beds: 2,
        baths: 2,
        sqm: 118,
        parking: 2,
        availableFrom: 'Immediately',
        prepaidElectricity: false,
        petFriendly: true,
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
          'Walk to PwC Tower & Mall of Africa',
          'Signature Lifestyle Centre (Gym, Pool, Spa, Squash)',
          'Integrated SMEG Kitchen Appliances (Fridge, Washer, Dishwasher)',
          '24/7 Biometric Guarded Security',
          'Covered Patio with Built-in Gas Braai'
        ],
        landmarks: [
          'PwC Tower Waterfall (4 mins / 0.9 km)',
          'Mall of Africa (1.2 km)',
          'Deloitte Waterfall Campus (1.5 km)',
          'Netcare Waterfall City Hospital (1.8 km)'
        ],
        description:
          'High-end 2-bedroom, 2-bathroom ground floor apartment in Waterfall City, Midrand. Located less than 4 minutes from PwC Tower, Mall of Africa, and the Deloitte campus. Ideal for corporate professionals relocating to Midrand.',
        assignedPerson: {
          name: 'Thabo Mokoena',
          role: 'Waterfall City Leasing Partner',
          phone: '+27 84 312 9980',
          whatsapp: '+27843129980',
          email: 'thabo@elitemidrand.co.za',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
          responseTime: 'Replies in < 15 mins',
          bio: 'Specialist in Waterfall City and Polofields leases. Facilitates corporate relocation leases and private client tours.'
        }
      },
      {
        id: 'prop-we-2',
        title: 'Furnished Private Room in Vorna Valley — 5 Mins to PwC',
        type: 'Room to Rent',
        category: 'room',
        priceMonthly: 3800,
        deposit: 2000,
        location: 'Midrand, Gauteng',
        neighborhood: 'Vorna Valley',
        address: 'Berger Road, Vorna Valley, Midrand, 1686',
        coordinates: { lat: -26.0021, lng: 28.1287 },
        beds: 1,
        baths: 1,
        sqm: 40,
        parking: 1,
        availableFrom: 'Immediately',
        prepaidElectricity: false,
        petFriendly: false,
        featured: false,
        images: [
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
          'Water & Uncapped High-Speed Fibre Included',
          'Furnished with Bed, Wardrobe & Study Desk',
          'Shared Equipped Kitchen & Communal Pool',
          'Secure Townhouse Complex with Guardhouse',
          'Walk to Mall of Africa & Vorna Valley Spar'
        ],
        landmarks: [
          'PwC Tower Waterfall (4 mins / 1.8 km)',
          'Mall of Africa (1.1 km)',
          'Vodacom Corporate Park (2.4 km)',
          'Midrand Gautrain Station (5 mins)'
        ],
        description:
          'Bright, secure furnished room in a gated Vorna Valley townhouse, Midrand. Highly popular with corporate interns and professionals relocating to work at PwC Tower, Deloitte, or Vodacom. Rent includes fast unlimited Wi-Fi, water, covered parking, and communal pool.',
        assignedPerson: {
          name: 'Sipho Khumalo',
          role: 'Vorna Valley Property Manager',
          phone: '+27 82 990 1234',
          whatsapp: '+27829901234',
          email: 'sipho@elitemidrand.co.za',
          avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=256&q=80',
          responseTime: 'Replies in < 10 mins',
          bio: 'Vorna Valley resident managing townhouse rooms and shared houses. Available for quick weekend tours.'
        }
      }
    ]
  },

  {
    id: 'agent-carlswald-realty',
    name: 'Carlswald & Noordwyk Living Rentals',
    shortName: 'Carlswald Living',
    agencyType: 'Residential & Suburb Rental Agency',
    tagline: 'Modern lofts, garden cottages and freestanding family houses to rent',
    badge: 'Verified Agent',
    verified: true,
    rating: 4.89,
    reviewsCount: 45,
    responseTime: '< 15 mins',
    ppraNumber: 'PPRA Reg #2023/55410',
    established: '2020',
    primaryArea: 'Midrand',
    operatingAreas: ['Midrand', 'Carlswald', 'Noordwyk', 'Crowthorne', 'Halfway Gardens'],
    logo: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=256&q=80',
    coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    phone: '+27 71 654 2210',
    whatsapp: '+27716542210',
    email: 'rentals@carlswaldliving.co.za',
    officeAddress: 'Carlswald Lifestyle Centre, New Rd, Midrand',
    description:
      'Carlswald Living connects renters with executive 1-bed apartments, cottages, and standalone 3-bedroom houses across Midrand’s most desirable suburbs.',
    reviews: [
      {
        id: 'rev-cl-1',
        author: 'Tshepo Ndlovu',
        rating: 5,
        date: '4 days ago',
        verifiedTenant: true,
        propertyTitle: 'Modern Executive 1-Bedroom Loft in Carlswald',
        comment:
          'Lerato Sithole is the best rental agent in Midrand. She showed me the loft within 2 hours of sending a message. Complex has swimming pool, clubhouse, and top security.'
      },
      {
        id: 'rev-cl-2',
        author: 'Palesa Masango',
        rating: 5,
        date: '1 week ago',
        verifiedTenant: true,
        propertyTitle: 'Charming 3-Bedroom Standalone House with Private Garden',
        comment:
          'Ayanda Zwane helped our family secure a freestanding house in Noordwyk. The pet-friendly garden and solar inverter have been lifesavers.'
      }
    ],
    properties: [
      {
        id: 'prop-cl-1',
        title: 'Modern Executive 1-Bedroom Loft in Carlswald near PwC & N1',
        type: 'House to Rent',
        category: 'house',
        priceMonthly: 7500,
        deposit: 7500,
        location: 'Midrand, Gauteng',
        neighborhood: 'Carlswald',
        address: '82 Tamboti Road, Carlswald, Midrand, 1684',
        coordinates: { lat: -25.9842, lng: 28.1245 },
        beds: 1,
        baths: 1,
        sqm: 68,
        parking: 1,
        availableFrom: 'Immediately',
        prepaidElectricity: true,
        petFriendly: false,
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
          'Clubhouse & Swimming Pool',
          'Covered Parking & 24hr Guardhouse',
          'High-Speed Fibre Optic Internet',
          'Private Balcony with Sunset Views',
          'Walk to Carlswald Lifestyle Shopping Centre'
        ],
        landmarks: [
          'PwC Tower / Waterfall City (6 mins / 3.8 km)',
          'Carlswald Lifestyle Shopping Centre (2 mins walk)',
          'Vodacom Corporate Park (4.2 km)',
          'N1 Allandale Offramp (5 mins)'
        ],
        description:
          'Chic executive 1-bedroom loft apartment in Carlswald, Midrand. Convenient 6-minute drive to PwC Tower in Waterfall City, Mall of Africa, and Vodacom HQ. Features an open-plan granite kitchen, high ceiling lounge flowing onto a scenic balcony, and top-tier security.',
        assignedPerson: {
          name: 'Lerato Sithole',
          role: 'Carlswald Leasing Consultant',
          phone: '+27 71 654 2210',
          whatsapp: '+27716542210',
          email: 'lerato@carlswaldliving.co.za',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
          responseTime: 'Replies in < 10 mins',
          bio: 'Carlswald and Crowthorne area specialist. Known for smooth lease handovers and personalized tenant care.'
        }
      },
      {
        id: 'prop-cl-2',
        title: 'Charming 3-Bedroom Standalone House with Private Garden in Noordwyk',
        type: 'House to Rent',
        category: 'house',
        priceMonthly: 12500,
        deposit: 12500,
        location: 'Midrand, Gauteng',
        neighborhood: 'Noordwyk',
        address: 'Lever Road, Noordwyk, Midrand, 1687',
        coordinates: { lat: -25.9684, lng: 28.1342 },
        beds: 3,
        baths: 2,
        sqm: 185,
        parking: 2,
        availableFrom: '1st Next Month',
        prepaidElectricity: true,
        petFriendly: true,
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: [
          'Lush Pet-Friendly Private Lawn',
          'Double Automated Lock-Up Garage',
          'Solar Backup Inverter System',
          'Built-in Braai Entertainment Area',
          'Close to Midrand Primary & High Schools'
        ],
        landmarks: [
          'Vodacom Corporate Park (3.5 km)',
          'PwC Tower Waterfall (7 mins / 5.2 km)',
          'Gautrain Midrand Station (4.8 km)',
          'San Ridge Square & Carlswald Shopping (1.5 km)'
        ],
        description:
          'Beautiful freestanding 3-bedroom family house in Noordwyk, Midrand. Easy 7-minute commute to PwC Tower, Vodacom Campus, and Gautrain Midrand Station. Boasts a modern open kitchen with scullery, master bedroom with en-suite bath, sunny private garden, and a hybrid solar inverter.',
        assignedPerson: {
          name: 'Ayanda Zwane',
          role: 'Noordwyk Property Specialist',
          phone: '+27 76 102 3344',
          whatsapp: '+27761023344',
          email: 'ayanda@carlswaldliving.co.za',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
          responseTime: 'Replies in < 15 mins',
          bio: 'Specialist in family rentals and freestanding homes in Noordwyk, Sagewood, and Blue Hills.'
        }
      }
    ]
  }
];

export const POPULAR_RENTAL_AREAS = [
  'All Areas',
  'Tembisa',
  'Midrand',
  'Clayville',
  'Phomolong',
  'Winnie Mandela',
  'Carlswald',
  'Waterfall City',
  'Vorna Valley',
  'Noordwyk'
];
