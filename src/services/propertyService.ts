
import { Property } from '@/lib/data';

// Mock function to simulate adding a property
export const addProperty = async (propertyData: Partial<Property>): Promise<Property> => {
  // In a real app, this would be an API call
  console.log('Adding property:', propertyData);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return a mock response with the ID
  return {
    ...propertyData,
    id: `prop-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
  } as Property;
};

// Get properties by status (for-sale, for-rent, etc)
export const getPropertiesByStatus = async (status: string): Promise<Property[]> => {
  // In a real app, this would fetch from the backend API
  console.log('Fetching properties with status:', status);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For now, use mock data from lib/data
  const allProperties = await import('@/lib/data').then(module => module.properties);
  
  // Filter by status
  return allProperties.filter(property => property.features.status === status);
};

// Get all properties for the current user
export const getUserProperties = async (): Promise<Property[]> => {
  // In a real app, this would fetch from the backend API with auth
  console.log('Fetching user properties');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For now, use mock data from lib/data
  const allProperties = await import('@/lib/data').then(module => module.properties);
  
  // Return all properties for mock purposes (in real app would filter by user ID)
  return allProperties;
};

// Get a property by ID
export const getPropertyById = async (id: string): Promise<Property | null> => {
  console.log('Fetching property with ID:', id);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For now, use mock data from lib/data
  const allProperties = await import('@/lib/data').then(module => module.properties);
  
  // Find the property with the matching ID
  const property = allProperties.find(prop => prop.id === id);
  
  return property || null;
};

// Update a property
export const updateProperty = async (id: string, propertyData: Partial<Property>): Promise<Property> => {
  console.log('Updating property:', id, propertyData);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // For a real app, this would update the property in the database
  return {
    ...propertyData,
    id,
    updatedAt: new Date().toISOString(),
  } as Property;
};

// Delete a property
export const deleteProperty = async (id: string): Promise<boolean> => {
  console.log('Deleting property:', id);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would delete from the database
  // Return success
  return true;
};
