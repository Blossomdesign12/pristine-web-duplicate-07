
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  User, 
  Home,
  MessageSquare,
  DollarSign,
  Calendar
} from "lucide-react";

interface AgentDashboardProps {
  activeTab: string;
}

const AgentDashboard = ({ activeTab }: AgentDashboardProps) => {
  // Mock data - would come from API in real app
  const [clients] = useState([
    { id: "1", name: "John Smith", email: "john@example.com", status: "active" },
    { id: "2", name: "Emily Johnson", email: "emily@example.com", status: "active" },
    { id: "3", name: "Robert Davis", email: "robert@example.com", status: "inactive" },
  ]);
  
  const [properties] = useState([
    { id: "1", title: "Modern Apartment", address: "123 Main St", status: "active", views: 45 },
    { id: "2", title: "Beach House", address: "456 Ocean Ave", status: "active", views: 72 },
    { id: "3", title: "Mountain Cabin", address: "789 Forest Rd", status: "pending", views: 31 },
  ]);

  if (activeTab === "clients") {
    return (
      <div>
        <h2 className="text-xl font-bold mb-6">My Clients</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id} className="border-b">
                    <td className="px-4 py-2">{client.name}</td>
                    <td className="px-4 py-2">{client.email}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        client.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <Button variant="ghost" size="sm">
                        Contact
                      </Button>
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

  if (activeTab === "properties" || activeTab === "listings") {
    const title = activeTab === "properties" ? "My Properties" : "My Listings";
    
    return (
      <div>
        <h2 className="text-xl font-bold mb-6">{title}</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Address</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Views</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="border-b">
                    <td className="px-4 py-2">{property.title}</td>
                    <td className="px-4 py-2">{property.address}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        property.status === "active" ? "bg-green-100 text-green-800" : 
                        property.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{property.views}</td>
                    <td className="px-4 py-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
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

  // Default: Overview
  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{clients.length}</div>
              <User className="h-8 w-8 text-estate-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {properties.filter(p => p.status === "active").length}
              </div>
              <Home className="h-8 w-8 text-estate-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              New Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12</div>
              <MessageSquare className="h-8 w-8 text-estate-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">$5,240</div>
              <DollarSign className="h-8 w-8 text-estate-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Calendar className="h-5 w-5 text-estate-primary mt-0.5" />
                <div>
                  <p className="font-medium">Property Viewing: Modern Apartment</p>
                  <p className="text-sm text-gray-500">Tomorrow, 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Calendar className="h-5 w-5 text-estate-primary mt-0.5" />
                <div>
                  <p className="font-medium">Client Meeting: John Smith</p>
                  <p className="text-sm text-gray-500">Thursday, 10:30 AM</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Calendar className="h-5 w-5 text-estate-primary mt-0.5" />
                <div>
                  <p className="font-medium">Open House: Beach House</p>
                  <p className="text-sm text-gray-500">Saturday, 1:00 PM - 4:00 PM</p>
                </div>
              </div>
            </div>
            <Link to="#">
              <Button variant="ghost" className="mt-4 w-full">
                View All Appointments
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-2 border-estate-primary pl-4">
                <p className="font-medium">New client inquiry</p>
                <p className="text-sm text-gray-500">Michael Brown is interested in Beach House</p>
                <p className="text-xs text-gray-400">Today, 9:45 AM</p>
              </div>
              <div className="border-l-2 border-estate-primary pl-4">
                <p className="font-medium">Property status updated</p>
                <p className="text-sm text-gray-500">Mountain Cabin is now pending</p>
                <p className="text-xs text-gray-400">Yesterday, 3:20 PM</p>
              </div>
              <div className="border-l-2 border-estate-primary pl-4">
                <p className="font-medium">Offer accepted</p>
                <p className="text-sm text-gray-500">Emily Johnson's offer on Lakeside Villa was accepted</p>
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
    </div>
  );
};

export default AgentDashboard;
