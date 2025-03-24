
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
