
import { useEffect, useRef, useState } from 'react';
import { Search, MapPin, Home, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';
import { cities, propertyTypes } from '@/lib/data';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct the search query URL with parameters
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.append('q', searchQuery);
    if (selectedCity) searchParams.append('city', selectedCity);
    if (selectedType) searchParams.append('type', selectedType);
    
    // Redirect to the properties page with the search parameters
    window.location.href = `/properties?${searchParams.toString()}`;
  };

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          transform: "scale(1.1)",
          filter: "blur(0px)",
          transition: "transform 15s ease-out",
          animation: "subtle-zoom 15s ease-out forwards"
        }}
      >
      </div>
      
      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
        <div 
          className={cn(
            "transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mt-[70px] leading-tight">
            Discover Your Perfect Property With Our Expert Guidance
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Browse thousands of properties for sale and rent across the country. 
            Find your dream home with our easy-to-use search tools.
          </p>
        </div>
        
        {/* Search Form */}
        <div 
          className={cn(
            "w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
            "delay-300"
          )}
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </div>
              <Input
                placeholder="Enter keywords, address..."
                className="pl-10 h-12 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="md:w-[180px] relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <MapPin size={18} />
              </div>
              <select
                className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/50"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Any Location</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="md:w-[180px] relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Home size={18} />
              </div>
              <select
                className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-black/50"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Property Type</option>
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <Button className="h-12 px-6 bg-black hover:bg-black/90 text-white gap-2" type="submit">
              <span>Search</span>
              <ArrowRight size={16} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
