import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Star, Clock } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { API_URL } from "../config/api";

const TodaysDeals = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem, setIsCartOpen } = useCart();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        // Filter to only items with a discount
        const deals = data.filter((p: any) => p.discountPrice && p.discountPrice < p.price);
        setProducts(deals);
      } catch (err) {
        console.error("Failed to fetch deals:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            Today's Deals
          </h1>
          <p className="text-gray-600 mt-2">New deals. Every day. Shop our Deal of the Day, Lightning Deals and more daily deals and limited-time sales.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-2xl shadow-sm">
            <p className="text-gray-500">No deals available at the moment. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 shadow-sm flex flex-col group relative rounded-2xl">
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Ends Soon
                </div>
                
                <div className="w-full aspect-square bg-gray-100 mb-4 cursor-pointer relative rounded-2xl">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply p-4 group-hover:scale-105 transition-transform" />
                  </Link>
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-sm">
                        {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off
                      </span>
                      <span className="text-xs font-bold text-red-600">Deal of the Day</span>
                    </div>
                    
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        <span className="text-sm align-top mr-0.5">₹</span>
                        {product.discountPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through mb-1">₹{product.price.toLocaleString()}</span>
                    </div>
                    
                    <Link to={`/product/${product.id}`} className="text-sm font-medium text-gray-900 hover:text-accent  line-clamp-2 mb-1">
                      {product.name}
                    </Link>
                    
                    <div className="flex items-center gap-1 mb-4">
                      {[1,2,3,4].map(star => <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                      <Star className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />
                      <span className="text-gray-500 text-xs ml-1">4,123</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.discountPrice || product.price,
                          image: product.images[0],
                          quantity: 1
                        });
                        setIsCartOpen(true);
                      }}
                      className="w-full py-2 bg-secondary hover:bg-yellow-400 text-gray-900 font-bold text-sm rounded-full shadow-sm border border-yellow-500 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaysDeals;
