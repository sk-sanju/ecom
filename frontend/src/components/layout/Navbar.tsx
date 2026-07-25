import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, Search, ChevronDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Top Main Navbar */}
      <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tighter flex-shrink-0 flex items-center gap-1">
            XENOTRIX<span className="text-secondary text-sm self-end mb-1">.com</span>
          </Link>
          
          {/* Search Bar - Hidden on small mobile */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-3xl h-10 rounded-sm overflow-hidden focus-within:ring-2 focus-within:ring-accent"
          >
            <div className="bg-gray-100 text-gray-700 px-3 flex items-center text-sm border-r border-gray-300 hover:bg-gray-200 cursor-pointer">
              All <ChevronDown className="w-3 h-3 ml-1" />
            </div>
            <input 
              type="text" 
              placeholder="Search for products, brands and more"
              className="flex-1 bg-white px-4 text-black focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-accent hover:bg-orange-600 px-5 flex items-center justify-center transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-6 flex-shrink-0">
            {user ? (
              <div className="relative group cursor-pointer h-16 flex items-center">
                <div className="flex flex-col hover:text-secondary transition-colors">
                  <span className="text-xs text-gray-200">Hello, {user.name.split(' ')[0]}</span>
                  <span className="font-bold text-sm flex items-center">Accounts & Lists <ChevronDown className="w-3 h-3 ml-1" /></span>
                </div>
                
                {/* Account Dropdown */}
                <div className="absolute right-0 top-16 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 text-black">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-bold text-lg">Your Account</p>
                  </div>
                  <div className="p-2 flex flex-col">
                    {user.role === 'ADMIN' && (
                      <Link to="/admin" className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">Admin Dashboard</Link>
                    )}
                    <Link to="/profile" className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">Your Orders</Link>
                    <Link to="/profile" className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">Your Wishlist</Link>
                    <button onClick={logout} className="text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600 border-t border-gray-100 mt-2 pt-2">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="flex flex-col hover:text-secondary transition-colors">
                <span className="text-xs text-gray-200">Hello, sign in</span>
                <span className="font-bold text-sm flex items-center">Accounts & Lists <ChevronDown className="w-3 h-3 ml-1" /></span>
              </Link>
            )}

            <Link to="/profile" className="hidden lg:flex flex-col hover:text-secondary transition-colors">
              <span className="text-xs text-gray-200">Returns</span>
              <span className="font-bold text-sm">& Orders</span>
            </Link>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-end hover:text-secondary transition-colors relative"
            >
              <div className="relative">
                <ShoppingCart className="w-8 h-8" />
                <span className="absolute -top-1 left-3 bg-secondary text-black text-[11px] font-bold px-1.5 rounded-full">
                  {itemCount}
                </span>
              </div>
              <span className="font-bold text-sm hidden md:block ml-1">Cart</span>
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="flex w-full h-10 rounded-sm overflow-hidden">
            <input 
              type="text" 
              placeholder="Search Xenotrix"
              className="flex-1 bg-white px-4 text-black focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-accent px-4 flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </button>
          </form>
        </div>
      </header>

      {/* Secondary Mega Menu */}
      <div className="bg-secondary text-black text-sm font-medium border-b border-gray-200">
        <div className="container mx-auto px-4 h-10 flex items-center gap-6 overflow-x-auto whitespace-nowrap hide-scrollbar">
          <button className="flex items-center gap-1 font-bold hover:text-primary">
            <Menu className="w-5 h-5" /> All
          </button>
          <Link to="/deals" className="hover:text-primary">Today's Deals</Link>
          <Link to="/service" className="hover:text-primary">Customer Service</Link>
          <Link to="/registry" className="hover:text-primary">Registry</Link>
          <Link to="/gift-cards" className="hover:text-primary">Gift Cards</Link>
          <Link to="/sell" className="hover:text-primary">Sell</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
