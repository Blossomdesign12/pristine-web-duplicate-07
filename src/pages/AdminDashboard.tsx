
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Home, 
  DollarSign, 
  Settings, 
  ChevronDown, 
  Search,
  Filter, 
  Eye, 
  Edit, 
  Trash,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  LineChart,
  User,
  Building2,
  Activity
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { properties, agents } from "@/lib/data";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Mock data for users
  const [users] = useState([
    { id: 1, name: "John Smith", email: "john@example.com", role: "agent", status: "active", joined: "2023-05-15" },
    { id: 2, name: "Maria Rodriguez", email: "maria@example.com", role: "owner", status: "active", joined: "2023-06-22" },
    { id: 3, name: "Robert Lee", email: "robert@example.com", role: "buyer", status: "active", joined: "2023-07-10" },
    { id: 4, name: "Sarah Johnson", email: "sarah@example.com", role: "agent", status: "active", joined: "2023-08-05" },
    { id: 5, name: "David Miller", email: "david@example.com", role: "owner", status: "pending", joined: "2023-09-18" },
    { id: 6, name: "Lisa Wang", email: "lisa@example.com", role: "buyer", status: "active", joined: "2023-10-01" },
    { id: 7, name: "Michael Brown", email: "michael@example.com", role: "agent", status: "active", joined: "2023-11-14" },
    { id: 8, name: "Jennifer Davis", email: "jennifer@example.com", role: "owner", status: "inactive", joined: "2023-12-20" },
    { id: 9, name: "William Johnson", email: "william@example.com", role: "admin", status: "active", joined: "2023-02-28" },
    { id: 10, name: "Emma Wilson", email: "emma@example.com", role: "buyer", status: "pending", joined: "2023-04-09" },
  ]);
  
  // Mock analytics data
  const analyticsData = {
    totalUsers: users.length,
    totalProperties: properties.length,
    totalAgents: agents.length,
    revenue: 125800,
    propertyViews: 2450,
    pendingApprovals: users.filter(u => u.status === "pending").length,
    recentActivity: [
      { id: 1, type: "property_added", user: "John Smith", time: "2 hours ago", details: "Added a new property in San Francisco" },
      { id: 2, type: "user_registered", user: "Emma Wilson", time: "5 hours ago", details: "New user registered" },
      { id: 3, type: "property_sold", user: "Sarah Johnson", time: "Yesterday", details: "Property #1245 marked as sold" },
      { id: 4, type: "agent_approved", user: "Admin", time: "2 days ago", details: "New agent Michael Brown approved" }
    ]
  };
  
  const handleApproveUser = (id: number) => {
    toast({
      title: "User Approved",
      description: "User has been successfully approved.",
    });
    // In a real app, this would call an API to update the user status
  };
  
  const handleRejectUser = (id: number) => {
    toast({
      title: "User Rejected",
      description: "User has been rejected.",
      variant: "destructive",
    });
    // In a real app, this would call an API to update the user status
  };
  
  const handleDeleteProperty = (id: number) => {
    toast({
      title: "Property Deleted",
      description: "Property has been successfully deleted.",
      variant: "destructive",
    });
    // In a real app, this would call an API to delete the property
  };
  
  // Mock user data when no user is authenticated
  const mockUser = user || {
    name: "Admin User",
    role: "admin",
    avatar: "https://via.placeholder.com/40"
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-estate-primary" />
            <span className="font-bold text-xl">Admin Portal</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search..." className="pl-10 w-64" />
            </div>
            
            <div className="flex items-center space-x-2">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium">{mockUser.name}</p>
                <p className="text-xs text-gray-500 capitalize">{mockUser.role}</p>
              </div>
            </div>
            
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <Home className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => window.print()}>Export Data</Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-gray-200 rounded-lg p-1">
            <TabsTrigger value="overview" className="rounded-md">Overview</TabsTrigger>
            <TabsTrigger value="users" className="rounded-md">Users</TabsTrigger>
            <TabsTrigger value="properties" className="rounded-md">Properties</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-md">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-md">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{analyticsData.totalUsers}</div>
                      <p className="text-xs text-green-500">+3 this month</p>
                    </div>
                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{analyticsData.totalProperties}</div>
                      <p className="text-xs text-green-500">+5 this month</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Home className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Agents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{analyticsData.totalAgents}</div>
                      <p className="text-xs text-green-500">+1 this month</p>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">${analyticsData.revenue.toLocaleString()}</div>
                      <p className="text-xs text-green-500">+8% from last month</p>
                    </div>
                    <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Alerts and Notifications */}
            {analyticsData.pendingApprovals > 0 && (
              <Alert className="bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">Pending Approvals</AlertTitle>
                <AlertDescription className="text-amber-700">
                  There are {analyticsData.pendingApprovals} users waiting for approval.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[320px]">
                    <div className="space-y-4">
                      {analyticsData.recentActivity.map((activity) => (
                        <div key={activity.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-start">
                            <div className="mr-4 mt-1">
                              {activity.type === "property_added" && (
                                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                                  <Home className="h-4 w-4 text-green-600" />
                                </div>
                              )}
                              {activity.type === "user_registered" && (
                                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User className="h-4 w-4 text-blue-600" />
                                </div>
                              )}
                              {activity.type === "property_sold" && (
                                <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                                  <DollarSign className="h-4 w-4 text-amber-600" />
                                </div>
                              )}
                              {activity.type === "agent_approved" && (
                                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                                  <CheckCircle className="h-4 w-4 text-purple-600" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{activity.details}</p>
                              <div className="flex text-xs text-gray-500 mt-1">
                                <span>{activity.user}</span>
                                <span className="mx-1">•</span>
                                <span>{activity.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              {/* Pending Approvals */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Pending Approvals</CardTitle>
                  <Button variant="outline" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[320px]">
                    <div className="space-y-4">
                      {users.filter(user => user.status === "pending").map((user) => (
                        <div key={user.id} className="border border-gray-100 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                <User className="h-6 w-6 text-gray-500" />
                              </div>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="capitalize">{user.role}</Badge>
                          </div>
                          <div className="flex items-center justify-end mt-4 space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                              onClick={() => handleApproveUser(user.id)}
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                              onClick={() => handleRejectUser(user.id)}
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      ))}
                      {users.filter(user => user.status === "pending").length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                          <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                          <h3 className="text-lg font-medium">All clear!</h3>
                          <p className="text-gray-500 mt-1">No pending approvals at the moment.</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search users..." className="pl-10 w-[250px]" />
                    </div>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                <User className="h-5 w-5 text-gray-500" />
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`capitalize ${
                                user.role === 'admin' ? 'bg-purple-50 text-purple-800 border-purple-200' : 
                                user.role === 'agent' ? 'bg-blue-50 text-blue-800 border-blue-200' : 
                                user.role === 'owner' ? 'bg-green-50 text-green-800 border-green-200' : 
                                'bg-gray-50 text-gray-800 border-gray-200'
                              }`}
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`capitalize ${
                                user.status === 'active' ? 'bg-green-50 text-green-800 border-green-200' : 
                                user.status === 'pending' ? 'bg-amber-50 text-amber-800 border-amber-200' : 
                                'bg-red-50 text-red-800 border-red-200'
                              }`}
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              {user.status === "pending" && (
                                <>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                    onClick={() => handleApproveUser(user.id)}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => handleRejectUser(user.id)}
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="properties" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Property Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search properties..." className="pl-10 w-[250px]" />
                    </div>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Agent</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {properties.slice(0, 10).map((property) => (
                        <TableRow key={property.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <img 
                                src={property.images[0]} 
                                alt={property.title} 
                                className="w-10 h-10 object-cover rounded-md mr-3"
                              />
                              <div>
                                <div className="font-medium truncate max-w-[250px]">{property.title}</div>
                                <div className="text-sm text-gray-500">{property.location.city}, {property.location.state}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>${property.price.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={`capitalize ${
                                property.features.status === 'for-sale' ? 'bg-green-50 text-green-800 border-green-200' : 
                                property.features.status === 'for-rent' ? 'bg-blue-50 text-blue-800 border-blue-200' : 
                                property.features.status === 'sold' ? 'bg-purple-50 text-purple-800 border-purple-200' : 
                                'bg-amber-50 text-amber-800 border-amber-200'
                              }`}
                            >
                              {property.features.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>{property.agent.name}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => navigate(`/property/${property.id}`)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteProperty(property.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Property Types</h3>
                      <PieChart className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="h-64 flex items-center justify-center border-t pt-4">
                      <div className="text-center">
                        <p className="text-gray-500 mb-2">Pie chart visualization would appear here</p>
                        <div className="flex justify-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                            <span>Houses (45%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                            <span>Apartments (30%)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                            <span>Condos (25%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Monthly Sales</h3>
                      <BarChart3 className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="h-64 flex items-center justify-center border-t pt-4">
                      <div className="text-center">
                        <p className="text-gray-500">Bar chart visualization would appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Website Traffic</h3>
                    <LineChart className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="h-64 flex items-center justify-center border-t pt-4">
                    <div className="text-center">
                      <p className="text-gray-500">Line chart visualization would appear here</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">General Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Site Name</label>
                          <Input defaultValue="FindHome Admin Portal" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Contact Email</label>
                          <Input defaultValue="admin@findhome.com" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Support Phone</label>
                          <Input defaultValue="+1 (555) 123-4567" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border p-3 rounded-lg">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive email notifications</p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-lg">
                          <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-gray-500">Receive SMS notifications</p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                        <div className="flex items-center justify-between border p-3 rounded-lg">
                          <div>
                            <p className="font-medium">System Alerts</p>
                            <p className="text-sm text-gray-500">Configure system alerts</p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border p-3 rounded-lg">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between border p-3 rounded-lg">
                        <div>
                          <p className="font-medium">Password Policy</p>
                          <p className="text-sm text-gray-500">Manage password requirements</p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between border p-3 rounded-lg">
                        <div>
                          <p className="font-medium">API Access</p>
                          <p className="text-sm text-gray-500">Manage API keys and permissions</p>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
