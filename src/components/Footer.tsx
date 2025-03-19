
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-estate-primary/10">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-2xl font-bold mb-4 inline-block">FindHome</Link>
            <p className="text-estate-gray mb-4">
              Your trusted partner in the real estate industry, providing quality services and connecting people with their dream properties since 2010.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-estate-primary hover:text-estate-primary/70 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-estate-primary hover:text-estate-primary/70 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-estate-primary hover:text-estate-primary/70 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-estate-primary hover:text-estate-primary/70 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-estate-gray hover:text-estate-primary transition-colors">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/properties-for-sale" className="text-estate-gray hover:text-estate-primary transition-colors">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link to="/properties-for-rent" className="text-estate-gray hover:text-estate-primary transition-colors">
                  Properties for Rent
                </Link>
              </li>
              <li>
                <Link to="/agents" className="text-estate-gray hover:text-estate-primary transition-colors">
                  Find Agents
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-estate-gray hover:text-estate-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-estate-gray hover:text-estate-primary transition-colors">
                  Site Map
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/loans" className="text-estate-gray hover:text-estate-primary transition-colors">
                  Mortgage & Loans
                </Link>
              </li>
              <li>
                <a href="#" className="text-estate-gray hover:text-estate-primary transition-colors">
                  Property Management
                </a>
              </li>
              <li>
                <a href="#" className="text-estate-gray hover:text-estate-primary transition-colors">
                  FAQs & Support
                </a>
              </li>
              <li>
                <a href="#" className="text-estate-gray hover:text-estate-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-estate-gray hover:text-estate-primary transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-estate-primary mt-1" size={18} />
                <p className="text-estate-gray">
                  123 Palm Street, <br />
                  Mumbai, Maharashtra 400001, <br />
                  India
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-estate-primary" size={18} />
                <a href="tel:+919876543210" className="text-estate-gray hover:text-estate-primary transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-estate-primary" size={18} />
                <a href="mailto:info@findhome.com" className="text-estate-gray hover:text-estate-primary transition-colors">
                  info@findhome.com
                </a>
              </div>
              <div>
                <Button className="mt-2 bg-estate-primary hover:bg-estate-primary/90">
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-estate-gray/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-estate-gray text-sm">
              © {new Date().getFullYear()} FindHome. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-estate-gray hover:text-estate-primary text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-estate-gray hover:text-estate-primary text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-estate-gray hover:text-estate-primary text-sm transition-colors">
                Cookies Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
