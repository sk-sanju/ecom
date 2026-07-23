import { Store, TrendingUp, ShieldCheck, Banknote } from "lucide-react";
import { Link } from "react-router-dom";

const Sell = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop" 
            alt="Seller" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-4 py-24 md:py-32 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Become a Xenotrix Seller</h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl">
            Reach millions of customers, grow your brand, and boost your sales with our premium e-commerce platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register" className="bg-accent hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full transition-colors text-center text-lg">
              Sign Up Now
            </Link>
            <p className="text-sm text-gray-300 mt-2 sm:mt-0 sm:self-center">Only ₹399/month + selling fees.</p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Why sell with us?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { icon: TrendingUp, title: "Reach More Customers", desc: "Access our massive, engaged user base looking for premium products." },
              { icon: ShieldCheck, title: "Secure Platform", desc: "Industry-leading fraud protection for peace of mind." },
              { icon: Store, title: "Easy Store Setup", desc: "Build your storefront in minutes with our intuitive tools." },
              { icon: Banknote, title: "Fast Payments", desc: "Get paid securely directly to your bank account every week." }
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to grow your business?</h2>
          <p className="text-lg text-gray-600 mb-8">Join thousands of successful sellers on Xenotrix today. It only takes a few minutes to get started.</p>
          <Link to="/register" className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-12 rounded-full transition-colors">
            Start Selling
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sell;
