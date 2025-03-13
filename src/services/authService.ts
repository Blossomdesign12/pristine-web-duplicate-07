
// This is a mock implementation of JWT auth
// In a real app, this would communicate with your backend API

import { User, UserRole } from "@/contexts/AuthContext";

// Mock JWT token generation function
const generateToken = (user: User): string => {
  // In a real application, this would create a proper JWT token using jsonwebtoken package
  // The token would be created on the server side, not client side
  return `mock-jwt-token-${user.id}-${Date.now()}`;
};

// Mock token verification function
const verifyToken = (token: string): User | null => {
  // In a real application, this would decode and verify the JWT token
  // This should be done on the server side
  if (token && token.startsWith('mock-jwt-token-')) {
    const parts = token.split('-');
    const userId = parts[3];
    
    // Get user from localStorage (simulating a database lookup)
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
  }
  return null;
};

// Mock login function
export const loginUser = async (email: string, password: string): Promise<{ user: User; token: string }> => {
  // In a real application, this would make an API call to your server
  // to validate credentials and get a JWT token
  console.log("Login attempt:", { email, password });
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate successful login with mock user data
  const mockUser: User = {
    id: "user-1",
    email,
    name: email.split('@')[0],
    role: "owner", // default role
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80"
  };
  
  // Generate a token
  const token = generateToken(mockUser);
  
  // Store token and user in localStorage
  localStorage.setItem("authToken", token);
  localStorage.setItem("user", JSON.stringify(mockUser));
  
  return { user: mockUser, token };
};

// Mock register function
export const registerUser = async (
  email: string, 
  password: string, 
  name: string, 
  role: UserRole
): Promise<{ user: User; token: string }> => {
  // In a real application, this would make an API call to your server
  // to create a new user and get a JWT token
  console.log("Registration attempt:", { email, password, name, role });
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate successful registration
  const mockUser: User = {
    id: "user-" + Date.now(),
    email,
    name,
    role,
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&h=120&q=80"
  };
  
  // Generate a token
  const token = generateToken(mockUser);
  
  // Store token and user in localStorage
  localStorage.setItem("authToken", token);
  localStorage.setItem("user", JSON.stringify(mockUser));
  
  return { user: mockUser, token };
};

// Mock logout function
export const logoutUser = (): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("authToken");
  return !!token;
};

// Get the current user
export const getCurrentUser = (): User | null => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;
  
  return verifyToken(token);
};
