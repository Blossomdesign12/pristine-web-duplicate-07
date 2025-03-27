import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Home, DollarSign, Layers, Building, MapPin } from 'lucide-react';
import { Property } from '@/lib/data';
import { useEffect, useState } from 'react';
import { getAllProperties } from '@/services/propertyService';

const AdminDashboard = () => {
  const [propertyCount, setPropertyCount] = useState(0);
  const [propertiesByType, setPropertiesByType] = useState<Record<string, number>>({});
  const [propertiesByCity, setPropertiesByCity] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const properties = await getAllProperties();
        
        // Count properties
        setPropertyCount(properties.length);
        
        // Count properties by type
        const typeCount: Record<string, number> = {};
        properties.forEach(property => {
          const type = property.features.propertyType;
          if (type) {
            typeCount[type] = (typeCount[type] || 0) + 1;
          }
        });
        setPropertiesByType(typeCount);
        
        // Count properties by city
        const cityCount: Record<string, number> = {};
        properties.forEach(property => {
          const city = property.location.city;
          if (city) {
            cityCount[city] = (cityCount[city] || 0) + 1;
          }
        });
        setPropertiesByCity(cityCount);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const renderPropertyTypeCards = () => {
    return Object.entries(propertiesByType).map(([type, count]) => (
      <Card key={type} className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold capitalize">{type}</CardTitle>
          <CardDescription>Number of properties of type {type}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{count}</div>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    ));
  };

  const renderCityCards = () => {
    return Object.entries(propertiesByCity).map(([city, count]) => (
      <Card key={city} className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{city}</CardTitle>
          <CardDescription>Number of properties in {city}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{count}</div>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    ));
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {loading ? (
        <div className="text-center">Loading dashboard data...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Total Properties</CardTitle>
                <CardDescription>Total number of properties listed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{propertyCount}</div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Total Users</CardTitle>
                <CardDescription>Total number of registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">500</div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Total Revenue</CardTitle>
                <CardDescription>Total revenue generated from sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">$1.2M</div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">
                  View Report <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Properties by Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderPropertyTypeCards()}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Properties by City</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderCityCards()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
