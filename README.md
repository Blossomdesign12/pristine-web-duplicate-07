
#Jugyah

Jugyah is a complete real estate platform where users can buy, sell, and rent properties.

## Project info

This project is a real estate marketplace built with React, TypeScript, and various modern technologies. It allows users to:

- Browse property listings
- Search for properties with filters
- View detailed property information
- Save favorite properties
- Buy, sell, and rent properties
- Contact agents and property owners

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn-ui components
- **Authentication**: JWT (JSON Web Token)
- **Messaging**: Firebase
- **Database**: MongoDB
- **State Management**: React Context API, Tanstack Query

## Project Structure

The project is organized into the following main sections:

### Authentication

- JWT-based authentication with user roles:
  - Buyer: Can browse, favorite, and make offers on properties
  - Owner: Can list and manage their properties
  - Agent: Can list properties and manage clients
  - Admin: Full system access

### Property Management

- Property listing with detailed information
- Property search with filters
- Property creation and editing
- Property image gallery
- Various property types support

### User Dashboard

- Role-based dashboards for buyers, owners, agents, and admins
- Analytics and statistics for property owners and agents
- Saved properties for buyers
- Property management for owners and agents

### Messaging

- In-app messaging using Firebase
- Real-time notifications
- Chat between buyers, agents, and property owners

## Project Roadmap

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

5. **Phase 5: Backend Integration** (In Progress)
   - Connect to MongoDB for data storage
   - Implement Firebase for messaging
   - Set up real API endpoints
   - Replace mock data with real data

6. **Phase 6: Advanced Features** (Planned)
   - Implement real-time notifications
   - Add payment processing
   - Create advanced search filters
   - Build appointment scheduling
   - Add map integration

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## How can I deploy this project?

FindHome can be deployed to various hosting platforms such as Netlify, Vercel, or GitHub Pages. Detailed deployment instructions coming soon.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
