
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    yearBuilt: number;
    propertyType: "apartment" | "house" | "villa" | "plot" | "penthouse";
    status: "for-sale" | "for-rent" | "sold" | "pending";
    floorPlan?: string;
    hasGarden?: boolean;
    hasGarage?: boolean;
    hasPool?: boolean;
    isPetFriendly?: boolean;
    hasCentralHeating?: boolean;
    hasAirConditioning?: boolean;
  };
  images: string[];
  amenities: string[];
  agent: {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    lat: number;
    lng: number;
  };
  createdAt: string;
  featured: boolean;
  views: number;
  _id?: string; // Adding _id to support the server-side MongoDB _id
}

// Sample cities data
export const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Navi Mumbai",
  "Thane"
];

// Property types definitions
export const propertyTypes = [
  { label: "Apartment", value: "apartment" },
  { label: "House", value: "house" },
  { label: "Villa", value: "villa" },
  { label: "Plot", value: "plot" },
  { label: "Penthouse", value: "penthouse" }
];

// Status types for properties
export const statusTypes = [
  { label: "For Sale", value: "for-sale" },
  { label: "For Rent", value: "for-rent" },
  { label: "Sold", value: "sold" },
  { label: "Pending", value: "pending" }
];

// Mock agent data
export const agents = [
  {
    id: "agent-1",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    properties: 24,
    experience: 5,
    specialization: "Residential",
    bio: "Rahul is a dedicated real estate professional with 5 years of experience in Mumbai's property market."
  },
  {
    id: "agent-2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 9876543211",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    properties: 32,
    experience: 8,
    specialization: "Commercial",
    bio: "Priya specializes in commercial properties and has over 8 years of experience in the real estate industry."
  },
  {
    id: "agent-3",
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 9876543212",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    properties: 18,
    experience: 3,
    specialization: "Luxury Homes",
    bio: "Vikram focuses on luxury properties in premium neighborhoods of Mumbai and Pune."
  }
];

// Helper function to format price in Indian currency
export const formatPrice = (price: number): string => {
  // For Indian format: ₹XX,XX,XXX
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });
  
  return formatter.format(price);
};

// Import PropertyService for backend data
import { getAllProperties, getPropertiesByStatus } from '@/services/propertyService';

// Initialize empty properties array (will be populated from backend)
let properties: Property[] = [];

// Function to load properties from backend
export const loadProperties = async (): Promise<Property[]> => {
  try {
    properties = await getAllProperties();
    return properties;
  } catch (error) {
    console.error("Error loading properties:", error);
    return [];
  }
};

// Function to get featured properties from backend
export const getFeaturedProperties = async (): Promise<Property[]> => {
  try {
    const allProperties = await getAllProperties();
    return allProperties.filter(property => property.featured).slice(0, 6);
  } catch (error) {
    console.error("Error getting featured properties:", error);
    return [];
  }
};

// Function to get recent properties
export const getRecentProperties = async (count: number = 3): Promise<Property[]> => {
  try {
    const allProperties = await getAllProperties();
    // Sort by createdAt date (newest first) and take the specified count
    return [...allProperties]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, count);
  } catch (error) {
    console.error("Error getting recent properties:", error);
    return [];
  }
};

// Function to search properties with various filters
export const searchProperties = async (
  query?: string,
  filters?: {
    city?: string;
    type?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
  }
): Promise<Property[]> => {
  try {
    const allProperties = await getAllProperties();
    
    let results = [...allProperties];
    
    if (query) {
      const searchQuery = query.toLowerCase();
      results = results.filter(
        property => 
          property.title.toLowerCase().includes(searchQuery) ||
          property.description.toLowerCase().includes(searchQuery) ||
          property.location.address.toLowerCase().includes(searchQuery) ||
          property.location.city.toLowerCase().includes(searchQuery)
      );
    }
    
    if (filters) {
      if (filters.city) {
        results = results.filter(property => 
          property.location.city.toLowerCase() === filters.city!.toLowerCase()
        );
      }
      
      if (filters.type) {
        results = results.filter(property => 
          property.features.propertyType === filters.type
        );
      }
      
      if (filters.status) {
        results = results.filter(property => 
          property.features.status === filters.status
        );
      }
      
      if (filters.minPrice) {
        results = results.filter(property => 
          property.price >= filters.minPrice!
        );
      }
      
      if (filters.maxPrice) {
        results = results.filter(property => 
          property.price <= filters.maxPrice!
        );
      }
      
      if (filters.bedrooms) {
        results = results.filter(property => 
          property.features.bedrooms >= filters.bedrooms!
        );
      }
      
      if (filters.bathrooms) {
        results = results.filter(property => 
          property.features.bathrooms >= filters.bathrooms!
        );
      }
    }
    
    return results;
  } catch (error) {
    console.error("Error searching properties:", error);
    return [];
  }
};

// Function to get property by ID
export const getPropertyById = async (id: string): Promise<Property | undefined> => {
  try {
    const allProperties = await getAllProperties();
    return allProperties.find(property => property.id === id || property._id === id);
  } catch (error) {
    console.error("Error getting property by ID:", error);
    return undefined;
  }
};
