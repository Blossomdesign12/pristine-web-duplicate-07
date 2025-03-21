
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PropertyCard from '@/components/PropertyCard';
import Pagination from '@/components/Pagination';
import { getPropertiesByStatus } from '@/lib/dummy-properties';
import { MapPin, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PropertiesForSale = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(8);
  const [showMap, setShowMap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 10000000,
    bedrooms: 0,
    propertyType: 'all',
  });
  const [sortBy, setSortBy] = useState('default');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch properties with status "for-sale"
    const fetchedProperties = getPropertiesByStatus('for-sale');
    setProperties(fetchedProperties);
    setFilteredProperties(fetchedProperties);
  }, []);

  // Get current properties for pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    let filtered = properties.filter(property => {
      return (
        property.price >= filters.priceMin &&
        property.price <= filters.priceMax &&
        (filters.bedrooms === 0 || property.bedrooms >= filters.bedrooms) &&
        (filters.propertyType === 'all' || property.type === filters.propertyType)
      );
    });

    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'date-desc') {
      filtered = filtered.sort((a, b) => new Date(b.listedDate) - new Date(a.listedDate));
    } else if (sortBy === 'date-asc') {
      filtered = filtered.sort((a, b) => new Date(a.listedDate) - new Date(b.listedDate));
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy]);

  const propertyTypes = ['apartment', 'house', 'condo', 'townhouse', 'villa', 'land'];

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Properties For Sale</h1>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowMap(!showMap)}
                className="flex items-center"
              >
                <MapPin className="mr-2 h-4 w-4" />
                {showMap ? 'Hide Map' : 'Show Map'}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Sort By</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort Properties</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortBy('default')}>
                    Default
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('price-asc')}>
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('price-desc')}>
                    Price: High to Low
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('date-desc')}>
                    Newest First
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy('date-asc')}>
                    Oldest First
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {showFilters && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4">Filter Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Price
                  </label>
                  <input
                    type="range"
                    name="priceMin"
                    min="0"
                    max="10000000"
                    step="50000"
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                    className="w-full"
                  />
                  <span className="text-sm">${filters.priceMin.toLocaleString()}</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price
                  </label>
                  <input
                    type="range"
                    name="priceMax"
                    min="0"
                    max="10000000"
                    step="50000"
                    value={filters.priceMax}
                    onChange={handleFilterChange}
                    className="w-full"
                  />
                  <span className="text-sm">${filters.priceMax.toLocaleString()}</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Bedrooms
                  </label>
                  <select
                    name="bedrooms"
                    value={filters.bedrooms}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-estate-primary focus:ring focus:ring-estate-primary focus:ring-opacity-50"
                  >
                    <option value="0">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={filters.propertyType}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-estate-primary focus:ring focus:ring-estate-primary focus:ring-opacity-50"
                  >
                    <option value="all">All Types</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {showMap ? (
            <div className="bg-white rounded-lg shadow-md p-4 mb-8">
              <div className="h-[500px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                Interactive Map Coming Soon
              </div>
            </div>
          ) : (
            <>
              {filteredProperties.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-700">No properties found matching your criteria</h3>
                  <p className="mt-2 text-gray-500">Try adjusting your filters to see more results.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {currentProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onClick={() => navigate(`/property/${property.id}`)}
                      />
                    ))}
                  </div>
                  <div className="mt-12">
                    <Pagination
                      itemsPerPage={propertiesPerPage}
                      totalItems={filteredProperties.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PropertiesForSale;
