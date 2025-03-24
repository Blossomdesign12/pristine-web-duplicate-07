
import { Property } from '@/lib/data';
import { getAuthToken } from './authService';

// Get auth token for API requests
const getHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Add a property
export const addProperty = async (propertyData: Partial<Property>): Promise<Property> => {
  try {
    const response = await fetch('http://localhost:5000/properties', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(propertyData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add property');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};

// Get properties by status (for-sale, for-rent, etc)
export const getPropertiesByStatus = async (status: string): Promise<Property[]> => {
  try {
    const response = await fetch(`http://localhost:5000/properties/status/${status}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch properties');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching properties by status:', error);
    throw error;
  }
};

// Get all properties for the current user
export const getUserProperties = async (): Promise<Property[]> => {
  try {
    const response = await fetch('http://localhost:5000/properties/user/me', {
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user properties');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user properties:', error);
    throw error;
  }
};

// Get a property by ID
export const getPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const response = await fetch(`http://localhost:5000/properties/${id}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch property');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
};

// Update a property
export const updateProperty = async (id: string, propertyData: Partial<Property>): Promise<Property> => {
  try {
    const response = await fetch(`http://localhost:5000/properties/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(propertyData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update property');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};

// Delete a property
export const deleteProperty = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:5000/properties/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete property');
    }

    return true;
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};
