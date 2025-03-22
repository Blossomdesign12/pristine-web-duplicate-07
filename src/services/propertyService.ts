
import { Property } from "@/lib/data";
import { getCurrentUser } from "./authService";

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
    // Try to parse error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    } catch (e) {
      throw new Error(`Error: ${response.status}`);
    }
  }

  return response.json();
};

// Add a new property
export const addProperty = async (propertyData: Partial<Property>): Promise<Property> => {
  try {
    // First try to use the backend API
    const response = await authenticatedRequest("/properties", "POST", propertyData);
    return response.property;
  } catch (error) {
    console.warn("Backend API call failed, falling back to local storage:", error);
    
    // Fallback to local storage if the API call fails
    // This is useful for development and demo purposes
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error("You must be logged in to add a property");
    }

    // Ensure only agent or owner can add properties
    if (currentUser.role !== 'agent' && currentUser.role !== 'owner') {
      throw new Error("Only agents and property owners can add properties");
    }

    // Import database service for local storage fallback
    const { addProperty: addPropertyToDb } = await import("@/services/dbService");

    // Generate complete property object
    const newProperty = {
      ...propertyData,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString(),
    } as Property;

    // Add to local storage database
    await addPropertyToDb(newProperty);
    
    return newProperty;
  }
};

// Get all properties
export const getAllProperties = async (): Promise<Property[]> => {
  try {
    const response = await fetch(`${API_URL}/properties`);
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return response.json();
  } catch (error) {
    console.warn("API call failed, falling back to local storage:", error);
    
    // Fallback to local storage
    const { getAllProperties: getPropertiesFromDb } = await import("@/services/dbService");
    return await getPropertiesFromDb();
  }
};

// Get properties by status (for-sale, for-rent, etc.)
export const getPropertiesByStatus = async (status: string): Promise<Property[]> => {
  try {
    const response = await fetch(`${API_URL}/properties?status=${status}`);
    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }
    return response.json();
  } catch (error) {
    console.warn("API call failed, falling back to local storage:", error);
    
    // Fallback to local storage
    const { getAllProperties: getPropertiesFromDb } = await import("@/services/dbService");
    const properties = await getPropertiesFromDb();
    
    // Filter by status
    return properties.filter(
      (property) => property.features.status === status
    );
  }
};

// Get property by ID
export const getPropertyById = async (id: string): Promise<Property> => {
  try {
    const response = await fetch(`${API_URL}/properties/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch property");
    }
    return response.json();
  } catch (error) {
    console.warn("API call failed, falling back to local storage:", error);
    
    // Fallback to local storage
    const { getPropertyById: getPropertyByIdFromDb } = await import("@/services/dbService");
    const property = await getPropertyByIdFromDb(id);
    
    if (!property) {
      throw new Error("Property not found");
    }
    
    return property;
  }
};

// Update a property
export const updateProperty = async (id: string, propertyData: Partial<Property>): Promise<Property> => {
  try {
    const response = await authenticatedRequest(`/properties/${id}`, "PUT", propertyData);
    return response.property;
  } catch (error) {
    console.warn("API call failed, falling back to local storage:", error);
    
    // Fallback to local storage
    const { updateProperty: updatePropertyInDb } = await import("@/services/dbService");
    await updatePropertyInDb(id, propertyData);
    
    // Get updated property
    const { getPropertyById: getPropertyByIdFromDb } = await import("@/services/dbService");
    const property = await getPropertyByIdFromDb(id);
    
    if (!property) {
      throw new Error("Property not found");
    }
    
    return property;
  }
};

// Delete a property
export const deleteProperty = async (id: string): Promise<void> => {
  try {
    await authenticatedRequest(`/properties/${id}`, "DELETE");
  } catch (error) {
    console.warn("API call failed, falling back to local storage:", error);
    
    // Fallback to local storage
    const { deleteProperty: deletePropertyFromDb } = await import("@/services/dbService");
    await deletePropertyFromDb(id);
  }
};
