
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building2, Clock, DollarSign, Eye, Home, Plus, MessageSquare, Users, User } from "lucide-react";
import { Property, properties } from "@/lib/data";

interface AgentDashboardProps {
  activeTab: string;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({ activeTab }) => {
  // Mock data - would come from API calls in a real app
  const [myProperties] = useState<Property[]>(properties.slice(0, 3));
  const [myClients] = useState([
    { id: 1, name: "John Smith", email: "john@example.com", role: "Buyer", status: "Active" },
    { id: 2, name: "Emma Roberts", email: "emma@example.com", role: "Seller", status: "Active" },
    { id: 3, name: "Michael Chen", email: "michael@example.com", role: "Buyer", status: "New Lead" }
  ]);
  
  if (activeTab === "properties") {
    return (
      <div>
        <h2 className="text-xl font-bold mb-6">Properties I'm Managing</h2>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {property.id % 2 === 0 ? "Emma Roberts" : "Michael Chen"}
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
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No properties yet</h3>
            <p className="text-gray-500 mb-6">
              Start listing properties for your clients.
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
  
  if (activeTab === "clients") {
    return (
      <div>
        <h2 className="text-xl font-bold mb-6">My Clients</h2>
        <div className="flex justify-end mb-4">
          <Button className="bg-estate-primary hover:bg-estate-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {myClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`/client/${client.id}`} className="text-estate-primary hover:underline mr-4">View</Link>
                      <button className="text-estate-primary hover:underline">Message</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
            <p className="text-3xl font-bold mt-2">{myProperties.length}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Total Views</h3>
              <Eye className="h-6 w-6 text-estate-primary" />
            </div>
            <p className="text-3xl font-bold mt-2">2,418</p>
            <p className="text-green-500 text-sm mt-1">+18% from last month</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Client Inquiries</h3>
              <MessageSquare className="h-6 w-6 text-estate-primary" />
            </div>
            <p className="text-3xl font-bold mt-2">24</p>
            <p className="text-green-500 text-sm mt-1">+5 new this week</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-lg font-medium mb-4">Listing Performance</h3>
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
            <h3 className="text-lg font-medium">Clients</h3>
            <Users className="h-6 w-6 text-estate-primary" />
          </div>
          <p className="text-3xl font-bold mt-2">{myClients.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Commission</h3>
            <DollarSign className="h-6 w-6 text-estate-primary" />
          </div>
          <p className="text-3xl font-bold mt-2">$24,500</p>
          <p className="text-green-500 text-sm mt-1">+8% from last month</p>
        </div>
      </div>
      
      {/* Recent Properties */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myProperties.map((property, index) => (
            <Link to={`/property/${property.id}`} key={property.id} className="block">
              <div className="group relative rounded-lg overflow-hidden border border-gray-200 transition-all hover:shadow-md">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img 
                    src={property.images[0]} 
                    alt={property.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-1">{property.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {property.location.city}, {property.location.state}
                  </p>
                  <p className="font-medium text-estate-primary mt-2">
                    ${property.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <Link to="/dashboard?tab=properties">
            <Button variant="outline">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Client List */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Recent Clients</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {myClients.slice(0, 2).map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      client.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/client/${client.id}`} className="text-estate-primary hover:underline mr-4">View</Link>
                    <button className="text-estate-primary hover:underline">Message</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Link to="/dashboard?tab=clients">
            <Button variant="outline">
              View All Clients
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
