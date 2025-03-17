
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white shadow-sm py-3" 
          : "bg-transparent py-5",
        location.pathname === '/' && !isScrolled 
          ? "text-white" 
          : "text-black"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          <img src="https://res.cloudinary.com/dw7w2at8k/image/upload/v1741631701/jugyahblack.5fadb514_sdcgzu.svg" alt="" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link 
            to="/" 
            className={cn(
              "px-4 py-2 rounded-md transition-colors",
              isActive('/') 
                ? "font-medium bg-black/5" 
                : "hover:bg-black/5"
            )}
          >
            Home
          </Link>
          
          <div className="relative group">
            <button className="flex items-center px-4 py-2 rounded-md transition-colors hover:bg-black/5">
              <span>Properties</span>
              <ChevronDown size={16} className="ml-1" />
            </button>
            <div className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="py-1">
                <Link to="/properties" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  All Properties
                </Link>
                <Link to="/properties-for-sale" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  For Sale
                </Link>
                <Link to="/properties-for-rent" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  For Rent
                </Link>
              </div>
            </div>
          </div>
          
          <Link 
            to="/loans" 
            className={cn(
              "px-4 py-2 rounded-md transition-colors",
              isActive('/loans') 
                ? "font-medium bg-black/5" 
                : "hover:bg-black/5"
            )}
          >
            Loans
          </Link>
          
          <Link 
            to="/agents" 
            className={cn(
              "px-4 py-2 rounded-md transition-colors",
              isActive('/agents') 
                ? "font-medium bg-black/5" 
                : "hover:bg-black/5"
            )}
          >
            Agents
          </Link>
          
          <Link 
            to="/contact" 
            className={cn(
              "px-4 py-2 rounded-md transition-colors",
              isActive('/contact') 
                ? "font-medium bg-black/5" 
                : "hover:bg-black/5"
            )}
          >
            Contact
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="relative group">
              <Button variant="ghost" className="gap-2 hover:bg-black/5" onClick={() => {}}>
                <User size={18} />
                <span>{user?.name || 'Account'}</span>
                <ChevronDown size={16} />
              </Button>
              <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="py-1">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Dashboard
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Profile
                  </Link>
                  <Link to="/messages" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Messages
                  </Link>
                  <Link to="/add-property" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Add Property
                  </Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  className={cn(
                    "gap-2",
                    location.pathname === '/' && !isScrolled 
                      ? "text-white hover:bg-white/10" 
                      : "text-black hover:bg-black/5"
                  )}
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Button>
              </Link>
              <Link to="/add-property">
                <Button 
                  className={cn(
                    location.pathname === '/' && !isScrolled 
                      ? "bg-white text-black hover:bg-white/90" 
                      : "bg-black text-white hover:bg-black/90"
                  )}
                >
                  List Your Property
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-black" />
          ) : (
            <Menu size={24} className={
              location.pathname === '/' && !isScrolled ? "text-white" : "text-black"
            } />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white pt-20">
            <div className="container">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className={cn(
                    "px-4 py-3 rounded-md transition-colors font-medium",
                    isActive('/') ? "bg-black/5" : ""
                  )}
                >
                  Home
                </Link>
                
                <div className="px-4 py-3 font-medium">Properties</div>
                <Link 
                  to="/properties" 
                  className="px-8 py-2 text-sm"
                >
                  All Properties
                </Link>
                <Link 
                  to="/properties-for-sale" 
                  className="px-8 py-2 text-sm"
                >
                  For Sale
                </Link>
                <Link 
                  to="/properties-for-rent" 
                  className="px-8 py-2 text-sm"
                >
                  For Rent
                </Link>
                
                <Link 
                  to="/loans" 
                  className={cn(
                    "px-4 py-3 rounded-md transition-colors font-medium",
                    isActive('/loans') ? "bg-black/5" : ""
                  )}
                >
                  Loans
                </Link>
                
                <Link 
                  to="/agents" 
                  className={cn(
                    "px-4 py-3 rounded-md transition-colors font-medium",
                    isActive('/agents') ? "bg-black/5" : ""
                  )}
                >
                  Agents
                </Link>
                
                <Link 
                  to="/contact" 
                  className={cn(
                    "px-4 py-3 rounded-md transition-colors font-medium",
                    isActive('/contact') ? "bg-black/5" : ""
                  )}
                >
                  Contact
                </Link>
                
                <div className="pt-4 border-t border-gray-100">
                  {isAuthenticated ? (
                    <>
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-3 font-medium"
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-3"
                      >
                        My Profile
                      </Link>
                      <Link 
                        to="/add-property" 
                        className="block px-4 py-3"
                      >
                        Add Property
                      </Link>
                      <button 
                        onClick={logout}
                        className="block w-full text-left px-4 py-3 text-red-600"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <Link to="/login">
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link to="/add-property">
                        <Button className="w-full bg-black text-white">
                          List Your Property
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
