
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Plus, Eye, Edit, Trash, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProperties, deleteProperty } from "@/services/propertyService";
import { Property } from "@/lib/data";
import { formatPrice } from "@/lib/data";

interface OwnerDashboardProps {
  activeTab: string;
}

const OwnerDashboard = ({ activeTab }: OwnerDashboardProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const userProperties = await getUserProperties();
        setProperties(userProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast({
          title: "Error",
          description: "Failed to load your properties. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [toast]);

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(id);
        
        // Update the properties list
        setProperties(properties.filter(property => property.id !== id));
        
        toast({
          title: "Success",
          description: "Property deleted successfully.",
        });
      } catch (error) {
        console.error("Error deleting property:", error);
        toast({
          title: "Error",
          description: "Failed to delete property. Please try again later.",
          variant: "destructive"
        });
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "properties":
        return renderPropertiesTab();
      case "listings":
        return renderListingsTab();
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">My Properties</h3>
              <Home className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-3xl font-bold">{properties.length}</p>
            <p className="text-gray-500 mt-1">Total properties</p>
            <Link to="/add-property">
              <Button variant="outline" className="w-full mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">For Sale</h3>
              <Home className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-3xl font-bold">
              {properties.filter(p => p.features.status === "for-sale").length}
            </p>
            <p className="text-gray-500 mt-1">Properties for sale</p>
            <Link to="/properties-for-sale">
              <Button variant="outline" className="w-full mt-4">
                <Eye className="mr-2 h-4 w-4" />
                View All
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">For Rent</h3>
              <Home className="h-6 w-6 text-purple-500" />
            </div>
            <p className="text-3xl font-bold">
              {properties.filter(p => p.features.status === "for-rent").length}
            </p>
            <p className="text-gray-500 mt-1">Properties for rent</p>
            <Link to="/properties-for-rent">
              <Button variant="outline" className="w-full mt-4">
                <Eye className="mr-2 h-4 w-4" />
                View All
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium mb-4">Recent Properties</h3>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : properties.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium mb-2">No Properties Found</h4>
              <p className="text-gray-500 mb-4">You haven't added any properties yet.</p>
              <Link to="/add-property">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Property
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Property</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left">Location</th>
                    <th className="px-6 py-3 text-left">Added</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.slice(0, 5).map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-md object-cover" 
                              src={property.images[0] || 'https://via.placeholder.com/100'} 
                              alt={property.title} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                              {property.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {property.features.bedrooms} bed • {property.features.bathrooms} bath
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${property.features.status === 'for-sale' ? 'bg-green-100 text-green-800' : 
                          property.features.status === 'for-rent' ? 'bg-blue-100 text-blue-800' : 
                          property.features.status === 'sold' ? 'bg-gray-100 text-gray-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                          {property.features.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatPrice(property.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {property.location.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link to={`/property/${property.id}`}>
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link to={`/edit-property/${property.id}`}>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDeleteProperty(property.id)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {properties.length > 5 && (
                <div className="flex justify-center mt-4">
                  <Button 
                    variant="link" 
                    onClick={() => window.document.getElementById('properties-tab')?.click()}
                  >
                    View All Properties
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPropertiesTab = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-medium">All Properties</h3>
          <Link to="/add-property">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Loading...</div>
        ) : properties.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg border border-gray-200 p-6">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">No Properties Found</h4>
            <p className="text-gray-500 mb-4">You haven't added any properties yet.</p>
            <Link to="/add-property">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Property
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Property</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Price</th>
                    <th className="px-6 py-3 text-left">Location</th>
                    <th className="px-6 py-3 text-left">Added</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-md object-cover" 
                              src={property.images[0] || 'https://via.placeholder.com/100'} 
                              alt={property.title} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                              {property.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {property.features.bedrooms} bed • {property.features.bathrooms} bath
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${property.features.status === 'for-sale' ? 'bg-green-100 text-green-800' : 
                          property.features.status === 'for-rent' ? 'bg-blue-100 text-blue-800' : 
                          property.features.status === 'sold' ? 'bg-gray-100 text-gray-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                          {property.features.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatPrice(property.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {property.location.city}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(property.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link to={`/property/${property.id}`}>
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link to={`/edit-property/${property.id}`}>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDeleteProperty(property.id)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderListingsTab = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium mb-4">Property Listings</h3>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">For Sale</h4>
              {properties.filter(p => p.features.status === "for-sale").length === 0 ? (
                <p className="text-gray-500">No properties for sale</p>
              ) : (
                <div className="space-y-4">
                  {properties
                    .filter(p => p.features.status === "for-sale")
                    .map(property => (
                      <Link
                        key={property.id}
                        to={`/property/${property.id}`}
                        className="flex items-start hover:bg-gray-50 p-2 rounded-md"
                      >
                        <img
                          src={property.images[0] || 'https://via.placeholder.com/100'}
                          alt={property.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="ml-3">
                          <h5 className="font-medium text-sm">{property.title}</h5>
                          <p className="text-sm text-gray-500">{formatPrice(property.price)}</p>
                          <p className="text-xs text-gray-400">{property.location.city}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              )}
            </div>
            
            <div>
              <h4 className="font-medium mb-3">For Rent</h4>
              {properties.filter(p => p.features.status === "for-rent").length === 0 ? (
                <p className="text-gray-500">No properties for rent</p>
              ) : (
                <div className="space-y-4">
                  {properties
                    .filter(p => p.features.status === "for-rent")
                    .map(property => (
                      <Link
                        key={property.id}
                        to={`/property/${property.id}`}
                        className="flex items-start hover:bg-gray-50 p-2 rounded-md"
                      >
                        <img
                          src={property.images[0] || 'https://via.placeholder.com/100'}
                          alt={property.title}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="ml-3">
                          <h5 className="font-medium text-sm">{property.title}</h5>
                          <p className="text-sm text-gray-500">{formatPrice(property.price)}</p>
                          <p className="text-xs text-gray-400">{property.location.city}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default OwnerDashboard;
