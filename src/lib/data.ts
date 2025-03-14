
// Type definitions still needed for TypeScript, even though data will come from API
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
    bedrooms: number; // BHK
    bathrooms: number;
    area: number; // square feet
    yearBuilt: number;
    propertyType: 'apartment' | 'house' | 'villa' | 'plot' | 'penthouse';
    status: 'for-sale' | 'for-rent' | 'sold' | 'pending';
    floorPlan?: string; // URL to floor plan image
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

export const propertyTypes = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'villa', label: 'Villa' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'plot', label: 'Plot' }
];

export const statusTypes = [
  { value: 'for-sale', label: 'For Sale' },
  { value: 'for-rent', label: 'For Rent' },
  { value: 'sold', label: 'Sold' },
  { value: 'pending', label: 'Pending' }
];

export const cities = ["Mumbai", "Pune", "Thane", "Navi Mumbai", "Bangalore", "Delhi", "Hyderabad", "Chennai"];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(price);
}
