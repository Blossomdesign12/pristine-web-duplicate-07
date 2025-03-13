
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart4, Home, Clock, Plus, Users, CalendarIcon, Eye } from "lucide-react";
import { formatPrice } from "@/lib/data";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>
        <Link to="/add-property">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">My Properties</TabsTrigger>
          <TabsTrigger value="offers">Offers & Inquiries</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">+1 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">-1 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">16</div>
                <p className="text-xs text-muted-foreground">+3 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Property Value</CardTitle>
                <BarChart4 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1.2M</div>
                <p className="text-xs text-muted-foreground">+$150K from last assessment</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Activity on your properties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {["JD", "AS", "RH"][i]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {[
                            "New inquiry for Coastal Villa",
                            "Property viewed by 3 potential buyers",
                            "Offer received for Downtown Apartment",
                          ][i]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {["2 hours ago", "Yesterday", "3 days ago"][i]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Viewings</CardTitle>
                <CardDescription>Scheduled property viewings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((_, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <CalendarIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {[
                            "Coastal Villa Viewing with Sarah Miller",
                            "Downtown Apartment Viewing with Robert Brown",
                          ][i]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {["Tomorrow, 2:00 PM", "Saturday, 11:00 AM"][i]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="properties" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>My Properties</CardTitle>
              <CardDescription>Manage your property listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 p-4 border rounded-md">
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-md shrink-0 relative overflow-hidden">
                        <img 
                          src={`https://images.unsplash.com/photo-${["1600585154340-be6161a56a0c", "1564013799919-ab600027ffc6", "1512917774080-9991f1c4c750", "1493809842364-78817add7ffb"][i]}?auto=format&fit=crop&w=100&q=80`} 
                          alt="Property" 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{["Coastal Villa", "Urban Loft", "Family Home", "Downtown Apartment"][i]}</h3>
                        <p className="text-sm text-muted-foreground">{["123 Beach Rd, Miami, FL", "456 Main St, Austin, TX", "789 Oak Ave, Seattle, WA", "101 Market St, San Francisco, CA"][i]}</p>
                        <div className="flex items-center mt-1">
                          <Badge variant={["default", "outline", "secondary", "destructive"][i]}>
                            {["For Sale", "For Rent", "Pending", "Off Market"][i]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{formatPrice([950000, 450000, 650000, 750000][i])}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => console.log("Edit property")}>
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => console.log("View property")}>
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
        
        <TabsContent value="offers" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Offers & Inquiries</CardTitle>
              <CardDescription>Manage offers and inquiries for your properties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{["Offer", "Inquiry", "Offer"][i]} for {["Coastal Villa", "Urban Loft", "Family Home"][i]}</h3>
                        <p className="text-sm text-muted-foreground">From: {["John Doe", "Sarah Miller", "Robert Brown"][i]}</p>
                        <p className="text-sm text-muted-foreground">{["3 days ago", "Yesterday", "Today"][i]}</p>
                      </div>
                      <Badge variant={["success", "default", "warning"][i]}>
                        {["Offer", "Inquiry", "Negotiation"][i]}
                      </Badge>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      {i === 0 && (
                        <div>
                          <p className="text-sm">Offer Amount: <span className="font-medium">{formatPrice(920000)}</span></p>
                          <p className="text-sm">Financing: Pre-approved mortgage</p>
                          <p className="text-sm">Closing: 45 days</p>
                        </div>
                      )}
                      {i === 1 && (
                        <div>
                          <p className="text-sm">I'm interested in scheduling a viewing for this property. Is it possible to see it this weekend?</p>
                        </div>
                      )}
                      {i === 2 && (
                        <div>
                          <p className="text-sm">Offer Amount: <span className="font-medium">{formatPrice(625000)}</span></p>
                          <p className="text-sm">Counter Offer: <span className="font-medium">{formatPrice(640000)}</span></p>
                          <p className="text-sm">Closing: 30 days</p>
                        </div>
                      )}
                      <div className="flex space-x-2 mt-4">
                        {i === 0 && (
                          <>
                            <Button variant="default" size="sm">Accept</Button>
                            <Button variant="outline" size="sm">Counter</Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">Decline</Button>
                          </>
                        )}
                        {i === 1 && (
                          <>
                            <Button variant="default" size="sm">Respond</Button>
                            <Button variant="outline" size="sm">Schedule Viewing</Button>
                          </>
                        )}
                        {i === 2 && (
                          <>
                            <Button variant="default" size="sm">Accept Counter</Button>
                            <Button variant="outline" size="sm">Counter Again</Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">Decline</Button>
                          </>
                        )}
                      </div>
                    </div>
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

export default OwnerDashboard;
