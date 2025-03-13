
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Clock, DollarSign, Eye, Home, Plus, Clock8 } from "lucide-react";
import { Property, properties } from "@/lib/data";

interface OwnerDashboardProps {
  activeTab: string;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ activeTab }) => {
  // Mock data - would come from API calls in a real app
  const [myProperties] = useState<Property[]>(properties.slice(0, 4));
  
  if (activeTab === "properties") {
    return (
      <div>
        <h2 className="text-xl font-bold mb-6">My Properties</h2>
        <div className="flex justify-end mb-4">
          <Link to="/add-property">
            <Button className="bg-estate-primary hover:bg-estate-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </Link>
        </div>
        {myProperties.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listed Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {myProperties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                            <img src={property.images[0]} alt={property.title} className="h-10 w-10 object-cover" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">{property.title}</div>
                            <div className="text-sm text-gray-500">{property.location.city}, {property.location.state}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${property.price.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">245</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 12, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link to={`/property/${property.id}`} className="text-estate-primary hover:underline mr-4">View</Link>
                        <Link to={`/edit-property/${property.id}`} className="text-estate-primary hover:underline">Edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No properties yet</h3>
            <p className="text-gray-500 mb-6">
              Start listing your properties to sell or rent them out.
            </p>
            <Link to="/add-property">
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Property
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
  
  if (activeTab === "listings") {
    return (
      <div>
        <h2 className="text-xl font-bold mb-6">Property Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Active Listings</h3>
              <Home className="h-6 w-6 text-estate-primary" />
            </div>
            <p className="text-3xl font-bold mt-2">4</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Total Views</h3>
              <Eye className="h-6 w-6 text-estate-primary" />
            </div>
            <p className="text-3xl font-bold mt-2">1,243</p>
            <p className="text-green-500 text-sm mt-1">+12% from last month</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Avg. Time Listed</h3>
              <Clock8 className="h-6 w-6 text-estate-primary" />
            </div>
            <p className="text-3xl font-bold mt-2">24 days</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-lg font-medium mb-4">Property Performance</h3>
          <p className="text-gray-500 mb-4">
            This section would display charts showing property views, inquiries, and other metrics over time.
          </p>
          <Button variant="outline">
            View Detailed Analytics
          </Button>
        </div>
      </div>
    );
  }
  
  // Default: Overview
  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Properties</h3>
            <Building2 className="h-6 w-6 text-estate-primary" />
          </div>
          <p className="text-3xl font-bold mt-2">{myProperties.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Pending Sales</h3>
            <Clock className="h-6 w-6 text-estate-primary" />
          </div>
          <p className="text-3xl font-bold mt-2">1</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Total Revenue</h3>
            <DollarSign className="h-6 w-6 text-estate-primary" />
          </div>
          <p className="text-3xl font-bold mt-2">$124,500</p>
        </div>
      </div>
      
      {/* Recent Properties */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">My Properties</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {myProperties.slice(0, 2).map((property) => (
                <tr key={property.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                        <img src={property.images[0]} alt={property.title} className="h-10 w-10 object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">{property.title}</div>
                        <div className="text-sm text-gray-500">{property.location.city}, {property.location.state}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${property.price.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">245</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/property/${property.id}`} className="text-estate-primary hover:underline mr-4">View</Link>
                    <Link to={`/edit-property/${property.id}`} className="text-estate-primary hover:underline">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Link to="/dashboard?tab=properties">
            <Button variant="outline">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          <li className="flex items-start space-x-3">
            <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Eye className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">10 new views on <span className="text-estate-primary">Modern Apartment in Downtown</span></p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">New offer received on <span className="text-estate-primary">Beach Villa with Ocean View</span></p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </li>
          <li className="flex items-start space-x-3">
            <div className="flex-shrink-0 h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">New message from <span className="text-estate-primary">Sarah Johnson</span> about your property</p>
              <p className="text-xs text-gray-500 mt-1">2 days ago</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OwnerDashboard;
