
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    lat?: number;
    lng?: number;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number; // square feet
    yearBuilt: number;
    propertyType: 'apartment' | 'house' | 'condo' | 'townhouse' | 'land';
    status: 'for-sale' | 'for-rent' | 'sold' | 'pending';
  };
  amenities: string[];
  images: string[];
  agent: {
    id: string;
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  featured: boolean;
  createdAt: string;
}

export const properties: Property[] = [
  {
    id: "prop-1",
    title: "Modern Apartment with Ocean View",
    description: "Luxurious apartment with breathtaking ocean views, modern finishes, and resort-style amenities. This stunning property features an open floor plan with floor-to-ceiling windows, a gourmet kitchen with high-end appliances, and a spacious balcony perfect for entertaining.",
    price: 850000,
    location: {
      address: "123 Coastal Drive",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "USA",
      lat: 25.761681,
      lng: -80.191788
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      yearBuilt: 2019,
      propertyType: "apartment",
      status: "for-sale"
    },
    amenities: ["Swimming Pool", "Fitness Center", "Parking", "24/7 Security", "Pet-Friendly", "Elevator"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-1",
      name: "Sarah Johnson",
      phone: "(305) 555-1234",
      email: "sarah.j@realestate.com",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    createdAt: "2023-09-15T10:30:00Z"
  },
  {
    id: "prop-2",
    title: "Spacious Family Home in Quiet Neighborhood",
    description: "Beautiful family home with plenty of space for entertaining. Features include a large backyard, updated kitchen, and a finished basement. Located in a quiet neighborhood with excellent schools.",
    price: 650000,
    location: {
      address: "456 Maple Street",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "USA",
      lat: 30.267153,
      lng: -97.743057
    },
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      yearBuilt: 2005,
      propertyType: "house",
      status: "for-sale"
    },
    amenities: ["Garden", "Garage", "Fireplace", "Central AC", "Basement", "Patio"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-2",
      name: "Michael Thompson",
      phone: "(512) 555-5678",
      email: "michael.t@realestate.com",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    createdAt: "2023-09-10T14:45:00Z"
  },
  {
    id: "prop-3",
    title: "Downtown Luxury Condo",
    description: "Stunning luxury condo in the heart of downtown. Walking distance to shops, restaurants, and entertainment. Features high-end finishes, an open floor plan, and amazing city views.",
    price: 750000,
    location: {
      address: "789 Urban Avenue",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "USA",
      lat: 41.878114,
      lng: -87.629798
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      area: 1500,
      yearBuilt: 2018,
      propertyType: "condo",
      status: "for-sale"
    },
    amenities: ["Concierge", "Fitness Center", "Rooftop Terrace", "Private Parking", "Security System", "Elevator"],
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-3",
      name: "Amanda Garcia",
      phone: "(312) 555-9012",
      email: "amanda.g@realestate.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    createdAt: "2023-09-05T09:15:00Z"
  },
  {
    id: "prop-4",
    title: "Charming Townhouse Near City Center",
    description: "Beautifully renovated townhouse located minutes from downtown. Features modern kitchen, hardwood floors throughout, and a private patio. Perfect for urban professionals.",
    price: 420000,
    location: {
      address: "101 Central Street",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "USA",
      lat: 47.606209,
      lng: -122.332071
    },
    features: {
      bedrooms: 3,
      bathrooms: 2.5,
      area: 1700,
      yearBuilt: 2010,
      propertyType: "townhouse",
      status: "for-sale"
    },
    amenities: ["Private Patio", "Hardwood Floors", "Modern Appliances", "Parking Space", "Storage Unit", "Close to Transit"],
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-2",
      name: "Michael Thompson",
      phone: "(512) 555-5678",
      email: "michael.t@realestate.com",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    createdAt: "2023-08-28T16:20:00Z"
  },
  {
    id: "prop-5",
    title: "Elegant Victorian with Modern Updates",
    description: "Stunning Victorian home with modern updates throughout. Original architectural details preserved while incorporating contemporary amenities. Features a chef's kitchen, spacious primary suite, and beautiful garden.",
    price: 925000,
    location: {
      address: "555 Heritage Lane",
      city: "San Francisco",
      state: "CA",
      zip: "94110",
      country: "USA",
      lat: 37.773972,
      lng: -122.431297
    },
    features: {
      bedrooms: 5,
      bathrooms: 3.5,
      area: 3200,
      yearBuilt: 1902,
      propertyType: "house",
      status: "for-sale"
    },
    amenities: ["Original Details", "Garden", "Chef's Kitchen", "Home Office", "High Ceilings", "Wine Cellar"],
    images: [
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-1",
      name: "Sarah Johnson",
      phone: "(305) 555-1234",
      email: "sarah.j@realestate.com",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: true,
    createdAt: "2023-09-12T11:05:00Z"
  },
  {
    id: "prop-6",
    title: "Modern Countryside Retreat",
    description: "Escape to this modern countryside retreat offering tranquility and luxury. Expansive views, open-concept design, and premium finishes. Perfect for those seeking space and serenity.",
    price: 1250000,
    location: {
      address: "777 Rural Route",
      city: "Aspen",
      state: "CO",
      zip: "81611",
      country: "USA",
      lat: 39.1911,
      lng: -106.8175
    },
    features: {
      bedrooms: 4,
      bathrooms: 4,
      area: 3800,
      yearBuilt: 2021,
      propertyType: "house",
      status: "for-sale"
    },
    amenities: ["Mountain Views", "Smart Home", "Heated Floors", "Sauna", "Guest House", "Solar Panels"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    agent: {
      id: "agent-3",
      name: "Amanda Garcia",
      phone: "(312) 555-9012",
      email: "amanda.g@realestate.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    featured: false,
    createdAt: "2023-08-20T13:40:00Z"
  }
];

export const agents = properties.map(property => property.agent)
  .filter((agent, index, self) => 
    index === self.findIndex((a) => a.id === agent.id)
  );

export const cities = [...new Set(properties.map(property => property.location.city))];

export const propertyTypes = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'land', label: 'Land' }
];

export const statusTypes = [
  { value: 'for-sale', label: 'For Sale' },
  { value: 'for-rent', label: 'For Rent' },
  { value: 'sold', label: 'Sold' },
  { value: 'pending', label: 'Pending' }
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find(property => property.id === id);
}

export function searchProperties(
  query: string = '',
  filters: {
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    propertyType?: string;
    status?: string;
    city?: string;
  } = {}
): Property[] {
  return properties.filter(property => {
    // Search by query
    const matchesQuery = query === '' || 
      property.title.toLowerCase().includes(query.toLowerCase()) ||
      property.description.toLowerCase().includes(query.toLowerCase()) ||
      property.location.city.toLowerCase().includes(query.toLowerCase()) ||
      property.location.address.toLowerCase().includes(query.toLowerCase());
    
    // Apply filters
    const matchesMinPrice = filters.minPrice === undefined || property.price >= filters.minPrice;
    const matchesMaxPrice = filters.maxPrice === undefined || property.price <= filters.maxPrice;
    const matchesBedrooms = filters.bedrooms === undefined || property.features.bedrooms >= filters.bedrooms;
    const matchesBathrooms = filters.bathrooms === undefined || property.features.bathrooms >= filters.bathrooms;
    const matchesPropertyType = !filters.propertyType || property.features.propertyType === filters.propertyType;
    const matchesStatus = !filters.status || property.features.status === filters.status;
    const matchesCity = !filters.city || property.location.city === filters.city;
    
    return matchesQuery && 
           matchesMinPrice && 
           matchesMaxPrice && 
           matchesBedrooms && 
           matchesBathrooms && 
           matchesPropertyType && 
           matchesStatus &&
           matchesCity;
  });
}

export function getFeaturedProperties(): Property[] {
  return properties.filter(property => property.featured);
}

export function getRecentProperties(limit: number = 3): Property[] {
  return [...properties]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}
