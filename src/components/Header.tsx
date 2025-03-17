
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
        isScrolled ? "py-3 bg-white shadow-sm" : "py-4 bg-transparent",
        isMenuOpen && isMobile && "bg-white h-screen"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 z-50">
          <div className="flex items-center">
            <img 
              src={isScrolled || isMobile || isMenuOpen ? 
                "https://res.cloudinary.com/dw7w2at8k/image/upload/v1741631701/jugyahblack.5fadb514_sdcgzu.svg" : 
                "https://res.cloudinary.com/dw7w2at8k/image/upload/v1741631498/jugyahwhite.ff1dd762_gmcu0m.svg"} 
              alt="Jugyah Logo" 
              className="h-10"
            />
          </div>
        </Link>
        
        <div className="flex items-center gap-4 z-50">
          {isMobile ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className={isScrolled || isMenuOpen ? "text-jugyah-dark" : "text-white"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          ) : (
            <nav className="flex items-center gap-6">
              <NavLinks isScrolled={isScrolled} />
              <div className="flex items-center gap-3">
                {isLoggedIn ? (
                  <Link to="/dashboard">
                    <Button className="bg-jugyah-blue hover:bg-jugyah-blue/90 rounded-full">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" className={cn(
                        "border-jugyah-blue text-jugyah-blue hover:bg-jugyah-blue/10 rounded-full",
                        !isScrolled && "border-white text-white hover:bg-white/10"
                      )}>
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button className="bg-jugyah-blue hover:bg-jugyah-blue/90 rounded-full">
                        Sign Up
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
                  <Button className="w-full bg-jugyah-blue hover:bg-jugyah-blue/90 rounded-full">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="w-full text-jugyah-blue border-jugyah-blue hover:bg-jugyah-blue/10 rounded-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full bg-jugyah-blue hover:bg-jugyah-blue/90 rounded-full">
                      Sign Up
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

const NavLinks = ({ isScrolled }: { isScrolled: boolean }) => {
  const location = useLocation();
  
  const isActiveLink = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  const linkClass = (path: string) => cn(
    "flex items-center gap-1 font-medium transition-colors",
    isActiveLink(path) ? "text-jugyah-blue" : isScrolled ? "text-jugyah-dark hover:text-jugyah-blue" : "text-white hover:text-white/80"
  );
  
  return (
    <>
      <Link to="/" className={linkClass('/')}>
        <Home size={16} />
        <span>Home</span>
      </Link>
      <Link to="/properties" className={linkClass('/properties')}>
        <Building2 size={16} />
        <span>Properties</span>
      </Link>
      <Link to="/agents" className={linkClass('/agents')}>
        <User size={16} />
        <span>Agents</span>
      </Link>
      <Link to="/contact" className={linkClass('/contact')}>
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
          <Home size={20} className="text-jugyah-blue" />
          <span className="font-medium text-lg">Home</span>
        </div>
      </Link>
      <Link to="/properties" className="flex items-center justify-between py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Building2 size={20} className="text-jugyah-blue" />
          <span className="font-medium text-lg">Properties</span>
        </div>
      </Link>
      <Link to="/agents" className="flex items-center justify-between py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <User size={20} className="text-jugyah-blue" />
          <span className="font-medium text-lg">Agents</span>
        </div>
      </Link>
      <Link to="/contact" className="flex items-center justify-between py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Phone size={20} className="text-jugyah-blue" />
          <span className="font-medium text-lg">Contact</span>
        </div>
      </Link>
    </>
  );
};

export default Header;
