import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, Plus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, isAuthenticated, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const isTransparent = pathname === '/' && !scrolled && !mobileMenuOpen;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isTransparent 
          ? 'bg-transparent text-white' 
          : 'bg-white text-black shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center">
            {isTransparent ? (
              <span className="text-white">Jugyah</span>
            ) : (
              <span className="text-black">Jugyah</span>
            )}
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="ml-8 hidden md:flex items-center space-x-1">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/" className={`px-4 py-2 rounded-md text-sm hover:bg-black/5 ${pathname === '/' ? 'font-semibold' : ''}`}>
                      Home
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={`bg-transparent hover:bg-black/5 ${isTransparent ? 'text-white' : 'text-black'}`}
                    >
                      For Sale
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-3 gap-4 p-6 w-[800px]">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Property Types</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link to="/properties-for-sale?type=apartment" className="text-sm hover:underline">Apartments</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-sale?type=house" className="text-sm hover:underline">Independent Houses</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-sale?type=villa" className="text-sm hover:underline">Villas</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-sale?type=plot" className="text-sm hover:underline">Plots</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-sale?type=farmhouse" className="text-sm hover:underline">Farm Houses</Link>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Popular Locations</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link to="/properties-for-sale?city=Mumbai" className="text-sm hover:underline">Mumbai</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-sale?city=Thane" className="text-sm hover:underline">Thane</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-sale?city=Navi Mumbai" className="text-sm hover:underline">Navi Mumbai</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-sale?city=Pune" className="text-sm hover:underline">Pune</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-sale?city=Bangalore" className="text-sm hover:underline">Bangalore</Link>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">By Budget</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link to="/properties-for-sale?maxPrice=5000000" className="text-sm hover:underline">Under ₹50 Lakhs</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-sale?minPrice=5000000&maxPrice=10000000" className="text-sm hover:underline">₹50 Lakhs - ₹1 Crore</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-sale?minPrice=10000000&maxPrice=20000000" className="text-sm hover:underline">₹1 Crore - ₹2 Crore</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-sale?minPrice=20000000" className="text-sm hover:underline">Above ₹2 Crore</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 flex justify-between items-center">
                        <p className="text-sm text-gray-600">Looking for property in a specific area?</p>
                        <Link to="/properties-for-sale">
                          <Button variant="outline" className="border-black text-black">Browse All Properties</Button>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className={`bg-transparent hover:bg-black/5 ${isTransparent ? 'text-white' : 'text-black'}`}
                    >
                      For Rent
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid grid-cols-3 gap-4 p-6 w-[800px]">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Property Types</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link to="/properties-for-rent?type=apartment" className="text-sm hover:underline">Apartments</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-rent?type=house" className="text-sm hover:underline">Independent Houses</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-rent?type=villa" className="text-sm hover:underline">Villas</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-rent?type=commercial" className="text-sm hover:underline">Commercial Spaces</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-rent?type=pg" className="text-sm hover:underline">PG & Co-living</Link>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Popular Locations</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link to="/properties-for-rent?city=Mumbai" className="text-sm hover:underline">Mumbai</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-rent?city=Thane" className="text-sm hover:underline">Thane</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-rent?city=Navi Mumbai" className="text-sm hover:underline">Navi Mumbai</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-rent?city=Pune" className="text-sm hover:underline">Pune</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-rent?city=Bangalore" className="text-sm hover:underline">Bangalore</Link>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-3">By Budget</h3>
                          <ul className="space-y-2">
                            <li>
                              <Link to="/properties-for-rent?maxPrice=20000" className="text-sm hover:underline">Under ₹20,000</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-rent?minPrice=20000&maxPrice=40000" className="text-sm hover:underline">₹20,000 - ₹40,000</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-rent?minPrice=40000&maxPrice=60000" className="text-sm hover:underline">₹40,000 - ₹60,000</Link>
                            </li>
                            <li>
                              <Link to="/properties-for-rent?minPrice=60000" className="text-sm hover:underline">Above ₹60,000</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 flex justify-between items-center">
                        <p className="text-sm text-gray-600">Looking for rentals in a specific area?</p>
                        <Link to="/properties-for-rent">
                          <Button variant="outline" className="border-black text-black">Browse All Rentals</Button>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/loans" className={`px-4 py-2 rounded-md text-sm hover:bg-black/5 ${pathname === '/loans' ? 'font-semibold' : ''}`}>
                      Loans
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/agents" className={`px-4 py-2 rounded-md text-sm hover:bg-black/5 ${pathname === '/agents' ? 'font-semibold' : ''}`}>
                      Agents
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/contact" className={`px-4 py-2 rounded-md text-sm hover:bg-black/5 ${pathname === '/contact' ? 'font-semibold' : ''}`}>
                      Contact
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          )}
          
          {/* Right side buttons */}
          <div className="flex items-center">
            {!isMobile && (
              <>
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2">
                        <User size={18} />
                        <span>{user?.name || 'Account'}</span>
                        <ChevronDown size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-[180px]">
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile">My Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/messages">Messages</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/notifications">Notifications</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={logout}>
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant={isTransparent ? "outline" : "ghost"} className={isTransparent ? "border-white text-white hover:bg-white hover:text-black" : ""}>
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register" className="ml-2">
                      <Button className={isTransparent ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"}>
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
                <Link to="/add-property" className="ml-4">
                  <Button variant={isTransparent ? "outline" : "outline"} className={isTransparent ? "border-white text-white hover:bg-white hover:text-black gap-2" : "border-black text-black hover:bg-black hover:text-white gap-2"}>
                    <Plus size={16} />
                    <span>Add Property</span>
                  </Button>
                </Link>
              </>
            )}
            
            {/* Mobile menu button */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X size={24} className={isTransparent ? "text-white" : "text-black"} />
                ) : (
                  <Menu size={24} className={isTransparent ? "text-white" : "text-black"} />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-white z-40 overflow-y-auto">
          <div className="container px-4 py-6">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="py-3 px-4 hover:bg-gray-100 rounded-md font-medium">
                Home
              </Link>
              
              <div className="py-2 px-4 border-t border-gray-100">
                <h3 className="font-semibold mb-2">For Sale</h3>
                <ul className="ml-4 space-y-2">
                  <li>
                    <Link to="/properties-for-sale?type=apartment" className="text-gray-700 hover:text-black">
                      Apartments
                    </Link>
                  </li>
                  <li>
                    <Link to="/properties-for-sale?type=house" className="text-gray-700 hover:text-black">
                      Independent Houses
                    </Link>
                  </li>
                  <li>
                    <Link to="/properties-for-sale?type=villa" className="text-gray-700 hover:text-black">
                      Villas
                    </Link>
                  </li>
                  <li>
                    <Link to="/properties-for-sale" className="text-gray-700 hover:text-black font-medium">
                      View All For Sale
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="py-2 px-4 border-t border-gray-100">
                <h3 className="font-semibold mb-2">For Rent</h3>
                <ul className="ml-4 space-y-2">
                  <li>
                    <Link to="/properties-for-rent?type=apartment" className="text-gray-700 hover:text-black">
                      Apartments
                    </Link>
                  </li>
                  <li>
                    <Link to="/properties-for-rent?type=house" className="text-gray-700 hover:text-black">
                      Independent Houses
                    </Link>
                  </li>
                  <li>
                    <Link to="/properties-for-rent?type=villa" className="text-gray-700 hover:text-black">
                      Villas
                    </Link>
                  </li>
                  <li>
                    <Link to="/properties-for-rent" className="text-gray-700 hover:text-black font-medium">
                      View All For Rent
                    </Link>
                  </li>
                </ul>
              </div>
              
              <Link to="/loans" className="py-3 px-4 hover:bg-gray-100 rounded-md border-t border-gray-100">
                Loans
              </Link>
              
              <Link to="/agents" className="py-3 px-4 hover:bg-gray-100 rounded-md">
                Agents
              </Link>
              
              <Link to="/contact" className="py-3 px-4 hover:bg-gray-100 rounded-md">
                Contact
              </Link>
              
              <div className="mt-4 px-4 pt-4 border-t border-gray-100 flex flex-col space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" className="w-full">
                      <Button variant="outline" className="w-full justify-start">
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full justify-start" onClick={logout}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="w-full">
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register" className="w-full">
                      <Button className="w-full bg-black text-white hover:bg-black/90">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
                <Link to="/add-property" className="w-full">
                  <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white gap-2">
                    <Plus size={16} />
                    <span>Add Property</span>
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
