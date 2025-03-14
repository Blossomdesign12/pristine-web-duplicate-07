
import apiClient from './apiService';
import { User } from '@/contexts/AuthContext';

// Get all agents
export const getAllAgents = async () => {
  try {
    const response = await apiClient.get('/users/agents');
    return response.data;
  } catch (error) {
    console.error('Get all agents error:', error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (id: string) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Get user by ID error:', error);
    throw error;
  }
};

// Get dashboard data
export const getDashboardData = async () => {
  try {
    const response = await apiClient.get('/users/dashboard/data');
    return response.data;
  } catch (error) {
    console.error('Get dashboard data error:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (
  updateData: { name?: string; phone?: string; description?: string; avatar?: string }
): Promise<User> => {
  try {
    const response = await apiClient.put('/users/profile', updateData);
    
    // Convert the response structure to match our app's User type
    const user: User = {
      id: response.data.id,
      email: response.data.email,
      name: response.data.name,
      role: response.data.role,
      avatar: response.data.avatar,
      phone: response.data.phone,
      description: response.data.description
    };
    
    return user;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

// Change password
export const changePassword = async (
  currentPassword: string, 
  newPassword: string
): Promise<void> => {
  try {
    await apiClient.put('/users/password', { currentPassword, newPassword });
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
};
