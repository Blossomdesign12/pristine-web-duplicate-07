
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, BarChart4, Users, Home, MessageSquare, Clock, Eye } from "lucide-react";
import { formatPrice } from "@/lib/data";

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
        <Button>Add New Listing</Button>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+4 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Sales</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Commission</CardTitle>
                <BarChart4 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$24,500</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent activity and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {["JD", "RB", "SM"][i]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {[
                            "New inquiry for 123 Main St",
                            "Showing scheduled for 456 Park Ave",
                            "Offer received for 789 Broadway",
                          ][i]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {["2 hours ago", "Yesterday", "2 days ago"][i]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>
                  Your scheduled appointments for the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {[
                            "Property Showing at 123 Main St",
                            "Client Meeting with John Doe",
                            "Open House at 789 Broadway",
                          ][i]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {[
                            "Today, 2:00 PM",
                            "Tomorrow, 10:00 AM",
                            "Saturday, 1:00 PM",
                          ][i]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="listings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>My Listings</CardTitle>
              <CardDescription>
                Manage your property listings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 p-4 border rounded-md">
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-md shrink-0 relative overflow-hidden">
                        <img 
                          src={`https://images.unsplash.com/photo-${["1564013799919-ab600027ffc6", "1512917774080-9991f1c4c750", "1493809842364-78817add7ffb"][i]}?auto=format&fit=crop&w=100&q=80`} 
                          alt="Property" 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{["Modern Apartment Downtown", "Luxury Villa with Pool", "Cozy Studio in City Center"][i]}</h3>
                        <p className="text-sm text-muted-foreground">{["123 Main St, Austin, TX", "456 Park Ave, Miami, FL", "789 Broadway, New York, NY"][i]}</p>
                        <div className="flex items-center mt-1">
                          <Badge variant={["success", "default", "outline"][i]}>
                            {["For Sale", "For Rent", "Pending"][i]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{formatPrice([450000, 650000, 350000][i])}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => console.log("Edit listing")}>
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => console.log("View listing")}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Client List</CardTitle>
              <CardDescription>
                Manage your clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{["JD", "SM", "RB", "LP"][i]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{["John Doe", "Sarah Miller", "Robert Brown", "Lisa Parker"][i]}</h3>
                        <p className="text-sm text-muted-foreground">{["john@example.com", "sarah@example.com", "robert@example.com", "lisa@example.com"][i]}</p>
                      </div>
                    </div>
                    <Badge variant={["default", "outline", "secondary", "destructive"][i]}>
                      {["Buyer", "Seller", "Both", "Lead"][i]}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => console.log("View client details")}>
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                Your recent conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{["JD", "SM", "RB", "LP"][i]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{["John Doe", "Sarah Miller", "Robert Brown", "Lisa Parker"][i]}</h3>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">
                          {[
                            "I'm interested in the apartment downtown. When can we schedule a viewing?",
                            "Thanks for showing me the property yesterday. I'm considering making an offer.",
                            "Are there any other properties similar to the one we saw last week?",
                            "What's the best time to meet tomorrow for the house tour?"
                          ][i]}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {["5m ago", "2h ago", "Yesterday", "2d ago"][i]}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => console.log("Reply to message")}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentDashboard;
