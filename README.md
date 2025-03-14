
# Jugyah - Mumbai Real Estate Platform

Jugyah is a comprehensive real estate platform designed specifically for the Mumbai market, allowing users to buy, sell, and rent properties across Mumbai and surrounding areas.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Data Structure](#data-structure)
- [Authentication](#authentication)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Future Roadmap](#future-roadmap)

## Overview

Jugyah provides a complete real estate solution with features tailored for the Indian market, specifically Mumbai. The platform serves different user roles including buyers, property owners, real estate agents, and administrators.

## Features

### For Property Seekers
- Browse property listings with detailed information
- Search for properties with advanced filters
- View property details including floor plans
- Filter by BHK configuration, location, and price
- Save favorite properties
- Contact property agents directly

### For Property Owners
- List properties for sale or rent
- Manage property listings
- Track property views and inquiries
- Connect with potential buyers

### For Agents
- Manage client portfolios
- List properties for clients
- Track leads and inquiries
- Communicate with potential buyers

### For Administrators
- Full system oversight
- User management
- Property approval workflow
- Analytics and reporting

## Technology Stack

### MERN Stack
- **MongoDB**: NoSQL database for storing property listings, user data, and more
- **Express.js**: Backend framework for handling API requests
- **React**: Frontend library for building user interfaces
- **Node.js**: JavaScript runtime for building the backend server

### Frontend
- **Framework**: React 18.3.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI-based components)
- **Icons**: Lucide React
- **Routing**: React Router Dom 6.26.2
- **State Management**: React Context API, Tanstack Query
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner for toast notifications

### Backend
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Token)
- **API Documentation**: Swagger/OpenAPI (planned)

### Authentication
- **Method**: JWT (JSON Web Token)
- **Password Hashing**: bcryptjs
- **User Roles**: Buyer, Owner, Agent, Admin

## Project Structure

The project follows a full-stack MERN architecture with the following structure:

```
jugyah/
├── server/               # Backend Node.js/Express server
│   ├── controllers/      # API route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # Express routes
│   ├── middleware/       # Custom middleware
│   └── index.js          # Server entry point
├── src/                  # Frontend React app
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # Base UI components from shadcn
│   │   └── dashboard/    # Dashboard-specific components
│   ├── contexts/         # React contexts for state management
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and data
│   ├── pages/            # Page components
│   ├── services/         # API and service integrations
│   └── assets/           # Static assets
└── package.json          # Project dependencies and scripts
```

## Design System

### Color Scheme
The website uses a clean, black and white color scheme:

- **Primary**: Black (#000000)
- **Primary Foreground**: White (#FFFFFF)
- **Secondary**: Light Gray (#F1F1F1)
- **Secondary Foreground**: Black (#000000)
- **Background**: White (#FFFFFF)
- **Foreground**: Black (#000000)
- **Accent**: Light Gray (#F1F1F1)
- **Border**: Light Gray (#E5E7EB)

### Typography
- **Primary Font**: Figtree (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Base Size**: 16px
- **Heading Sizes**:
  - H1: 3rem (48px)
  - H2: 2.25rem (36px)
  - H3: 1.5rem (24px)
  - H4: 1.25rem (20px)

### Components
The UI is built using shadcn/ui components, which provide a consistent design system. Key components include:

- **Buttons**: Primary (black background, white text), Secondary (light gray background, black text), and Outline variants
- **Cards**: Used for property listings and information panels
- **Forms**: Consistent styling with labels, validation, and error states
- **Navigation**: Header with dropdown menus, mobile-responsive sidebar
- **Property Cards**: Standardized display of property information

## Data Structure

### Property Model
Properties are structured with the following key attributes:

```typescript
interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    lat?: number;
    lng?: number;
  };
  features: {
    bedrooms: number; // BHK
    bathrooms: number;
    area: number; // square feet
    yearBuilt: number;
    propertyType: 'apartment' | 'house' | 'villa' | 'plot' | 'penthouse';
    status: 'for-sale' | 'for-rent' | 'sold' | 'pending';
    floorPlan?: string; // URL to floor plan image
  };
  amenities: string[];
  images: string[];
  agent: {
    id: string;
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  featured: boolean;
  createdAt: string;
}
```

### User Roles
- **Buyer**: Can browse, favorite, and make inquiries on properties
- **Owner**: Can list and manage their properties
- **Agent**: Can list properties and manage client relationships
- **Admin**: Full system access and management

## Authentication

Authentication is handled through JWT tokens with different permission levels based on user roles. The authentication flow includes:

1. Registration: Users create an account with email, password and role
2. Login: Users authenticate with email and password to receive a JWT token
3. Token validation: Token is validated on protected routes
4. Role-based access control: Different permissions based on user roles
5. Password hashing: Passwords are securely hashed using bcryptjs

## Installation

To set up the project locally:

```sh
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd jugyah

# Install frontend dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env file with your configuration

# Install backend dependencies
cd server
npm install

# Start the backend server
npm run dev

# In a new terminal, start the frontend development server
cd ..
npm run dev
```

## Development

### Backend Development

The backend is built with Express.js and MongoDB. To develop:

1. Ensure MongoDB is running locally or update the connection string in `.env`
2. Use `npm run dev` in the server directory to start the server with hot-reload
3. API endpoints are available at `http://localhost:5000/api`

### Frontend Development

The frontend is built with React and Vite. To develop:

1. Run `npm run dev` in the root directory
2. Access the app at `http://localhost:8080`

### Adding New Properties

Properties can be added through the "Add Property" page, accessible from the dashboard. The form includes fields for:

- Property details (title, description, price)
- Location information
- Features (BHK, bathrooms, area)
- Amenities
- Images and floor plans

## Deployment

The application consists of two parts that need to be deployed:

### Backend Deployment
1. **Setup environment variables** for production
2. **Build the server**: Ensure all dependencies are installed
3. **Deploy to a hosting service** like:
   - Heroku
   - Digital Ocean
   - AWS
   - Railway

### Frontend Deployment
1. **Build the React app**: `npm run build`
2. **Deploy to a hosting service** like:
   - Vercel (recommended)
   - Netlify
   - GitHub Pages
   - Firebase Hosting

### MongoDB Deployment
For production, use MongoDB Atlas to host your database securely.

## Future Roadmap

1. **Phase 1: Core Functionality** ✅
   - Setup project structure
   - Create basic UI components
   - Implement routing
   - Create mock data

2. **Phase 2: Authentication and User Roles** ✅
   - Implement JWT authentication
   - Set up user roles and permissions
   - Create login and registration pages
   - Build protected routes

3. **Phase 3: Property Listings** ✅
   - Implement property listing pages
   - Create property details view
   - Add property search functionality
   - Build property cards and gallery

4. **Phase 4: User Dashboard** ✅
   - Create role-specific dashboards
   - Implement property management
   - Build analytics and statistics
   - Add saved properties for buyers

5. **Phase 5: Backend Integration** ✅
   - Connect to MongoDB for data storage
   - Implement real API endpoints
   - Set up authentication server
   - Replace mock data with real data

6. **Phase 6: Advanced Features** (Planned)
   - Implement real-time notifications
   - Add payment processing
   - Create advanced search filters
   - Build appointment scheduling
   - Add map integration for property locations

## How to Run this MERN Stack Application

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Running the Backend
```sh
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Set up environment variables (copy from .env.example)
cp .env.example .env

# Edit .env with your MongoDB connection string and JWT secret

# Start the server
npm run dev
```

### Running the Frontend
```sh
# From the project root
npm install

# Start the frontend development server
npm run dev
```

### Accessing the Application
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000/api

### Test Accounts
For testing, you can register new accounts or use these credentials if provided in the seed data:

- Admin: admin@jugyah.com / password
- Agent: agent@jugyah.com / password
- Owner: owner@jugyah.com / password
- Buyer: buyer@jugyah.com / password
