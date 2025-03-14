
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, MapPin, Plus, ArrowRight } from 'lucide-react';

const PropertyCategorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Property</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you're looking to buy, rent, or list a property, we have the tools and expertise to help you succeed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Buy */}
          <div className="group">
            <div className="bg-white rounded-xl p-8 text-center transition-all hover:shadow-xl border border-gray-100 h-full flex flex-col">
              <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-black/10 transition-all">
                <Home className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Buy</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Find your dream home from our exclusive listings of properties for sale.
              </p>
              <Link to="/properties?type=for-sale" className="block mt-auto">
                <Button variant="default" className="w-full gap-2">
                  Browse Properties
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Rent */}
          <div className="group">
            <div className="bg-white rounded-xl p-8 text-center transition-all hover:shadow-xl border border-gray-100 h-full flex flex-col">
              <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-black/10 transition-all">
                <MapPin className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Rent</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Discover a wide range of rental properties to fit your lifestyle and budget.
              </p>
              <Link to="/properties?type=for-rent" className="block mt-auto">
                <Button variant="default" className="w-full gap-2">
                  Explore Rentals
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* List */}
          <div className="group">
            <div className="bg-white rounded-xl p-8 text-center transition-all hover:shadow-xl border border-gray-100 h-full flex flex-col">
              <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-black/10 transition-all">
                <Plus className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">List</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                List your property with us and reach thousands of potential buyers or renters.
              </p>
              <Link to="/add-property" className="block mt-auto">
                <Button variant="default" className="w-full gap-2">
                  List Your Property
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyCategorySection;
