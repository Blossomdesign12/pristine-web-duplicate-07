
import apiClient from './apiService';
import { User, UserRole } from "@/contexts/AuthContext";

// Login user
export const loginUser = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    
    // Store token in localStorage
    localStorage.setItem("authToken", response.data.token);
    
    // Convert the response structure to match our app's User type
    const user: User = {
      id: response.data.user.id,
      email: response.data.user.email,
      name: response.data.user.name,
      role: response.data.user.role as UserRole,
      avatar: response.data.user.avatar,
      phone: response.data.user.phone,
      description: response.data.user.description
    };
    
    return { user, token: response.data.token };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register user
export const registerUser = async (
  email: string, 
  password: string, 
  name: string, 
  role: UserRole
): Promise<{ user: User; token: string }> => {
  try {
    const response = await apiClient.post('/auth/register', { 
      email, 
      password, 
      name, 
      role 
    });
    
    // Store token in localStorage
    localStorage.setItem("authToken", response.data.token);
    
    // Convert the response structure to match our app's User type
    const user: User = {
      id: response.data.user.id,
      email: response.data.user.email,
      name: response.data.user.name,
      role: response.data.user.role as UserRole,
      avatar: response.data.user.avatar
    };
    
    return { user, token: response.data.token };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem("authToken");
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return null;
    
    const response = await apiClient.get('/auth/me');
    
    // Convert the response structure to match our app's User type
    const user: User = {
      id: response.data.id,
      email: response.data.email,
      name: response.data.name,
      role: response.data.role as UserRole,
      avatar: response.data.avatar,
      phone: response.data.phone,
      description: response.data.description
    };
    
    return user;
  } catch (error) {
    console.error('Get current user error:', error);
    localStorage.removeItem("authToken");
    return null;
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
      role: response.data.role as UserRole,
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
