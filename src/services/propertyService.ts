
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
  const response = await authenticatedRequest("/properties", "POST", propertyData);
  return response.property;
};

// Get all properties
export const getAllProperties = async (): Promise<Property[]> => {
  const response = await fetch(`${API_URL}/properties`);
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  const data = await response.json();
  return data.properties;
};

// Get properties by status (for-sale, for-rent, etc.)
export const getPropertiesByStatus = async (status: string): Promise<Property[]> => {
  const response = await fetch(`${API_URL}/properties/status/${status}`);
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  const data = await response.json();
  return data.properties;
};

// Get property by ID
export const getPropertyById = async (id: string): Promise<Property> => {
  const response = await fetch(`${API_URL}/properties/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }
  const data = await response.json();
  return data.property;
};

// Update a property
export const updateProperty = async (id: string, propertyData: Partial<Property>): Promise<Property> => {
  const response = await authenticatedRequest(`/properties/${id}`, "PUT", propertyData);
  return response.property;
};

// Delete a property
export const deleteProperty = async (id: string): Promise<void> => {
  await authenticatedRequest(`/properties/${id}`, "DELETE");
};

// Get user properties
export const getUserProperties = async (): Promise<Property[]> => {
  const response = await authenticatedRequest("/properties/user/me");
  return response.properties;
};
