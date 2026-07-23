import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 via-gray-100/95 to-gray-200/90 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop" 
          alt="E-commerce Hero" 
          className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply"
        />
      </div>

      {/* Decorative Blur */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-[100px] z-0 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] z-0 pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
              NEW COLLECTION 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Elevate Your Style <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">
                Define Your Vibe.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl leading-relaxed">
              Discover our exclusive selection of premium lifestyle products. 
              Minimalist design meets exceptional quality, crafted for the modern trendsetter.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to="/shop" 
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(0,186,255,0.7)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Shop Now
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              
              <Link 
                to="/categories" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 font-semibold rounded-full backdrop-blur-sm transition-all shadow-sm hover:shadow"
              >
                Explore Categories
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
