import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-gray-700 py-12 border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-accent mb-4 tracking-tighter">
            ECOM<span className="text-gray-900">STORE</span>
          </h2>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Your one-stop destination for premium products. Bringing quality and style directly to your doorstep in Kerala and beyond.
          </p>
          <div className="flex gap-4">
            
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link to="/about" className="text-gray-600 hover:text-accent transition-colors">About Us</Link></li>
            <li><Link to="/shop" className="text-gray-600 hover:text-accent transition-colors">Shop</Link></li>
            <li><Link to="/contact" className="text-gray-600 hover:text-accent transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Policies</h3>
          <ul className="space-y-2">
            <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link></li>
            <li><Link to="/shipping" className="hover:text-accent transition-colors">Shipping Policy</Link></li>
            <li><Link to="/returns" className="hover:text-accent transition-colors">Return & Refund</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Info</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <span>123 Commerce St, Kochi, Kerala 682001, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-accent shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent shrink-0" />
              <span>support@ecomstore.in</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-300 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} EcomStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
