
import { Property } from './data';

// For Sale Properties
export const saleProperties: Property[] = [
  {
    id: "sale-1",
    title: "Luxury 4 BHK Penthouse in South Mumbai",
    description: "Luxury penthouse with panoramic sea views, featuring high-end finishes, private elevator access, and a rooftop terrace with infinity pool. Exclusive residence in South Mumbai's most coveted neighborhood.",
    price: 120000000,
    location: {
      address: "123 Marine Drive",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400021",
      country: "India",
      lat: 18.9442,
      lng: 72.8234
    },
    features: {
      bedrooms: 4,
      bathrooms: 4.5,
      area: 4500,
      yearBuilt: 2022,
      propertyType: "penthouse",
      status: "for-sale",
      floorPlan: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    amenities: ["Private Pool", "Elevator", "Smart Home", "24/7 Security", "Parking", "Home Theater", "Wine Cellar"],
    images: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602872030219-ad2b9a54315c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-1",
      name: "Priya Sharma",
      phone: "(022) 2555-1234",
      email: "priya.s@realestate.com",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    createdAt: "2023-11-12T10:30:00Z"
  },
  {
    id: "sale-2",
    title: "Modern 3 BHK Villa in Koregaon Park",
    description: "Elegant villa with contemporary architecture, landscaped garden, and bespoke interiors. Features include Italian marble flooring, home automation, and a private pool in Pune's most prestigious locality.",
    price: 55000000,
    location: {
      address: "456 North Main",
      city: "Pune",
      state: "Maharashtra",
      zip: "411001",
      country: "India",
      lat: 18.5362,
      lng: 73.8939
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      area: 3200,
      yearBuilt: 2021,
      propertyType: "villa",
      status: "for-sale",
      floorPlan: "https://images.unsplash.com/photo-1604014307827-76ae479d65e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    amenities: ["Garden", "Pool", "Modular Kitchen", "Study Room", "Gym", "Terrace", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-2",
      name: "Vikram Malhotra",
      phone: "(022) 2555-5678",
      email: "vikram.m@realestate.com",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    createdAt: "2023-10-27T14:45:00Z"
  },
  {
    id: "sale-3",
    title: "Contemporary 4 BHK Apartment in Whitefield",
    description: "Sprawling apartment with premium amenities in Bangalore's tech hub. Enjoy resort-style living with multiple balconies, designer kitchen, and community facilities including swimming pool, tennis courts, and clubhouse.",
    price: 18500000,
    location: {
      address: "789 Tech Park View",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560066",
      country: "India",
      lat: 12.9698,
      lng: 77.7500
    },
    features: {
      bedrooms: 4,
      bathrooms: 4,
      area: 2800,
      yearBuilt: 2020,
      propertyType: "apartment",
      status: "for-sale",
      floorPlan: "https://images.unsplash.com/photo-1604014438487-b2c27bdc5d51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    amenities: ["Swimming Pool", "Tennis Court", "Clubhouse", "Children's Play Area", "Gym", "24/7 Security", "Visitor Parking"],
    images: [
      "https://images.unsplash.com/photo-1628133287836-40bd5453bed1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753229-a8cc2639685d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-3",
      name: "Anjali Desai",
      phone: "(022) 2555-9012",
      email: "anjali.d@realestate.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    createdAt: "2023-10-15T09:15:00Z"
  },
  {
    id: "sale-4",
    title: "Premium 3 BHK Apartment in Gurgaon",
    description: "Exquisite apartment with top-of-the-line finishes in a gated community. Features include floor-to-ceiling windows, European kitchen, and private balcony with golf course views in Gurgaon's luxury enclave.",
    price: 28000000,
    location: {
      address: "101 Golf Course Road",
      city: "Delhi",
      state: "Delhi NCR",
      zip: "122002",
      country: "India",
      lat: 28.4595,
      lng: 77.0266
    },
    features: {
      bedrooms: 3,
      bathrooms: 3.5,
      area: 2200,
      yearBuilt: 2019,
      propertyType: "apartment",
      status: "for-sale",
      floorPlan: "https://images.unsplash.com/photo-1604014238312-9498f93a3301?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    amenities: ["Golf Course View", "Club Membership", "Spa", "Indoor Pool", "Concierge", "Bar Lounge", "Business Center"],
    images: [
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-1",
      name: "Priya Sharma",
      phone: "(022) 2555-1234",
      email: "priya.s@realestate.com",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    createdAt: "2023-11-02T11:20:00Z"
  },
  {
    id: "sale-5",
    title: "Seaside 5 BHK Villa in Chennai",
    description: "Magnificent beachfront villa with direct sea access. Featuring a private infinity pool, landscaped gardens, and panoramic ocean views, this exclusive property offers unparalleled luxury living on Chennai's prestigious coastline.",
    price: 95000000,
    location: {
      address: "222 East Coast Road",
      city: "Chennai",
      state: "Tamil Nadu",
      zip: "600041",
      country: "India",
      lat: 12.9939,
      lng: 80.2518
    },
    features: {
      bedrooms: 5,
      bathrooms: 5.5,
      area: 5000,
      yearBuilt: 2017,
      propertyType: "villa",
      status: "for-sale",
      floorPlan: "https://images.unsplash.com/photo-1604014238170-4d5087d6c3e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    amenities: ["Beachfront", "Infinity Pool", "Home Theater", "Wine Cellar", "Private Dock", "Guest House", "Outdoor Kitchen"],
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-2",
      name: "Vikram Malhotra",
      phone: "(022) 2555-5678",
      email: "vikram.m@realestate.com",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    createdAt: "2023-09-25T08:30:00Z"
  },
  {
    id: "sale-6",
    title: "Designer 4 BHK Bungalow in Jubilee Hills",
    description: "Architectural masterpiece nestled in Hyderabad's premier neighborhood. This sophisticated residence features cutting-edge design, lush landscaping, and premium finishes throughout, perfect for the discerning buyer.",
    price: 63000000,
    location: {
      address: "333 Film Nagar",
      city: "Hyderabad",
      state: "Telangana",
      zip: "500033",
      country: "India",
      lat: 17.4121,
      lng: 78.4268
    },
    features: {
      bedrooms: 4,
      bathrooms: 4.5,
      area: 4200,
      yearBuilt: 2018,
      propertyType: "house",
      status: "for-sale",
      floorPlan: "https://images.unsplash.com/photo-1604014238533-51c491a11e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    amenities: ["Designer Interiors", "Home Office", "Entertainment Room", "Water Feature", "Landscaped Garden", "Guest Suite", "Solar Panels"],
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-3",
      name: "Anjali Desai",
      phone: "(022) 2555-9012",
      email: "anjali.d@realestate.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    createdAt: "2023-10-05T15:45:00Z"
  }
];

// For Rent Properties
export const rentProperties: Property[] = [
  {
    id: "rent-1",
    title: "Furnished 3 BHK Apartment in Hiranandani Gardens",
    description: "Luxurious furnished apartment with high-end finishes and amenities. The property features premium furniture, appliances, and stunning city views from multiple balconies in a sought-after community.",
    price: 85000,
    location: {
      address: "555 Powai Lake View",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400076",
      country: "India",
      lat: 19.1288,
      lng: 72.9077
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      area: 1800,
      yearBuilt: 2018,
      propertyType: "apartment",
      status: "for-rent",
      floorPlan: "https://images.unsplash.com/photo-1604014238312-9498f93a3301?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    amenities: ["Fully Furnished", "Swimming Pool", "Gym", "Security", "Parking", "Pet-Friendly", "Balcony"],
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-1",
      name: "Priya Sharma",
      phone: "(022) 2555-1234",
      email: "priya.s@realestate.com",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    createdAt: "2023-11-08T10:15:00Z"
  },
  {
    id: "rent-2",
    title: "Modern 2 BHK Apartment in Koramangala",
    description: "Contemporary apartment in Bangalore's trendy neighborhood. This stylish home features an open floor plan, modern kitchen, and convenient access to top restaurants, cafes, and tech offices.",
    price: 42000,
    location: {
      address: "123 8th Block",
      city: "Bangalore",
      state: "Karnataka",
      zip: "560034",
      country: "India",
      lat: 12.9336,
      lng: 77.6206
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      yearBuilt: 2019,
      propertyType: "apartment",
      status: "for-rent",
      floorPlan: "https://images.unsplash.com/photo-1604014238487-b2c27bdc5d51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    amenities: ["Semi-Furnished", "Power Backup", "Lift", "Security", "Covered Parking", "Community Garden", "High-Speed Internet"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-3",
      name: "Anjali Desai",
      phone: "(022) 2555-9012",
      email: "anjali.d@realestate.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    createdAt: "2023-10-22T14:30:00Z"
  },
  {
    id: "rent-3",
    title: "Spacious 4 BHK Duplex in Banjara Hills",
    description: "Elegant duplex with high ceilings and upscale finishes in Hyderabad's elite neighborhood. This luxurious rental offers generous living spaces, a chef's kitchen, and multiple balconies with city views.",
    price: 95000,
    location: {
      address: "456 Road No. 12",
      city: "Hyderabad",
      state: "Telangana",
      zip: "500034",
      country: "India",
      lat: 17.4156,
      lng: 78.4347
    },
    features: {
      bedrooms: 4,
      bathrooms: 4,
      area: 3000,
      yearBuilt: 2016,
      propertyType: "apartment",
      status: "for-rent",
      floorPlan: "https://images.unsplash.com/photo-1604014238533-51c491a11e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    amenities: ["Duplex", "Private Terrace", "Modular Kitchen", "Home Office", "Servant Room", "Club Access", "Covered Parking"],
    images: [
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617104678098-de229db51583?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600047509782-20d39509f26d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-2",
      name: "Vikram Malhotra",
      phone: "(022) 2555-5678",
      email: "vikram.m@realestate.com",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    createdAt: "2023-11-01T09:45:00Z"
  },
  {
    id: "rent-4",
    title: "Chic 2 BHK Apartment in Gachibowli",
    description: "Stylish apartment in Hyderabad's IT hub with modern amenities and convenient location. Perfect for tech professionals, this property offers contemporary interiors, community facilities, and proximity to major tech parks.",
    price: 32000,
    location: {
      address: "789 Financial District",
      city: "Hyderabad",
      state: "Telangana",
      zip: "500032",
      country: "India",
      lat: 17.4402,
      lng: 78.3784
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 1350,
      yearBuilt: 2020,
      propertyType: "apartment",
      status: "for-rent",
      floorPlan: "https://images.unsplash.com/photo-1604014438576-9e97f3c26a25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    amenities: ["Semi-Furnished", "Fitness Center", "Swimming Pool", "Clubhouse", "Dog Park", "BBQ Area", "EV Charging"],
    images: [
      "https://images.unsplash.com/photo-1545083036-61d5763b1d8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561975023-3d6d97d6a6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592928302636-c83cf1e1c887?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-3",
      name: "Anjali Desai",
      phone: "(022) 2555-9012",
      email: "anjali.d@realestate.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    createdAt: "2023-10-15T16:20:00Z"
  },
  {
    id: "rent-5",
    title: "Luxury 3 BHK Apartment in Alipore",
    description: "Upscale apartment in Kolkata's elite neighborhood with premium amenities and classic charm. This elegant residence features spacious rooms, quality finishes, and a prestigious address in the heart of the city.",
    price: 58000,
    location: {
      address: "101 Park Street",
      city: "Chennai",
      state: "Tamil Nadu",
      zip: "700027",
      country: "India",
      lat: 13.0827,
      lng: 80.2707
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      yearBuilt: 2017,
      propertyType: "apartment",
      status: "for-rent",
      floorPlan: "https://images.unsplash.com/photo-1604014238170-4d5087d6c3e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    amenities: ["Fully Furnished", "Air Conditioning", "Power Backup", "Lift", "Security", "Covered Parking", "Garden Access"],
    images: [
      "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588854337236-6889d631faa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-1",
      name: "Priya Sharma",
      phone: "(022) 2555-1234",
      email: "priya.s@realestate.com",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    createdAt: "2023-09-30T11:15:00Z"
  },
  {
    id: "rent-6",
    title: "Modern 3 BHK Apartment in South Extension",
    description: "Contemporary apartment in Delhi's premium neighborhood with upscale amenities. This well-appointed residence offers spacious interiors, high-quality finishes, and a central location near shopping, dining, and parks.",
    price: 65000,
    location: {
      address: "222 Ring Road",
      city: "Delhi",
      state: "Delhi",
      zip: "110049",
      country: "India",
      lat: 28.5695,
      lng: 77.2232
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      area: 1950,
      yearBuilt: 2019,
      propertyType: "apartment",
      status: "for-rent",
      floorPlan: "https://images.unsplash.com/photo-1604014238396-3273645c64f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    amenities: ["Semi-Furnished", "24/7 Security", "Power Backup", "Covered Parking", "Elevator", "Community Lounge", "Yoga Deck"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1597211833712-5e41faa202ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-2",
      name: "Vikram Malhotra",
      phone: "(022) 2555-5678",
      email: "vikram.m@realestate.com",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    createdAt: "2023-10-10T13:40:00Z"
  }
];
