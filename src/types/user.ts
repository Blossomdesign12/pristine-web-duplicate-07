
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'owner' | 'agent' | 'admin';
  phone?: string;
  avatar?: string;
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  company?: string;
  website?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  memberSince?: string;
  description?: string;
}

export enum UserRole {
  BUYER = 'buyer',
  OWNER = 'owner',
  AGENT = 'agent',
  ADMIN = 'admin'
}
