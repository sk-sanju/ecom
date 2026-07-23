import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-gray-100 shadow-xl text-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-100 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-100 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. We have received your order and will contact you shortly to confirm the delivery details.
          </p>

          <div className="space-y-4">
            <Link 
              to="/shop" 
              className="w-full h-12 bg-accent hover:bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-md shadow-accent/20 hover:shadow-accent/40"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link 
              to="/" 
              className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl flex items-center justify-center font-bold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
