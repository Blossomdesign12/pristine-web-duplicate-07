
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#1a1f2c] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Building2 className="h-6 w-6 text-estate-primary" strokeWidth={2.5} />
              <span className="font-bold text-xl">FindHome</span>
            </Link>
            <p className="text-gray-400 mb-6">
              The premier real estate platform connecting you with your dream property. Explore listings, connect with agents, and find your perfect home.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center transition-colors hover:bg-estate-primary"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center transition-colors hover:bg-estate-primary"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center transition-colors hover:bg-estate-primary"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center transition-colors hover:bg-estate-primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight size={14} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight size={14} />
                  <span>Properties</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight size={14} />
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight size={14} />
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight size={14} />
                  <span>Register</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-estate-primary mt-0.5" />
                <span className="text-gray-400">123 Main Street, New York, NY 10001, United States</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-estate-primary" />
                <a href="tel:+1-234-567-8900" className="text-gray-400 hover:text-white transition-colors">
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-estate-primary" />
                <a href="mailto:info@findhome.com" className="text-gray-400 hover:text-white transition-colors">
                  info@findhome.com
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest property updates.
            </p>
            <div className="flex flex-col gap-3">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 border-gray-700 text-white h-11 focus:border-estate-primary"
              />
              <Button className="bg-estate-primary hover:bg-estate-primary/90 w-full h-11">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} FindHome. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
