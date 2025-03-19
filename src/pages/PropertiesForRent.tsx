
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertySearch from "@/components/PropertySearch";
import PropertyCard from "@/components/PropertyCard";
import Pagination from "@/components/Pagination";
import { Property } from '@/lib/data';
import { propertiesForRent } from '@/lib/dummy-properties';

const PropertiesForRent = () => {
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const propertiesPerPage = 9;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const query = searchParams.get('q') || '';
    const city = searchParams.get('city') || '';
    const propertyType = searchParams.get('type') || '';
    const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : undefined;
    const bedrooms = searchParams.get('bedrooms') ? parseInt(searchParams.get('bedrooms')!) : undefined;
    
    // Filter properties for rent based on search parameters
    let filteredProperties = [...propertiesForRent];
    
    // Apply basic filters
    if (query) {
      const queryLower = query.toLowerCase();
      filteredProperties = filteredProperties.filter(property => 
        property.title.toLowerCase().includes(queryLower) ||
        property.description.toLowerCase().includes(queryLower) ||
        property.location.address.toLowerCase().includes(queryLower) ||
        property.location.city.toLowerCase().includes(queryLower)
      );
    }
    
    if (city) {
      filteredProperties = filteredProperties.filter(property => 
        property.location.city.toLowerCase() === city.toLowerCase()
      );
    }
    
    if (propertyType) {
      filteredProperties = filteredProperties.filter(property => 
        property.features.propertyType === propertyType
      );
    }
    
    if (minPrice !== undefined) {
      filteredProperties = filteredProperties.filter(property => 
        property.price >= minPrice
      );
    }
    
    if (maxPrice !== undefined) {
      filteredProperties = filteredProperties.filter(property => 
        property.price <= maxPrice
      );
    }
    
    if (bedrooms !== undefined) {
      filteredProperties = filteredProperties.filter(property => 
        property.features.bedrooms >= bedrooms
      );
    }
    
    setTotalProperties(filteredProperties.length);
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const paginatedProperties = filteredProperties.slice(startIndex, startIndex + propertiesPerPage);
    
    setProperties(paginatedProperties);
    setLoading(false);
  }, [searchParams, currentPage]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Search Section */}
        <section className="py-16 bg-estate-light">
          <div className="container">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Properties For Rent</h1>
              <p className="text-estate-gray max-w-2xl mx-auto">
                Find your perfect rental property in Mumbai and surrounding areas
              </p>
            </div>
            
            <PropertySearch initialStatus="for-rent" />
          </div>
        </section>
        
        {/* Properties Grid */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Rental Listings</h2>
                <p className="text-estate-gray">
                  {totalProperties} properties found
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                {/* Sort dropdown could go here */}
              </div>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded-xl h-[400px] animate-pulse"></div>
                ))}
              </div>
            ) : properties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {properties.map((property, index) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      index={index}
                    />
                  ))}
                </div>
                
                {totalProperties > propertiesPerPage && (
                  <div className="mt-12 flex justify-center">
                    <Pagination 
                      currentPage={currentPage}
                      totalPages={Math.ceil(totalProperties / propertiesPerPage)}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-estate-gray mb-6">
                  Try adjusting your search criteria to find more properties
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertiesForRent;
