import { useState, useEffect } from "react";
import { Loader2, ChevronRight, ChevronLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { API_URL } from "../config/api";
import { useCart } from "../contexts/CartContext";

const Home = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultBanners = [
    {
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2000&auto=format&fit=crop",
      title: "Summer Collection 2026",
      subtitle: "Discover the latest trends with up to 50% off."
    },
    {
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2000&auto=format&fit=crop",
      title: "Tech Gadgets Blowout",
      subtitle: "Upgrade your lifestyle with our premium electronics."
    },
    {
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
      title: "Home & Living Essentials",
      subtitle: "Redecorate your space with elegance and comfort."
    }
  ];
  
  const [heroBanners, setHeroBanners] = useState<any[]>(defaultBanners);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, offersRes, settingsRes] = await Promise.all([
          fetch(`${API_URL}/api/products`),
          fetch(`${API_URL}/api/offers`),
          fetch(`${API_URL}/api/settings`)
        ]);
        const prodData = await prodRes.json();
        const offersData = await offersRes.json();
        const settingsData = await settingsRes.json();
        
        setProducts(Array.isArray(prodData) ? prodData : []);
        setOffers(Array.isArray(offersData) ? offersData : []);
        
        if (settingsData.heroBanners) {
          try {
            const parsedBanners = JSON.parse(settingsData.heroBanners);
            if (Array.isArray(parsedBanners) && parsedBanners.length > 0) {
              setHeroBanners(parsedBanners);
            }
          } catch(e) { console.error("Failed to parse hero banners", e); }
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroBanners.length]);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % heroBanners.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + heroBanners.length) % heroBanners.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen pb-24 font-sans text-gray-900">
      {/* Hero Carousel */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-gray-900 overflow-hidden group">
        <div 
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroBanners.map((banner, i) => (
            <div key={i} className="min-w-full h-full relative flex items-center">
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
              <img src={banner.image} alt={banner.title} className="absolute inset-0 w-full h-full object-cover object-center" />
              
              {/* Banner Content */}
              <div className="container mx-auto px-6 relative z-20 md:px-12 lg:px-24">
                <div className="max-w-xl text-white transform transition-all duration-700 translate-y-0 opacity-100">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
                    {banner.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 font-light">
                    {banner.subtitle}
                  </p>
                  <Link to="/shop" className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Carousel Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/30 backdrop-blur-md flex items-center justify-center rounded-full transition-all opacity-0 group-hover:opacity-100 border border-white/20">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/30 backdrop-blur-md flex items-center justify-center rounded-full transition-all opacity-0 group-hover:opacity-100 border border-white/20">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {heroBanners.map((_, i) => (
            <button 
              key={i} 
              onClick={() => goToSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-6 relative z-30 -mt-16 sm:-mt-24 md:-mt-32">
        
        {/* Block Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {offers.map((block, i) => (
            <div key={block.id || i} className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col group border border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 leading-tight">{block.title}</h2>
              <div className="grid grid-cols-2 gap-3 flex-grow mb-6">
                {block.images && Array.isArray(block.images) && block.images.map((img: string, j: number) => (
                  <div key={j} className="flex flex-col overflow-hidden rounded-2xl group/img cursor-pointer">
                    <div className="aspect-square bg-gray-50 overflow-hidden relative">
                      {img ? (
                        <img src={img} alt="Promo" className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs bg-gray-100">Image {j+1}</div>
                      )}
                      <div className="absolute inset-0 bg-black/5 group-hover/img:bg-transparent transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
              <Link to={block.link || "/shop"} className="text-center bg-gray-50 hover:bg-gray-900 hover:text-white text-gray-900 text-sm font-semibold py-3 px-4 rounded-xl transition-colors mt-auto">
                Explore Collection
              </Link>
            </div>
          ))}
        </div>

        {/* Deals of the Day Strip */}
        <div className="mb-16">
          <div className="flex items-end justify-between mb-6 px-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Deals of the Day</h2>
              <p className="text-gray-500 mt-1">Grab them before they are gone</p>
            </div>
            <Link to="/shop" className="text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center gap-1 group/link">
              See all <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
          ) : (
            <div className="relative group/slider">
              <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar px-2 snap-x">
                {products.map((product) => (
                  <div key={product.id} className="w-[240px] min-w-[240px] md:w-[280px] md:min-w-[280px] flex-none bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow group/card flex flex-col snap-start border border-gray-100">
                    <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] bg-[#f4f4f4] rounded-2xl overflow-hidden mb-4">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-center group-hover/card:scale-105 transition-transform duration-500 mix-blend-multiply" />
                      {product.discountPrice && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                          Save ₹{product.price - product.discountPrice}
                        </div>
                      )}
                    </Link>
                    <div className="flex-grow flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        {product.discountPrice && (
                          <span className="bg-red-50 text-red-600 text-xs font-extrabold px-2 py-1 rounded-md">
                            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                          </span>
                        )}
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Limited Time</span>
                      </div>
                      <Link to={`/product/${product.id}`} className="text-base font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors mb-2">
                        {product.name}
                      </Link>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xl font-extrabold text-gray-900">₹{product.discountPrice || product.price}</span>
                          {product.discountPrice && (
                            <span className="text-sm text-gray-400 line-through font-medium">₹{product.price}</span>
                          )}
                        </div>
                        <button 
                          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-900 hover:text-white flex items-center justify-center transition-colors text-gray-600" 
                          aria-label="Add to cart"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addItem({
                              id: product.id,
                              name: product.name,
                              price: product.discountPrice || product.price,
                              image: product.images[0]
                            });
                          }}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Browsing History Strip */}
        <div>
          <div className="flex items-center gap-4 mb-6 px-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Recommended for You</h2>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <div className="flex gap-5 overflow-x-auto pb-8 hide-scrollbar px-2 snap-x">
              {products.slice().reverse().map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="w-[160px] min-w-[160px] md:w-[200px] md:min-w-[200px] flex-none group cursor-pointer snap-start">
                  <div className="bg-white aspect-square rounded-3xl overflow-hidden mb-3 shadow-[0_4px_20px_rgb(0,0,0,0.03)] group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all p-3 border border-gray-100">
                    <div className="w-full h-full bg-[#f4f4f4] rounded-2xl overflow-hidden">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors px-1">{product.name}</p>
                  <div className="flex items-center gap-1 px-1">
                    <span className="text-sm font-extrabold text-gray-900">₹{product.discountPrice || product.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;
