
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Building2, Phone, User, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // This would come from auth in a real app
  const isLoggedIn = false;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled ? "py-3 bg-white/90 shadow-sm" : "py-4 bg-transparent",
        isMenuOpen && isMobile && "bg-white/90 h-screen"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 z-50">
          <div className="flex items-center space-x-1">
            <Building2 className="h-6 w-6 text-estate-primary" strokeWidth={2.5} />
            <span className="font-bold text-xl">FindHome</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-4 z-50">
          {isMobile ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="text-foreground"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          ) : (
            <nav className="flex items-center gap-6">
              <NavLinks />
              <div className="flex items-center gap-3">
                {isLoggedIn ? (
                  <Link to="/dashboard">
                    <Button className="bg-estate-primary hover:bg-estate-primary/90">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className="text-estate-primary border-estate-primary hover:bg-estate-primary/10">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="bg-estate-primary hover:bg-estate-primary/90">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 z-40 bg-white pt-20 px-6 transform transition-transform duration-300 ease-in-out overflow-y-auto",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav className="flex flex-col gap-6 py-8">
            <MobileNavLinks />
            <div className="flex flex-col gap-3 mt-4">
              {isLoggedIn ? (
                <Link to="/dashboard">
                  <Button className="w-full bg-estate-primary hover:bg-estate-primary/90">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="w-full text-estate-primary border-estate-primary hover:bg-estate-primary/10">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full bg-estate-primary hover:bg-estate-primary/90">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLinks = () => {
  const location = useLocation();
  
  const isActiveLink = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  return (
    <>
      <Link to="/" className={cn("flex items-center gap-1 font-medium hover:text-estate-primary transition-colors", isActiveLink('/') && "text-estate-primary")}>
        <Home size={16} />
        <span>Home</span>
      </Link>
      <Link to="/properties" className={cn("flex items-center gap-1 font-medium hover:text-estate-primary transition-colors", isActiveLink('/properties') && "text-estate-primary")}>
        <Building2 size={16} />
        <span>Properties</span>
      </Link>
      <Link to="/agents" className={cn("flex items-center gap-1 font-medium hover:text-estate-primary transition-colors", isActiveLink('/agents') && "text-estate-primary")}>
        <User size={16} />
        <span>Agents</span>
      </Link>
      <Link to="/contact" className={cn("flex items-center gap-1 font-medium hover:text-estate-primary transition-colors", isActiveLink('/contact') && "text-estate-primary")}>
        <Phone size={16} />
        <span>Contact</span>
      </Link>
    </>
  );
};

const MobileNavLinks = () => {
  return (
    <>
      <Link to="/" className="flex items-center justify-between py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Home size={20} />
          <span className="font-medium text-lg">Home</span>
        </div>
      </Link>
      <Link to="/properties" className="flex items-center justify-between py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Building2 size={20} />
          <span className="font-medium text-lg">Properties</span>
        </div>
      </Link>
      <Link to="/agents" className="flex items-center justify-between py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <User size={20} />
          <span className="font-medium text-lg">Agents</span>
        </div>
      </Link>
      <Link to="/contact" className="flex items-center justify-between py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Phone size={20} />
          <span className="font-medium text-lg">Contact</span>
        </div>
      </Link>
    </>
  );
};

export default Header;
