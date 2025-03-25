
import { Property } from "@/lib/data";

const API_URL = "http://localhost:5000";

// Get token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem("authToken");
};

// Helper for API requests with authentication
const authenticatedRequest = async (
  endpoint: string,
  method: string = "GET",
  data?: any
) => {
  const token = getToken();
  if (!token) {
    throw new Error("Authentication required");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const config: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    } catch (e) {
      throw new Error(`Error: ${response.status}`);
    }
  }

  return response.json();
};

// Fetch dashboard statistics for agent/owner
export const getDashboardStats = async (): Promise<{
  totalProperties: number;
  activeProperties: number;
  totalViews: number;
  recentProperties: Property[];
}> => {
  console.log("Fetching dashboard stats...");
  const response = await authenticatedRequest("/properties/dashboard/stats");
  console.log("Dashboard stats response:", response); 
  return response.data;
};

// Fetch properties with filters and pagination
export const getFilteredProperties = async (
  filters: {
    status?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    city?: string;
  },
  page: number = 1,
  limit: number = 10
): Promise<{
  properties: Property[];
  total: number;
  pages: number;
  currentPage: number;
}> => {
  // Convert filters to query params
  const queryParams = new URLSearchParams();
  if (filters.status) queryParams.append("status", filters.status);
  if (filters.propertyType) queryParams.append("propertyType", filters.propertyType);
  if (filters.minPrice) queryParams.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice.toString());
  if (filters.bedrooms) queryParams.append("bedrooms", filters.bedrooms.toString());
  if (filters.city) queryParams.append("city", filters.city);
  
  queryParams.append("page", page.toString());
  queryParams.append("limit", limit.toString());

  const response = await authenticatedRequest(`/properties?${queryParams.toString()}`);
  
  // Ensure all properties have an id property (using _id if necessary)
  const properties = response.properties.map((property: any) => {
    if (property._id && !property.id) {
      property.id = property._id;
    }
    return property;
  });

  return {
    properties,
    total: response.total,
    pages: response.pages,
    currentPage: response.currentPage
  };
};

// Get property by ID for editing
export const getPropertyForEditing = async (id: string): Promise<Property> => {
  const response = await authenticatedRequest(`/properties/${id}`);
  
  // Ensure property has an id property (using _id if necessary)
  if (response.property._id && !response.property.id) {
    response.property.id = response.property._id;
  }

  return response.property;
};

// Update a property (for editing)
export const updateProperty = async (id: string, updates: Partial<Property>): Promise<Property> => {
  // Make sure we have a valid features object with yearBuilt
  if (updates.features && !updates.features.yearBuilt) {
    updates.features.yearBuilt = new Date().getFullYear();
  }
  
  const response = await authenticatedRequest(`/properties/${id}`, "PUT", updates);
  
  // Ensure property has an id property
  if (response.property._id && !response.property.id) {
    response.property.id = response.property._id;
  }
  
  return response.property;
};

// Fetch user favorites (for buyer dashboard)
export const getUserFavorites = async (): Promise<Property[]> => {
  try {
    const response = await authenticatedRequest("/properties/user/favorites");
    console.log("User favorites response:", response);
    return response.properties || [];
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    return [];
  }
};

// Fetch recently viewed properties (for buyer dashboard)
export const getRecentlyViewed = async (): Promise<Property[]> => {
  try {
    const response = await authenticatedRequest("/properties/user/recently-viewed");
    console.log("Recently viewed response:", response);
    return response.properties || [];
  } catch (error) {
    console.error("Error fetching recently viewed properties:", error);
    return [];
  }
};

// Fetch recommended properties (for buyer dashboard)
export const getRecommendedProperties = async (): Promise<Property[]> => {
  try {
    const response = await authenticatedRequest("/properties/recommended");
    console.log("Recommended properties response:", response);
    return response.properties || [];
  } catch (error) {
    console.error("Error fetching recommended properties:", error);
    return [];
  }
};

// Fetch client leads for agents
export const getClientLeads = async (): Promise<any[]> => {
  try {
    const response = await authenticatedRequest("/leads");
    console.log("Client leads response:", response);
    return response.leads || [];
  } catch (error) {
    console.error("Error fetching client leads:", error);
    return [];
  }
};

// Fetch analytics data (for admin)
export const getAnalyticsData = async (): Promise<any> => {
  const response = await authenticatedRequest("/admin/analytics");
  return response.data;
};

export default {
  getDashboardStats,
  getFilteredProperties,
  getPropertyForEditing,
  updateProperty,
  getAnalyticsData,
  getUserFavorites,
  getRecentlyViewed,
  getRecommendedProperties,
  getClientLeads
};
