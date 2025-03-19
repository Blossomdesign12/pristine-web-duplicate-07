
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';


// Pages
import Index from './pages/Index';
import PropertyDetails from './pages/PropertyDetails';
import Properties from './pages/Properties';
import PropertiesForSale from './pages/PropertiesForSale';
import PropertiesForRent from './pages/PropertiesForRent';
import Loans from './pages/Loans';
import Contact from './pages/Contact';
import Agents from './pages/Agents';
import AgentDetails from './pages/AgentDetails';
import AddProperty from './pages/AddProperty';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import SiteMap from './pages/SiteMap';

// Components
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from './components/ProtectedRoute';

// Context
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets or data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties-for-sale" element={<PropertiesForSale />} />
          <Route path="/properties-for-rent" element={<PropertiesForRent />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agent/:id" element={<AgentDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sitemap" element={<SiteMap />} />
          
          {/* Protected Routes */}
          {/* <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/add-property" element={<ProtectedRoute><AddProperty /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* 404 and redirects */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
