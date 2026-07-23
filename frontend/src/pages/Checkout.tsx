import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { CheckCircle2, ChevronRight, Loader2, ArrowRight } from "lucide-react";

const Checkout = () => {
  const { items, cartTotal, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !token) {
      navigate("/login");
      return;
    }

    if (items.length === 0) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          totalAmount: cartTotal,
          paymentMethod: "CASH_ON_DELIVERY"
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to place order");
      }

      clearCart();
      navigate("/success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <Link to="/shop" className="text-accent font-medium ">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/cart" className="hover:text-accent transition-colors">Cart</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Checkout</span>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Secure Checkout</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          {!user && (
            <div className="mb-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Create an account for faster checkout</h3>
                <p className="text-sm text-gray-600">You can also track your orders easily.</p>
              </div>
              <Link to="/login" className="px-6 py-2 bg-white rounded-2xl text-accent font-bold shadow-sm hover:shadow-md transition-all">
                Sign In
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-4">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Payment</h3>
              <form onSubmit={handleCheckout}>
                <div className="mb-6 p-4 border-2 border-accent bg-blue-50/50 rounded-xl flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-4 border-accent" />
                    <span className="font-bold text-gray-900">Cash on Delivery (COD)</span>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                
                <p className="text-sm text-gray-500 mb-8">
                  Pay with cash upon delivery. We will contact you via WhatsApp to confirm the order before shipping.
                </p>

                <button 
                  type="submit" 
                  disabled={isLoading || !user}
                  className="w-full h-14 bg-accent hover:bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      {user ? "Place Order" : "Login to Checkout"}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
