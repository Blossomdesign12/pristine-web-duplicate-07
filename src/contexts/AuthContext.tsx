
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // This would be an API call in a real app
      // Simulating login with mock data
      const mockUser: User = {
        id: "user-1",
        name: "John Smith",
        email: email,
        role: "owner",
        phone: "+91 9876543210",
        avatar: "https://res.cloudinary.com/dw7w2at8k/image/upload/v1736785538/ed060b47018885c4c6847048f8a83758_qgbypi.png",
        bio: "I'm a property owner with multiple properties in Mumbai.",
        address: "123 Main Street, Bandra West",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400050",
        country: "India",
        company: "Smith Properties",
        website: "www.smithproperties.com",
        socialLinks: {
          facebook: "facebook.com/johnsmith",
          twitter: "twitter.com/johnsmith",
          linkedin: "linkedin.com/in/johnsmith",
          instagram: "instagram.com/johnsmith"
        },
        memberSince: "Jan 2023"
      };

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: string = "buyer") => {
    setIsLoading(true);
    try {
      // This would be an API call in a real app
      // Simulating registration with mock data
      const mockUser: User = {
        id: "user-" + Math.floor(Math.random() * 1000),
        name: name,
        email: email,
        role: role as "buyer" | "owner" | "agent" | "admin",
        avatar: "https://res.cloudinary.com/dw7w2at8k/image/upload/v1736785538/ed060b47018885c4c6847048f8a83758_qgbypi.png",
        memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      };

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
