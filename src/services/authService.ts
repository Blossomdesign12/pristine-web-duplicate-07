
// Update the imports to use the User type from types/user
import { User, UserRole } from '@/types/user';

// Mock user data
const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john@example.com",
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
  },
  {
    id: "user-2",
    name: "Emily Johnson",
    email: "emily@example.com",
    role: "agent",
    phone: "+91 8765432109",
    avatar: "https://res.cloudinary.com/dw7w2at8k/image/upload/v1736785538/7975151ffd45504df14dfc8cb4c55a1a_ccltzx.png",
    bio: "Experienced real estate agent with 5+ years in the industry.",
    memberSince: "Mar 2022"
  }
];

// Function to authenticate a user
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // In a real app, this would be an API call that checks credentials
  const user = mockUsers.find(u => u.email === email);
  
  // For demo purposes, any password will work
  if (user) {
    return user;
  }
  
  return null;
};

// Function to register a new user
export const registerUser = async (
  name: string, 
  email: string, 
  password: string, 
  role: string = UserRole.BUYER
): Promise<User> => {
  // In a real app, this would create a new user in the database
  const newUser: User = {
    id: `user-${Math.floor(Math.random() * 1000)}`,
    name,
    email,
    role: role as 'buyer' | 'owner' | 'agent' | 'admin',
    avatar: "https://res.cloudinary.com/dw7w2at8k/image/upload/v1736785538/ed060b47018885c4c6847048f8a83758_qgbypi.png",
    memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  };
  
  return newUser;
};
