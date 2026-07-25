import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, Star, LayoutGrid, List } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { API_URL } from "../config/api";

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const { addItem, setIsCartOpen } = useCart();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "All";
  
  // Filter States
  const [activeCategory, setActiveCategory] = useState(categoryQuery);
  const [sortBy, setSortBy] = useState("featured");
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  
  // Custom price input state
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${API_URL}/api/products`),
          fetch(`${API_URL}/api/categories`)
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        
        setProducts(prodData);
        setCategories([{ name: "All" }, ...catData]);
      } catch (err) {
        console.error("Failed to fetch shop data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const applyCustomPrice = () => {
    const min = minPriceInput ? Number(minPriceInput) : 0;
    const max = maxPriceInput ? Number(maxPriceInput) : Infinity;
    setPriceFilter({ min, max });
  };

  // 1. Filter by category
  let filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category?.name === activeCategory);
    
  // 2. Filter by search query
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (p.category?.name && p.category.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  // 3. Filter by price
  filteredProducts = filteredProducts.filter(p => {
    const price = p.discountPrice || p.price;
    return price >= priceFilter.min && price <= priceFilter.max;
  });

  // 4. Sort
  if (sortBy === "price_low") {
    filteredProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
  } else if (sortBy === "price_high") {
    filteredProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
  } else if (sortBy === "featured") {
    // We can sort by stock quantity or date to simulate "featured" or leave as is
    // Let's leave as is (original fetch order)
  }

  return (
    <div className="min-h-screen bg-light">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row gap-6">
        
        {/* Left Sidebar - Advanced Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 shadow-sm mb-4 rounded-2xl">
            <h2 className="font-bold text-gray-900 mb-4 text-sm">Category</h2>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button 
                    onClick={() => setActiveCategory(cat.name)}
                    className={`text-sm w-full text-left transition-colors ${activeCategory === cat.name ? 'text-accent font-bold' : 'text-gray-700 hover:text-accent'}`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>



          <div className="bg-white p-4 shadow-sm mb-4 rounded-2xl">
            <h2 className="font-bold text-gray-900 mb-4 text-sm">Price</h2>
            <ul className="space-y-2 mb-4">
              <li><button onClick={() => setPriceFilter({min: 0, max: 1000})} className={`text-sm hover:text-accent ${priceFilter.max === 1000 ? 'text-accent font-bold' : 'text-gray-700'}`}>Under ₹1,000</button></li>
              <li><button onClick={() => setPriceFilter({min: 1000, max: 5000})} className={`text-sm hover:text-accent ${priceFilter.min === 1000 && priceFilter.max === 5000 ? 'text-accent font-bold' : 'text-gray-700'}`}>₹1,000 - ₹5,000</button></li>
              <li><button onClick={() => setPriceFilter({min: 5000, max: 10000})} className={`text-sm hover:text-accent ${priceFilter.min === 5000 && priceFilter.max === 10000 ? 'text-accent font-bold' : 'text-gray-700'}`}>₹5,000 - ₹10,000</button></li>
              <li><button onClick={() => setPriceFilter({min: 10000, max: Infinity})} className={`text-sm hover:text-accent ${priceFilter.min === 10000 && priceFilter.max === Infinity ? 'text-accent font-bold' : 'text-gray-700'}`}>Over ₹10,000</button></li>
              <li><button onClick={() => setPriceFilter({min: 0, max: Infinity})} className={`text-sm hover:text-accent ${priceFilter.min === 0 && priceFilter.max === Infinity ? 'text-accent font-bold' : 'text-gray-700'}`}>Any Price</button></li>
            </ul>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                placeholder="Min" 
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded-sm text-sm" 
              />
              <span className="text-gray-500">-</span>
              <input 
                type="number" 
                placeholder="Max" 
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                className="w-full px-2 py-1 border border-gray-300 rounded-sm text-sm" 
              />
              <button onClick={applyCustomPrice} className="px-3 py-1 bg-white border border-gray-300 rounded-sm text-sm hover:bg-gray-50">Go</button>
            </div>
          </div>
          
          <div className="bg-white p-4 shadow-sm rounded-2xl">
            <h2 className="font-bold text-gray-900 mb-4 text-sm">Brands</h2>
            <ul className="space-y-2">
              {['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas'].map(brand => (
                <li key={brand} className="flex items-center gap-2">
                  <input type="checkbox" id={brand} className="w-4 h-4 rounded-sm border-gray-300 text-accent focus:ring-accent" />
                  <label htmlFor={brand} className="text-sm text-gray-700 cursor-pointer">{brand}</label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Bar */}
          <div className="bg-white p-3 shadow-sm mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 rounded-2xl">
            <span className="text-gray-700 text-sm font-medium">1-{filteredProducts.length} results for <span className="text-accent font-bold">"{activeCategory}"</span></span>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden">
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-2 border-l border-gray-300 ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 border border-gray-300 rounded-sm px-3 py-1 bg-gray-50 cursor-pointer shadow-sm">
                <span className="text-sm text-gray-700">Sort by:</span>
                <select 
                  className="text-sm font-bold text-gray-900 bg-transparent outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product List/Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20 bg-white shadow-sm rounded-2xl">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex justify-center items-center py-20 bg-white shadow-sm text-gray-500 rounded-2xl">
              No products match your filters.
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {filteredProducts.map((product) => (
                <div key={product.id} className={`bg-white p-4 shadow-sm flex ${viewMode === 'list' ? 'flex-col sm:flex-row gap-6' : 'flex-col'}`}>
                  <div className={`${viewMode === 'list' ? 'w-full sm:w-48' : 'w-full'} aspect-square bg-gray-100 flex-shrink-0 cursor-pointer relative group`}>
                    <Link to={`/product/${product.id}`}>
                      {product.images && product.images[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply p-4 group-hover:scale-105 transition-transform" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                      )}
                    </Link>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${product.id}`} className="text-lg font-medium text-gray-900 hover:text-accent  line-clamp-2 mb-1">
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        {[1,2,3,4].map(star => <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                        <Star className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
                        <span className="text-blue-600 text-xs ml-1  cursor-pointer">4,123</span>
                      </div>
                      
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-2xl font-bold text-gray-900">
                          <span className="text-sm align-top mr-0.5">₹</span>
                          {(product.discountPrice || product.price).toLocaleString()}
                        </span>
                        {product.discountPrice && (
                          <span className="text-sm text-gray-500 line-through mb-1">₹{product.price.toLocaleString()}</span>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-xs text-gray-600 font-bold bg-green-100 px-2 py-1">Save Extra with Combo</span>
                        <p className="text-xs text-gray-600 mt-2">FREE Delivery by <span className="font-bold text-gray-900">Tomorrow, 11 AM</span></p>
                      </div>
                    </div>
                    
                    {viewMode === 'list' && (
                      <div className="mt-auto">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            addItem({
                              id: product.id,
                              name: product.name,
                              price: product.discountPrice || product.price,
                              image: product.images && product.images[0] ? product.images[0] : "",
                              quantity: 1
                            });
                            setIsCartOpen(true);
                          }}
                          className="px-6 py-2 bg-secondary hover:bg-yellow-400 text-gray-900 font-bold text-sm rounded-full shadow-sm border border-yellow-500 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
