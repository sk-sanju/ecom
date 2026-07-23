import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Loader2, Star, ShieldCheck, MapPin, Truck, RotateCcw } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, setIsCartOpen } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images && product.images.length > 0 ? product.images[0] : "",
      quantity
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images && product.images.length > 0 ? product.images[0] : "",
      quantity
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Category Breadcrumb */}
      <div className="bg-white border-b border-gray-200 text-sm text-gray-500 py-2 px-4 shadow-sm rounded-2xl">
        <div className="container mx-auto flex items-center gap-2">
          <Link to="/" className=" hover:text-accent">Home</Link> &gt; 
          {product.category?.name ? (
            <Link to={`/shop?category=${encodeURIComponent(product.category.name)}`} className=" hover:text-accent">
              {product.category.name}
            </Link>
          ) : (
            <span>Category</span>
          )} &gt; 
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Images */}
          <div className="w-full lg:w-[40%] flex gap-4">
            <div className="flex flex-col gap-2 w-16 flex-shrink-0">
              {product.images && product.images.map((img: string, i: number) => (
                <button 
                  key={i} 
                  onMouseEnter={() => setActiveImage(i)}
                  className={`w-16 h-16 border rounded-sm overflow-hidden ${activeImage === i ? 'border-accent shadow-md shadow-accent/20' : 'border-gray-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 border border-gray-200 rounded-sm overflow-hidden relative cursor-crosshair">
              {product.images && product.images[activeImage] ? (
                <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">No Image Available</div>
              )}
            </div>
          </div>

          {/* Middle Column - Details */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 leading-tight mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-2">
              <a href="#" className="text-sm text-blue-600 ">Visit the Xenotrix Store</a>
              <div className="flex items-center gap-1 border-l border-gray-300 pl-4">
                {[1,2,3,4].map(star => <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                <Star className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
                <span className="text-blue-600 text-sm ml-1  cursor-pointer">4,123 ratings</span>
              </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="mb-4">
              {product.discountPrice && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-red-600 text-2xl font-light">-{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%</span>
                  <span className="text-3xl font-medium text-gray-900">
                    <span className="text-lg align-top mr-0.5">₹</span>
                    {product.discountPrice.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="text-sm text-gray-500">
                M.R.P.: <span className="line-through">₹{product.price.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-900 mt-2 font-medium">Inclusive of all taxes</p>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            {/* Feature Icons */}
            <div className="flex gap-6 mb-6 overflow-x-auto py-2">
              <div className="flex flex-col items-center text-center gap-2 w-20 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-xs text-blue-600">7 days Replacement</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 w-20 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-xs text-blue-600">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 w-20 flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-xs text-blue-600">1 Year Warranty</span>
              </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">About this item</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800">
                <li>{product.description}</li>
                <li>Premium build quality with durable materials</li>
                <li>Designed for maximum comfort and long-term use</li>
                <li>Comes with a 1-year manufacturer warranty</li>
              </ul>
            </div>
          </div>

          {/* Right Column - The "Buy Box" */}
          <div className="w-full lg:w-[25%] flex-shrink-0">
            <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                <span className="text-sm align-top mr-0.5">₹</span>
                {(product.discountPrice || product.price).toLocaleString()}
              </h2>
              <div className="text-sm text-gray-900 mb-4">
                <p>FREE delivery <span className="font-bold">Tomorrow, 11 AM</span>. Order within <span className="text-green-600">10 hrs 30 mins</span>. <a href="#" className="text-blue-600 ">Details</a></p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-900 mb-4">
                <MapPin className="w-4 h-4 text-gray-600" />
                <a href="#" className="text-blue-600 ">Deliver to Customer - Kerala 682030</a>
              </div>

              <h3 className={`text-xl mb-4 font-medium ${product.stockQuantity > 0 ? 'text-green-700' : 'text-red-600'}`}>
                {product.stockQuantity > 0 ? 'In stock' : 'Out of stock'}
              </h3>

              <div className="mb-4">
                <label className="text-sm font-medium text-gray-900 mb-1 block">Quantity:</label>
                <select 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md p-2 shadow-sm text-sm bg-gray-50 hover:bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  {[...Array(Math.min(10, product.stockQuantity))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className="w-full py-3 bg-secondary hover:bg-yellow-400 text-gray-900 rounded-full font-bold mb-3 shadow-sm border border-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              
              <button 
                onClick={handleBuyNow}
                disabled={product.stockQuantity === 0}
                className="w-full py-3 bg-accent hover:bg-orange-600 text-white rounded-full font-bold shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                Buy Now
              </button>

              <div className="text-xs text-gray-500 flex flex-col gap-2">
                <div className="flex justify-between">
                  <span>Payment</span>
                  <span className="text-blue-600">Secure transaction</span>
                </div>
                <div className="flex justify-between">
                  <span>Ships from</span>
                  <span>Xenotrix Fulfillment</span>
                </div>
                <div className="flex justify-between">
                  <span>Sold by</span>
                  <span className="text-blue-600  cursor-pointer">Xenotrix Retail</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-12"></div>

        {/* Reviews Section Mockup */}
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer reviews</h2>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
              <div className="flex items-center gap-2 mb-2">
                {[1,2,3,4].map(star => <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />)}
                <Star className="w-6 h-6 fill-yellow-400/50 text-yellow-400" />
                <span className="text-xl font-medium text-gray-900">4.5 out of 5</span>
              </div>
              <p className="text-sm text-gray-500 mb-6">4,123 global ratings</p>
              
              <div className="space-y-3">
                {[
                  { star: 5, pct: 72 },
                  { star: 4, pct: 15 },
                  { star: 3, pct: 8 },
                  { star: 2, pct: 3 },
                  { star: 1, pct: 2 }
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-3 text-sm text-blue-600  cursor-pointer">
                    <span className="w-12">{row.star} star</span>
                    <div className="flex-1 h-4 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                      <div className="h-full bg-yellow-400" style={{ width: `${row.pct}%` }}></div>
                    </div>
                    <span className="w-8 text-right">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Top reviews from India</h3>
              
              {[
                { name: "Arun K.", title: "Excellent product, highly recommended!", date: "Reviewed in India on 15 July 2026", desc: "I've been using this for a few weeks now and it's absolutely fantastic. The build quality is top-notch." },
                { name: "Priya M.", title: "Good value for money", date: "Reviewed in India on 2 July 2026", desc: "Does exactly what it says. Delivery was very fast. 4 stars because the packaging was slightly dented." }
              ].map((review, i) => (
                <div key={i} className="mb-6 pb-6 border-b border-gray-200 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">{review.name[0]}</div>
                    <span className="font-medium text-sm text-gray-900">{review.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {[1,2,3,4,5].map(star => <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <span className="font-bold text-sm text-gray-900">{review.title}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{review.date}</p>
                  <p className="text-sm text-gray-800">{review.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
