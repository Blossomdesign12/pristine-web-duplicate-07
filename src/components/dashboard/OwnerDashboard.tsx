
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Home, 
  DollarSign, 
  Eye, 
  Users,
  MessageSquare,
  BarChart,
  TrendingUp 
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart as RechartBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface OwnerDashboardProps {
  activeTab: string;
}

const OwnerDashboard = ({ activeTab }: OwnerDashboardProps) => {
  // Mock data - would come from API in real app
  const [properties] = useState([
    { id: "1", title: "Modern Apartment", status: "For Rent", views: 156, inquiries: 12 },
    { id: "2", title: "Beach House", status: "For Sale", views: 208, inquiries: 18 },
    { id: "3", title: "Mountain Cabin", status: "For Sale", views: 87, inquiries: 5 },
  ]);
  
  // Mock chart data
  const viewsData = [
    { month: "Jan", views: 85 },
    { month: "Feb", views: 110 },
    { month: "Mar", views: 140 },
    { month: "Apr", views: 120 },
    { month: "May", views: 180 },
    { month: "Jun", views: 240 },
  ];
  
  const inquiriesData = [
    { month: "Jan", inquiries: 5 },
    { month: "Feb", inquiries: 8 },
    { month: "Mar", inquiries: 12 },
    { month: "Apr", inquiries: 10 },
    { month: "May", inquiries: 15 },
    { month: "Jun", inquiries: 22 },
  ];

  if (activeTab === "properties") {
    return (
      <div>
        <h2 className="text-xl font-bold mb-6">My Properties</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Views</th>
                  <th className="px-4 py-2 text-left">Inquiries</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="border-b">
                    <td className="px-4 py-2">{property.title}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        property.status === "For Rent" ? "bg-blue-100 text-blue-800" : 
                        "bg-green-100 text-green-800"
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{property.views}</td>
                    <td className="px-4 py-2">{property.inquiries}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          View
                        </Button>
                      </div>
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
        <h2 className="text-xl font-bold mb-6">My Listings</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="border rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-200">
                  {/* Would display property image in a real app */}
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">{property.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">Status: {property.status}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{property.views} views</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{property.inquiries} inquiries</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Default: Overview
  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{properties.length}</div>
              <Home className="h-8 w-8 text-estate-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {properties.reduce((sum, item) => sum + item.views, 0)}
              </div>
              <Eye className="h-8 w-8 text-estate-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {properties.reduce((sum, item) => sum + item.inquiries, 0)}
              </div>
              <MessageSquare className="h-8 w-8 text-estate-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Estimated Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$1.2M</div>
              <DollarSign className="h-8 w-8 text-estate-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Property Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartBarChart data={inquiriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="inquiries" fill="#82ca9d" />
              </RechartBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-2 border-estate-primary pl-4">
              <p className="font-medium">New property inquiry</p>
              <p className="text-sm text-gray-500">Someone is interested in Beach House</p>
              <p className="text-xs text-gray-400">Today, 11:30 AM</p>
            </div>
            <div className="border-l-2 border-estate-primary pl-4">
              <p className="font-medium">Property viewed</p>
              <p className="text-sm text-gray-500">Modern Apartment was viewed 5 times</p>
              <p className="text-xs text-gray-400">Yesterday</p>
            </div>
            <div className="border-l-2 border-estate-primary pl-4">
              <p className="font-medium">Offer received</p>
              <p className="text-sm text-gray-500">You received an offer for Mountain Cabin</p>
              <p className="text-xs text-gray-400">2 days ago</p>
            </div>
          </div>
          <Link to="#">
            <Button variant="ghost" className="mt-4 w-full">
              View All Activities
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerDashboard;
