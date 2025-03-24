
import { User, UserRole } from '@/types/user';

// Function to authenticate a user
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    return {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      phone: data.user.phone,
      avatar: data.user.avatar,
      bio: data.user.description,
      memberSince: data.user.createdAt ? new Date(data.user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : undefined,
      // Add other fields as they come from the backend
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

// Function to register a new user
export const registerUser = async (
  name: string, 
  email: string, 
  password: string, 
  role: string = UserRole.BUYER
): Promise<User> => {
  try {
    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    return {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      avatar: data.user.avatar,
      memberSince: data.user.createdAt ? new Date(data.user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : undefined,
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Function to handle OAuth redirect
export const handleOAuthRedirect = (): boolean => {
  // Check for token in URL (from OAuth redirect)
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  
  if (token) {
    // Store the token in localStorage
    localStorage.setItem('token', token);
    
    // Also fetch user data and store it
    fetchUserData(token)
      .then(userData => {
        if (userData) {
          localStorage.setItem('user', JSON.stringify(userData));
          window.location.href = '/dashboard';
        }
      })
      .catch(err => console.error('Error fetching user data:', err));
    
    return true;
  }
  
  return false;
};

// Function to fetch user data with token
const fetchUserData = async (token: string): Promise<User | null> => {
  try {
    const response = await fetch('http://localhost:5000/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const data = await response.json();
    return {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role,
      phone: data.user.phone,
      avatar: data.user.avatar,
      bio: data.user.description,
      memberSince: data.user.createdAt ? new Date(data.user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : undefined,
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

// Helper function to get stored token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};
