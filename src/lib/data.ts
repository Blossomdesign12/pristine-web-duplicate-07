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
}
