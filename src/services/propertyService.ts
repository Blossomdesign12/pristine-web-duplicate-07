
import apiClient from './apiService';
import { Property } from '@/lib/data';

// Get all properties with filters
export const getProperties = async (
  filters: {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    propertyType?: string;
    status?: string;
    city?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
  } = {}
) => {
  try {
    const response = await apiClient.get('/properties', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Get properties error:', error);
    throw error;
  }
};

// Get property by ID
export const getPropertyById = async (id: string) => {
  try {
    const response = await apiClient.get(`/properties/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get property by ID error:', error);
    throw error;
  }
};

// Create property
export const createProperty = async (propertyData: Omit<Property, 'id' | 'createdAt' | 'agent'>) => {
  try {
    const response = await apiClient.post('/properties', propertyData);
    return response.data;
  } catch (error) {
    console.error('Create property error:', error);
    throw error;
  }
};

// Update property
export const updateProperty = async (id: string, updates: Partial<Omit<Property, 'id' | 'createdAt' | 'agent'>>) => {
  try {
    const response = await apiClient.put(`/properties/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Update property error:', error);
    throw error;
  }
};

// Delete property
export const deleteProperty = async (id: string) => {
  try {
    await apiClient.delete(`/properties/${id}`);
  } catch (error) {
    console.error('Delete property error:', error);
    throw error;
  }
};

// Get featured properties
export const getFeaturedProperties = async () => {
  try {
    const response = await apiClient.get('/properties/featured/list');
    return response.data;
  } catch (error) {
    console.error('Get featured properties error:', error);
    throw error;
  }
};

// Get recent properties
export const getRecentProperties = async (limit: number = 3) => {
  try {
    const response = await apiClient.get('/properties/recent/list', { 
      params: { limit } 
    });
    return response.data;
  } catch (error) {
    console.error('Get recent properties error:', error);
    throw error;
  }
};

// Get agent properties
export const getAgentProperties = async (agentId: string) => {
  try {
    const response = await apiClient.get(`/users/${agentId}/properties`);
    return response.data;
  } catch (error) {
    console.error('Get agent properties error:', error);
    throw error;
  }
};
