import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    discountPrice?: number;
    image: string;
    category: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isDiscounted = product.discountPrice && product.discountPrice < product.price;
  const { addItem } = useCart();

  return (
    <div className="group relative rounded-2xl bg-white border border-gray-200 overflow-hidden hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10">
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isDiscounted && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              SALE
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-white hover:bg-accent hover:border-accent transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addItem({
                id: product.id,
                name: product.name,
                price: product.discountPrice || product.price,
                image: product.image,
                quantity: 1
              });
            }}
            className="w-full py-3 bg-accent/90 hover:bg-accent backdrop-blur-md text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <span className="text-accent text-xs font-semibold tracking-wider uppercase mb-2 block">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
          {isDiscounted ? (
            <>
              <span className="text-xl font-bold text-gray-900">₹{product.discountPrice}</span>
              <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
