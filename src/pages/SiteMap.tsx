
import { Link } from 'react-router-dom';
import Layout from "@/components/Layout";
import { cities } from '@/lib/data';
import { ChevronRight } from 'lucide-react';

const SiteMap = () => {
  return (
    <Layout>
      <main className="flex-grow pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-black py-12 md:py-20">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Site Map
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Easily navigate through all sections of our website
            </p>
          </div>
        </section>
        
        <section className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Main Pages */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Main Pages</h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/properties" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    All Properties
                  </Link>
                </li>
                <li>
                  <Link to="/properties-for-sale" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    Properties For Sale
                  </Link>
                </li>
                <li>
                  <Link to="/properties-for-rent" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    Properties For Rent
                  </Link>
                </li>
                <li>
                  <Link to="/agents" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    Agents
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/loans" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    Loans
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Properties By City */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Properties by Location</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">For Sale</h3>
                  <ul className="space-y-3">
                    {cities.map(city => (
                      <li key={`sale-${city}`}>
                        <Link 
                          to={`/properties-for-sale?city=${city}`} 
                          className="flex items-center hover:text-black text-gray-600 group"
                        >
                          <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                          {city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">For Rent</h3>
                  <ul className="space-y-3">
                    {cities.map(city => (
                      <li key={`rent-${city}`}>
                        <Link 
                          to={`/properties-for-rent?city=${city}`} 
                          className="flex items-center hover:text-black text-gray-600 group"
                        >
                          <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                          {city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* User Account */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">User Account</h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/login" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/messages" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    Messages
                  </Link>
                </li>
                <li>
                  <Link to="/notifications" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link to="/add-property" className="flex items-center hover:text-black text-gray-600 group">
                    <ChevronRight size={16} className="mr-2 text-gray-400 group-hover:text-black" />
                    Add Property
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default SiteMap;
