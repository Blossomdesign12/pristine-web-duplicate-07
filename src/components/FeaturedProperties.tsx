
import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import PropertyCard from './PropertyCard';
import { Link } from 'react-router-dom';
import { getFeaturedProperties, Property } from '@/lib/data';

const FeaturedProperties = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const loadFeaturedProperties = async () => {
      setIsLoading(true);
      try {
        const properties = await getFeaturedProperties();
        setFeaturedProperties(properties);
      } catch (error) {
        console.error("Error loading featured properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedProperties();

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="section bg-white py-16 md:py-24">
      <div className="container">
        <div 
          className={cn(
            "mb-12 transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 font-sans">Featured Properties</h2>
              <p className="text-gray-600 max-w-xl">
                Explore our handpicked selection of premium properties that stand out for their exceptional features and prime locations.
              </p>
            </div>
            <Link to="/properties">
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white gap-2 rounded-full">
                View All Properties
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-xl h-[400px] animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProperties.map((property, index) => (
              <PropertyCard 
                key={property.id || property._id} 
                property={property} 
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
