
import { useState, useEffect } from 'react';
import Layout from "@/components/Layout";
import PropertyCard from "@/components/PropertyCard";
import PropertyMap from "@/components/PropertyMap";
import PropertySearch from "@/components/PropertySearch";
import { formatPrice, Property } from '@/lib/data';
import { getPropertiesByStatus } from '@/services/propertyService';
import { Building2, ArrowUpDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PropertiesForSale = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMap, setShowMap] = useState(true);
  const [sortOption, setSortOption] = useState("latest");
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const data = await getPropertiesByStatus("for-sale");
        
        // Sort properties based on the selected option
        let sortedProperties = [...data];
        sortProperties(sortedProperties);
        
        setProperties(sortedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Sort properties when the sort option changes
  useEffect(() => {
    if (properties.length > 0) {
      const sortedProperties = [...properties];
      sortProperties(sortedProperties);
      setProperties(sortedProperties);
    }
  }, [sortOption]);

  const sortProperties = (props: Property[]) => {
    switch (sortOption) {
      case "price-low":
        props.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        props.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        props.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        props.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        // Default: latest
        props.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  };

  const handlePropertySelect = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
  };

  return (
    <Layout>
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-black py-12 md:py-20">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Properties For Sale
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Explore our collection of properties available for sale. Find your dream home today.
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="container -mt-8 mb-12">
          <PropertySearch />
        </section>

        {/* Properties Section */}
        <section className="container">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-gray-600">
              <p>
                Showing <span className="font-medium text-black">{properties.length}</span> properties for sale
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMap(!showMap)}
                className={showMap ? 'text-black' : 'text-gray-500'}
                aria-label="Toggle map"
              >
                <MapPin size={20} />
              </Button>

              <div className="flex items-center relative">
                <ArrowUpDown size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <select
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-black/50"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : properties.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Properties List */}
              <div className={`${showMap ? 'lg:w-1/2' : 'w-full'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {properties.map((property, index) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      index={index}
                    />
                  ))}
                </div>
              </div>

              {/* Map */}
              {showMap && (
                <div className="lg:w-1/2">
                  <div className="sticky top-24 h-[calc(100vh-200px)]">
                    <PropertyMap 
                      properties={properties} 
                      selectedPropertyId={selectedPropertyId || undefined}
                      onPropertySelect={handlePropertySelect}
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-black/10 text-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any properties for sale at the moment. Please check back later.
              </p>
              <Button onClick={() => window.location.href = '/'} className="bg-black hover:bg-black/90">
                Back to Home
              </Button>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
};

export default PropertiesForSale;
