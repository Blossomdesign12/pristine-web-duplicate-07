
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Property, properties } from "@/lib/data";
import { Home, DollarSign, Plus, Edit, ExternalLink, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OwnerDashboardProps {
  activeTab: string;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ activeTab }) => {
  // Mock data - would come from API calls in a real app
  const [myProperties] = useState<Property[]>(properties.slice(0, 4));
  const { toast } = useToast();

  const handleDeleteProperty = (id: string) => {
    toast({
      title: "Property Deleted",
      description: "The property has been successfully removed.",
    });
    // In a real app, this would call an API to delete the property
  };

  if (activeTab === "properties") {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">My Properties</h2>
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
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {myProperties.map((property) => (
                    <tr key={property.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-md object-cover" src={property.images[0]} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{property.title}</div>
                            <div className="text-sm text-gray-500">{property.location.city}, {property.location.state}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          property.features.status === 'for-sale' ? 'bg-green-100 text-green-800' : 
                          property.features.status === 'for-rent' ? 'bg-blue-100 text-blue-800' : 
                          property.features.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {property.features.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${property.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {Math.floor(Math.random() * 500)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/property/${property.id}`}>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/edit-property/${property.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            onClick={() => handleDeleteProperty(property.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Home className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No properties listed yet</h3>
            <p className="text-gray-500 mb-6">
              Add your first property to start selling or renting.
            </p>
            <Link to="/add-property">
              <Button className="bg-estate-primary hover:bg-estate-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Property
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
        <h2 className="text-xl font-bold mb-6">My Listings</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">For Sale</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-estate-primary">3</p>
                  <p className="text-sm text-gray-500">Active Listings</p>
                </div>
                <Home className="h-10 w-10 text-estate-primary opacity-50" />
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">For Rent</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-blue-500">1</p>
                  <p className="text-sm text-gray-500">Active Listings</p>
                </div>
                <Home className="h-10 w-10 text-blue-500 opacity-50" />
              </div>
            </div>
          </div>
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
            <Home className="h-6 w-6 text-estate-primary" />
          </div>
          <p className="text-3xl font-bold mt-2">{myProperties.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Total Value</h3>
            <DollarSign className="h-6 w-6 text-estate-primary" />
          </div>
          <p className="text-3xl font-bold mt-2">
            ${myProperties.reduce((sum, property) => sum + property.price, 0).toLocaleString()}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Property Views</h3>
            <Eye className="h-6 w-6 text-estate-primary" />
          </div>
          <p className="text-3xl font-bold mt-2">1,248</p>
          <p className="text-green-500 text-sm mt-1">+15% from last month</p>
        </div>
      </div>
      
      {/* Recent Properties */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">My Properties</h2>
          <Link to="/properties">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Listed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {myProperties.slice(0, 3).map((property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img className="h-10 w-10 rounded-md object-cover" src={property.images[0]} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{property.title}</div>
                        <div className="text-sm text-gray-500">{property.location.city}, {property.location.state}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      property.features.status === 'for-sale' ? 'bg-green-100 text-green-800' : 
                      property.features.status === 'for-rent' ? 'bg-blue-100 text-blue-800' : 
                      property.features.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {property.features.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Math.floor(Math.random() * 500)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button variant="ghost" size="sm" className="text-estate-primary">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
